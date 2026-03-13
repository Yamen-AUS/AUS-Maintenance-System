# 🔧 حل مشكلة: البيانات ترجع للبيانات التجريبية

## ❌ **المشكلة:**
عند استيراد ملف JSON والخروج من النظام، تعود البيانات إلى البيانات التجريبية (Sample Data).

---

## 🎯 **السبب المحتمل:**

### **1. localStorage يتم مسحه تلقائياً**
بعض المتصفحات أو الإعدادات تمسح localStorage عند إغلاق المتصفح:
- **وضع Incognito/Private**
- **إعدادات Privacy عالية**
- **Browser extension يمسح البيانات**
- **Hard refresh (Ctrl+Shift+R)** قد يمسح cache وأحياناً localStorage

### **2. تنسيق JSON غير صحيح**
الملف المستورد لا يحتوي على `tasks` كـ array أو البيانات معطوبة.

### **3. خطأ في الاستيراد**
الدالة `importData()` لم تحفظ البيانات بشكل صحيح.

---

## ✅ **الحلول:**

### **الحل 1: تحقق من localStorage (افتح Console F12)**

الصق هذا الكود في Console:

```javascript
// تحقق من البيانات الموجودة
console.log('Tasks:', localStorage.getItem('tasks'));
console.log('Vendors:', localStorage.getItem('vendors'));

// عدد المهام
const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
console.log('Number of tasks:', tasks.length);

// آخر مهمة
console.log('Last task:', tasks[tasks.length - 1]);
```

**إذا ظهر `null` أو `[]`** → البيانات تم مسحها!

---

### **الحل 2: استيراد البيانات يدوياً (Console)**

```javascript
// الصق بيانات JSON الخاصة بك هنا
const myData = {
  "tasks": [
    {
      "id": "MNT-001",
      "title": "Wall Plaster",
      "category": "Civil/Building",
      "location": "Playground",
      "term": "Term 2",
      "priority": "🟠 High",
      "status": "✅ Completed",
      "assignedTo": "External Vendor",
      "reportedBy": "Maintenance Team",
      "dateReported": "2026-02-23",
      "dueDate": "2026-03-02",
      "dateCompleted": "2026-03-02",
      "cost": 800,
      "vendor": "Ghaleeb",
      "progress": 100,
      "notes": "Sample note",
      "attachment": null
    }
    // ... باقي المهام
  ],
  "vendors": [],
  "exportDate": "2026-03-13",
  "totalTasks": 32,
  "systemVersion": "AUS Maintenance System v2.0"
};

// حفظ البيانات
localStorage.setItem('tasks', JSON.stringify(myData.tasks));
localStorage.setItem('vendors', JSON.stringify(myData.vendors || []));

console.log('✅ Data saved!');
location.reload();
```

---

### **الحل 3: استخدام وضع Export/Import المحسّن**

سأعطيك نسخة محسّنة من `app-v2.js` تحتوي على:

1. **Console logs** لتتبع ما يحدث
2. **تحقق من نجاح الحفظ**
3. **رسائل تفصيلية** عند الاستيراد

**تم تحديث `app-v2.js` ✅**

---

### **الحل 4: تعطيل مسح localStorage**

#### **في Chrome:**
1. افتح `chrome://settings/content/cookies`
2. تأكد من:
   - ✅ "Allow sites to save and read cookie data"
   - ❌ **لا تُفعّل** "Clear cookies and site data when you close all windows"

#### **في Firefox:**
1. افتح `about:preferences#privacy`
2. في **Cookies and Site Data**:
   - اختر "Standard" أو "Custom"
   - ❌ **لا تُفعّل** "Delete cookies and site data when Firefox is closed"

#### **في Edge:**
1. افتح `edge://settings/content/cookies`
2. نفس إعدادات Chrome

---

### **الحل 5: استخدام IndexedDB بدلاً من localStorage**

إذا استمرت المشكلة، يمكن تحويل النظام لاستخدام **IndexedDB** الذي:
- ✅ **لا يُمسح** عند إغلاق المتصفح
- ✅ **حجم تخزين أكبر** (50MB+ بدلاً من 5-10MB)
- ✅ **أكثر موثوقية**

---

## 🧪 **الاختبار:**

### **1. استورد البيانات:**
- اذهب إلى **Settings**
- اضغط **Import Data**
- اختر `AUS_Maintenance_Data.json`

### **2. تحقق من Console:**
يجب أن ترى:
```
📥 Importing data: {tasks: Array(32), vendors: Array(0), ...}
✅ Imported 32 tasks
✅ Data saved to localStorage successfully!
📊 Tasks in storage: 32
✅ Data imported successfully!
```

### **3. أعد تحميل الصفحة (F5):**
يجب أن ترى في Console:
```
🚀 Initializing AUS Maintenance System...
✅ Loaded existing tasks from storage ( 32 tasks)
```

**إذا رأيت:**
```
📋 Created sample tasks ( 20 tasks)
```
→ **المشكلة موجودة!** localStorage تم مسحه.

---

## 🔍 **تشخيص المشكلة:**

### **السيناريو A: البيانات تُحفظ لكن تُمسح عند إغلاق المتصفح**
**السبب:** إعدادات المتصفح تمسح localStorage
**الحل:** اتبع **الحل 4** أعلاه

### **السيناريو B: البيانات لا تُحفظ من الأساس**
**السبب:** خطأ في JSON أو في دالة Import
**الحل:** استخدم **الحل 2** (Console Import المباشر)

### **السيناريو C: البيانات تُحفظ لكن لا تظهر**
**السبب:** مشكلة في دالة `renderTaskTable()`
**الحل:** افتح Console وشغّل:
```javascript
const tasks = JSON.parse(localStorage.getItem('tasks'));
console.log('Tasks in storage:', tasks);
renderTaskTable();
```

---

## 📤 **ما تم تحديثه في app-v2.js:**

### **دالة importData() المحسّنة:**
- ✅ Console logs تفصيلية
- ✅ تحقق من Array.isArray()
- ✅ رسالة تأكيد بعدد المهام المستوردة
- ✅ تحقق من نجاح الحفظ

### **دالة initializeApp() المحسّنة:**
- ✅ Console logs لتتبع ما يحدث
- ✅ عرض عدد المهام الموجودة
- ✅ تمييز بين "إنشاء بيانات تجريبية" و"تحميل بيانات موجودة"

---

## 🚀 **الخطوات التالية:**

1. **ارفع `app-v2.js` المُحدّث** على GitHub
2. **أعد تحميل الصفحة** (Ctrl+Shift+R)
3. **افتح Console** (F12)
4. **استورد البيانات** مرة أخرى
5. **راقب Console logs** لترى ما يحدث
6. **أخبرني بالنتيجة!**

---

## 💡 **نصائح:**

- ✅ استخدم **Normal mode** (ليس Incognito)
- ✅ عطّل Browser extensions مؤقتاً
- ✅ تأكد من إعدادات Privacy في المتصفح
- ✅ لا تستخدم Hard Refresh (Ctrl+Shift+R) كثيراً
- ✅ استخدم `F5` للتحديث العادي

---

**تاريخ التحديث:** 13 مارس 2026  
**الإصدار:** v3.3 - Enhanced Import/Export with Debugging
