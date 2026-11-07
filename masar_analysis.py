"""Parse hourly traffic files and fit a seasonal model on their own observations."""
import base64
import binascii
import csv
import io
import threading
import warnings
import zipfile

import numpy as np
import pandas as pd
from openpyxl import load_workbook
from statsmodels.tsa.statespace.sarimax import SARIMAX

MAX_BYTES = 2_000_000
MAX_ROWS = 25_000
MAX_COLUMNS = 80
MAX_FIT = 2016
MIN_HOURS = 168
FIT_SLOT = threading.BoundedSemaphore(1)
ORDER = (1, 0, 0)
SEASONAL = (1, 1, 0, 24)


def file_rows(payload):
    name = str(payload.get('name', '')).lower()
    try:
        raw = base64.b64decode(payload.get('file', ''), validate=True)
    except (ValueError, TypeError, binascii.Error):
        raise ValueError('file_format') from None
    if not raw or len(raw) > MAX_BYTES:
        raise ValueError('file_size')
    if name.endswith('.csv'):
        try:
            content = raw.decode('utf-16' if raw.startswith((b'\xff\xfe', b'\xfe\xff')) else 'utf-8-sig')
            try:
                dialect = csv.Sniffer().sniff(content[:8192], delimiters=',;\t')
            except csv.Error:
                dialect = csv.excel
            return bounded_rows(csv.reader(io.StringIO(content), dialect)), [], None
        except (UnicodeError, csv.Error):
            raise ValueError('file_format') from None
    if not name.endswith('.xlsx'):
        raise ValueError('file_format')
    try:
        with zipfile.ZipFile(io.BytesIO(raw)) as archive:
            entries = archive.infolist()
            if len(entries) > 500 or sum(item.file_size for item in entries) > 25_000_000:
                raise ValueError('file_size')
        workbook = load_workbook(io.BytesIO(raw), read_only=True, data_only=True, keep_links=False)
        try:
            sheets = workbook.sheetnames
            sheet = payload.get('sheet') or sheets[0]
            if sheet not in sheets:
                raise ValueError('sheet')
            worksheet = workbook[sheet]
            if (worksheet.max_column or 0) > MAX_COLUMNS or (worksheet.max_row or 0) > MAX_ROWS + 1:
                raise ValueError('file_size')
            return bounded_rows(worksheet.iter_rows(values_only=True)), sheets, sheet
        finally:
            workbook.close()
    except ValueError:
        raise
    except Exception:
        raise ValueError('file_format') from None


def bounded_rows(rows):
    result = []
    for index, row in enumerate(rows):
        if index > MAX_ROWS or len(row) > MAX_COLUMNS:
            raise ValueError('file_size')
        if any(value is not None and str(value).strip() for value in row):
            result.append(row)
    if len(result) < 2 or len(result[0]) < 2:
        raise ValueError('empty')
    return result


def uploaded_series(payload, rows):
    try:
        t_col, v_col = int(payload['time']), int(payload['volume'])
    except (TypeError, ValueError, KeyError):
        raise ValueError('columns') from None
    if t_col == v_col or not all(0 <= col < len(rows[0]) for col in (t_col, v_col)):
        raise ValueError('columns')
    time_values, volumes = [], []
    for row in rows[1:]:
        time_values.append(row[t_col] if t_col < len(row) else None)
        volumes.append(row[v_col] if v_col < len(row) else None)
    # Reject numeric serials unless Excel has already decoded a date-formatted cell.
    if any(not value or isinstance(value, (int, float, bool)) for value in time_values):
        raise ValueError('dates')
    try:
        dates = pd.DatetimeIndex(pd.to_datetime(time_values, format='mixed', errors='raise'))
    except (TypeError, ValueError, OverflowError):
        raise ValueError('dates') from None
    if dates.hasnans or any(dates.minute != 0) or any(dates.second != 0) or any(dates.microsecond != 0) or any(dates.nanosecond != 0):
        raise ValueError('dates')
    numeric = pd.to_numeric(pd.Series(volumes), errors='coerce').to_numpy(dtype=float)
    if not np.isfinite(numeric).all() or (numeric < 0).any() or (numeric > 1_000_000).any():
        raise ValueError('values')
    series = pd.Series(numeric, index=dates).sort_index()
    if series.index.has_duplicates:
        raise ValueError('duplicates')
    if not (series.index.to_series().diff().dropna() == pd.Timedelta(hours=1)).all():
        raise ValueError('gaps')
    return series


