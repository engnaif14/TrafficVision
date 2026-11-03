# نشر TrafficVision على الإنترنت — دليل مبسط

**قبل البدء:** هذه النسخة جاهزة من ناحية الكود لتجربة النشر، لكنها ليست منشورة تلقائيًا. إنشاء رابط عام يتطلب الدخول إلى حساب GitHub وحساب Render الخاصين بك. **لا ترسل كلمة المرور أو رمز التحقق لأي شخص.**

## 1) فك الضغط

فك ضغط `TrafficVision_Public_Ready_v3.zip` وافتح المجلد الذي بداخله `app.py` و`requirements.txt` و`render.yaml`. **ارفع الملفات والمجلدات الداخلية كلها**، ولا ترفع ZIP كملف وحيد على GitHub.

## 2) GitHub

1. افتح https://github.com/new وسجّل الدخول.
2. اختر اسم مستودع مثل `trafficvision-jazan`، وأنشئه بدون ملفات إضافية (بدون Initialize README).
3. من صفحة المستودع، اختر **uploading an existing file** أو **Add file → Upload files**.
4. اسحب **جميع محتويات مجلد المشروع** (ملفات `app.py` و`render.yaml` ومجلدي `data` و`static` و`tests` وغيرها) إلى منطقة الرفع. تأكد أن أسماء المجلدات والمسارات محفوظة، وأن `app.py` في **جذر** المستودع لا داخل مجلد إضافي.
5. اختر **Commit changes**. إذا لم يحافظ المتصفح على المجلدات، استخدم GitHub Desktop لرفع المجلد كاملًا بدل إنشاء ملفات ناقصة.

## 3) Render

1. افتح https://dashboard.render.com/ وسجّل الدخول.
2. اختر **New → Web Service** (مهم: ليس Static Site).
3. اربط حساب GitHub والمستودع `trafficvision-jazan`.
4. تحقق من القيم:

| الإعداد | القيمة |
|---|---|
| Language / Runtime | Python |
| Root Directory | اتركه فارغًا إذا كان `app.py` في جذر المستودع |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `gunicorn app:application --workers 1 --threads 2 --bind 0.0.0.0:$PORT --timeout 90` |
| Health Check Path | `/api/health` |
| Python version | `3.12.10`، من `.python-version` و`render.yaml` |
| Plan | Free إذا متاح وتناسبك قيوده |

5. اضغط **Create Web Service**. إذا ظهر خيار استخدام `render.yaml` أو Blueprint، يمكن استعماله بدل إدخال الأوامر يدويًا.
6. افتح الرابط الذي يولّده Render من النوع `https://...onrender.com/`. **لا يوجد اسم رابط محدد قبل اكتمال النشر.**

## 4) افحص الموقع المنشور

افتح الرابط من جوالك خارج شبكة الكمبيوتر. تحقّق من:
- `/api/health` يعيد `"ok": true`.
- الصفحة الرئيسية تظهر، والقائمة تتنقل بين الأقسام الخمسة.
- اختر **محاكاة مدينة جيزان**؛ اختر الطريق وغيّر الساعة؛ يجب أن تتغير الأرقام والرسم.
- **الطقس**: إذا لم يُرجع Open-Meteo بيانات، يجب ظهور رسالة واضحة بدل أرقام مزيفة؛ افحص سجل Render في حال وجود 503.
- **تاريخ مرور I‑94**: تغيير التاريخ يحدّث الجدول، واختبار العينة يعمل.

## ملاحظات مهمة

- Render Free قد يوقف التطبيق عند الخمول؛ فتحه بعد ذلك قد يستغرق وقتًا إضافيًا. هذا لا يعني بالضرورة وجود خطأ.
- لا ترفع ملفات `.env` أو كلمات المرور ولا تعدّل بيانات المرور الاصطناعية لتبدو كقياسات حقيقية.
- بمجرد اكتمال النشر، أرسل رابط Render لفحصه من الخارج. تجربة التشغيل المحلي لا تثبت وحدها أن الاستضافة ناجحة.

## Official links

- https://render.com/docs/web-services
- https://render.com/docs/free
- https://render.com/docs/python-version
