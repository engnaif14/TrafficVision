import io,json,unittest
from wsgiref.util import setup_testing_defaults
import app
class AppTests(unittest.TestCase):
 def call(self,path,method='GET',data=None,query=''):
  environ={};setup_testing_defaults(environ);environ['PATH_INFO']=path;environ['QUERY_STRING']=query;environ['REQUEST_METHOD']=method
  if data is not None:
   raw=json.dumps(data).encode('utf-8');environ['CONTENT_LENGTH']=str(len(raw));environ['wsgi.input']=io.BytesIO(raw)
  statuses=[];out=b''.join(app.application(environ,lambda s,h:statuses.append(s)))
  return int(statuses[0][:3]),json.loads(out)
 def test_health(self):
  code,r=self.call('/api/health');self.assertEqual(code,200);self.assertEqual(r['historical_replay_rows'],720)
 def test_traffic_day(self):
  code,r=self.call('/api/traffic',query='date=2018-09-30');self.assertEqual(code,200);self.assertEqual(r['count'],24);self.assertEqual(r['hours'][-1]['time'],'2018-09-30T23:00');self.assertIn('سبتمبر 2018',r['warning'])
 def test_source_scope(self):
  code,r=self.call('/api/about');self.assertEqual(code,200);self.assertEqual(r['data']['model_family'],'SARIMA');self.assertIn('Minnesota',r['data']['traffic_region']);self.assertGreater(r['data']['mae'],0)
 def test_invalid_historical_date(self):
  code,r=self.call('/api/traffic',query='date=2026-11-02');self.assertEqual(code,400)
 def test_single_sample(self):
  code,r=self.call('/api/sample',query='time=2018-09-30T17%3A00');self.assertEqual(code,200);self.assertEqual(r['actual_volume'],4132);self.assertEqual(r['absolute_error'],abs(r['actual_volume']-r['predicted_volume']));self.assertFalse(r['validated_for_jazan'])
 def test_examples(self):
  code,r=self.call('/api/examples');self.assertEqual(code,200);self.assertGreater(len(r['samples']),5)
 def test_history_sample_series(self):
  code,r=self.call('/api/demo-series');self.assertEqual(code,200);self.assertEqual(len(r['readings']),72)
 def test_manual_replay(self):
  _,d=self.call('/api/demo-series');code,r=self.call('/api/manual','POST',{'readings':d['readings']});self.assertEqual(code,200);self.assertGreaterEqual(r['predicted_next_hour'],0)
 def test_manual_invalid_size(self):
  code,r=self.call('/api/manual','POST',{'readings':[100]*24});self.assertEqual(code,400)
 def test_manual_invalid_value(self):
  code,r=self.call('/api/manual','POST',{'readings':[100]*71+[-1]});self.assertEqual(code,400)
 def test_weather_invalid_city(self):
  code,r=self.call('/api/weather',query='city=xxx');self.assertEqual(code,400)
 def test_weather_api_failure_not_mocked(self):
  from unittest.mock import patch
  with patch.object(app,'weather_for',side_effect=OSError('unavailable')):
   code,r=self.call('/api/weather',query='city=jazan')
  self.assertEqual(code,503);self.assertIn('لا يتم عرض بيانات وهمية',r['error'])
 def test_weather_code(self):
  self.assertEqual(app.weather_description(65),'أمطار');self.assertEqual(app.weather_description(95),'عواصف رعدية')
if __name__=='__main__':unittest.main()
