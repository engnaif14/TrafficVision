"""TrafficVision: historical I-94 traffic forecasting demo + independent live weather forecasts.
No current Jazan traffic feed is claimed. WSGI entrypoint app:application.
"""
from __future__ import annotations
import json, os, re, threading, time
from datetime import datetime, timedelta
from pathlib import Path
from urllib.parse import urlencode, parse_qs
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo
import numpy as np
import pandas as pd
from statsmodels.tsa.statespace.sarimax import SARIMAX
from jazan_model import current_simulation

ROOT=Path(__file__).resolve().parent
METADATA=json.loads((ROOT/'data/replay_metadata.json').read_text(encoding='utf-8'))
REPLAY=pd.read_csv(ROOT/'data/replay_predictions.csv')
HISTORY=pd.read_csv(ROOT/'data/cleaned_hourly.csv',parse_dates=['date_time']).set_index('date_time').sort_index()
SITES={
 'jazan':{'name':'جازان','name_en':'Jazan, Saudi Arabia','lat':16.8892,'lon':42.5611,'timezone':'Asia/Riyadh'},
 'minneapolis':{'name':'مينيسوتا','name_en':'Minneapolis, Minnesota','lat':44.9587,'lon':-93.1915,'timezone':'America/Chicago'}
}
WEATHER_CACHE={}; LOCK=threading.Lock()

def respond(start,body,status='200 OK'):
 data=json.dumps(body,ensure_ascii=False,allow_nan=False,default=str).encode('utf-8')
 start(status,[('Content-Type','application/json; charset=utf-8'),('Content-Length',str(len(data))),('Cache-Control','no-store'),('X-Content-Type-Options','nosniff')]);return [data]
def send_file(start,path,mime):
 if not path.is_file():return respond(start,{'error':'Not found'},'404 Not Found')
 data=path.read_bytes();start('200 OK',[('Content-Type',mime),('Content-Length',str(len(data))),('X-Content-Type-Options','nosniff')]);return [data]
def weather_description(c):
 if c==0:return 'صحو'
 if c in (1,2,3):return 'غيوم'
 if c in (45,48):return 'ضباب'
 if c in (51,53,55,56,57):return 'رذاذ'
 if c in (61,63,65,66,67,80,81,82):return 'أمطار'
 if c in (71,73,75,77,85,86):return 'ثلوج'
 if c in (95,96,99):return 'عواصف رعدية'
 return 'متقلب'
def weather_for(city):
 if city not in SITES:raise ValueError('الموقع غير معروف')
 with LOCK:
  cached=WEATHER_CACHE.get(city)
  if cached and time.time()-cached[0]<900:return cached[1]
 place=SITES[city]
 params={'latitude':place['lat'],'longitude':place['lon'],'timezone':place['timezone'],'forecast_days':3,'hourly':'temperature_2m,apparent_temperature,precipitation_probability,precipitation,cloud_cover,weather_code,relative_humidity_2m,wind_speed_10m'}
 req=Request('https://api.open-meteo.com/v1/forecast?'+urlencode(params),headers={'User-Agent':'TrafficVision Academic Demo/2.0','Accept':'application/json'})
 with urlopen(req,timeout=12) as f:raw=json.load(f)
 h=raw['hourly'];now=datetime.now(ZoneInfo(place['timezone'])).replace(tzinfo=None)
 start=now.replace(minute=0,second=0,microsecond=0)+timedelta(hours=1)
 rows=[]
 for i,t in enumerate(h['time']):
  ts=datetime.fromisoformat(t)
  if ts<start:continue
  code=int(h['weather_code'][i] or 0)
  rows.append({'time':t,'temperature_c':h['temperature_2m'][i],'feels_like_c':h['apparent_temperature'][i],'precipitation_mm':h['precipitation'][i],'precipitation_probability':h['precipitation_probability'][i],'cloud_cover':h['cloud_cover'][i],'humidity':h['relative_humidity_2m'][i],'wind_kmh':h['wind_speed_10m'][i],'weather_code':code,'description':weather_description(code)})
  if len(rows)==48:break
 if not rows:raise RuntimeError('لم يتم توفير توقعات الطقس القادمة')
 result={'city':city,'location':place,'source':'Open-Meteo forecast API','updated_at':datetime.now(ZoneInfo(place['timezone'])).isoformat(timespec='seconds'),'hours':rows,'note':'توقعات جوية لساعات مستقبلية وليست قياسات أرصاد مرصودة'}
 with LOCK:WEATHER_CACHE[city]=(time.time(),result)
 return result

