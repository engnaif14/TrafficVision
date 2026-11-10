"""MASAR: Jazan CITY research simulation (not actual traffic measurements).

The historical traffic AND weather are synthetic and reproducible. SARIMAX learns
assumed rainfall/heat effects from paired synthetic history; the future exogenous
weather forecasts come from Open-Meteo. Thus synthetic validation CANNOT imply
real-world effectiveness or causal effects on Jazan roads.
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

TZ=ZoneInfo('Asia/Riyadh')
PARAMS_PATH=Path(__file__).resolve().parent/'jazan_weather_params.json'
ROADS=(
 {'id':'king_fahd','ar':'طريق الملك فهد','en':'King Fahd Road','assumed_scale':590,'seed':242},
 {'id':'king_abdulaziz','ar':'طريق الملك عبدالعزيز','en':'King Abdulaziz Road','assumed_scale':485,'seed':742},
 {'id':'city_centre','ar':'وسط مدينة جيزان (نطاق افتراضي)','en':'Jazan City centre (conceptual area)','assumed_scale':430,'seed':346},
)
ORDER=(1,0,0); SEASONAL_ORDER=(1,1,0,24)
RAIN_EFFECT=-16.0 # Illustrative vehicles/(mm/h), at assumed road scale 500
HEAT_EFFECT=-10.0 # Illustrative vehicles/degree above 37 C, same scale
_lock=Lock();_cache={}

def proxy_weather(index):
    """Hypothetical historical weather, NOT observed at Jazan."""
    hour=index.hour.to_numpy(dtype=float); doy=index.dayofyear.to_numpy(dtype=float)
    temp=33+2.7*np.cos(2*np.pi*(doy-205)/365.25)+3*np.cos(2*np.pi*(hour-15)/24)
    rain=np.zeros(len(index));dates=np.asarray(index.date)
    for date in set(dates):
        ids=np.flatnonzero(dates==date);rng=np.random.default_rng(8419*1000003+date.toordinal())
        temp[ids]+=rng.normal(0,.65,len(ids))
        if rng.random()<.17: # arbitrary, NOT Jazan rain climatology
            start=int(rng.integers(0,19)); length=int(rng.integers(2,6))
            for i in ids:
                if start<=index[i].hour<start+length:rain[i]=round(float(rng.uniform(1,6)),2)
    return pd.DataFrame({'temperature_c':temp,'precipitation_mm':rain},index=index)

def exog(temperature,precipitation):
    t=np.asarray(temperature,dtype=float);r=np.asarray(precipitation,dtype=float)
    if not np.isfinite(t).all() or not np.isfinite(r).all() or (r<0).any() or (t<-20).any() or (t>65).any():
        raise ValueError('بيانات الطقس مفقودة أو غير صالحة')
    return np.column_stack([np.clip(r,0,20),np.clip(t-37,0,18)])

def synthetic_history(road,at_hour,days=70,with_weather=False):
    at_hour=at_hour.astimezone(TZ).replace(minute=0,second=0,microsecond=0)
    index=pd.date_range(end=at_hour-timedelta(hours=1),periods=days*24,freq='h',tz=TZ)
    h=index.hour.to_numpy(dtype=float);dow=index.dayofweek.to_numpy();scale=road['assumed_scale']
    def peak(mu,sigma):return np.exp(-.5*((h-mu)/sigma)**2)
    profile=.28+.59*peak(7.7,1.55)+.45*peak(13.5,2.25)+.68*peak(19,2.35)
    weekend=np.where(dow==4,.70,np.where(dow==5,.85,1.0))
    dates=np.asarray(index.date); noise=np.empty(len(index))
    for day in set(dates):
        ix=np.flatnonzero(dates==day);rng=np.random.default_rng(road['seed']*1000003+day.toordinal())
        noise[ix]=rng.normal(0,.07*scale,len(ix))
    ar=np.zeros(len(index))
    for i in range(1,len(index)):ar[i]=.44*ar[i-1]+noise[i]
    weather=proxy_weather(index)
    x=exog(weather.temperature_c,weather.precipitation_mm)
    effect=(RAIN_EFFECT*x[:,0]+HEAT_EFFECT*x[:,1])*scale/500
    volumes=np.maximum(0,scale*profile*weekend+ar+effect).round().astype(float)
    result=pd.Series(volumes,index=index)
    return (result,weather) if with_weather else result

def align_future_weather(weather_payload,start,hours=48):
    """No fictitious fallback: require exactly matching local future hourly weather."""
    if not isinstance(weather_payload,dict) or not isinstance(weather_payload.get('hours'),list):return None,[]
    rows={r.get('time'):r for r in weather_payload['hours'] if isinstance(r,dict)}
    selected=[]
    for i in range(hours):
        key=(start+timedelta(hours=i)).strftime('%Y-%m-%dT%H:00');row=rows.get(key)
        if row is None:return None,[]
        try:t=float(row['temperature_c']);p=float(row['precipitation_mm'])
        except (TypeError,ValueError,KeyError):return None,[]
        if not np.isfinite(t) or not np.isfinite(p) or p<0:return None,[]
        selected.append(row)
    try:features=exog([r['temperature_c'] for r in selected],[r['precipitation_mm'] for r in selected])
    except ValueError:return None,[]
    return features,selected

def _forecast(y,params,history_exog=None,future_exog=None):
    mod=SARIMAX(y,exog=history_exog,order=ORDER,seasonal_order=SEASONAL_ORDER,
                trend='n',enforce_stationarity=False,enforce_invertibility=False)
    fitted=mod.filter(params)
    kw={'exog':future_exog} if history_exog is not None else {}
    return np.maximum(0,np.asarray(fitted.forecast(steps=48,**kw),dtype=float))

def current_simulation(now=None,weather_payload=None):
    now=now or datetime.now(TZ)
    start=now.astimezone(TZ).replace(minute=0,second=0,microsecond=0)+timedelta(hours=1)
    future,weather_rows=align_future_weather(weather_payload,start)
    key=(start.isoformat(),tuple(map(tuple,future.tolist())) if future is not None else None)
    with _lock:
        if key in _cache:return _cache[key]
        saved=json.loads(PARAMS_PATH.read_text(encoding='utf-8'))
        roads=[]
        for road in ROADS:
            y,wx=synthetic_history(road,start,with_weather=True)
            conf=saved['roads'][road['id']]
            baseline=_forecast(y.to_numpy(),conf['baseline']['params'])
            coupled=None
            if future is not None:
                history_exog=exog(wx.temperature_c,wx.precipitation_mm)
                coupled=_forecast(y.to_numpy(),conf['weather_aware']['params'],history_exog,future)
            roads.append({
                'id':road['id'],'ar':road['ar'],'en':road['en'],'assumed_scale':road['assumed_scale'],
                'history':[int(v) for v in y.iloc[-168:].to_numpy()],
                'forecast':[int(round(v)) for v in (coupled if coupled is not None else baseline)],
                'baseline_forecast':[int(round(v)) for v in baseline],
                'weather_aware_forecast':[int(round(v)) for v in coupled] if coupled is not None else None,
                'evaluation':{'sarima':{k:conf['baseline'][k] for k in ('mae','rmse')},
                              'sarimax':{k:conf['weather_aware'][k] for k in ('mae','rmse')}},
                'mae_on_synthetic_holdout':conf['baseline']['mae'],
                'rmse_on_synthetic_holdout':conf['baseline']['rmse']
            })
        result={
            'forecast_start':start.isoformat(timespec='seconds'),
            'generated_at':now.astimezone(TZ).isoformat(timespec='seconds'),
            'hour_count':48,'road_count':len(roads),
            'data_type':'synthetic_assumptions_not_real_jazan_traffic',
            'scope':'Jazan City only, not Jazan Region',
            'model':'SARIMAX(1,0,0)(1,1,0,24) + synthetic historical rain/heat features' if future is not None else 'SARIMA(1,0,0)(1,1,0,24)',
            'traffic_weather_combined':future is not None,
            'weather_status':'linked_live_forecast' if future is not None else 'unavailable_baseline_only',
            'weather_hours':weather_rows,
            'evaluation_type':'rolling_one_hour_ahead_on_synthetic_holdout',
            'weather_inputs':['rainfall mm/h','degrees above 37°C'],
            'assumptions':{'rain_vehicles_per_mm_at_scale_500':RAIN_EFFECT,
                           'heat_vehicles_per_degree_above_37_at_scale_500':HEAT_EFFECT,
                           'historical_weather':'simulated, not measured in Jazan'},
            'references':{
                'jazan_city_profile':'https://unhabitat.org/jazan-city-profile',
                'traffic_monitoring':'https://www.fhwa.dot.gov/policyinformation/tmguide/tmg_2022/traffic-data-methodologies.cfm',
                'weather':'https://open-meteo.com/en/docs'},
            'warning':'المرور والطقس التاريخيان اصطناعيان. تحسن SARIMAX داخل المحاكاة لا يثبت دقة أو علاقة سببية على طرق جيزان.',
            'roads':roads
        }
        _cache.clear();_cache[key]=result
        return result

def _evaluate(y,end,params,hist_exog=None):
    model=SARIMAX(y,exog=hist_exog,order=ORDER,seasonal_order=SEASONAL_ORDER,
                 trend='n',enforce_stationarity=False,enforce_invertibility=False)
    p=np.asarray(model.filter(params).get_prediction(start=end,end=len(y)-1,dynamic=False).predicted_mean,dtype=float)
    p=np.maximum(0,p); true=y[end:]
    return round(float(np.mean(np.abs(p-true))),2),round(float(np.sqrt(np.mean((p-true)**2))),2)

def train_reference():
    """Run once OFFLINE. Train only on early 58 days, test on last 7 days."""
    reference=datetime(2026,10,1,13,tzinfo=TZ)
    out={'model':'SARIMA versus SARIMAX on synthetic historical traffic/weather',
         'reference_end':reference.isoformat(),'holdout_hours':168,'test_horizon_hours':1,
         'weather_features':['precipitation_mm','degrees_above_37_c'],
         'rain_effect_assumed':RAIN_EFFECT,'heat_effect_assumed':HEAT_EFFECT,
         'historical_weather_source':'synthetically generated; not observed Jazan weather','roads':{}}
    for road in ROADS:
        s,wx=synthetic_history(road,reference,days=65,with_weather=True)
        y=s.to_numpy();x=exog(wx.temperature_c,wx.precipitation_mm);cut=len(y)-168
        out['roads'][road['id']]={}
        for key,feature in [('baseline',None),('weather_aware',x)]:
            model=SARIMAX(y[:cut],exog=feature[:cut] if feature is not None else None,
                order=ORDER,seasonal_order=SEASONAL_ORDER,trend='n',
                enforce_stationarity=False,enforce_invertibility=False)
            fit=model.fit(maxiter=70,disp=False)
            params=[float(v) for v in fit.params]
            mae,rmse=_evaluate(y,cut,params,feature)
            out['roads'][road['id']][key]={'params':params,'mae':mae,'rmse':rmse,
                              'fit_converged':bool(fit.mle_retvals.get('converged',False))}
            print(road['id'],key,'MAE',mae,'RMSE',rmse,'converged',fit.mle_retvals.get('converged'),flush=True)
    PARAMS_PATH.write_text(json.dumps(out,indent=2,ensure_ascii=False),encoding='utf-8')
    return out

if __name__=='__main__':
    import sys
    if '--train' in sys.argv:train_reference()
    else:print(json.dumps(current_simulation(),ensure_ascii=False)[:450])
