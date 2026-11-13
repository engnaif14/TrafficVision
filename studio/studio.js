"use strict";

const labels = {
  speed:["سرعة العرض","Playback speed"], exportComparison:["تصدير المقارنة CSV","Export comparison CSV"],
  hourlyDetails:["المقارنة ساعة بساعة","Hourly comparison"], period:["الفترة","Interval"],
  loadBefore:["الإشغال المرجعي","Baseline load"], loadAfter:["إشغال السيناريو","Scenario load"],
  demandChange:["تغيّر الطلب المتوقع","Projected demand change"], overloadChange:["فرق ساعات تجاوز السعة","Change in hours over capacity"],
  conclusion:["قراءة النتيجة","Reading the result"], demandMetric:["مركبة خلال فترة السيناريو","vehicles within the scenario window"],

  baselineChart:["المحاكاة الأساسية","Baseline simulation"], scenarioChart:["نتائج السيناريو","Scenario results"],
  comparisonEmpty:["طبّق سيناريو من قسم «ماذا لو؟» لبدء المقارنة.","Apply a What if? scenario to start comparing."],
  playComparison:["شغّل المقارنة","Play comparison"], showAnalysis:["عرض النتيجة مباشرة","Show results now"],
  comparisonDone:["انتهت المقارنة عند","Comparison ended at"], periodAnalysis:["تحليل فترة السيناريو","Scenario window analysis"],
  demandTotal:["إجمالي الطلب المتوقع (مركبة)","Total projected demand (vehicles)"],
  averageLoad:["متوسط إشغال السعة","Average capacity used"], difference:["الفرق","Difference"],
  percentagePoints:["نقطة مئوية","percentage points"], hourReadings:["الطلب المتوقع خلال الساعة (مركبة)","Projected demand for this hour (vehicles)"],
  modelFactors:["العوامل في المحاكاة","Modeled factors"],
  factorNote:["كل سطر يقارن السيناريو الكامل بنفس السيناريو بعد إزالة عامل واحد. قد تتداخل التأثيرات، لذلك لا تُجمع الفروق.","Each row compares the full scenario with the same scenario with one factor removed. Effects can overlap, so do not add the differences."],
  demandEffect:["فرق الطلب (مركبة)","Demand difference (vehicles)"], hoursEffect:["فرق ساعات تجاوز السعة","Difference in hours over capacity"],
  sectionLinks:["أقسام مسار","MASAR sections"], simulationLink:["المحاكاة","Simulation"],
  forecastLink:["التنبؤ","Forecast"], safetyLink:["مؤشرات السلامة","Safety indicators"],
  scenarioHour:["العودة لبداية السيناريو","Return to scenario start"], viewImpacts:["قارن أثر السيناريوهات","Compare scenario impacts"],
  step1:["١ · جرّب","01 · Set a scenario"], step2:["٢ · شاهد الأثر","02 · Inspect the map"], step3:["٣ · قارن النتائج","03 · Compare impacts"],
  quickIntro:["اختر مقطعًا واضغط تجربة جاهزة. بتتلوّن الخريطة وتظهر النتيجة مباشرة.","Choose a segment and run a preset. The map and results update immediately."],
  customize:["تخصيص السيناريو","Customize scenario"], peakJump:["وقت الذروة","Peak hour"], timeline:["الساعة المعروضة على الخريطة","Hour shown on the map"],
  openRoad:["مفتوح بالكامل","Fully open"], minorClosure:["خفض ٢٥٪","25% reduction"], halfClosure:["خفض ٥٠٪","50% reduction"],
  majorClosure:["خفض ٧٥٪","75% reduction"], fullClosure:["إغلاق كامل","Full closure"],
  rainCaseHint:["مطر ٨ ملم/ساعة","Rain at 8 mm/h"], closureCaseHint:["خفض السعة للنصف","Half the usual capacity"],
  comboHint:["مطر مع خفض السعة للنصف","Rain and half capacity"], incidentHint:["حادث افتراضي يخفّض السعة ٧٥٪","Simulated crash reduces capacity by 75%"],
  incident:["حادث افتراضي","Simulated crash"], activeAt:["من","From"], outside:["الساعة خارج وقت السيناريو","Outside scenario hours"],
  blocked:["الطريق مغلق","Road closed"], onAnother:["السيناريو يخص مقطعًا آخر","Scenario applies to another segment"], customDuration:["المدة تتجاوز نهاية فترة التنبؤ.","Duration extends beyond the forecast horizon."],
  lab:["مختبر التنبؤ","Forecast lab"], preview:["نسخة تجريبية","Beta"], snapshot:["حركة المرور محاكاة مبنية على بيانات افتراضية","Traffic is simulated from illustrative data"], forecastWindow:["فترة التنبؤ بتوقيت السعودية","Forecast window in Saudi time"],
  title:["مسار | MASAR","MASAR | مسار"], intro:["منصة رقمية لتحليل بيانات حركة المرور ومحاكاة السيناريوهات في مدينة جيزان، تساعد على استكشاف أثر الطقس والتغيرات التشغيلية على أداء الطرق.","A digital platform for traffic data analysis and scenario simulation in Jazan City, exploring weather and operational changes on road performance."],
  horizon:["مدة التنبؤ","Forecast horizon"], map:["خريطة المقاطع","Segment map"], schematic:["طرق جيزان الفعلية · الألوان من المحاكاة","Real Jazan streets · colors show simulation results"],
  what:["ماذا لو؟","What if?"], reference:["المرجع","Baseline"], scenario:["السيناريو","Scenario"], play:["▶ تشغيل","▶ Play"], pause:["إيقاف مؤقت","Pause"],
  editorIntro:["اضبط السيناريو للمقطع المختار، ثم قارن النتيجة بالمرجع.","Set conditions for the selected segment and compare with baseline."],
  close:["إغلاق","Close"], segment:["المقطع","Segment"], start:["بداية السيناريو (بتوقيت السعودية)","Scenario start (Saudi time)"], duration:["المدة بالساعات","Duration in hours"],
  rain:["المطر (ملم/ساعة)","Rain (mm/h)"], temp:["الحرارة (°م)","Temperature (°C)"], closure:["حالة الطريق","Road availability"],
  blank:["اترك المطر أو الحرارة فارغين لاستخدام القيمة المرجعية.","Leave rain or temperature blank to use the baseline value."],
  apply:["طبّق وشاهد النتيجة","Apply and see results"], reset:["إعادة للمرجع","Reset to baseline"],
  chart:["حجم المرور المتوقع","Projected traffic volume"], matrix:["مصفوفة الأثر","Impact matrix"],
  matrixNote:["كل خلية تعرض فرق ساعات تجاوز السعة مقارنة بالمرجع. مثال: ‎+٢ تعني ساعتين إضافيتين. اضغط الخلية لتجربة الحالة على الخريطة.","Each cell compares hours over capacity with the baseline. For example, +2 means two additional hours. Select a cell to run it on the map."],
  exposure:["مؤشرات التعرّض المروري","Traffic exposure indicators"],
  exposureNote:["التعرّض للظروف المفترضة في المقطع المختار. تقدير احتمال الحوادث يحتاج بيانات حوادث فعلية.","Exposure under modeled conditions for the selected segment. Estimating crash probability requires real crash data."],
  assumptions:["افتراضات المحاكاة","Simulation assumptions"],
  assumptionsText:["النموذج SARIMAX مبني على تاريخ اصطناعي. توزيع الحركة وسعة المقاطع افتراضيان. الأرقام تمثل الطلب المقدّر على المقطع، ولا تتضمن إعادة توزيع المركبات بعد الإغلاق. الاتجاه على مدى أشهر إسقاط تخطيطي.","SARIMAX uses synthetic history. Segment traffic shares and capacities are illustrative. Volumes represent estimated arrivals and do not model rerouting after a closure. Multi-month results are planning projections."],
  low:["انسيابي","Free flow"], moderate:["متوسط","Moderate"], high:["مرتفع","High"], overloaded:["عند السعة أو أعلى","At or above capacity"],
  volume:["مركبة/ساعة متوقعة","Projected vehicles/hour"], capacity:["السعة المفترضة · مركبة/ساعة","Assumed capacity · vehicles/hour"], pressure:["نسبة إشغال السعة","Capacity used"],
  beyond:["ساعات تجاوز السعة","Hours over capacity"], weather:["مطر وحرارة","Rain and heat"], peak:["ساعة ذروة مفترضة","Assumed peak hour"], closed:["انخفاض السعة مفعل","Reduced capacity active"], appliedWeather:["تعديل الطقس مفعل","Weather override active"], typical:["الطلب المرجعي في هذه الساعة","Baseline demand for this hour"],
  custom:["مخصص","Custom"], rainCase:["مطر","Rain"], closureCase:["إغلاق جزئي","Partial closure"], combo:["مطر وإغلاق","Rain and closure"],
  rainExposure:["مركبات متوقعة أثناء المطر","Projected arrivals during rain"], closureExposure:["مركبات متوقعة أثناء انخفاض السعة","Projected arrivals during reduced capacity"],
  combinedExposure:["ساعات ضغط ≥80% مع مطر أو انخفاض السعة","Hours at ≥80% load with rain or reduced capacity"], indicator:["المؤشر","Indicator"],
  weatherProxy:["طقس مرجعي افتراضي","Illustrative baseline weather"], weatherLive:["ساعات من Open-Meteo، والباقي افتراضي","hours from Open-Meteo, illustrative values elsewhere"],
  invalid:["اختر ساعة كاملة تقع ضمن مدة التنبؤ.","Choose a whole hour within the forecast horizon."], empty:["غيّر المطر أو الحرارة أو السعة أولًا.","Change rain, temperature or capacity first."], applied:["تم تطبيق السيناريو.","Scenario applied."],
  noScenario:["اختر ماذا لو؟ أو خلية من مصفوفة الأثر.","Use What if? or choose an impact matrix cell."],
  hourly:["قراءات ساعية · مركبة/ساعة","Hourly values · vehicles/hour"], daily:["تجميع يومي · متوسط مركبة/ساعة","Daily groups · average vehicles/hour"], monthly:["تجميع شهري · متوسط مركبة/ساعة","Monthly groups · average vehicles/hour"],
  point:["ساعة","hour"], hourCount:["ساعة","hours"], edit:["تعديل السيناريو","Edit scenario"]
};
const horizons = [
  [1,0,"ساعة واحدة","1 hour"],[24,0,"24 ساعة","24 hours"],[48,0,"48 ساعة","48 hours"],
  [168,0,"7 أيام","7 days"],[720,0,"30 يومًا","30 days"],[0,3,"3 أشهر","3 months"],
  [0,6,"6 أشهر","6 months"],[0,12,"سنة","1 year"]
];
const segments = [
  ["king_fahd",.92,495,"الملك فهد · شمال","King Fahd · North"],
  ["king_fahd",1,510,"الملك فهد · جنوب","King Fahd · South"],
  ["king_abdulaziz",.88,365,"الملك عبدالعزيز · غرب","King Abdulaziz · West"],
  ["king_abdulaziz",1,415,"الملك عبدالعزيز · شرق","King Abdulaziz · East"],
  ["city_centre",.89,335,"وسط جيزان · الأمير سلطان","Jazan centre · Prince Sultan"],
  ["city_centre",1,350,"وسط جيزان · طريق المطار","Jazan centre · Airport Road"]
];
const levels = ["low","moderate","high","overloaded"];
const colors = ["#34694f","#926500","#ad4519","#b62d38"];
const presets = {rainCase:[8,0,"☂"],closureCase:[null,50,"◐"],combo:[8,50,"◈"],incident:[null,75,"!"]};
const peakHours = [7,8,13,14,18,19,20];
const HOUR = 3600000;
const origin = Date.parse(DATA.start);
const wallOrigin = origin + 3 * HOUR;
const $ = id => document.getElementById(id);
let lang = 0, horizon = 2, selected = 0, index = 0, active = null, compare = false, timer = null, liveCount = 0;
let formatter, dateFormat, groupFormat;
let chartMode = "baseline", comparisonStep = 0, comparisonTimer = null, analysisVisible = false;
let playbackSpeed = 1;
const t = key => labels[key][lang];
const name = i => segments[i][3 + lang];
const number = value => formatter.format(value);
const wall = i => new Date(wallOrigin + i * HOUR);
const localInput = i => wall(i).toISOString().slice(0,16);
const stamp = i => dateFormat.format(new Date(origin + i * HOUR));