def traffic_day(day):
 if not re.fullmatch(r'2018-09-\d{2}',day):raise ValueError('اختر يومًا من سبتمبر 2018')
 try:datetime.strptime(day,'%Y-%m-%d')
 except ValueError:raise ValueError('التاريخ غير صحيح')
 d=REPLAY[REPLAY.date_time.str.startswith(day)]
 if d.empty:raise ValueError('لا توجد بيانات لهذا اليوم')
 rows=[{'time':r.date_time,'predicted':int(r.predicted_volume),'actual':int(r.actual_volume),'error':int(r.absolute_error)} for r in d.itertuples(index=False)]
 mae=sum(r['error'] for r in rows)/len(rows)
 return {'date':day,'source':'UCI I-94 westbound, historical replay','hours':rows,'mae_for_day':round(mae,1),'count':len(rows),'warning':'هذا اختبار تنبؤ لساعات سبتمبر 2018 باستخدام قراءة الساعات السابقة، وليس تنبؤًا لحركة مرور جازان أو لحظة اليوم'}

def test_sample(when):
 if not re.fullmatch(r'2018-09-\d{2}T\d{2}:00',when):raise ValueError('اختر ساعة من سبتمبر 2018 بالصيغة الصحيحة')
 d=REPLAY[REPLAY.date_time==when]
 if d.empty:raise ValueError('العينة غير موجودة في بيانات الاختبار')
 r=d.iloc[0];ts=pd.Timestamp(when)
 source=HISTORY.loc[ts] if ts in HISTORY.index else None
 return {'time':when,'predicted_volume':int(r.predicted_volume),'actual_volume':int(r.actual_volume),'absolute_error':int(r.absolute_error),'temperature_c':round(float(source.temperature_c),1) if source is not None else None,'weather_main':str(source.weather_main) if source is not None else None,'reference':'سجل تاريخي حقيقي + توقع اختباري محفوظ','validated_for_jazan':False}

def examples():
 rows=[]
 for s in ['2018-09-03T08:00','2018-09-07T17:00','2018-09-12T12:00','2018-09-15T20:00','2018-09-20T07:00','2018-09-25T16:00','2018-09-30T21:00']:
  try:rows.append(test_sample(s))
  except ValueError:pass
 return rows

def manual_forecast(readings):
 if not isinstance(readings,list) or not 72<=len(readings)<=1000:raise ValueError('أدخل من 72 إلى 1000 قراءة مرور متتابعة بالساعة')
 try:a=np.asarray(readings,dtype=float)
 except (TypeError,ValueError):raise ValueError('يجب أن تكون جميع قراءات المرور أرقامًا')
 if (not np.isfinite(a).all()) or (a<0).any() or (a>100000).any():raise ValueError('القيم يجب أن تكون من 0 إلى 100000، دون فراغات')
 model=SARIMAX(a,order=tuple(METADATA['order']),seasonal_order=tuple(METADATA['seasonal_order']),trend='c',enforce_stationarity=False,enforce_invertibility=False)
 ps=list(METADATA['params'].values())
 fitted=model.filter(ps)
 estimate=float(fitted.forecast(steps=1)[0])
 if not np.isfinite(estimate):raise ValueError('تعذر حساب توقع مستقر لهذه القراءات')
 return {'predicted_next_hour':round(max(0,estimate)),'input_hours':len(a),'source':'قراءات مستخدم يدويًا + معاملات تقديرية مستمدة من بيانات I-94','warning':'هذا اختبار مدخلات جديد. دون معايرة محلية لا يثبت الدقة في جازان أو أي طريق آخر؛ الطقس معروض بشكل مستقل.'}