def seasonal_model(values):
    return SARIMAX(values, order=ORDER, seasonal_order=SEASONAL,
                   enforce_stationarity=False, enforce_invertibility=False)


def fit(values):
    with warnings.catch_warnings():
        warnings.simplefilter('ignore')
        result = seasonal_model(values).fit(disp=False, maxiter=45, low_memory=True)
    if not result.mle_retvals.get('converged', False):
        raise ValueError('convergence')
    return result


def error_metrics(actual, predicted):
    residual = actual - predicted
    return {'mae': round(float(np.mean(np.abs(residual))), 2),
            'rmse': round(float(np.sqrt(np.mean(residual ** 2))), 2)}


def analyze(series):
    if len(series) < MIN_HOURS:
        raise ValueError('insufficient')
    if not FIT_SLOT.acquire(blocking=False):
        raise ValueError('busy')
    try:
        used = series.iloc[-MAX_FIT:]
        values = used.to_numpy(dtype=float)
        holdout = min(168, max(24, len(used) // 5))
        train, actual = values[:-holdout], values[-holdout:]
        fitted = fit(np.log1p(train))
        # Each one-hour forecast uses observations available before that hour only.
        evaluation = seasonal_model(np.log1p(values))
        evaluation.ssm.set_conserve_memory(memory_no_filtered=True, memory_no_predicted=True,
                                           memory_no_smoothing=True)
        filtered = evaluation.filter(fitted.params)
        predicted = np.maximum(0, np.expm1(filtered.forecasts[0, -holdout:]))
        full = fit(np.log1p(values))
        forecast = float(np.expm1(full.forecast(1)[0]))
        if not np.isfinite(predicted).all() or not np.isfinite(forecast):
            raise ValueError('convergence')
        baseline = values[-holdout-24:-24]
        chart = used.iloc[-min(len(used), 168):]
        return {
            'rows': len(series), 'used': len(used), 'train': len(train), 'holdout': holdout,
            'start': series.index[0].isoformat(), 'end': series.index[-1].isoformat(),
            'next_time': (series.index[-1] + pd.Timedelta(hours=1)).isoformat(),
            'mean': round(float(series.mean()), 2), 'peak': float(series.max()),
            'forecast': round(max(0, forecast)), 'forecast_clipped': forecast < 0, 'model': 'SARIMA(1,0,0)(1,1,0,24) · log1p',
            'metrics': error_metrics(actual, predicted),
            'baseline': error_metrics(actual, baseline),
            'history': [{'time': t.isoformat(), 'volume': float(v)} for t, v in chart.items()],
            'evaluation': [{'time': t.isoformat(), 'actual': float(a), 'predicted': float(p)}
                           for t, a, p in zip(used.index[-holdout:], actual, predicted)],
        }
    finally:
        FIT_SLOT.release()


def project_example(history):
    volume = history.traffic_volume.dropna().sort_index()
    runs = volume.index.to_series().diff().ne(pd.Timedelta(hours=1)).cumsum()
    candidates = [segment for _, segment in volume.groupby(runs) if len(segment) >= 336]
    if not candidates:
        raise ValueError('insufficient')
    return analyze(candidates[-1].iloc[-672:])


def handle_analysis(path, environ, history):
    if path == '/api/analyze/example':
        return project_example(history)
    import json
    length = int(environ.get('CONTENT_LENGTH') or 0)
    if not 0 < length < 2_700_000:
        raise ValueError('file_size')
    try:
        payload = json.loads(environ['wsgi.input'].read(length))
    except (ValueError, UnicodeError):
        raise ValueError('file_format') from None
    if not isinstance(payload, dict):
        raise ValueError('file_format')
    rows, sheets, sheet = file_rows(payload)
    if path == '/api/analyze/inspect':
        return {'columns': [str(value or f'Column {i+1}')[:160] for i, value in enumerate(rows[0])],
                'sheets': sheets, 'sheet': sheet, 'rows': len(rows)-1}
    return analyze(uploaded_series(payload, rows))