function span() {
  const [hours, months] = horizons[horizon];
  if (hours) return hours;
  const end = wall(0);
  const day = end.getUTCDate();
  end.setUTCDate(1);
  end.setUTCMonth(end.getUTCMonth() + months);
  const monthEnd = new Date(end);
  monthEnd.setUTCMonth(monthEnd.getUTCMonth() + 1, 0);
  end.setUTCDate(Math.min(day, monthEnd.getUTCDate()));
  return (end.getTime() - wallOrigin) / HOUR;
}

function calculate(segment, hour, settings) {
  const [road, scale, nominal] = segments[segment];
  const {baseline, coeffs} = DATA.roads[road];
  const applied = settings?.segment === segment && hour >= settings.start && hour < settings.start + settings.duration;
  const rain = (applied ? settings.rain : null) ?? DATA.rain[hour];
  const temp = (applied ? settings.temp : null) ?? DATA.temp[hour];
  const reduction = applied ? settings.closure : 0;
  const volume = scale * Math.max(0, baseline[hour] + coeffs[0] * Math.min(rain,20) + coeffs[1] * Math.min(18,Math.max(0,temp - 37)));
  const capacity = nominal * (1 - reduction / 100);
  const ratio = capacity > 0 ? volume / capacity : volume > 0 ? Infinity : 0;
  return {volume,capacity,ratio,rain,temp,reduction,applied};
}

