"""Reproducible, clearly hypothetical Jazan CITY road-corridor simulation.

Geographical names are illustrative locations; these vehicle counts were NOT obtained
from counters in Jazan. FHWA temporal principles inform the shapes, not magnitudes.
Fixed SARIMA coefficients are estimated once on synthetic reference data by
`python jazan_model.py --train`, then applied to a rolling synthetic history.
"""
from __future__ import annotations
import json
from datetime import datetime, timedelta
from pathlib import Path
from threading import Lock
from zoneinfo import ZoneInfo
import numpy as np
import pandas as pd
from statsmodels.tsa.statespace.sarimax import SARIMAX

TZ = ZoneInfo('Asia/Riyadh')
HERE = Path(__file__).resolve().parent
PARAMS_PATH = HERE / 'data' / 'jazan_model_params.json'
ROADS = (
    {'id':'king_fahd','ar':'طريق الملك فهد','en':'King Fahd Road','assumed_scale':590,'seed':242},
    {'id':'king_abdulaziz','ar':'طريق الملك عبدالعزيز','en':'King Abdulaziz Road','assumed_scale':485,'seed':742},
    {'id':'city_centre','ar':'وسط مدينة جيزان (نطاق افتراضي)','en':'Jazan city centre (conceptual area)','assumed_scale':430,'seed':346},
)
ORDER = (1,0,0)
SEASONAL_ORDER = (1,1,0,24)
_lock = Lock()
_cache = {}


def synthetic_history(road, at_hour, days=70):
    """Deterministic scenario anchored to city-local time; not observational data."""
    at_hour = at_hour.astimezone(TZ).replace(minute=0, second=0, microsecond=0)
    index = pd.date_range(end=at_hour - timedelta(hours=1), periods=days*24, freq='h',tz=TZ)
    h=index.hour.to_numpy(dtype=float)
    dow=index.dayofweek.to_numpy()
    scale=road['assumed_scale']
    def peak(mu, sigma):
        return np.exp(-0.5*((h-mu)/sigma)**2)
    daily_profile=.28+.59*peak(7.7,1.55)+.45*peak(13.5,2.25)+.68*peak(19,2.35)
    # Day-of-week assumptions for Saudi Arabia; Friday/Saturday differ from workdays.
    weekend=np.where(dow==4,.70,np.where(dow==5,.85,1.0))
    # Each date has the same seeded noise regardless of the report's generation day.
    dates=index.date
    noise=np.empty(len(index), dtype=float)
    for day in set(dates):
        mask=np.fromiter((d==day for d in dates),dtype=bool,count=len(dates))
        indices=np.flatnonzero(mask)
        r=np.random.default_rng(road['seed']*1000003+day.toordinal())
        noise[indices]=r.normal(0, .07*scale, size=len(indices))
    ar=np.zeros(len(index))
    for i in range(1,len(index)):
        ar[i]=.44*ar[i-1]+noise[i]
    # Small date-specific fluctuations model uncertainty in demand rather than actual counts.
    volumes=np.maximum(0, scale*daily_profile*weekend+ar).round().astype(float)
    return pd.Series(volumes,index=index)


def filter_forecast(history,params):
    mod=SARIMAX(history.to_numpy(),order=ORDER,seasonal_order=SEASONAL_ORDER,
                trend='n',enforce_stationarity=False,enforce_invertibility=False)
    res=mod.filter(params)
    return np.maximum(0,np.asarray(res.forecast(steps=48),dtype=float))


def current_simulation(now=None):
    if now is None:now=datetime.now(TZ)
    start=now.astimezone(TZ).replace(minute=0,second=0,microsecond=0)+timedelta(hours=1)
    key=start.isoformat()
    with _lock:
        if key in _cache:return _cache[key]
        config=json.loads(PARAMS_PATH.read_text(encoding='utf-8'))
        roads=[]
        for road in ROADS:
            series=synthetic_history(road,start)
            param=config['roads'][road['id']]
            forecast=filter_forecast(series,param['params'])
            roads.append({
                'id':road['id'], 'ar':road['ar'],'en':road['en'],
                'assumed_scale':road['assumed_scale'],
                'history':[int(x) for x in series.iloc[-7*24:].to_numpy()],
                'forecast':[int(round(x)) for x in forecast],
                'mae_on_synthetic_holdout':param['mae'],
                'rmse_on_synthetic_holdout':param['rmse'],
            })
        result={
            'forecast_start':start.isoformat(timespec='seconds'),
            'generated_at':now.astimezone(TZ).isoformat(timespec='seconds'),
            'hour_count':48,'road_count':len(roads),
            'data_type':'synthetic_assumptions_not_real_jazan_traffic',
            'model':'SARIMA(1,0,0)(1,1,0,24), synthetic-data fitted parameters',
            'scope':'Jazan City only, not Jazan Region',
            'traffic_weather_combined':False,
            'references':{
                'jazan_city_profile':'https://unhabitat.org/jazan-city-profile',
                'traffic_monitoring':'https://www.fhwa.dot.gov/policyinformation/tmguide/tmg_2022/traffic-data-methodologies.cfm',
                'weather':'https://open-meteo.com/en/docs'
            },
            'warning':'حركة المرور محاكاة مبنية على افتراضات لا على عدادات في جيزان. مؤشرات MAE/RMSE تخص اختبار بيانات اصطناعية فقط، ولا تعني دقة فعلية في المدينة.',
            'roads':roads
        }
        _cache.clear();_cache[key]=result
        return result


def train_reference():
    """Run locally when building the release; intentionally not part of Render startup."""
    reference=datetime(2026,10,1,13,tzinfo=TZ)
    obj={'model': 'SARIMA(1,0,0)(1,1,0,24) on synthetic reference series',
         'reference_end':reference.isoformat(),'roads':{}}
    for road in ROADS:
        y=synthetic_history(road,reference)
        train=y.iloc[:-7*24].to_numpy()
        test=y.iloc[-7*24:].to_numpy()
        model=SARIMAX(train,order=ORDER,seasonal_order=SEASONAL_ORDER,trend='n',
                      enforce_stationarity=False,enforce_invertibility=False)
        fit=model.fit(disp=False,maxiter=90)
        val=np.maximum(0,np.asarray(fit.forecast(steps=len(test))))
        mae=float(np.mean(np.abs(val-test)))
        rmse=float(np.sqrt(np.mean((val-test)**2)))
        full=SARIMAX(y.to_numpy(),order=ORDER,seasonal_order=SEASONAL_ORDER,trend='n',
                    enforce_stationarity=False,enforce_invertibility=False).fit(disp=False,maxiter=90)
        obj['roads'][road['id']]={'params':[float(v) for v in full.params],
                                'mae':round(mae,1),'rmse':round(rmse,1),
                                'fit_converged':bool(full.mle_retvals.get('converged',False))}
        print(road['id'],obj['roads'][road['id']],flush=True)
    PARAMS_PATH.write_text(json.dumps(obj,indent=2,ensure_ascii=False),encoding='utf-8')
    return obj

if __name__=='__main__':
    import sys
    if '--train' in sys.argv:train_reference()
    else:print(json.dumps(current_simulation(),ensure_ascii=False)[:400])
