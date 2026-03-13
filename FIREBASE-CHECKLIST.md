# ✅ Firebase Setup Checklist - قائمة التثبيت السريع

## 📋 قبل البدء

- [ ] لديك حساب Firebase (https://firebase.google.com)
- [ ] مشروع `aus-maintenance` مُنشأ
- [ ] Billing مُفعّل (Free tier)
- [ ] لديك صلاحيات GitHub على المستودع

---

## 🔥 الخطوة 1: إنشاء Firestore Database

- [ ] افتح Firebase Console: https://console.firebase.google.com/project/aus-maintenance/firestore
- [ ] اضغط **Create database**
- [ ] اختر **Database ID**: `(default)`
- [ ] اختر **Location**: `asia-south1 (Mumbai)`
- [ ] اضغط **Next**
- [ ] اختر **Start in test mode**
- [ ] اضغط **Create database**
- [ ] انتظر 1-2 دقيقة حتى يظهر "Database ready"

✅ **التأكد**: يجب أن ترى تبويبات **Data | Rules | Indexes | Usage**

---

## 📤 الخطوة 2: رفع الملفات على GitHub

### الطريقة A: سطر الأوامر

```bash
cd AUS-Maintenance-System

# إضافة الملفات الجديدة
git add firebase-config.js
git add firestore-functions.js
git add storage-bridge.js
git add index-firebase.html
git add firestore.rules
git add FIREBASE-SETUP-GUIDE-AR.md
git add FIREBASE-README.md

# Commit
git commit -m "✅ Add Firebase real-time sync - 7 files"

# Push
git push origin main
```

✅ **التأكد**: تحقق من رفع الملفات على https://github.com/Yamen-AUS/AUS-Maintenance-System

### الطريقة B: GitHub Web Interface

- [ ] افتح https://github.com/Yamen-AUS/AUS-Maintenance-System
- [ ] اضغط **Add file** → **Upload files**
- [ ] ارفع الملفات السبعة:
  - `firebase-config.js`
  - `firestore-functions.js`
  - `storage-bridge.js`
  - `index-firebase.html`
  - `firestore.rules`
  - `FIREBASE-SETUP-GUIDE-AR.md`
  - `FIREBASE-README.md`
- [ ] اكتب رسالة Commit: `✅ Add Firebase real-time sync`
- [ ] اضغط **Commit changes**

✅ **التأكد**: الملفات ظاهرة في المستودع

---

## 🔒 الخطوة 3: تطبيق قواعد الأمان

- [ ] افتح Firestore Console → **Rules**
- [ ] احذف القواعد الموجودة
- [ ] افتح ملف `firestore.rules` المحلي
- [ ] انسخ القواعد من القسم "DEVELOPMENT MODE":

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

- [ ] الصق القواعد في Firebase Console
- [ ] اضغط **Publish**
- [ ] تأكد من ظهور رسالة "Rules published successfully"

✅ **التأكد**: في تبويب Rules، يجب أن ترى القواعد المُطبّقة

---

## 🌐 الخطوة 4: انتظار نشر GitHub Pages

- [ ] انتظر 2-3 دقائق
- [ ] افتح: https://yamen-aus.github.io/AUS-Maintenance-System/index-firebase.html
- [ ] افتح Console (F12)
- [ ] تحقق من الرسائل:
  ```
  ✅ Firebase initialized successfully
  📊 Firestore database: Firestore { ... }
  ✅ Firestore functions module loaded
  ✅ Storage bridge loaded - Mode: firebase
  ```

✅ **التأكد**: لا توجد أخطاء حمراء في Console

---

## 🔐 الخطوة 5: تسجيل الدخول والاختبار

- [ ] افتح `index-firebase.html`
- [ ] أدخل:
  - **Username**: `admin`
  - **Password**: `AUS2026`
- [ ] اضغط **Login**

✅ **التأكر**: دخلت إلى Dashboard بنجاح

---

## ✨ الخطوة 6: اختبار إضافة مهمة

- [ ] اذهب إلى **Tasks**
- [ ] اضغط **Add Task**
- [ ] املأ الحقول:
  - **Title**: `Firebase Test Task`
  - **Category**: `Electrical`
  - **Location**: `Block A – Boys`
  - **Priority**: `High`
  - **Status**: `Pending`
- [ ] اضغط **Save**

✅ **التأكد**: المهمة ظهرت في الجدول فوراً

---

## 🔄 الخطوة 7: اختبار المزامنة الحية

### نافذة 1:
- [ ] افتح `index-firebase.html`
- [ ] سجّل دخول

### نافذة 2:
- [ ] افتح `index-firebase.html` في نافذة جديدة (أو متصفح آخر)
- [ ] سجّل دخول

### الاختبار:
- [ ] في **النافذة 1**: أضف مهمة جديدة
- [ ] في **النافذة 2**: شاهد المهمة تظهر **فوراً بدون Refresh** 🎉

✅ **التأكد**: المزامنة الفورية تعمل بنجاح!

---

## 📊 الخطوة 8: التحقق من Firestore Data

- [ ] افتح Firestore Console → **Data**
- [ ] يجب أن ترى Collections:
  - `tasks` (يحتوي على المهام المُضافة)
  - `vendors` (إذا أضفت موردين)
  - `users` (إذا أضفت مستخدمين)
- [ ] افتح أي document وشاهد الحقول

✅ **التأكر**: البيانات محفوظة في Firestore

---

## 🎉 الخطوة 9: اختبار Export/Import

### Export:
- [ ] اذهب إلى **Settings**
- [ ] اضغط **Export Data**
- [ ] احفظ الملف `AUS_Maintenance_Data.json`

### Import:
- [ ] اضغط **Import Data**
- [ ] اختر الملف المحفوظ
- [ ] تأكد من رسالة "Data imported successfully"

✅ **التأكد**: Export و Import يعملان بشكل صحيح

---

## 🔍 الخطوة 10: التحقق النهائي

- [ ] جميع الأزرار تعمل (Add Task, Add User, Add Vendor)
- [ ] Dashboard يعرض الإحصائيات
- [ ] Charts تظهر البيانات
- [ ] Schedule يعمل
- [ ] Analytics تعرض التقارير
- [ ] لا أخطاء في Console

---

## ✅ تم بنجاح! 🎉

إذا نجحت في جميع الخطوات أعلاه، فإن نظام Firebase يعمل بشكل كامل!

### ما تم إنجازه:
✅ قاعدة بيانات Firestore حية  
✅ مزامنة فورية بين الأجهزة  
✅ نسخ احتياطي تلقائي في السحابة  
✅ دعم متعدد المستخدمين  
✅ Export/Import يعمل  

---

## 🆘 إذا واجهت مشكلة

راجع:
1. **Console Errors** (F12)
2. **Firestore Rules** في Firebase Console
3. **ملف FIREBASE-SETUP-GUIDE-AR.md** للحلول المفصلة

---

## 📞 الخطوات التالية

الآن يمكنك:
1. **مشاركة الرابط** مع زملائك: `index-firebase.html`
2. **إضافة المزيد من المهام** والبيانات
3. **مراقبة الاستخدام** في Firebase Console → Usage
4. **ترقية قواعد الأمان** للإنتاج (راجع `firestore.rules`)

---

**📅 تاريخ الإنشاء**: 2026-03-13  
**🏫 المشروع**: Arab Unity School Maintenance System  
**🔧 الإصدار**: Firebase Real-time v1.0
