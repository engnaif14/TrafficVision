import io, unittest, json
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from wsgiref.util import setup_testing_defaults
import app
from jazan_model import current_simulation, ROADS

class JazanTests(unittest.TestCase):
 def request(self,route):
  env={};setup_testing_defaults(env);env['PATH_INFO']=route;env['REQUEST_METHOD']='GET'
  records=[];body=b''.join(app.application(env,lambda s,h:records.append((s,h))))
  return records[0][0],records[0][1],body
 def test_jazan_api(self):
  code,headers,body=self.request('/api/jazan')
  self.assertEqual(code,'200 OK')
  data=json.loads(body)
  self.assertEqual(data['road_count'],3)
  self.assertEqual(data['hour_count'],48)
  self.assertFalse(data['traffic_weather_combined'])
  self.assertIn('Jazan City',data['scope'])
  for road in data['roads']:
   self.assertEqual(len(road['forecast']),48)
   self.assertEqual(len(road['history']),168)
   self.assertGreaterEqual(min(road['forecast']),0)
   self.assertGreater(road['mae_on_synthetic_holdout'],0)
   self.assertGreater(road['rmse_on_synthetic_holdout'],0)
 def test_new_hour_updates(self):
  base=datetime(2026,11,2,19,12,tzinfo=ZoneInfo('Asia/Riyadh'))
  d1=current_simulation(base)
  d2=current_simulation(base+timedelta(hours=1))
  self.assertNotEqual(d1['forecast_start'],d2['forecast_start'])
 def test_legacy_addon_route(self):
  status,headers,body=self.request('/jazan_city_simulation.html')
  self.assertEqual(status,'302 Found')
  self.assertEqual(dict(headers)['Location'],'/#jazan')
 def test_main_page_contains_city_tab(self):
  status,headers,body=self.request('/')
  self.assertEqual(status,'200 OK')
  self.assertIn(b'data-screen="jazan"',body)
  self.assertIn(b'id="jazan-chart"',body)
 def test_static_assets(self):
  for file in ['/static/app.js','/static/style.css']:
   status,headers,body=self.request(file)
   self.assertEqual(status,'200 OK')
   self.assertGreater(len(body),10000)
 def test_static_traversal_blocked(self):
  code,headers,body=self.request('/static/../../app.py')
  self.assertEqual(code,'403 Forbidden')