function totals(segment, settings) {
  let over = 0, rain = 0, closure = 0, elevated = 0;
  const length = span();
  for (let hour = 0; hour < length; hour++) {
    const point = calculate(segment,hour,settings);
    if (point.ratio > 1) over++;
    if (point.rain > 0) rain += point.volume;
    if (point.reduction > 0) closure += point.volume;
    if ((point.rain > 0 || point.reduction > 0) && point.ratio >= .8) elevated++;
  }
  return {over,rain,closure,elevated};
}

const level = ratio => ratio < .6 ? 0 : ratio < .8 ? 1 : ratio < 1 ? 2 : 3;
const kpi = (label, value) => '<div class="kpi"><span>' + t(label) + '</span><strong>' + value + '</strong></div>';
function drawMoment() {
  $("time").value = index;
  $("moment").textContent = stamp(index);
  $("plot").querySelector("#cursor")?.setAttribute("transform","translate(" + (index / Math.max(1,span()-1) * 650) + ",0)");
  $("ref").setAttribute("aria-pressed",!compare);
  $("scenario").setAttribute("aria-pressed",compare);
  $("scenario").disabled = !active || active.start >= span();
  const config = compare ? active : null;
  const current = calculate(selected,index,config);
  const ranks = segments.map((_,i) => level(calculate(i,index,config).ratio));
  segments.forEach((_,i) => {
    const item = $("road-"+i);
    item.classList.toggle("selected",i===selected);
    item.setAttribute("aria-pressed",i===selected);
    item.setAttribute("aria-label",name(i) + " · " + t(levels[ranks[i]]));
    item.querySelector(".road").style.stroke = colors[ranks[i]];

  });
  const hour = wall(index).getUTCHours();
  const drivers = [];
  if (current.rain > 0 || current.temp > 37) drivers.push(t("weather") + " · " + number(current.rain) + " mm/h · " + number(current.temp) + " °C");
  if (peakHours.includes(hour)) drivers.push(t("peak"));
  if (current.reduction) drivers.push(t("closed") + " · " + number(current.reduction) + "%");
  if (current.applied && (config.rain !== null || config.temp !== null)) drivers.push(t("appliedWeather"));
  const base = calculate(selected,index,null);
  const delta = Math.round(current.volume - base.volume);
  if (compare && !current.applied) drivers.push(t(active.segment === selected ? "outside" : "onAnother"));
  const ratioText = point => point.capacity === 0 ? t("blocked") : number(Math.round(100*point.ratio)) + "%";
  $("detail").innerHTML = '<div class="detail-head"><div><h2>' + name(selected) + '</h2><p>' + t(compare ? "scenario" : "reference") + (compare ? " · " + t(active.kind) : "") + '</p></div><span class="badge" style="background:' + colors[ranks[selected]] + '">' + t(levels[ranks[selected]]) + '</span></div>'
    + kpi("volume", number(Math.round(current.volume)) + (compare && delta ? " (" + signed(delta) + ")" : ""))
    + kpi("capacity",number(Math.round(current.capacity)))
    + kpi("pressure",compare && current.applied ? '<span class="ratio-change" dir="ltr"><bdi>' + ratioText(base) + '</bdi> <span aria-hidden="true">→</span> <bdi>' + ratioText(current) + '</bdi></span>' : ratioText(current))
    + '<p class="drivers">' + (drivers.length ? drivers.join(" · ") : t("typical")) + '</p>';
  $("peakJump").disabled = nextPeak() < 0;
  $("scenarioResultsLink").hidden = !active;
  if (!timer) $("play").textContent = t(active && compare ? "playComparison" : "play");
  $("scenarioHour").hidden = !active || (index === active.start && compare && selected === active.segment);

}

