'use strict';
const $=id=>document.getElementById(id), all=(q)=>document.querySelectorAll(q);
const fmt=n=>Math.round(Number(n)).toLocaleString('en-US');
const decimal=n=>Number(n).toLocaleString('en-US',{maximumFractionDigits:1});
const state={weather:null,traffic:null,jazan:null,jazanWeather:null,metadata:null,day:'2018-09-30'};
const weatherIcon=code=>code===0?'☀️':[1,2,3].includes(code)?'🌤️':[45,48].includes(code)?'🌫️':[51,53,55,56,57].includes(code)?'🌦️':[61,63,65,66,67,80,81,82].includes(code)?'🌧️':[71,73,75,77,85,86].includes(code)?'❄️':[95,96,99].includes(code)?'⛈️':'☁️';
function toast(message){const box=$('toast');box.textContent=message;box.classList.add('show');clearTimeout(toast.timeout);toast.timeout=setTimeout(()=>box.classList.remove('show'),4200)}
function show(name){all('.screen').forEach(x=>x.classList.toggle('active',x.id===name));all('.nav').forEach(x=>x.classList.toggle('active',x.dataset.screen===name));$('sidebar').classList.remove('open');$('headerName').textContent=({overview:'لوحة المتابعة',history:'حركة المرور التاريخية',lab:'اختبار عينة',jazan:'محاكاة مدينة جيزان',sources:'شرح المنصة والمصادر'})[name];history.replaceState(null,'','#'+name);scrollTo({top:0,behavior:'smooth'});if(name==='jazan'&&!state.jazan)loadJazan();if(name==='history'&&state.traffic)chart('traffic-chart',state.traffic.hours,true)}
async function api(url,opts){const response=await fetch(url,opts);const data=await response.json().catch(()=>({error:'تعذر قراءة رد الخادم'}));if(!response.ok)throw Error(data.error||'تعذر الاتصال بالخادم');return data}
function chart(svgId,points,full){const root=$(svgId);if(!points?.length){root.innerHTML='<div class="loader">لا توجد بيانات</div>';return}const w=850,h=full?330:230,l=48,r=12,t=18,b=36;
 const values=points.flatMap(p=>[p.predicted,p.actual]);const ymax=Math.ceil(Math.max(...values,500)/1000)*1000;const x=i=>l+i*(w-l-r)/(points.length-1),y=v=>t+(ymax-v)*(h-t-b)/ymax;
 let grid='',ticks='';for(let j=0;j<=4;j++){const yy=t+(h-t-b)*j/4;grid+=`<line class="gridline" x1="${l}" y1="${yy}" x2="${w-r}" y2="${yy}"/>`;ticks+=`<text class="axistext" x="${l-9}" y="${yy+4}" text-anchor="end">${fmt(ymax*(4-j)/4)}</text>`}
 for(let i=0;i<points.length;i+=4){ticks+=`<text class="axistext" x="${x(i)}" y="${h-10}" text-anchor="middle">${points[i].time.slice(11,16)}</text>`}
 const path=key=>points.map((p,i)=>`${i?'L':'M'} ${x(i).toFixed(1)} ${y(p[key]).toFixed(1)}`).join(' ');
 const predicted=path('predicted'),actual=path('actual');const area=predicted+` L ${x(points.length-1)} ${h-b} L ${l} ${h-b} Z`;
 root.innerHTML=`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="مقارنة توقع عدد المركبات مع القياس الفعلي على مدار اليوم" preserveAspectRatio="none">${grid}${ticks}<path class="area-traffic" d="${area}"/><path class="line-pred" d="${predicted}"/><path class="line-actual" d="${actual}"/></svg>`;}
async function loadTraffic(day){try{const response=await api('/api/traffic?date='+encodeURIComponent(day));state.traffic=response;state.day=day;$('traffic-date').value=day;const hours=response.hours;const sum=field=>hours.reduce((a,r)=>a+r[field],0);
 $('kpi-traffic').textContent=fmt(hours.at(-1).predicted);$('kpi-traffic-time').textContent=hours.at(-1).time.slice(0,16).replace('T',' / ');
 $('day-actual').textContent=fmt(sum('actual'));$('day-forecast').textContent=fmt(sum('predicted'));$('day-error').textContent=decimal(response.mae_for_day);
 chart('overview-chart',hours,false);chart('traffic-chart',hours,true);
 $('traffic-rows').innerHTML=hours.map(r=>`<tr><td class="numeric">${r.time.slice(11)}</td><td class="numeric">${fmt(r.predicted)}</td><td class="numeric">${fmt(r.actual)}</td><td class="numeric">${fmt(r.error)}</td><td><button class="small-button" data-sample="${r.time}">اختبر</button></td></tr>`).join('');
 all('[data-sample]').forEach(button=>button.addEventListener('click',()=>{$('sample-time').value=button.dataset.sample;show('lab');testSample()}));
 }catch(err){toast(err.message);$('overview-chart').textContent='تعذر تحميل بيانات المرور';$('traffic-chart').textContent='تعذر تحميل بيانات المرور'}}
