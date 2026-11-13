// MASAR experience: named experiments, comparable windows, reports and provenance.
Object.assign(labels, {
tagline:['نفهم حركة المرور اليوم، ونستكشف احتمالات الغد.','Understand traffic today. Explore tomorrow’s possibilities.'],
explore:['ابدأ استكشاف حركة المرور','Start exploring traffic'],choosePath:['اختر أحد المسارات للبدء','Choose your starting point'],
launchSim:['محاكاة سيناريو مروري','Simulate a traffic scenario'],launchSimNote:['اختر الطريق والوقت واستكشف أثر التغييرات.','Choose a road and time. Explore the impact.'],
launchLab:['تحليل بيانات حركة المرور','Analyze traffic data'],launchLabNote:['ارفع ملفك وقيّم توقع الساعة التالية.','Upload your file and evaluate the next-hour forecast.'],
launchResults:['استعراض النتائج والمؤشرات','Explore results and indicators'],launchResultsNote:['احفظ تجاربك وقارنها وصدّر تقريرك.','Save experiments, compare outcomes and export a report.'],
present:['وضع العرض','Presentation mode'],exitPresent:['إنهاء العرض · Esc','Exit presentation · Esc'],
studyStep:['٤ · قرّر وشارك','4 · Decide and share'],studyTitle:['تجاربك ومقارنة السيناريوهات','Experiments and scenario comparison'],studyIntro:['قارن حتى 6 تجارب على نفس المقطع والفترة. الأرقام من حسابات المحاكاة.','Compare up to 6 experiments on the same road and time window, using simulation results.'],
report:['تصدير تقرير PDF','Export PDF report'],studyName:['اسم التجربة','Experiment name'],saveStudy:['احفظ السيناريو الحالي','Save current scenario'],demoStudies:['جرّب مقارنة توضيحية','Try an example comparison'],
localNotice:['تُحفظ التجارب في هذا المتصفح على جهازك. تصدير التقرير يحفظ نسخة قابلة للمشاركة.','Experiments are stored in this browser on this device. Export a report to keep a shareable copy.'],
noStudies:['لا توجد تجارب محفوظة. طبّق سيناريو ثم احفظه، أو ابدأ بالمثال التوضيحي.','No saved experiments. Apply and save a scenario, or try the example.'],
needScenario:['طبّق سيناريو أولًا من «ماذا لو؟».','Apply a What if? scenario first.'],saved:['تم حفظ التجربة.','Experiment saved.'],incompatible:['للمقارنة العادلة، استخدم نفس المقطع والبداية والمدة للتجارب المحددة.','For a fair comparison, select experiments with the same road, start and duration.'],
limitStudies:['يمكن حفظ 12 تجربة ومقارنة 6 في المرة الواحدة.','Save up to 12 experiments and compare 6 at a time.'],loadStudy:['تحميل وتعديل','Load and edit'],deleteStudy:['حذف','Delete'],compareStudy:['تضمين في المقارنة','Include in comparison'],
assistantTitle:['اسأل مسار عن النتائج','Ask MASAR about results'],askImpact:['ما التجربة الأكثر ضغطًا؟','Which experiment has the highest load?'],askReason:['ما سبب التأثير؟','What explains the impact?'],askSource:['من أين جاءت الأرقام؟','Where do the numbers come from?'],
dataTitle:['البيانات والنموذج وسجل التجارب','Data, model and experiment history'],
sourceAnswer:['الخريطة من OpenStreetMap. الطلب المروري والتوزيع والسعات افتراضية. SARIMAX بمعاملات محفوظة؛ يتم تجهيز نافذة حديثة على الخادم. يستخدم الطقس من Open-Meteo عند توفر ساعات مطابقة، وما عداه افتراضي. لا توجد معايرة أو دقة مثبتة لطرق جيزان، ولا فترات ثقة محسوبة لهذه المحاكاة.','Map: OpenStreetMap. Traffic demand, allocation and capacities are illustrative. SARIMAX uses saved parameters; the server prepares a current forecast window. Matching Open-Meteo weather is used when available; other hours are illustrative. No validated Jazan accuracy or calculated prediction intervals are available for this simulation.'],
reportHint:['اختر حفظ بصيغة PDF في نافذة الطباعة.','Choose Save as PDF in the print dialog.'],
reportTitle:['تقرير محاكاة حركة المرور','Traffic simulation report'],settings:['إعدادات التجربة','Experiment settings'],findings:['قراءة النتائج','Findings'],recommendation:['ملاحظات لدعم القرار','Decision support notes'],
noInference:['هذه نتائج افتراضية لاستكشاف الحساسية وليست توصية تشغيلية معتمدة. عند ارتفاع الضغط، اختبر تقليل مدة الإغلاق أو توقيته قبل اتخاذ قرار ميداني. لا يُحسب تحويل المركبات أو أطوال الطوابير.','These illustrative results explore sensitivity and are not approved operational recommendations. For high load, test a shorter closure or another time before a field decision. Rerouting and queue lengths are not modeled.'],
storageError:['تعذر الحفظ في المتصفح. قد تكون مساحة التخزين ممتلئة أو غير متاحة. صدّر التقرير للاحتفاظ بالنتائج.','Browser storage is unavailable or full. Export a report to retain the results.'],
updated:['بداية نافذة الحساب','Calculation window starts'],version:['إصدار التطبيق','Application version'],notAvailable:['غير متاح','Not available'],
peakClosure:['إغلاق وقت الذروة','Peak-hour closure'],heavyRain:['أمطار غزيرة افتراضية','Simulated heavy rain'],heavyRainHint:['مطر 12 ملم/ساعة · 3 ساعات عند الذروة','12 mm/h · 3 hours at peak'],peakClosureHint:['خفض السعة 25٪ · 3 ساعات عند الذروة','25% less capacity · 3 peak hours']
});
presets.heavyRain=[12,0,'☂'];presets.peakClosure=[null,25,'◷'];
var studiesReady = false;
const e = (ar,en) => lang ? en : ar;
const safe = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let studies = [], checkedStudies = new Set();
try {
 const saved = JSON.parse(localStorage.getItem('masar-experiments-v1') || '[]');
 if (Array.isArray(saved)) studies = saved.filter(x=>x && typeof x.id==='string' && typeof x.name==='string' && validStudy(x.config)).slice(0,12);
} catch {}
checkedStudies = new Set(studies.slice(0,6).map(x=>x.id));
function validStudy(c) {
 return c && Number.isInteger(c.segment)&&c.segment>=0&&c.segment<6 && Number.isInteger(c.start)&&c.start>=0 && Number.isInteger(c.duration)&&c.duration>0&&c.duration<=168&&c.start+c.duration<=DATA.rain.length && Number.isFinite(c.closure)&&c.closure>=0&&c.closure<=100 && (c.rain===null||Number.isFinite(c.rain)&&c.rain>=0&&c.rain<=20) && (c.temp===null||Number.isFinite(c.temp)&&c.temp>=-20&&c.temp<=65);
}
const studyColors=['#34694f','#b62d38','#285fa3','#9c5b16','#7b4599','#007b80'];
function toast(message) { $('toast').textContent=message;$('toast').hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').hidden=true,6500); }
function persistStudies() {try { localStorage.setItem('masar-experiments-v1',JSON.stringify(studies));return true;}catch {toast(t('storageError'));return false;} }
function readings(c,config=c) {if(c.savedBase && c.savedPoints)return (config===null?c.savedBase:c.savedPoints).map(p=>({...p,ratio:p.capacity>0?p.volume/p.capacity:p.volume>0?Infinity:0}));return Array.from({length:c.duration},(_,i)=>calculate(c.segment,c.start+i,config));}
function chosen() {return studies.filter(x=>checkedStudies.has(x.id));}
function comparable(list) {return list.length && list.every(x=>x.anchor===list[0].anchor&&x.config.segment===list[0].config.segment&&x.config.start===list[0].config.start&&x.config.duration===list[0].config.duration);}
function studyStamp(c,i) {return dateFormat.format(new Date(Date.parse(c.anchor||DATA.start)+i*HOUR));}
function settingsText(c) {return name(c.segment)+' · '+studyStamp(c,c.start)+' — '+studyStamp(c,c.start+c.duration)+' · '+e('المطر: ','Rain: ')+(c.rain===null?e('مرجعي','baseline'):c.rain+' mm/h')+' · '+e('الحرارة: ','Temperature: ')+(c.temp===null?e('مرجعية','baseline'):c.temp+' °C')+' · '+e('انخفاض السعة: ','Capacity reduction: ')+c.closure+'%';}
function summaryText(list) {
 if(!comparable(list))return t('incompatible');
 const c=list[0].config,base=windowSummary(readings(c,null));
 return list.map(x=>{const s=windowSummary(readings(x.config));return x.name+': '+e('فرق الطلب ','Demand difference ')+signed(Math.round(s.demand-base.demand))+e(' مركبة؛ تجاوز السعة ',' vehicles; over capacity ')+s.over+e(' ساعة مقابل ',' hours versus ')+base.over+e(' في المرجع. ',' in baseline. ')+(x.config.closure?e('الإغلاق يقلل السعة وقد يرفع الضغط دون تغيير الطلب. ','Closure reduces capacity and can raise load without changing demand. '):'')+((x.config.rain!==null||x.config.temp!==null)?e('تغير الطلب يتبع معاملات الطقس المفترضة.','Demand changes follow assumed weather coefficients.'):'');}).join('\n');
}
function multiMarkup(list) {
 if(!list.length)return '<p class="empty-state">'+t('noStudies')+'</p>';
 if(!comparable(list))return '<p class="warning">'+t('incompatible')+'</p>';
 const c=list[0].config,base=readings(c,null),b=windowSummary(base);
 const entries=[{name:t('reference'),points:base},...list.map(x=>({name:x.name,points:readings(x.config)}))];
 const maximum=Math.max(100,Math.ceil(Math.max(...entries.flatMap(x=>x.points.map(p=>p.volume)))/100)*100);
 const x=i=>55+i*650/c.duration,y=v=>180-v*145/maximum;
 const paths=entries.map((r,j)=>'<path d="'+r.points.map((p,i)=>(i?'V':'M55 ')+y(p.volume)+'H'+x(i+1)).join('')+'" fill="none" stroke="'+(j?studyColors[(j-1)%6]:'#52665c')+'" stroke-width="'+(j?2.5:4)+'" '+(!j?'stroke-dasharray="5 4"':'')+'/>').join('');
 const ticks=[0,.5,1].map(f=>'<text x="46" y="'+(y(maximum*f)+4)+'" text-anchor="end" class="chart-label">'+number(maximum*f)+'</text><path d="M55 '+y(maximum*f)+'H705" stroke="#d9e2d6"/>').join('');
 const rows=entries.map((r,j)=>{const s=windowSummary(r.points);return '<tr><th>'+safe(r.name)+'</th><td>'+number(Math.round(s.demand))+'</td><td>'+(s.closed?t('blocked'):number(s.load)+'%')+'</td><td>'+s.over+'</td><td>'+signed(Math.round(s.demand-b.demand))+'</td><td>'+signed(s.over-b.over)+'</td></tr>';}).join('');
 return '<p>'+safe(name(c.segment)+' · '+studyStamp(c,c.start)+' — '+studyStamp(c,c.start+c.duration))+'</p><p class="muted">'+e('الرسم يعرض الطلب، وقد تتطابق الخطوط عند اختلاف السعة فقط.','Chart shows demand; lines may overlap when only capacity differs.')+'</p><svg class="multi-chart" viewBox="0 0 750 215" role="img" aria-label="'+e('مقارنة الطلب بين السيناريوهات','Scenario demand comparison')+'">'+ticks+paths+'<text x="55" y="205" class="chart-label">'+safe(studyStamp(c,c.start))+'</text><text x="705" y="205" text-anchor="end" class="chart-label">'+safe(studyStamp(c,c.start+c.duration))+'</text></svg><div class="legend">'+entries.map((r,j)=>'<span><i class="dot" style="background:'+(j?studyColors[(j-1)%6]:'#52665c')+'"></i>'+safe(r.name)+'</span>').join('')+'</div><div class="table-wrap">'+table([t('scenario'),t('demandTotal'),t('averageLoad'),t('beyond'),t('demandEffect'),t('hoursEffect')],[rows])+'</div><div class="result-explanation"><h3>'+t('findings')+'</h3><p class="preline">'+safe(summaryText(list))+'</p><p>'+t('noInference')+'</p></div>';
}
function renderStudies() {
 $('studyList').innerHTML=studies.map((x,i)=>'<article class="study-item"><label><input type="checkbox" data-include="'+safe(x.id)+'" '+(checkedStudies.has(x.id)?'checked':'')+'><strong>'+safe(x.name)+'</strong><span class="sr-only">'+t('compareStudy')+'</span></label><p>'+safe(settingsText(x.config))+'</p><small>'+e('حُفظت: ','Saved: ')+safe(new Date(x.created).toLocaleString(lang?'en-GB':'ar-SA'))+'</small><div class="actions"><button data-load="'+safe(x.id)+'">'+t('loadStudy')+'</button><button data-delete="'+safe(x.id)+'">'+t('deleteStudy')+'</button></div></article>').join('');
 $('multiResults').innerHTML=multiMarkup(chosen());
 $('saveStudy').disabled=!active;
 $('assistantAnswer').textContent='';
 $('dataDetails').innerHTML='<p>'+t('sourceAnswer')+'</p><dl><dt>'+t('version')+'</dt><dd>MASAR 4.0 · 2026-11-13</dd><dt>'+t('updated')+'</dt><dd>'+safe(stamp(0))+'</dd><dt>'+e('تقييم نموذج المحاكاة محليًا','Local simulation validation')+'</dt><dd>'+e('لا تتوفر بيانات ميدانية للتحقق من الدقة في جيزان. المختبر يعرض MAE وRMSE لملف المستخدم بشكل مستقل.','No local field validation. The lab separately reports MAE and RMSE for the uploaded dataset.')+'</dd></dl><p>'+e('سجل التجارب: ','Experiment log: ')+studies.length+'</p>';
}
$('saveStudy').onclick=()=>{
 if(!active){toast(t('needScenario'));return;}
 if(studies.length>=12){toast(t('limitStudies'));return;}
 const record={id:crypto.randomUUID(),name:$('studyName').value.trim()||t(active.kind)+' '+(studies.length+1),config:{...active,anchor:DATA.start,savedBase:readings(active,null),savedPoints:readings(active)},anchor:DATA.start,created:new Date().toISOString()};
 studies.push(record);if(checkedStudies.size<6)checkedStudies.add(record.id);persistStudies();renderStudies();$('studyStatus').textContent=t('saved');
};
$('studyList').onchange=event=>{const id=event.target.dataset.include;if(!id)return;if(event.target.checked&&checkedStudies.size>=6){event.target.checked=false;toast(t('limitStudies'));return;}event.target.checked?checkedStudies.add(id):checkedStudies.delete(id);renderStudies();};
$('studyList').onclick=event=>{const button=event.target.closest('button');if(!button)return;const id=button.dataset.load||button.dataset.delete;const record=studies.find(x=>x.id===id);if(!record)return;if(button.dataset.load){if(record.anchor!==DATA.start){toast(e('تجربة مؤرشفة من نافذة سابقة. قارن نتائجها أو أنشئ تجربة ضمن النافذة الحالية.','Archived experiment from an earlier window. Compare its results or create a current experiment.'));return;}const {savedBase,savedPoints,...config}=record.config;if(config.start+config.duration>span()){horizon=7;localize();}runScenario(config,true);$('studyName').value=record.name;syncEditor(record.config);showEditor(true);}else{studies=studies.filter(x=>x.id!==id);checkedStudies.delete(id);persistStudies();renderStudies();}};
$('demoStudies').onclick=()=>{
 if(studies.length>9){toast(t('limitStudies'));return;}
 const c=active?{...active}:preset('rainCase',selected);
 const cases=[['rainCase',8,0],['closureCase',null,50],['combo',8,50]];
 checkedStudies.clear();for(const [kind,rain,closure]of cases){const record={id:crypto.randomUUID(),name:e('مثال · ','Example · ')+t(kind),config:{...c,anchor:DATA.start,kind,rain,closure,temp:null,savedBase:readings(c,null),savedPoints:readings({...c,kind,rain,closure,temp:null})},anchor:DATA.start,created:new Date().toISOString()};studies.push(record);checkedStudies.add(record.id);}
 persistStudies();renderStudies();
};
$('askImpact').onclick=()=>{const list=chosen();if(!comparable(list)){$('assistantAnswer').textContent=list.length?t('incompatible'):t('noStudies');return;}const ranked=list.map(x=>({x,s:windowSummary(readings(x.config))})).sort((a,b)=>Number(b.s.closed)-Number(a.s.closed)||b.s.load-a.s.load);$('assistantAnswer').textContent=ranked[0].x.name+' · '+e('الأعلى وفق متوسط إشغال السعة: ','Highest average capacity use: ')+(ranked[0].s.closed?t('blocked'):number(ranked[0].s.load)+'%')+' · '+e('ضمن التجارب المحددة فقط.','Within the selected experiments only.');};
$('askReason').onclick=()=>{$('assistantAnswer').textContent=chosen().length?summaryText(chosen()):t('noStudies');};
$('askSource').onclick=()=>{$('assistantAnswer').textContent=t('sourceAnswer');};
$('report').onclick=()=>{
 let list=chosen();if(!list.length&&active)list=[{name:$('studyName').value.trim()||t(active.kind),config:{...active}}];
 if(!list.length){toast(t('needScenario'));return;}if(!comparable(list)){toast(t('incompatible'));return;}
 $('reportView').innerHTML='<div class="report-heading"><img src="/masar-mark.svg" width="48" alt=""><div><b>مسار | MASAR</b><h1>'+t('reportTitle')+'</h1></div></div><p>'+new Date().toLocaleString(lang?'en-GB':'ar-SA')+' · '+e('بتوقيت الجهاز','Device time')+'</p><h2>'+t('settings')+'</h2>'+list.map(x=>'<p><b>'+safe(x.name)+'</b><br>'+safe(settingsText(x.config))+'</p>').join('')+'<div class="report-map">'+$('map').innerHTML+'</div><p>'+e('خريطة المقطع · اللقطة المعروضة عند إعداد التقرير. الألوان مرتبطة بالساعة والحالة المختارتين في الواجهة.','Road map · current interface snapshot. Colors reflect the selected hour and state.')+' © OpenStreetMap contributors</p>'+multiMarkup(list)+'<h2>'+t('dataTitle')+'</h2><p>'+t('sourceAnswer')+'</p><p>'+t('noInference')+'</p><footer>نايف · إبراهيم · عبدالله | Naif · Ibrahim · Abdullah · MASAR 4.0</footer>';
 $('reportView').hidden=false;document.body.classList.add('printing');toast(t('reportHint'));setTimeout(()=>window.print(),150);
};
window.addEventListener('afterprint',()=>{document.body.classList.remove('printing');$('reportView').hidden=true;});
async function presentation(on){document.body.classList.toggle('presenting',on);$('exitPresent').hidden=!on;if(on){try{await document.documentElement.requestFullscreen();}catch{}$('simulation').scrollIntoView({block:'start'});}else if(document.fullscreenElement){await document.exitFullscreen();}}
$('present').onclick=()=>presentation(true);$('exitPresent').onclick=()=>presentation(false);
document.addEventListener('keydown',event=>{if(event.key==='Escape')presentation(false);});
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement){document.body.classList.remove('presenting');$('exitPresent').hidden=true;}});
// Initialize after all bilingual copy and behavior are defined.
studiesReady=true;restoreSession();localize();renderStudies();updateWeather();
