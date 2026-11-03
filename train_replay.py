"""Prepare an honest, fixed historical one-hour-ahead replay from I-94.
No contemporary traffic readings or Jazan traffic are inferred.
"""
from pathlib import Path
import json
import numpy as np
import pandas as pd
from statsmodels.tsa.statespace.sarimax import SARIMAX

ROOT=Path(__file__).parent
raw=pd.read_csv(ROOT/'data/cleaned_hourly.csv',parse_dates=['date_time']).set_index('date_time').sort_index()
# Source dataset has no nulls; the temporal index has some unrecorded hours. Impute only gaps in selected historical window.
begin='2018-07-01 00:00:00'; train_stop='2018-08-31 23:00:00'; finish='2018-09-30 23:00:00'
hours=pd.date_range(begin,finish,freq='h')
y=raw.traffic_volume.reindex(hours)
missing=int(y.isna().sum())
y=y.interpolate('time').ffill().bfill()
# Operationally, evaluate month of September only. Forecast for each hour conditions on observed values up to the previous hour.
train=y.loc[:train_stop]
print('Training',len(train),'hourly data, gaps',missing,'... ', flush=True)
model=SARIMAX(train,order=(1,0,0),seasonal_order=(1,1,0,24),trend='c',enforce_stationarity=False,enforce_invertibility=False)
fit=model.fit(disp=False,maxiter=35,method='lbfgs')
print('Fitted',fit.params.to_dict(), flush=True)
# Filter with same fitted parameters across historical test series, enabling honest one-step prediction at each hour.
all_model=SARIMAX(y,order=(1,0,0),seasonal_order=(1,1,0,24),trend='c',enforce_stationarity=False,enforce_invertibility=False)
filtered=all_model.filter(fit.params)
pred=filtered.get_prediction(start=pd.Timestamp('2018-09-01'),end=pd.Timestamp('2018-09-30 23:00:00'),dynamic=False).predicted_mean.clip(lower=0)
truth=raw.traffic_volume.reindex(pred.index)
frame=pd.DataFrame({'date_time':pred.index,'predicted_volume':pred.values,'actual_volume':truth.values})
frame=frame[frame.actual_volume.notna()].copy(); frame['predicted_volume']=frame.predicted_volume.round().astype(int);frame['actual_volume']=frame.actual_volume.astype(int)
frame['absolute_error']=(frame.actual_volume-frame.predicted_volume).abs()
frame['date_time']=frame.date_time.dt.strftime('%Y-%m-%dT%H:%M')
frame.to_csv(ROOT/'data/replay_predictions.csv',index=False)
metrics={'model_family':'SARIMA','model_type':'historical one-step replay','traffic_region':'Interstate 94 westbound, Minnesota, USA','traffic_source':'UCI Metro Interstate Traffic Volume','traffic_period':'2012-10 to 2018-09','source_raw_rows':48204,'source_unique_hours':40575,'fit_range':'2018-07-01 to 2018-08-31','test_range':'2018-09-01 to 2018-09-30','train_hours':len(train),'test_observed_hours':len(frame),'gaps_in_selected_window_for_hourly_regularization':missing,'gap_note':'The dataset states no missing column values. Time gaps are absent timestamp rows, not missing cells. Limited to selected training/replay window; interpolated internally for regular SARIMA steps, never shown as actual observations.','mae':float(np.mean(np.abs(frame.actual_volume-frame.predicted_volume))),'rmse':float(np.sqrt(np.mean((frame.actual_volume-frame.predicted_volume)**2))),'params':{k:float(v) for k,v in fit.params.items()},'order':[1,0,0],'seasonal_order':[1,1,0,24]}
(ROOT/'data/replay_metadata.json').write_text(json.dumps(metrics,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in metrics.items() if k not in ('params','gap_note')},indent=2), flush=True)