function makeMap() {
  const map = DATA.map;
  $("map").innerHTML = '<svg viewBox="0 0 '+map.size.join(" ")+'" role="group" aria-label="'+t("map")+'">'
    + '<rect width="100%" height="100%" fill="#bfdde4"/><path d="'+map.land+'" fill="#e8eade"/>'
    + '<path d="'+map.green+'" fill="#c7dcb7"/><path d="'+map.airport+'" fill="#d2d5ce"/>'
    + '<path d="'+map.minor+'" fill="none" stroke="#fff" stroke-width="1.25"/>'
    + '<path d="'+map.major+'" fill="none" stroke="#c7c5b4" stroke-width="3.5"/>'
    + '<path d="'+map.major+'" fill="none" stroke="#fffcf2" stroke-width="2"/>'
    + map.segments.map((path,i) => '<g id="road-'+i+'" tabindex="0" role="button"><path class="halo" d="'+path+'"/><path class="road" d="'+path+'"/><path class="hit" d="'+path+'"/></g>').join("")
    + map.labels.map(([x,y,ar,en]) => '<text class="geo-label" x="'+x+'" y="'+y+'">'+(lang ? en : ar)+'</text>').join("")
    + '<g class="north" transform="translate(606 23)" aria-hidden="true"><circle cx="0" cy="15" r="15" fill="#fff"/><path d="M0 5L-5 20L0 17L5 20Z" fill="#29483c"/><text x="0" y="48" text-anchor="middle">'+(lang ? "N" : "ش")+'</text></g></svg>';
  segments.forEach((_,i) => {
    const action = () => selectSegment(i);
    $("road-"+i).onclick = action;
    $("road-"+i).onkeydown = event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        action();
      }
    };
  });
  $("legend").innerHTML = levels.map((key,i) => '<span><i class="dot" style="background:'+colors[i]+'"></i>'+t(key)+' · <bdi>'+["&lt;60%","60–79%","80–99%","≥100%"][i]+'</bdi></span>').join("");
}

function selectSegment(i) {
  selected = i;
  if (!$("editor").hidden) {
    $("target").value = i;
    drawCapacity();
  }
  drawPanels();
}

function signed(value) {
  return (value > 0 ? "+" : value < 0 ? "−" : "") + number(Math.abs(value));
}

function nextPeak() {
  for (let hour = 0; hour < Math.min(24,span()); hour++) {
    if (peakHours.includes(wall(hour).getUTCHours())) return hour;
  }
  return -1;
}

function preset(kind, segment) {
  const [rain,closure] = presets[kind];
  const start = Math.max(0,nextPeak());
  return {kind,segment,start,duration:Math.min(3,span()-start),rain,temp:null,closure};
}

function table(head, body) {
  return "<table><thead><tr>" + head.map(label => '<th scope="col">'+label+'</th>').join("") + "</tr></thead><tbody>" + body.join("") + "</tbody></table>";
}

function drawMatrix() {
  const kinds = Object.keys(presets);
  if (active?.kind === "custom" && active.start < span()) kinds.push("custom");
  $("matrix").innerHTML = table([t("segment"),...kinds.map(t)],segments.map((_,i) => {
    const baseline = totals(i,null).over;
    const cells = kinds.map(kind => {
      if (kind === "custom" && active.segment !== i) return "<td>—</td>";
      const settings = kind === "custom" ? active : preset(kind,i);
      const delta = totals(i,settings).over - baseline;
      const chosen = compare && active?.kind === kind && active.segment === i;
      return '<td><button data-kind="'+kind+'" data-index="'+i+'" class="'+(delta>0?"positive":delta<0?"negative":"")+(chosen?" selected-cell":"")+'" aria-pressed="'+Boolean(chosen)+'" aria-label="'+name(i)+' · '+t(kind)+' · '+signed(delta)+' '+t("hourCount")+'">'+signed(delta)+'</button></td>';
    });
    return '<tr><th scope="row">'+name(i)+'</th>'+cells.join("")+'</tr>';
  }));
}

function drawExposure() {
  const baseline = totals(selected,null);
  const alternative = active ? totals(selected,active) : null;
  const percentage = value => number(value) + " (" + number(Math.round(value / span() * 1000) / 10) + "%)";
  $("exposure").innerHTML = table([t("indicator"),t("reference"),t("scenario")],
    [["beyond","over",percentage],["rainExposure","rain"],["closureExposure","closure"],["combinedExposure","elevated"]].map(([label,key,format = value => number(Math.round(value))]) =>
      '<tr><th scope="row">'+t(label)+'</th><td>'+format(baseline[key])+'</td><td>'+(alternative ? format(alternative[key]) : "—")+'</td></tr>'));
}

function drawPlot() {
  const length = span();
  const mode = horizons[horizon][1] ? "monthly" : length > 48 ? "daily" : "hourly";
  const groups = [];
  for (let i = 0; i < length; i++) {
    const key = mode === "monthly" ? localInput(i).slice(0,7) : mode === "daily" ? localInput(i).slice(0,10) : i;
    if (!groups.length || groups.at(-1).key !== key) groups.push({key,i,count:0,base:0});
    const g = groups.at(-1);
    g.count++;
    g.base += calculate(selected,i,null).volume;
  }
  const ceiling = Math.max(100, Math.ceil(Math.max(...groups.map(g => g.base / g.count))/100)*100);
  const x = i => 58 + i / Math.max(1,length-1) * 650;
  const y = value => 155 - value / ceiling * 128;
  const series = (key,color) => {
    const points = groups.map(g => [x(g.i+(g.count-1)/2),y(g[key]/g.count)]);
    return '<polyline points="'+points.map(point=>point.join(",")).join(" ")+'" fill="none" stroke="'+color+'" stroke-width="3"/>' +
      points.map(([px,py],i) => '<circle cx="'+px+'" cy="'+py+'" r="'+(groups.length > 30 ? 2 : 3)+'" fill="'+color+'"><title>'+stamp(groups[i].i)+' · '+number(Math.round(groups[i][key]/groups[i].count))+'</title></circle>').join("");
  };
  const ticks = [...new Set([0,Math.floor((length-1)/3),Math.floor((length-1)*2/3),length-1])];
  $("chartNote").textContent = name(selected) + " · " + t(mode);
  $("plot").innerHTML = '<svg viewBox="0 0 750 193" role="img" aria-label="'+t("chart")+'">'
    + [0,.5,1].map(f => '<path d="M58 '+y(ceiling*f)+'H708" stroke="#d9e2d6"/><text class="chart-label" x="49" y="'+(y(ceiling*f)+4)+'" text-anchor="end">'+number(ceiling*f)+'</text>').join("")
    + ticks.map(i => '<text class="chart-label" x="'+x(i)+'" y="178" text-anchor="middle">'+groupFormat.format(new Date(origin+i*HOUR))+'</text>').join("")
    + series("base","#34694f") + '<path id="cursor" d="M58 22V155" stroke="#52665c" stroke-dasharray="4 4"/></svg>'
    + '<div class="legend" dir="'+(lang?"ltr":"rtl")+'"><span><i class="dot" style="background:#34694f"></i>'+t("reference")+'</span>'
    + '</div>';
}

