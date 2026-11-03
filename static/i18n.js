/* Arabic/English UI localization, including asynchronous API output. */
(()=>{
 const dictionary={
 "WORKSPACE / مساحة العمل": "WORKSPACE",
 "لوحة المتابعة": "Dashboard",
 "حركة المرور التاريخية": "Historical traffic",
 "اختبار عينة": "Sample testing",
 "محاكاة مدينة جيزان": "Jazan city simulation",
 "شرح المنصة والمصادر": "Platform guide & sources",
 "بانتظار الاتصال": "Waiting for connection",
 "تطبيق بحثي للتنبؤات، مع فصل واضح بين الأرصاد المباشرة وتجربة الترافيك التاريخية.": "A research forecasting application with live weather and a separate historical traffic experiment.",
 "إظهار القائمة": "Show menu",
 "رؤية أوضح للطقس": "A clearer view of weather",
 "وحركة": "and",
 "المرور.": "traffic.",
 "الطقس المستقبلي، وتجربة التنبؤ بمرور I‑94 التاريخي، ومحاكاة مستقلة لمدينة جيزان — كل مصدر موضح بوضوح.": "Future weather, historical I‑94 traffic forecasting, and an independent Jazan city simulation, with clearly identified sources.",
 "استكشف حركة المرور": "Explore traffic",
 "اختبر عينة بنفسك ↗": "Test a sample ↗",
 "OVERVIEW / نظرة شاملة": "OVERVIEW",
 "التنبؤات في مكان واحد": "Forecasts in one place",
 "مصدران مختلفان، مع توضيح توقيت كل بيانات": "Separate sources with clear timestamps",
 "توقعات الطقس القادمة": "Upcoming weather forecast",
 "بانتظار بيانات الأرصاد": "Waiting for weather data",
 "احتمال هطول الأمطار": "Chance of rain",
 "الساعة التالية في المدينة المختارة": "Next hour in the selected city",
 "طقس متوقع · ليس رصدًا": "Weather forecast · not an observation",
 "توقع المرور في العينة التاريخية": "Historical sample traffic forecast",
 "30 سبتمبر 2018": "30 September 2018",
 "توقعات الطقس بالساعات القادمة": "Hourly weather forecast",
 "التوقع الجوي يتحدث من مزود خارجي عند فتح الصفحة.": "Weather updates from an external provider when the page opens.",
 "مدينة الطقس": "Weather location",
 "جازان، السعودية": "Jazan, Saudi Arabia",
 "مينيسوتا، أمريكا": "Minnesota, USA",
 "تحديث بيانات الطقس": "Refresh weather",
 "يتم الاتصال بالأرصاد الجوية...": "Connecting to the weather provider...",
 "تحميل توقعات الأرصاد...": "Loading weather forecast...",
 "المصدر": "Source",
 "مرور الطريق I‑94 · يوم تاريخي": "I‑94 traffic · historical day",
 "تنبؤات محسوبة باستخدام البيانات السابقة، مقابل الواقع المسجل.": "Forecasts based on earlier readings, compared with recorded observations.",
 "تحميل الرسم...": "Loading chart...",
 "المتوقع": "Predicted",
 "الفعلي": "Actual",
 "هذه بيانات اختبار تاريخية من الولايات المتحدة، وليست مرور جازان اليوم.": "Historical test data from the USA, not present-day Jazan traffic.",
 "استكشف يومًا آخر ←": "Explore another day →",
 "إضافة مستقلة · بيانات اصطناعية": "Independent module · synthetic data",
 "سيناريوهات حركة مرور تعليمية مبنية على افتراضات معلنة، مع توقع SARIMA لـ48 ساعة. ليست عدًّا فعليًا للمركبات.": "Educational traffic scenarios based on stated assumptions, with a 48-hour SARIMA forecast. These are not real vehicle counts.",
 "افتح محاكاة جيزان ←": "Open Jazan simulation →",
 "الموقع على الخريطة": "Location on the map",
 "جازان · موقع معاينة الطقس": "Jazan · weather location",
 "مينيسوتا · موقع معاينة الطقس": "Minnesota · weather location",
 "الخريطة تحدد موقع الأرصاد فقط. لا تسحب تلقائيًا سرعات أو ازدحام Google Maps.": "The map shows the weather location only. It does not retrieve speeds or congestion from Google Maps.",
 "عرض الموقع في Google Maps ↗": "View in Google Maps ↗",
 "خريطة المدينة المختارة": "Map of the selected city",
 "خريطة توضح موقع المدينة": "Map showing the city location",
 "التمييز ضروري:": "Data distinction:",
 "الطقس المعروض توقع مستقبلي للمدينة المختارة، أما مرور الطريق I‑94 فهو إعادة اختبار لتنبؤات على بيانات فعلية من سبتمبر 2018. لا نعرض بيانات مرور مباشرة من جازان، ولا نساوي حجم المركبات بالازدحام.": "Weather is a future forecast for the selected city. I‑94 traffic is a historical forecasting evaluation using real September 2018 data. We do not show live Jazan traffic or equate traffic volume with congestion.",
 "استكشف بيانات المرور": "Explore traffic data",
 "اختر يومًا من سبتمبر 2018، وراقب كيف تبدو التوقعات مقابل حجم المركبات المسجل ساعة بساعة على I‑94.": "Choose a day in September 2018 to compare hourly forecasts with recorded I‑94 vehicle volumes.",
 "التاريخ التاريخي": "Historical date",
 "عرض اليوم المختار ↗": "Show selected day ↗",
 "إجمالي المركبات الفعلي لهذا اليوم": "Total actual vehicles for the day",
 "مركبة / يوم (مجموع التوقعات)": "vehicles / day (sum of forecasts)",
 "مركبة / يوم": "vehicles / day",
 "إجمالي المركبات المتوقع لهذا اليوم": "Total predicted vehicles for the day",
 "متوسط الخطأ اليومي": "Daily mean absolute error",
 "مركبة / ساعة": "vehicles / hour",
 "التوقع والقياس الفعلي": "Predicted vs. actual readings",
 "القراءات الفعلية متاحة للمقارنة في سبتمبر 2018.": "Actual readings are available for comparison in September 2018.",
 "النتائج بالساعة": "Hourly results",
 "الأرقام من ملف الاختبار؛ تستطيع اختيار أي ساعة لنقلها إلى مختبر العينات.": "Values come from the test dataset. Select any hour to test it in the sample lab.",
 "تنزيل CSV ↓": "Download CSV ↓",
 "الخطأ المطلق": "Absolute error",
 "الساعة": "Hour",
 "SANDBOX / اختبار التنبؤ": "SANDBOX / FORECAST TESTING",
 "جرّب التنبؤ بنفسك": "Try forecasting yourself",
 "البيانات التاريخية معبأة مسبقًا. تستطيع اختبار ساعة محددة، أو إدخال قراءات مرور متتالية لتوقّع الساعة التي تليها.": "Historical data is prefilled. Test a specific hour or enter consecutive traffic readings to forecast the next hour.",
 "اختبار عينة جاهزة": "Test a historical sample",
 "اختر سجلًا حقيقيًا من المجموعة الاختبارية.": "Choose a real record from the test dataset.",
 "عينات مقترحة": "Suggested samples",
 "اختر عينة...": "Choose a sample...",
 "التاريخ والساعة": "Date and time",
 "اختبار العينة ↗": "Test sample ↗",
 "ستظهر هنا القراءة المتوقعة والفعلية ومدى الاختلاف بينهما.": "The predicted reading, actual reading, and their difference will appear here.",
 "اختبار بياناتك الخاصة": "Test your own data",
 "أدخل قراءات مرور متتالية بالساعة (72 قراءة على الأقل)، ثم تنبأ بالساعة التالية.": "Enter consecutive hourly traffic readings (at least 72), then forecast the next hour.",
 "قائمة القراءات (سطر واحد لكل ساعة)": "Readings (one line per hour)",
 "مثال: 1800": "Example: 1800",
 "تعبئة بيانات تاريخية تلقائيًا": "Fill with historical readings",
 "ملف عينة للتجربة ↓": "Download sample file ↓",
 "رفع CSV": "Upload CSV",
 "توقع الساعة التالية ↗": "Forecast next hour ↗",
 "أدخل أو ارفع قراءات متتابعة لاختبار عينة جديدة.": "Enter or upload consecutive readings to test a new sample.",
 "لا تُستخدم قراءات الطقس في هذا الاختبار المروري؛ تظهر توقعات الطقس في القسم المستقل أعلاه. الصيغة المسموحة: رقم في كل سطر، أو ملف CSV بعمود": "Weather readings are not inputs to this traffic test. Weather forecasts appear in their separate section. Use one number per line or a CSV file with the column",
 "هذا المختبر لا يختلق مرورًا حقيقيًا لمدينة جديدة. التوقع لمدخلاتك تجربة بحثية تحتاج بيانات فعلية من نفس المنطقة للتحقق من الدقة.": "This lab does not invent real traffic for a new city. Forecasts from your inputs are research experiments that need real local data to validate accuracy.",
 "محاكاة حركة المرور في مدينة جيزان": "Jazan city traffic simulation",
 "قسم تجريبي مستقل يوضح كيف يمكن تطبيق التنبؤ عند عدم توفر عدّادات مرور محلية. يشمل مدينة جيزان فقط، وليس منطقة جازان بأكملها.": "An independent experimental module demonstrating forecasting without local traffic counters. It covers Jazan city only, not the entire Jazan region.",
 "هذه أرقام محاكاة وليست مرورًا فعليًا.": "These are simulated values, not real traffic.",
 "حجم المركبات المفترض وأنماط الحركة أمثلة هندسية للتجربة، وليست قياسات أو أعدادًا موثقة على طرق جيزان. الطقس الحقيقي منفصل عن النموذج المروري.": "Assumed volumes and traffic patterns are engineering examples, not measured or verified Jazan road counts. Real weather is separate from the traffic model.",
 "موقع المحاكاة": "Simulation location",
 "اختر محور المحاكاة": "Choose a simulation route",
 "تحميل المواقع...": "Loading locations...",
 "تحميل توقعات المحاكاة...": "Loading simulation forecast...",
 "حجم المرور المتوقع": "Predicted traffic volume",
 "مركبة/ساعة · محاكاة": "vehicles/hour · simulation",
 "الساعة المختارة بتوقيت السعودية": "Selected hour · Saudi time",
 "اختر وقتًا من الرسم": "Select a time on the chart",
 "حالة الطقس المتوقعة": "Forecast weather",
 "من Open-Meteo، لا يدخل في توقع SARIMA": "From Open-Meteo; not an input to SARIMA",
 "توقع مرور افتراضي للساعات الـ48 القادمة": "Simulated traffic forecast for the next 48 hours",
 "كل نقطة تمثل تقدير عدد مركبات خلال ساعة واحدة، وليست درجة ازدحام.": "Each point estimates vehicle volume in one hour, not a congestion level.",
 "SARIMA · مثال بحثي": "SARIMA · research example",
 "الرسم البياني لتوقع حركة المرور الاصطناعية": "Synthetic traffic forecast chart",
 "اختيار الساعة": "Select hour",
 "حدد ساعة التنبؤ": "Select forecast hour",
 "كيف تُحسب الأرقام؟": "How are the values calculated?",
 "أنشأنا سجل مرور اصطناعيًا بأنماط ساعات الذروة واختلاف أيام الأسبوع، ثم استخدمنا معاملات SARIMA المقدّرة على بيانات اصطناعية لإنتاج توقع الـ48 ساعة القادمة.": "We generated synthetic traffic with peak-hour and weekday patterns, then used SARIMA parameters fitted on synthetic data to forecast the next 48 hours.",
 "مستويات المرور والأرقام المرجعية افتراضات بحثية، وليست مأخوذة من عدادات مدينة جيزان.": "Traffic levels and reference values are research assumptions, not readings from Jazan city counters.",
 "هل التوقع دقيق في جيزان؟": "Is this forecast accurate for Jazan?",
 "ستظهر نتائج الاختبار على البيانات الاصطناعية هنا.": "Evaluation results on synthetic data appear here.",
 "MAE = متوسط الخطأ المطلق، وRMSE = جذر متوسط مربع الخطأ. هذه القيم تقيس أداء المحاكاة على بيانات مشابهة مصطنعة، ولا تثبت الدقة على طرق جيزان.": "MAE means mean absolute error; RMSE means root mean squared error. These measure simulation performance on similar synthetic data and do not establish accuracy on Jazan roads.",
 "المراجع وحدود النموذج · اقرأ المزيد": "References and model limits · read more",
 "استُخدم تقرير UN-Habitat لتحديد نطاق مدينة جيزان وسياقها العمراني، وإرشادات FHWA كمصدر لمبدأ التغير المروري عبر الساعات والأيام.": "The UN-Habitat report informs the Jazan city scope and urban context. FHWA guidance supports the principle of hourly and daily traffic variation.",
 "لم تُستخرج أعداد مركبات محلية من هذه المراجع.": "No local vehicle counts were extracted from these references.",
 "تعرض خدمة Open-Meteo طقسًا متوقعًا منفصلًا، ولا تُستخدم هذه القراءات في حساب SARIMA هنا.": "Open-Meteo provides a separate weather forecast; these readings are not inputs to SARIMA here.",
 "السيناريو يشمل محور طريق الملك فهد وطريق الملك عبدالعزيز ونطاقًا افتراضيًا لوسط المدينة. وجود اسم طريق لا يعني تركيب عداد فيه، ولا يمكن استنتاج سرعة الطريق أو مدة الرحلة أو مستوى الازدحام من حجم المركبات وحده.": "The scenario includes King Fahd Road, King Abdulaziz Road, and a hypothetical city-centre area. Named roads do not imply installed counters. Volume alone cannot determine speed, travel time, or congestion.",
 "من أين تأتي البيانات؟": "Where does the data come from?",
 "توثيق مباشر لمصادر الأرقام والحدود التي يجب الانتباه لها أثناء عرض مشروع التخرج.": "Sources and limitations to keep in mind when presenting the graduation project.",
 "يطلب الموقع درجات الحرارة واحتمالات المطر والسحب والرياح لكل ساعة من Open-Meteo للمدينة المحددة؛ لا تحفظ بيانات جوية مزيفة عند تعذر الاتصال.": "The site requests hourly temperature, rain probability, cloud cover, and wind from Open-Meteo for the selected city. It does not invent weather if the provider is unavailable.",
 "زيارة مصدر الطقس ↗": "Visit weather source ↗",
 "بيانات الترافيك الأصلية": "Original traffic dataset",
 "UCI Metro Interstate Traffic Volume: قياسات حجم المركبات غرب الطريق I‑94 قرب Minneapolis–Saint Paul بالولايات المتحدة، سجلات بين عامي 2012 و2018.": "UCI Metro Interstate Traffic Volume: westbound I‑94 vehicle volumes near Minneapolis–Saint Paul, USA, recorded between 2012 and 2018.",
 "زيارة مصدر المرور ↗": "Visit traffic source ↗",
 "التقييم والقيود": "Evaluation and limitations",
 "عدد السجلات الخام": "Raw records",
 "الساعات الفريدة في ملف التحليل": "Unique hours in the analysis file",
 "فترة اختبار هذا التطبيق": "Application test period",
 "سبتمبر 2018": "September 2018",
 "قراءات الاختبار": "Test observations",
 "متوسط الخطأ (MAE)": "Mean absolute error (MAE)",
 "جذر متوسط مربع الخطأ (RMSE)": "Root mean squared error (RMSE)",
 "هذه المقاييس خاصة بإعادة اختبار بيانات I‑94 التاريخية. لا تثبت الأداء على جازان أو على بيانات مرور عام 2026. لا نستدل من حجم المرور وحده على سرعة المركبات أو تأخر الرحلات.": "These metrics apply to the historical I‑94 evaluation. They do not establish performance in Jazan or on 2026 traffic. Volume alone does not indicate vehicle speed or travel delay.",
 "دليل سريع لاستخدام الموقع": "Quick start guide",
 "اختر القسم الذي تحتاجه من القائمة. كل قسم يوضح نوع بياناته في الأعلى، ويمكنك فتح الشرح المختصر عند الحاجة.": "Choose a section from the menu. Each section identifies its data type, with a short explanation available when needed.",
 "تعرض توقعات الطقس القادمة من Open-Meteo، ومثالًا منفصلًا لمقارنة التنبؤ بالمرور مع قياسات I‑94 التاريخية. لا تخلط بين المدينتين.": "Shows upcoming Open-Meteo weather and a separate comparison of traffic forecasts with historical I‑94 observations. The two locations are distinct.",
 "اختر أي يوم في سبتمبر 2018 لرؤية المتوقع والفعلي والخطأ لكل ساعة، ويمكنك تنزيل النتائج أو نقل ساعة لمختبر الاختبار.": "Choose a September 2018 day to see hourly predictions, observations, and errors. Download the results or send an hour to the sample lab.",
 "إما تختار سجلًا حقيقيًا من سبتمبر 2018 للمقارنة، أو تضع 72–1000 قراءة حجم مرور بالساعة ليحسب SARIMA توقع الساعة التالية باستخدام معاملات سابقة.": "Compare a real September 2018 record, or enter 72–1000 hourly volume readings for SARIMA to forecast the next hour using previously fitted parameters.",
 "اختر أحد المواقع الافتراضية داخل المدينة وحدد ساعة من 48 ساعة قادمة. النتائج محاكاة وليست عدًا فعليًا ولا قياسًا مباشرًا للازدحام.": "Choose a hypothetical city location and an hour within the next 48 hours. Results are simulated, not real counts or direct congestion measurements.",
 "ملاحظة للدكتور: التطبيق يوصل فكرة عرض توقعات الأرصاد مع التنبؤ بحجم المرور، مع شاشة للتحقق من التوقعات واختبار مدخلات جديدة. الدمج الفعلي بين الأرصاد وحركة المرور في جازان يتطلب بيانات مرورية محلية ومزامنة زمنية بين المصدرين.": "For the supervisor: this application demonstrates weather and traffic-volume forecasting, forecast evaluation, and new-input testing. Combining weather with Jazan traffic requires local traffic data and synchronized timestamps.",
 "تطوير الموقع": "Website developed by",
 "نايف": "Naif",
 "إبراهيم": "Ibrahim",
 "عبدالله": "Abdullah",
 "جاري تحديث محاكاة الساعات القادمة...": "Updating the simulation forecast...",
 "بيانات مرور محاكية · توقع للساعات الـ48 القادمة": "Simulated traffic · forecast for the next 48 hours",
 "تعذر توليد المحاكاة:": "Unable to generate simulation:",
 "غير متاح": "Unavailable",
 "تعذر الاتصال بمصدر الطقس؛ لا نضع بيانات افتراضية": "Weather provider unavailable; no fabricated values are shown",
 "توقع Open-Meteo · مستقل عن مرور المحاكاة": "Open-Meteo forecast · independent of simulated traffic",
 "لا تتوفر بيانات طقس للساعة المختارة": "Weather unavailable for the selected hour",
 "على بيانات اختبار": "On test data",
 "اصطناعية فقط": "synthetic only",
 "مركبة/ساعة": "vehicles/hour",
 "مركبة": "vehicles",
 "طريق الملك فهد": "King Fahd Road",
 "طريق الملك عبدالعزيز": "King Abdulaziz Road",
 "وسط مدينة جيزان (نطاق افتراضي)": "Jazan city centre (hypothetical area)",
 "جارٍ طلب توقعات الطقس من المصدر...": "Requesting weather forecast...",
 "جاري الاتصال": "Connecting",
 "غير متصل": "Offline",
 "متصل": "Connected",
 "الطقس غير متاح مؤقتًا": "Weather temporarily unavailable",
 "لا نعرض بيانات طقس تقديرية محليًا عند انقطاع مصدر الأرصاد. جرب زر التحديث.": "We do not invent weather when the provider is offline. Try refreshing.",
 "بيانات متوقعة لـ": "Forecast for",
 "تحديث المصدر:": "Provider updated:",
 "القادمة": "Next",
 "صحو": "Clear",
 "غيوم": "Cloudy",
 "ضباب": "Fog",
 "رذاذ": "Drizzle",
 "أمطار": "Rain",
 "ثلوج": "Snow",
 "عواصف رعدية": "Thunderstorms",
 "متقلب": "Variable",
 "جازان": "Jazan",
 "جيزان": "Jazan",
 "مينيسوتا": "Minnesota",
 "التوقع التاريخي": "Historical forecast",
 "القراءة الفعلية:": "Actual reading:",
 "الفرق:": "Difference:",
 "الطقس المسجل في العينة:": "Recorded sample weather:",
 "يتم حساب مقارنة العينة...": "Calculating sample comparison...",
 "اختر توقيتًا صحيحًا": "Choose a valid date and time",
 "جاري معالجة السلسلة...": "Processing the series...",
 "توقع الساعة التالية لـ": "Next-hour forecast using",
 "قراءة مستخدمة": "input readings",
 "قراءة غير رقمية:": "Non-numeric reading:",
 "تم تعبئة": "Filled",
 "قراءة حقيقية متتالية من I‑94": "consecutive real I‑94 readings",
 "CSV كبير جدًا؛ الحد 80 كيلوبايت": "CSV too large; maximum 80 KB",
 "الملف فارغ": "The file is empty",
 "تم تحميل": "Loaded",
 "قراءة من CSV. راجع عدد القراءات ثم ابدأ الاختبار.": "CSV readings. Check the count before running the test.",
 "اختبر": "Test",
 "تعذر تحميل بيانات المرور": "Unable to load traffic data",
 "مقارنة توقع عدد المركبات مع القياس الفعلي على مدار اليوم": "Predicted and actual vehicle volumes across the day",
 "تعذر قراءة رد الخادم": "Unable to read the server response",
 "تعذر الاتصال بالخادم": "Unable to connect to the server",
 "الثلاثاء": "Tuesday",
 "الأربعاء": "Wednesday",
 "الخميس": "Thursday",
 "الجمعة": "Friday",
 "السبت": "Saturday",
 "الأحد": "Sunday",
 "الاثنين": "Monday",
 "يناير": "January",
 "فبراير": "February",
 "مارس": "March",
 "أبريل": "April",
 "مايو": "May",
 "يونيو": "June",
 "يوليو": "July",
 "أغسطس": "August",
 "سبتمبر": "September",
 "أكتوبر": "October",
 "نوفمبر": "November",
 "ديسمبر": "December",
 "قراءات مستخدم يدويًا + معاملات تقديرية مستمدة من بيانات I-94": "User-supplied readings + parameters derived from I-94 data",
 "هذا اختبار مدخلات جديد. دون معايرة محلية لا يثبت الدقة في جازان أو أي طريق آخر؛ الطقس معروض بشكل مستقل.": "This is a new-input experiment. Without local calibration it does not establish accuracy in Jazan or on another road. Weather is shown separately.",
 "أدخل من 72 إلى 1000 قراءة مرور متتابعة بالساعة": "Enter 72 to 1000 consecutive hourly traffic readings",
 "يجب أن تكون جميع قراءات المرور أرقامًا": "All traffic readings must be numeric",
 "القيم يجب أن تكون من 0 إلى 100000، دون فراغات": "Values must be between 0 and 100000, without blanks",
 "تعذر حساب توقع مستقر لهذه القراءات": "Unable to calculate a stable forecast for these readings",
 "اختر يومًا من سبتمبر 2018": "Choose a day in September 2018",
 "التاريخ غير صحيح": "Invalid date",
 "لا توجد بيانات لهذا اليوم": "No data for this day",
 "العينة غير موجودة في بيانات الاختبار": "Sample not found in the test data",
 "الموقع غير معروف": "Unknown location"
};
 const entries=Object.entries(dictionary).sort((a,b)=>b[0].length-a[0].length);
 const records=new WeakMap();
 let lang='ar';
 try { lang=localStorage.getItem('trafficvision-language')==='en'?'en':'ar'; } catch(e) {}
 function translate(value){
  const trimmed=value.trim();
  if(dictionary[trimmed])return value.replace(trimmed,dictionary[trimmed]);
  let result=value;
  for(const [ar,en] of entries)if(result.includes(ar))result=result.split(ar).join(en);
  return result.replace(/[٠-٩]/g,c=>String('٠١٢٣٤٥٦٧٨٩'.indexOf(c))).replace(/،/g,',').replace(/ ص(?=\s|$)/g,' AM').replace(/ م(?=\s|$)/g,' PM');
 }
 function text(node){
  if(node.parentElement?.closest('script,style,#language-toggle,textarea,code'))return;
  let record=records.get(node);
  if(!record||node.nodeValue!==record.rendered)record={source:node.nodeValue,rendered:node.nodeValue};
  const value=lang==='en'?translate(record.source):record.source;
  if(node.nodeValue!==value)node.nodeValue=value;
  record.rendered=value;records.set(node,record);
 }
 const attrs=new WeakMap();
 function attribute(el,name){
  let map=attrs.get(el)||{};let r=map[name];let current=el.getAttribute(name);
  if(!r||current!==r.rendered)r={source:current,rendered:current};
  let value=lang==='en'?translate(r.source):r.source;
  if(current!==value)el.setAttribute(name,value);
  r.rendered=value;map[name]=r;attrs.set(el,map);
 }
 function walk(root){
  if(root.nodeType===Node.TEXT_NODE){text(root);return}
  if(root.nodeType!==Node.ELEMENT_NODE)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);while(walker.nextNode())text(walker.currentNode);
  for(const el of [root,...root.querySelectorAll('[aria-label],[title],[placeholder]')])
   for(const name of ['aria-label','title','placeholder'])if(el.hasAttribute(name))attribute(el,name);
 }
 const observer=new MutationObserver(changes=>{
  observer.disconnect();
  for(const change of changes){
   if(change.type==='characterData')text(change.target);
   else if(change.type==='attributes')attribute(change.target,change.attributeName);
   else for(const node of change.addedNodes)walk(node);
  }
  observe();
 });
 function observe(){observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder']})}
 function apply(){
  observer.disconnect();document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  walk(document.body);
  const button=document.getElementById('language-toggle');button.textContent=lang==='ar'?'English':'العربية';button.setAttribute('aria-label',lang==='ar'?'Switch to English':'التبديل إلى العربية');
  button.setAttribute('lang',lang==='ar'?'en':'ar');
  document.querySelector('#clock').textContent=new Intl.DateTimeFormat(lang==='ar'?'ar-SA':'en-GB',{timeZone:'Asia/Riyadh',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date());
  observe();
 }
 document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('language-toggle').addEventListener('click',()=>{lang=lang==='ar'?'en':'ar';try{localStorage.setItem('trafficvision-language',lang)}catch(e){}apply()});
  apply();
 });
})();