function updateMap(city){const places={jazan:{lat:16.8892,lon:42.5611,title:'جازان · موقع معاينة الطقس'},minneapolis:{lat:44.9587,lon:-93.1915,title:'مينيسوتا · موقع معاينة الطقس'}};const v=places[city];$('map-link').href=`https://www.google.com/maps/search/?api=1&query=${v.lat}%2C${v.lon}`;$('map-region').textContent=v.title;$('map-frame').src=`https://www.openstreetmap.org/export/embed.html?bbox=${v.lon-.08}%2C${v.lat-.05}%2C${v.lon+.08}%2C${v.lat+.05}&layer=mapnik&marker=${v.lat}%2C${v.lon}`;}
function weatherRow(row,i){const time=row.time.slice(11,16),day=row.time.slice(5,10);return `<div class="weather-row"><span class="time">${i===0?'القادمة':time}</span><span class="emoji">${weatherIcon(row.weather_code)}</span><span class="desc">${row.description}<small style="display:block;font-size:9px;color:#93a5af;font-weight:400;direction:ltr;text-align:right">${day} · ${time}</small></span><span class="temp">${decimal(row.temperature_c)}°</span><span class="rainchance">☂ ${row.precipitation_probability??'—'}%</span></div>`}
async function loadWeather(){const city=$('city').value;updateMap(city);$('weather-status').classList.remove('error');$('weather-status').textContent='جارٍ طلب توقعات الطقس من المصدر...';$('side-weather').textContent='جاري الاتصال';try{const data=await api('/api/weather?city='+encodeURIComponent(city));if(city!==$('city').value)return;state.weather=data;const first=data.hours[0];$('side-weather').textContent='متصل';$('kpi-temp').innerHTML=`${decimal(first.temperature_c)}<sup>°C</sup>`;$('kpi-rain').innerHTML=`${fmt(first.precipitation_probability??0)}<sup>%</sup>`;$('kpi-weather-desc').textContent=first.description;$('kpi-weather-hour').textContent=first.time.replace('T',' · ');$('weather-status').textContent=`بيانات متوقعة لـ ${data.location.name} · ${first.time.replace('T',' ')}`;$('weather-update').textContent='تحديث المصدر: '+data.updated_at.slice(11,16);$('weather-list').innerHTML=data.hours.slice(0,7).map(weatherRow).join('')}catch(err){state.weather=null;$('side-weather').textContent='غير متصل';$('kpi-temp').innerHTML='—<sup>°C</sup>';$('kpi-rain').innerHTML='—<sup>%</sup>';$('kpi-weather-desc').textContent='الطقس غير متاح مؤقتًا';$('kpi-weather-hour').textContent='—';$('weather-status').classList.add('error');$('weather-status').textContent=err.message;$('weather-list').innerHTML='<div class="loader">لا نعرض بيانات طقس تقديرية محليًا عند انقطاع مصدر الأرصاد. جرب زر التحديث.</div>'}}
async function loadAbout(){try{const data=await api('/api/about');state.metadata=data.data;$('test-count').textContent=fmt(data.data.test_observed_hours);$('test-mae').textContent=decimal(data.data.mae)+' مركبة/ساعة';$('test-rmse').textContent=decimal(data.data.rmse)+' مركبة/ساعة'}catch(e){toast(e.message)}}
async function loadExamples(){try{const d=await api('/api/examples');$('sample-presets').innerHTML='<option value="">اختر عينة...</option>'+d.samples.map(s=>`<option value="${s.time}">${s.time.replace('T',' ')} · ${fmt(s.actual_volume)} مركبة</option>`).join('')}catch(e){toast(e.message)}}
async function testSample(){const when=$('sample-time').value;if(!when){toast('اختر توقيتًا صحيحًا');return}const out=$('sample-result');out.className='result-empty';out.textContent='يتم حساب مقارنة العينة...';try{const r=await api('/api/sample?time='+encodeURIComponent(when));out.className='result-box';out.innerHTML=`<span>التوقع التاريخي · ${r.time.replace('T',' ')}</span><strong>${fmt(r.predicted_volume)} <small style="font-size:13px">مركبة/ساعة</small></strong><p>القراءة الفعلية: <b>${fmt(r.actual_volume)}</b> · الفرق: <b>${fmt(r.absolute_error)}</b> مركبة</p><p>الطقس المسجل في العينة: ${r.temperature_c??'—'}°C · ${r.weather_main??'—'}</p>`}catch(err){out.className='result-empty';out.textContent=err.message}}
async function fillDemo(silent=false){try{const d=await api('/api/demo-series');$('manual-readings').value=d.readings.join('\n');if(!silent)toast('تم تعبئة '+d.readings.length+' قراءة حقيقية متتالية من I‑94')}catch(err){toast(err.message)}}
async function runManual(){const out=$('manual-result');try{const vals=$('manual-readings').value.trim().split(/[\s,;]+/).filter(Boolean).map(x=>{if(x.trim()===''||!Number.isFinite(Number(x)))throw Error('قراءة غير رقمية: '+x);return Number(x)});out.className='result-empty';out.textContent='جاري معالجة السلسلة...';const r=await api('/api/manual',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({readings:vals})});out.className='result-box';out.innerHTML=`<span>توقع الساعة التالية لـ ${fmt(r.input_hours)} قراءة مستخدمة</span><strong>${fmt(r.predicted_next_hour)} <small style="font-size:13px">مركبة/ساعة</small></strong><p>${r.warning}</p>`}catch(err){out.className='result-empty';out.textContent=err.message;toast(err.message)}}
function csvDay(){if(!state.traffic)return;const rows=state.traffic.hours;const csv=['date_time,predicted_volume,actual_volume,absolute_error',...rows.map(x=>`${x.time},${x.predicted},${x.actual},${x.error}`)].join('\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='TrafficVision_I94_'+state.day+'.csv';a.click();URL.revokeObjectURL(url)}
async function csvUpload(file){if(!file)return;if(file.size>80000){toast('CSV كبير جدًا؛ الحد 80 كيلوبايت');return}const txt=await file.text();const lines=txt.replace(/^\uFEFF/,'').trim().split(/\r?\n/).map(x=>x.trim()).filter(Boolean);if(!lines.length){toast('الملف فارغ');return}const header=lines[0].split(',').map(s=>s.replace(/"/g,'').trim().toLowerCase());const idx=header.indexOf('traffic_volume');const start=idx>=0?1:0;const col=idx>=0?idx:0;const values=lines.slice(start).map(x=>x.split(',')[col].replace(/"/g,'').trim()).filter(x=>x!=='');$('manual-readings').value=values.join('\n');toast('تم تحميل '+values.length+' قراءة من CSV. راجع عدد القراءات ثم ابدأ الاختبار.')}

const jzFmtTime=(iso)=>new Intl.DateTimeFormat('ar-SA-u-nu-latn',{timeZone:'Asia/Riyadh',weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(iso));
function jzIsoHour(start,offset){return new Date(new Date(start).getTime()+offset*3600000).toISOString()}
async function loadJazan(){
  $('jazan-status').textContent='جاري تحديث محاكاة الساعات القادمة...';
  try{
    const data=await api('/api/jazan');state.jazan=data;
    $('jazan-road').innerHTML=data.roads.map((r,i)=>`<option value="${i}">${r.ar}</option>`).join('');
    $('jazan-status').textContent='بيانات مرور محاكية · توقع للساعات الـ48 القادمة';
    renderJazan();
    // Read official weather from our existing API, not from generated traffic numbers.
    try{const wx=await api('/api/weather?city=jazan');state.jazanWeather=wx;renderJazanWeather()}
    catch(e){state.jazanWeather=null;renderJazanWeather()}
  }catch(err){$('jazan-status').textContent='تعذر توليد المحاكاة: '+err.message;toast(err.message)}
}
function renderJazanWeather(){
 const data=state.jazan,weather=state.jazanWeather;if(!data)return;
 if(!weather){$('jazan-weather').textContent='غير متاح';$('jazan-weather-note').textContent='تعذر الاتصال بمصدر الطقس؛ لا نضع بيانات افتراضية';return}
 const index=+$('jazan-hour').value;
 const targetMs=new Date(data.forecast_start).getTime()+index*3600000;
 const item=weather.hours.find(w=>Math.abs(Date.parse(w.time+'+03:00')-targetMs)<60000);
 $('jazan-weather').textContent=item?decimal(item.temperature_c)+'°C · '+item.description:'غير متاح';
 $('jazan-weather-note').textContent=item?'توقع Open-Meteo · مستقل عن مرور المحاكاة':'لا تتوفر بيانات طقس للساعة المختارة';
}
function renderJazan(){
 const d=state.jazan;if(!d)return;
 const r=d.roads[+$('jazan-road').value||0];if(!r)return;
 const i=+$('jazan-hour').value||0;
 $('jazan-volume').textContent=fmt(r.forecast[i]);
 $('jazan-time').textContent=jzFmtTime(jzIsoHour(d.forecast_start,i));
 $('jazan-hour-count').textContent=(i+1)+' / 48';
 $('jazan-metrics').innerHTML=`على بيانات اختبار <strong>اصطناعية فقط</strong>: MAE = <b>${decimal(r.mae_on_synthetic_holdout)}</b>، RMSE = <b>${decimal(r.rmse_on_synthetic_holdout)}</b> مركبة/ساعة.`;
 const svg=$('jazan-chart'),W=780,H=285,L=48,R=18,T=22,B=40;
 const max=Math.max(100,...r.forecast)*1.16,x=k=>L+k*(W-L-R)/47,y=v=>T+(1-v/max)*(H-T-B);
 let parts='';for(let k=0;k<5;k++){let v=max*k/4;parts+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="#e4ebeb"/><text x="${L-8}" y="${y(v)+4}" text-anchor="end" fill="#647681" font-size="12">${fmt(v)}</text>`;}
 for(let k=0;k<48;k+=8){parts+=`<text x="${x(k)}" y="${H-10}" text-anchor="middle" fill="#647681" font-size="12">${new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Riyadh',hour:'2-digit',hour12:false}).format(new Date(jzIsoHour(d.forecast_start,k)))}</text>`;}
 let path=r.forecast.map((v,k)=>`${k?'L':'M'}${x(k).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
 parts+=`<path d="${path}" fill="none" stroke="#0b857f" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"/>`;
 parts+=`<line x1="${x(i)}" x2="${x(i)}" y1="${T}" y2="${H-B}" stroke="#7d9694" stroke-width="1.5" stroke-dasharray="4 5"/><circle cx="${x(i)}" cy="${y(r.forecast[i])}" r="6" fill="#0b857f" stroke="white" stroke-width="2.5"/>`;
 svg.innerHTML=parts;
 renderJazanWeather();
}
function pickJazanHour(e){if(!state.jazan)return;const box=e.currentTarget.getBoundingClientRect();const pos=(e.clientX-box.left)/box.width*780;let k=Math.round((pos-48)/(780-48-18)*47);$('jazan-hour').value=Math.max(0,Math.min(47,k));renderJazan()}

function setup(){const now=new Date();$('clock').textContent=new Intl.DateTimeFormat('ar-SA',{timeZone:'Asia/Riyadh',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(now);$('menuButton').addEventListener('click',()=>$('sidebar').classList.toggle('open'));all('[data-screen]').forEach(btn=>btn.addEventListener('click',()=>show(btn.dataset.screen)));all('[data-go]').forEach(btn=>btn.addEventListener('click',()=>show(btn.dataset.go)));$('city').addEventListener('change',loadWeather);$('refresh').addEventListener('click',loadWeather);$('load-date').addEventListener('click',()=>loadTraffic($('traffic-date').value));$('download-day').addEventListener('click',csvDay);$('sample-presets').addEventListener('change',e=>{if(e.target.value){$('sample-time').value=e.target.value;testSample()}});$('sample-form').addEventListener('submit',e=>{e.preventDefault();testSample()});$('fill-demo').addEventListener('click',fillDemo);$('manual-run').addEventListener('click',runManual);$('upload-csv').addEventListener('change',e=>csvUpload(e.target.files[0]).catch(err=>toast(err.message)));$('jazan-road').addEventListener('change',renderJazan);$('jazan-hour').addEventListener('input',renderJazan);$('jazan-chart').addEventListener('click',pickJazanHour);show(['overview','history','lab','jazan','sources'].includes(location.hash.slice(1))?location.hash.slice(1):'overview');loadWeather();loadTraffic('2018-09-30');loadAbout();loadExamples();fillDemo(true)}
document.addEventListener('DOMContentLoaded',setup);