function selectChart(mode) {
  chartMode = mode;
  const scenario = mode === "scenario";
  $("baselineChart").setAttribute("aria-pressed",!scenario);
  $("scenarioChart").setAttribute("aria-pressed",scenario);
  $("baselinePanel").hidden = scenario;
  $("scenarioPanel").hidden = !scenario;
}

function windowReadings(settings) {
  return Array.from({length:active.duration},(_,i) => calculate(active.segment,active.start+i,settings));
}

function drawComparison() {
  $("comparisonEmpty").hidden = Boolean(active);
  $("comparisonContent").hidden = !active;
  if (!active) return;
  const {start,duration,segment} = active;
  const base = windowReadings(null);
  const changed = windowReadings(active);
  const max = Math.max(100,Math.ceil(Math.max(...[...base,...changed].map(point => point.volume))/100)*100);
  const x = step => 58 + step * 650 / duration;
  const y = value => 155 - value * 125 / max;
  const path = points => points.map((point,i) => (i ? "V" : "M58 ") + y(point.volume) + "H" + x(i+1)).join("");
  const divisions = Math.min(duration,4);
  const ticks = Array.from({length:divisions+1},(_,i) => Math.round(i*duration/divisions));
  const time = new Intl.DateTimeFormat(lang ? "en-GB" : "ar-SA",{timeZone:"Asia/Riyadh",hour:"2-digit",minute:"2-digit",hourCycle:"h23"});
  $("comparisonWindow").textContent = name(segment) + " · " + stamp(start) + " — " + stamp(start+duration);
  $("comparisonPlot").innerHTML = '<svg viewBox="0 0 750 193" role="img" aria-label="'+t("scenarioChart")+'">'
    + [0,.5,1].map(f => '<path d="M58 '+y(max*f)+'H708" stroke="#d9e2d6"/><text class="chart-label" x="49" y="'+(y(max*f)+4)+'" text-anchor="end">'+number(max*f)+'</text>').join("")
    + ticks.map(step => {
      return '<text class="chart-label" x="'+x(step)+'" y="178" text-anchor="middle">'+time.format(new Date(origin+(start+step)*HOUR))+'</text>';
    }).join("")
    + '<path d="'+path(base)+'" fill="none" stroke="#34694f" stroke-width="4"/>'
    + '<path d="'+path(changed)+'" fill="none" stroke="#b62d38" stroke-width="3" stroke-dasharray="7 4"/>'
    + '<path id="comparisonCursor" d="M58 22V155" stroke="#52665c" stroke-dasharray="3 4"/></svg>'
    + '<div class="legend" dir="'+(lang?"ltr":"rtl")+'"><span><i class="dot" style="background:#34694f"></i>'+t("reference")+'</span>'
    + '<span><i class="dot" style="background:#b62d38"></i>'+t("scenario")+'</span></div>';
  drawComparisonMoment();
  drawAnalysis(base,changed);
}

function drawComparisonMoment() {
  const end = comparisonStep === active.duration;
  const hour = active.start + comparisonStep;
  $("comparisonProgress").max = active.duration;
  $("comparisonProgress").value = comparisonStep;
  $("comparisonTime").textContent = (end ? t("comparisonDone")+" " : "") + stamp(hour);
  $("comparisonCursor")?.setAttribute("transform","translate(" + (comparisonStep * 650 / active.duration) + ",0)");
  $("comparisonReading").textContent = end ? "" : t("hourReadings") + " · " + t("reference") + " " + number(Math.round(calculate(active.segment,hour,null).volume))
    + " · " + t("scenario") + " " + number(Math.round(calculate(active.segment,hour,active).volume));
}

function windowSummary(points) {
  const result = points.reduce((sum,point) => ({
    demand:sum.demand+point.volume, load:sum.load+point.ratio,
    over:sum.over+Number(point.ratio>1), closed:sum.closed || point.capacity===0
  }),{demand:0,load:0,over:0,closed:false});
  return {...result,load:result.load*100/points.length};
}

