# TrafficVision 3.0 — Graduation Project

**A lightweight research web application with distinct data sources.**

## ماذا يوجد في الموقع؟

**1. لوحة المتابعة (Dashboard):** ملخص بسيط لتوقعات الطقس القادمة عبر Open-Meteo، وبجواره مثال لتنبؤ مروري تاريخي على الطريق I‑94. يوجد توضيح صريح أن بيانات المرور التاريخية ليست من مدينة جيزان.

**2. حركة المرور التاريخية (Historical Traffic):** اختر يومًا من سبتمبر 2018؛ اعرض العدد الفعلي والمتوقع للمركبات في كل ساعة، والخطأ المطلق. يمكنك تنزيل CSV أو نقل ساعة إلى المختبر.

**3. اختبار عينة (Sample Lab):** اختبر قراءة محفوظة، أو أدخل 72–1000 قراءة لحجم المرور بالساعة لتقدير الساعة التالية بواسطة معاملات SARIMA مدرّبة مسبقًا على بيانات I‑94. هذا ليس تدريبًا جديدًا على مدخلاتك ولا تحققًا من دقته على مدينة مختلفة.

**4. محاكاة مدينة جيزان (Jazan City Simulation):** إضافة مستقلة ضمن نفس الموقع، تخص **مدينة جيزان فقط**. توجد ثلاثة سيناريوهات تجريبية (طريق الملك فهد، طريق الملك عبدالعزيز، وسط المدينة الافتراضي). المحاكاة تُنشئ سجلًا اصطناعيًا بموجات يومية واختلاف أيام الأسبوع، ويطبق النظام SARIMA بمعاملات مُقدّرة من سلسلة اصطناعية لإنتاج توقعات الـ48 ساعة القادمة، ويتم تجديدها عند انتقال الساعة. يمكن اختيار الطريق والساعة، وتُعرض درجة حرارة جيزان من Open-Meteo إن كانت متاحة. **كل أرقام المرور هنا مفترضة وغير مقاسة في جيزان.**

**5. شرح المنصة والمصادر:** شرح قصير للأقسام، الروابط الأصلية، وتعريف MAE وRMSE وحدود النتائج.

### نقطة مهمة للدكتور

- **المرور المقاس فعليًا في هذا المشروع هو I‑94 (Minnesota, USA) تاريخيًا من 2012–2018**، وليس مرور جيزان.
- **طقس جيزان** يأتي من مزود توقعات خارجي Open-Meteo؛ عند تعذر الوصول لا تُعرض أرقام جوية مختلقة.
- **محاكاة المرور في جيزان** قيم مولّدة اصطناعيًا بافتراضات بحثية وليست معايرة محلية. مراجع المدينة والمنهجية تدعم اختيار النطاق وبنية التغير الزمني **ولا تدعم المقادير الافتراضية للطرق**.
- **SARIMA** مستخدم للتجربة المرورية؛ الطقس معروض بجواره فقط ولا يدخل حساب الترافيك في نسخة المحاكاة.
- **MAE/RMSE على محاكاة جيزان** هما أخطاء اختبار على بيانات اصطناعية محجوبة، لا إثبات لدقة التوقع على الطريق الحقيقي. عدد المركبات/ساعة ≠ الازدحام المقاس أو سرعة المركبات.

### Sources | المصادر

- [UCI Metro Interstate Traffic Volume](https://archive.ics.uci.edu/dataset/492/metro+interstate+traffic+volume)
- [Open-Meteo Weather API](https://open-meteo.com/en/docs)
- [Jazan City Profile — UN-Habitat](https://unhabitat.org/jazan-city-profile)
- [FHWA Traffic Monitoring Guide: temporal factors](https://www.fhwa.dot.gov/policyinformation/tmguide/tmg_2022/traffic-data-methodologies.cfm)

## تشغيل على Windows

بعد فك الضغط، افتح `START_WINDOWS.bat`. يفضّل تلقائيًا Python **3.12** إذا ثُبّت باستخدام Python Install Manager. عند تشغيل الخادم افتح `http://localhost:8000`.

بديل أوامر التشغيل (Windows PowerShell/CMD):

```bat
py -3.12 -m pip install -r requirements.txt
py -3.12 app.py
```

## الاختبارات

```bat
py -3.12 -m unittest discover -s tests -v
```

**الحزمة تضمنت 19 اختبارًا آليًا تم اجتيازها محليًا أثناء إعداد الإصدار**، مع اختبار تفاعل الواجهة على محاكاة متصفح سطح مكتب وجوال (الاستجابة، التبويبات، تغيير الطريق/الساعة). هذه ليست شهادة بخلو النشر الفعلي من المشاكل. اختبار الشبكة الخارجية الحي واستضافة Render النهائية لا بد من التحقق منهما بعد النشر.

## النشر العام

اقرأ `DEPLOY_RENDER_AR.md`؛ التطبيق يحتاج **Render Web Service** (ليس Static Site) لأن التنبؤات والـAPI تعمل في Python على الخادم. `render.yaml` و`.python-version` مجهزان. لا يحتوي الملف على مفاتيح أو بيانات دخول سرية.

---

## English summary

TrafficVision has five sections: dashboard (third-party future weather + historical I-94 example), I-94 September 2018 historical traffic validation, single-sample/manual testing with saved SARIMA parameters, a separate **Jazan City-only synthetic-traffic simulation** (48-hour SARIMA forecasts on hypothetical volumes), and a simple sources/usage guide. All traffic numbers shown for Jazan are **not observed**; synthetic-test MAE/RMSE do not validate Jazan roads. Weather is third-party forecast data and is not an exogenous input into the current Jazan SARIMA. Deploy via Render Python Web Service with GitHub; see the Arabic deploy guide. 
