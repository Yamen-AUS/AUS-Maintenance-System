# 🔥 Firebase Real-time Integration - Quick Reference

## 📦 الملفات المُنشأة

| الملف | الحجم | الوصف |
|-------|-------|-------|
| `firebase-config.js` | 1.1 KB | إعدادات اتصال Firebase |
| `firestore-functions.js` | 13.6 KB | جميع عمليات CRUD على Firestore |
| `storage-bridge.js` | 8.8 KB | جسر تلقائي بين localStorage و Firestore |
| `index-firebase.html` | 50 KB | صفحة HTML محدثة مع Firebase SDK |
| `firestore.rules` | 6.4 KB | قواعد أمان Firestore |
| `FIREBASE-SETUP-GUIDE-AR.md` | 12.9 KB | دليل التثبيت الكامل بالعربية |

**المجموع**: 6 ملفات

---

## ⚡ الخطوات السريعة (5 دقائق)

### 1️⃣ رفع الملفات على GitHub

```bash
cd AUS-Maintenance-System
git add firebase-config.js firestore-functions.js storage-bridge.js index-firebase.html firestore.rules FIREBASE-SETUP-GUIDE-AR.md
git commit -m "✅ Add Firebase real-time sync"
git push origin main
```

### 2️⃣ إعداد Firestore

1. افتح: https://console.firebase.google.com/project/aus-maintenance/firestore
2. اضغط **Create database**
3. اختر **Test mode** + **asia-south1** → **Enable**

### 3️⃣ تطبيق قواعد الأمان

1. في Firestore → **Rules**
2. الصق محتوى `firestore.rules`
3. اضغط **Publish**

### 4️⃣ الوصول للنظام

```
https://yamen-aus.github.io/AUS-Maintenance-System/index-firebase.html
```

كلمة المرور: `AUS2026`

---

## ✨ الميزات الجديدة

✅ **مزامنة فورية** - التحديثات تظهر على جميع الأجهزة بدون Refresh  
✅ **نسخ احتياطي تلقائي** - البيانات محفوظة في السحابة  
✅ **دعم متعدد المستخدمين** - عدة مستخدمين يشاهدون ويحررون نفس البيانات  
✅ **لا فقدان للبيانات** - حتى عند مسح الـ Cache  
✅ **إمكانية العودة لـ localStorage** - بتغيير سطر واحد في `storage-bridge.js`  

---

## 🔄 التبديل بين localStorage و Firebase

في ملف `storage-bridge.js`، السطر 6:

```javascript
// للاستخدام مع Firebase:
export const STORAGE_MODE = 'firebase';

// للعودة إلى localStorage:
export const STORAGE_MODE = 'localStorage';
```

---

## 📊 الحدود المجانية (Spark Plan)

| العنصر | الحد اليومي |
|--------|-------------|
| القراءات | 50,000 |
| الكتابات | 20,000 |
| الحذف | 20,000 |
| التخزين | 1 GB |

**مناسب لـ**: 5-10 مستخدمين نشطين، ~100-200 مهمة/يوم

---

## 🔒 قواعد الأمان

### Development (حالياً)
```javascript
allow read, write: if true;  // ⚠️ غير آمن، للتجربة فقط
```

### Production (موصى بها)
```javascript
allow read: if true;
allow write: if request.auth != null;  // مستخدمون مسجلون فقط
```

---

## 🧪 الاختبار

### اختبار المزامنة الفورية:
1. افتح التطبيق في نافذتين
2. أضف مهمة في النافذة 1
3. شاهد المهمة تظهر فوراً في النافذة 2 🎉

---

## 📖 الوثائق الكاملة

اقرأ **FIREBASE-SETUP-GUIDE-AR.md** للدليل الشامل المفصّل.

---

## 🆘 الدعم

**مشاكل شائعة:**
- ❌ "Missing permissions" → طبّق قواعد الأمان من `firestore.rules`
- ❌ "Cannot find module" → تأكد من رفع جميع الملفات على GitHub
- ❌ "Quota exceeded" → غيّر `STORAGE_MODE` إلى `'localStorage'`

---

**📅 تاريخ الإنشاء**: 2026-03-13  
**🏫 المشروع**: Arab Unity School Maintenance System  
**🔧 الإصدار**: Firebase Real-time v1.0