function drawAnalysis(base,changed) {
  $("comparisonAnalysis").hidden = !analysisVisible;
  $("comparisonHighlights").hidden = !analysisVisible;
  if (!analysisVisible) return;
  const baseline = windowSummary(base);
  const scenario = windowSummary(changed);
  const load = result => result.closed ? t("blocked") : number(result.load) + "%";
  const difference = (key,other) => signed(Math.round(scenario[key]-other[key]));
  const rows = [
    ["demandTotal",number(Math.round(baseline.demand)),number(Math.round(scenario.demand)),difference("demand",baseline)],
    ["averageLoad",load(baseline),load(scenario),scenario.closed ? "—" : signed(Math.round((scenario.load-baseline.load)*10)/10) + " " + t("percentagePoints")],
    ["beyond",number(baseline.over),number(scenario.over),difference("over",baseline)]
  ];
  const row = ([label,...values]) => '<tr><th scope="row">'+t(label)+'</th>'+values.map(value => "<td>"+value+"</td>").join("")+"</tr>";
  const factors = [["rain","rainCase",null],["temp","temp",null],["closure","closure",0]]
    .filter(([key,,normal]) => active[key] !== normal).map(([key,label,normal]) => {
      const without = windowSummary(windowReadings({...active,[key]:normal}));
      return row([label,difference("demand",without),difference("over",without)]);
    });
  const delta = scenario.demand - baseline.demand;
  const loadText = scenario.closed ? t("blocked") : signed(Math.round((scenario.load-baseline.load)*10)/10) + " " + t("percentagePoints");
  $("comparisonHighlights").innerHTML = [
    ["demandChange",signed(Math.round(delta)),t("demandMetric")],
    ["averageLoad",loadText,t("difference")],
    ["overloadChange",signed(scenario.over-baseline.over),t("hourCount")]
  ].map(([label,value,unit]) => '<div><span>'+t(label)+'</span><strong>'+value+'</strong><small>'+unit+'</small></div>').join("");
  const demandText = lang
    ? "Projected arrivals change from " + number(Math.round(baseline.demand)) + " to " + number(Math.round(scenario.demand)) + " vehicles."
    : "يتغير الطلب المتوقع من " + number(Math.round(baseline.demand)) + " إلى " + number(Math.round(scenario.demand)) + " مركبة.";
  const closureText = active.closure > 0 ? (lang
    ? " The closure reduces available road capacity by " + number(active.closure) + "%. Capacity changes affect load even when arrivals stay the same."
    : " الإغلاق يقلّص استيعاب المقطع بنسبة " + number(active.closure) + "٪. لذلك تتغير نسبة الإشغال حتى لو بقي الطلب كما هو.") : "";
  const weatherText = active.rain !== null || active.temp !== null ? (lang
    ? " Weather overrides change projected arrivals through the model's assumed weather relationships."
    : " تعديل الطقس يغيّر الطلب المتوقع وفق علاقات الطقس المفترضة في النموذج.") : "";
  const loadTextFor = point => point.capacity === 0 ? t("blocked") : number(point.ratio*100) + "%";
  const hourlyRows = base.map((point,i) => {
    const alternative = changed[i];
    const values = [stamp(active.start+i)+" — "+stamp(active.start+i+1),number(Math.round(point.volume)),number(Math.round(alternative.volume)),
      loadTextFor(point),loadTextFor(alternative),signed(Math.round(alternative.volume-point.volume))];
    return '<tr>'+values.map((value,j) => j ? '<td>'+value+'</td>' : '<th scope="row">'+value+'</th>').join("")+'</tr>';
  });
  $("comparisonAnalysis").innerHTML = '<div class="result-explanation"><h3>'+t("conclusion")+'</h3><p>'+demandText+closureText+weatherText+'</p></div><h3>'+t("periodAnalysis")+'</h3><div class="table-wrap" tabindex="0">'+table([t("indicator"),t("reference"),t("scenario"),t("difference")],rows.map(row))+'</div>'
    + '<h3>'+t("modelFactors")+'</h3><p>'+t("factorNote")+'</p><div class="table-wrap" tabindex="0">'+table([t("indicator"),t("demandEffect"),t("hoursEffect")],factors)+'</div><details class="hourly-details"><summary>'+t("hourlyDetails")+'</summary><div class="table-wrap" tabindex="0">'+table([t("period"),t("reference"),t("scenario"),t("loadBefore"),t("loadAfter"),t("difference")],hourlyRows)+'</div></details>';
}

function stopComparison() {
  clearInterval(comparisonTimer);
  comparisonTimer = null;
  $("playComparison").textContent = t("playComparison");
}

function finishComparison() {
  stop();
  stopComparison();
  comparisonStep = active.duration;
  analysisVisible = true;
  drawComparisonMoment();
  drawAnalysis(windowReadings(null),windowReadings(active));
}

function resetComparison() {
  stopComparison();
  comparisonStep = 0;
  analysisVisible = false;
}

function drawPanels() {
  $("time").max = span()-1;
  $("time").disabled = span() === 1;
  $("play").disabled = span() === 1 && !active;
  $("periodNote").textContent = t("forecastWindow") + " · " + stamp(0) + " — " + stamp(span()-1);
  $("weatherStatus").textContent = liveCount ? number(liveCount) + " " + t("weatherLive") : t("weatherProxy");
  drawCockpit();
  drawMatrix();
  drawExposure();
  drawPlot();
  drawComparison();
  drawMoment();
  if (typeof renderStudies === "function" && typeof studiesReady !== "undefined" && studiesReady) renderStudies();
}

function drawCockpit() {
  $("quickTarget").value = selected;
  $("reset").disabled = !active;
  for (const button of $("presets").children) {
    button.setAttribute("aria-pressed",active?.kind === button.dataset.preset && active.segment === selected);
  }
  $("activeSummary").textContent = active
    ? t(active.kind) + " · " + name(active.segment) + " · " + t("activeAt") + " " + stamp(active.start) + " · " + number(active.duration) + " " + t("hourCount")
    : "";
}

function drawCapacity() {
  const capacity = segments[Number($("target").value)][2];
  const remaining = Math.round(capacity * (1 - Number($("closure").value)/100));
  $("capacityExample").textContent = lang
    ? "Capacity is how many vehicles this segment can serve per hour in the simulation. This setting changes it from " + number(capacity) + " to " + number(remaining) + " vehicles/hour."
    : "السعة هي عدد المركبات التي يستوعبها المقطع في الساعة في المحاكاة. بهذا الإعداد تتغير من " + number(capacity) + " إلى " + number(remaining) + " مركبة/ساعة.";
}

function runScenario(settings, showMap = false) {
  stop();
  active = settings;
  resetComparison();
  selectChart("scenario");
  selected = settings.segment;
  index = settings.start;
  compare = true;
  syncEditor(settings);
  drawPanels();
  if (showMap) {
    $("scenario").focus({preventScroll:true});
    $("mapCard").scrollIntoView({block:"start"});
  }
}

function stop() {
  clearInterval(timer);
  timer = null;
  $("play").textContent = t(active && compare ? "playComparison" : "play");
}