def application(environ,start):
 method=environ.get('REQUEST_METHOD','GET').upper();path=environ.get('PATH_INFO','/')
 try:
  if method=='GET' and path=='/':return send_file(start,ROOT/'index.html','text/html; charset=utf-8')
  if method=='GET' and path.startswith('/static/'):
   file=(ROOT/'static'/path[len('/static/'):]).resolve()
   if (ROOT/'static').resolve() not in file.parents:return respond(start,{'error':'Invalid path'},'403 Forbidden')
   ext=file.suffix;return send_file(start,file,{'.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.csv':'text/csv; charset=utf-8'}.get(ext,'application/octet-stream'))
  if method=='GET' and path=='/jazan_city_simulation.html':
   # Link to the integrated city-specific section, not a stale exported snapshot.
   start('302 Found',[('Location','/#jazan'),('Content-Length','0'),('Cache-Control','no-store')]);return [b'']
  if method=='GET' and path=='/api/jazan':return respond(start,current_simulation())
  if method=='GET' and path=='/api/health':return respond(start,{'ok':True,'historical_replay_rows':len(REPLAY),'weather_provider':'Open-Meteo','jazan_simulation':'synthetic_data_only','version':'3.0'})
  if method=='GET' and path=='/api/about':return respond(start,{'data':{k:v for k,v in METADATA.items() if k!='params'},'locations':SITES})
  if method=='GET' and path=='/api/traffic':
   q=parse_qs(environ.get('QUERY_STRING',''));return respond(start,traffic_day(q.get('date',['2018-09-30'])[0]))
  if method=='GET' and path=='/api/sample':
   q=parse_qs(environ.get('QUERY_STRING',''));return respond(start,test_sample(q.get('time',['2018-09-30T17:00'])[0]))
  if method=='GET' and path=='/api/examples':return respond(start,{'samples':examples()})
  if method=='GET' and path=='/api/demo-series':
   z=HISTORY.loc['2018-09-20':'2018-09-23'].traffic_volume.tail(72)
   return respond(start,{'readings':[int(v) for v in z.tolist()],'first_time':str(z.index[0]),'last_time':str(z.index[-1]),'region':'I-94 Minnesota'})
  if method=='GET' and path=='/api/weather':
   q=parse_qs(environ.get('QUERY_STRING',''));city=q.get('city',['jazan'])[0]
   if city not in SITES:raise ValueError('المدينة غير متاحة')
   try:return respond(start,weather_for(city))
   except Exception:return respond(start,{'error':'تعذر جلب توقعات الطقس من المصدر الآن. لا يتم عرض بيانات وهمية.'},'503 Service Unavailable')
  if method=='POST' and path=='/api/manual':
   content_length=int(environ.get('CONTENT_LENGTH') or 0)
   if not 0<content_length<30000:return respond(start,{'error':'حجم الملف أو البيانات غير مقبول'},'413 Payload Too Large')
   try:body=json.loads(environ['wsgi.input'].read(content_length))
   except (ValueError,UnicodeDecodeError):raise ValueError('صيغة JSON غير صحيحة')
   return respond(start,manual_forecast(body.get('readings') if isinstance(body,dict) else None))
  return respond(start,{'error':'Not found'},'404 Not Found')
 except (ValueError,TypeError) as e:return respond(start,{'error':str(e)},'400 Bad Request')
 except Exception:return respond(start,{'error':'خطأ غير متوقع في الخادم'},'500 Internal Server Error')

if __name__=='__main__':
 from wsgiref.simple_server import make_server
 port=int(os.environ.get('PORT','8000')); print(f'Open http://localhost:{port}',flush=True)
 with make_server('0.0.0.0',port,application) as server:server.serve_forever()