function syncEditor(config = null) {
  $("target").value = config?.segment ?? selected;
  $("start").min = localInput(0);
  $("start").max = localInput(span()-1);
  $("start").value = localInput(config?.start ?? index);
  $("duration").value = config?.duration ?? Math.min(3,span()-index);
  $("rain").value = config?.rain ?? "";
  $("temp").value = config?.temp ?? "";
  $("closure").value = config?.closure ?? 0;
  $("message").textContent = "";
  drawCapacity();
}

function showEditor(show) {
  $("editor").hidden = !show;
  $("what").setAttribute("aria-expanded",show);
  if (show) {
    stop();
    syncEditor(active?.segment === selected ? active : null);
    $("editor").scrollIntoView({block:"nearest"});
    $("target").focus();
  } else {
    $("what").focus();
  }
}

function localize() {
  const locale = lang ? "en-GB" : "ar-SA";
  const zone = {timeZone:"Asia/Riyadh",calendar:"gregory",hourCycle:"h23"};
  formatter = new Intl.NumberFormat(locale,{maximumFractionDigits:1});
  dateFormat = new Intl.DateTimeFormat(locale,{...zone,year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
  groupFormat = new Intl.DateTimeFormat(locale,span() <= 48 ? {...zone,hour:"2-digit",minute:"2-digit"} : {...zone,month:"short",day:"numeric"});
  document.documentElement.lang = lang ? "en" : "ar";
  document.documentElement.dir = lang ? "ltr" : "rtl";
  document.querySelectorAll("[data-t]").forEach(element => element.textContent = t(element.dataset.t));
  document.querySelectorAll("[data-aria]").forEach(element => element.setAttribute("aria-label",t(element.dataset.aria)));
  $("lang").textContent = lang ? "العربية" : "English";
  $("comparisonSpeed").value = playbackSpeed;
  $("credits").textContent = lang ? "Naif · Ibrahim · Abdullah" : "نايف · إبراهيم · عبدالله";
  $("horizon").innerHTML = horizons.map((entry,i) => '<option value="'+i+'">'+entry[2+lang]+'</option>').join("");
  $("horizon").value = horizon;
  const target = $("target").value || selected;
  $("target").innerHTML = segments.map((_,i) => '<option value="'+i+'">'+name(i)+'</option>').join("");
  $("target").value = target;
  $("quickTarget").innerHTML = $("target").innerHTML;
  $("time").setAttribute("aria-label",t("timeline"));
  $("presets").innerHTML = Object.entries(presets).map(([kind,[,,icon]]) =>
    '<button class="preset" type="button" data-preset="'+kind+'"><span class="preset-icon" aria-hidden="true">'+icon+'</span><span><strong>'+t(kind)+'</strong><small>'+t(kind+"Hint")+'</small></span></button>').join("");
  drawCapacity();
  makeMap();
  selectChart(chartMode);
  drawPanels();
  if (comparisonTimer) $("playComparison").textContent = t("pause");
}

$("comparisonSpeed").onchange = () => {
  const playing = Boolean(comparisonTimer);
  stopComparison();
  playbackSpeed = Number($("comparisonSpeed").value);
  if (playing) $("playComparison").click();
};
$("exportComparison").onclick = () => {
  if (!active) return;
  const headings = ["Segment","Scenario","Start (Asia/Riyadh)","End (Asia/Riyadh)","Baseline vehicles","Scenario vehicles",
    "Difference vehicles","Baseline capacity veh/h","Scenario capacity veh/h","Baseline load %","Scenario load %","Baseline rain mm/h","Scenario rain mm/h","Baseline temp C","Scenario temp C"];
  const baseline = windowReadings(null);
  const rows = baseline.map((point,i) => {
    const changed = calculate(active.segment,active.start+i,active);
    const round = value => Math.round(value*100)/100;
    return [segments[active.segment][4],active.kind,localInput(active.start+i),localInput(active.start+i+1),
      round(point.volume),round(changed.volume),round(changed.volume-point.volume),round(point.capacity),round(changed.capacity),
      point.capacity ? round(point.ratio*100) : "Closed",changed.capacity ? round(changed.ratio*100) : "Closed",point.rain,changed.rain,point.temp,changed.temp];
  });
  const quote = value => '"'+String(value).replaceAll('"','""')+'"';
  const csv = "\ufeff" + [headings,...rows].map(row => row.map(quote).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
  const link = document.createElement("a");
  link.href = url;
  link.download = "MASAR-scenario-"+localInput(active.start).slice(0,10)+".csv";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url),1000);
};

function saveSession() {
  try {
    sessionStorage.setItem("masar-session",JSON.stringify({anchor:DATA.start,lang,horizon,selected,index,active,compare,chartMode,comparisonStep,analysisVisible,playbackSpeed}));
    localStorage.setItem("masar-language",lang ? "en" : "ar");
  } catch {
    // The simulation remains usable when browser storage is restricted.
  }
}

function restoreSession() {
  try {
    lang = localStorage.getItem("masar-language") === "en" ? 1 : 0;
    const saved = JSON.parse(sessionStorage.getItem("masar-session"));
    if (!saved || saved.anchor !== DATA.start) return;
    const integer = (value,max) => Number.isInteger(value) && value >= 0 && value <= max;
    if (!integer(saved.horizon,horizons.length-1) || !integer(saved.selected,segments.length-1)) return;
    horizon = saved.horizon;
    selected = saved.selected;
    index = integer(saved.index,span()-1) ? saved.index : 0;
    playbackSpeed = [1,2,4].includes(saved.playbackSpeed) ? saved.playbackSpeed : 1;
    const config = saved.active;
    const optional = (value,min,max) => value === null || Number.isFinite(value) && value >= min && value <= max;
    if (config && ["custom",...Object.keys(presets)].includes(config.kind) && integer(config.segment,segments.length-1)
        && integer(config.start,span()-1) && integer(config.duration,168) && config.duration > 0 && config.start+config.duration <= span()
        && optional(config.rain,0,20) && optional(config.temp,-20,65) && Number.isFinite(config.closure) && config.closure >= 0 && config.closure <= 100) {
      active = {kind:config.kind,segment:config.segment,start:config.start,duration:config.duration,rain:config.rain,temp:config.temp,closure:config.closure};
      compare = saved.compare === true;
      chartMode = saved.chartMode === "scenario" ? "scenario" : "baseline";
      comparisonStep = integer(saved.comparisonStep,config.duration) ? saved.comparisonStep : 0;
      analysisVisible = saved.analysisVisible === true && comparisonStep === config.duration;
    }
  } catch {
    // Invalid or expired saved state is ignored.
  }
}
window.addEventListener("pagehide",saveSession);

$("baselineChart").onclick = () => { stopComparison(); selectChart("baseline"); };
$("scenarioChart").onclick = () => selectChart("scenario");
$("scenarioResultsLink").onclick = () => selectChart("scenario");
$("showAnalysis").onclick = finishComparison;
$("playComparison").onclick = () => {
  stop();
  if (!active) return;
  if (comparisonTimer) { stopComparison(); return; }
  if (comparisonStep === active.duration) comparisonStep = 0;
  analysisVisible = false;
  $("comparisonAnalysis").hidden = true;
  $("comparisonHighlights").hidden = true;
  $("playComparison").textContent = t("pause");
  drawComparisonMoment();
  comparisonTimer = setInterval(() => {
    comparisonStep++;
    if (comparisonStep === active.duration) finishComparison();
    else drawComparisonMoment();
  },Math.max(50,Math.min(1200,12000/active.duration)/playbackSpeed));
};

$("lang").onclick = () => { stop(); lang = 1-lang; $("message").textContent = ""; localize(); };
$("horizon").onchange = () => {
  stop();
  resetComparison();
  horizon = Number($("horizon").value);
  index = Math.min(index,span()-1);
  if (active?.kind === "custom" && active.start + active.duration > span()) { active = null; compare = false; }
  if (active && active.kind !== "custom") {
    active = preset(active.kind,active.segment);
    if (compare) index = active.start;
  }
  localize();
  syncEditor(active?.start < span() ? active : null);
};
$("time").oninput = () => { stop(); index = Number($("time").value); drawMoment(); };
$("play").onclick = () => {
  if (active && compare) {
    selectChart("scenario");
    $("forecast").scrollIntoView({block:"start"});
    $("playComparison").focus({preventScroll:true});
    if (!comparisonTimer) $("playComparison").click();
    return;
  }
  stopComparison();
  if (timer) { stop(); return; }
  $("play").textContent = t("pause");
  if (index === span()-1) { index = 0; drawMoment(); }
  timer = setInterval(() => {
    index = Math.min(span()-1,index + Math.max(1,Math.floor(span()/110)));
    drawMoment();
    if (index === span()-1) stop();
  },420);
};
$("quickTarget").onchange = () => selectSegment(Number($("quickTarget").value));
$("target").onchange = $("closure").onchange = drawCapacity;
$("scenarioHour").onclick = () => {
  if (!active) return;
  stop();
  index = active.start;
  compare = true;
  selectSegment(active.segment);
  $("scenario").focus({preventScroll:true});
};
$("peakJump").onclick = () => {
  stop();
  const peak = nextPeak();
  if (peak < 0) return;
  index = peak;
  drawMoment();
};
$("presets").onclick = event => {
  const button = event.target.closest("button[data-preset]");
  if (!button) return;
  runScenario(preset(button.dataset.preset,selected),window.matchMedia("(max-width: 680px)").matches);
};
$("what").onclick = () => showEditor($("editor").hidden);
$("close").onclick = () => showEditor(false);
$("ref").onclick = () => { compare = false; drawMoment(); drawMatrix(); };
$("scenario").onclick = () => { if (active) { compare = true; drawMoment(); drawMatrix(); } };
$("form").onsubmit = event => {
  event.preventDefault();
  const start = (Date.parse($("start").value + "+03:00") - origin) / HOUR;
  if (!Number.isInteger(start) || start < 0 || start >= span()) {
    $("message").textContent = t("invalid");
    return;
  }
  const rain = $("rain").value === "" ? null : Number($("rain").value);
  const temp = $("temp").value === "" ? null : Number($("temp").value);
  const closure = Number($("closure").value);
  if (rain === null && temp === null && !closure) {
    $("message").textContent = t("empty");
    return;
  }
  const duration = Number($("duration").value);
  if (start + duration > span()) {
    $("message").textContent = t("customDuration");
    return;
  }
  const segment = Number($("target").value);
  $("editor").hidden = true;
  $("what").setAttribute("aria-expanded",false);
  runScenario({kind:"custom",segment,start,duration,rain,temp,closure},true);
};
$("reset").onclick = () => {
  stop();
  active = null;
  resetComparison();
  selectChart("baseline");
  compare = false;
  syncEditor();
  drawPanels();
};
$("matrix").onclick = event => {
  const button = event.target.closest("button[data-kind]");
  if (!button) return;
  const kind = button.dataset.kind;
  runScenario(kind === "custom" ? active : preset(kind,Number(button.dataset.index)),true);
};



async function updateWeather() {
  if (Math.abs(Date.now() - origin) > 48 * HOUR) return;
  try {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=16.8892&longitude=42.5611&timezone=Asia%2FRiyadh&forecast_days=3&hourly=temperature_2m,precipitation",{signal:AbortSignal.timeout(6500)});
    if (!response.ok) return;
    const {hourly} = await response.json();
    const hours = new Map(hourly.time.map((time,i) => [time,[hourly.temperature_2m[i],hourly.precipitation[i]]]));
    for (let i = 0; i < 48; i++) {
      const wx = hours.get(localInput(i));
      if (wx && wx.every(Number.isFinite) && wx[0] >= -20 && wx[0] <= 65 && wx[1] >= 0) {
        [DATA.temp[i],DATA.rain[i]] = wx;
        liveCount++;
      }
    }
    drawPanels();
  } catch {
    // A downloaded preview also works offline with the labeled illustrative weather.
  }
}
