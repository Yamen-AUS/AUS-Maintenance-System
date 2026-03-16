# 📘 دليل استخدام مولد Excel الاحترافي
## نظام صيانة مدرسة الوحدة العربية

---

## 🎯 نظرة عامة

هذا البرنامج Python ينشئ ملف Excel احترافي متقدم يحتوي على **5 أوراق عمل** مترابطة:

1. **📊 Dashboard** - لوحة تحكم رئيسية مع مؤشرات الأداء
2. **📝 All Tasks** - قائمة كاملة بجميع المهام (32 مهمة)
3. **📊 Analytics** - تحليلات متقدمة ورسوم بيانية
4. **👥 Vendors** - تحليل أداء الموردين
5. **📄 Executive Summary** - ملخص تنفيذي للإدارة

---

## 📋 المتطلبات

### 1️⃣ تثبيت Python

**على Windows:**
```bash
# تحميل Python من الموقع الرسمي
https://www.python.org/downloads/

# تأكد من تحديد "Add Python to PATH" أثناء التثبيت
```

**على Mac:**
```bash
# تثبيت عبر Homebrew
brew install python3
```

### 2️⃣ تثبيت المكتبة المطلوبة

افتح Terminal (Mac/Linux) أو Command Prompt (Windows) واكتب:

```bash
pip install xlsxwriter
```

أو:

```bash
pip3 install xlsxwriter
```

---

## 🚀 طريقة الاستخدام

### الخطوة 1: تجهيز الملفات

تأكد من وجود الملفات التالية في **نفس المجلد**:

```
📁 AUS_Maintenance/
  ├── 📄 generate_excel_professional.py
  ├── 📄 AUS_Maintenance_Data.json
  └── 📄 EXCEL_GUIDE_AR.md (هذا الملف)
```

### الخطوة 2: تشغيل البرنامج

#### 🖥️ على Windows:

**الطريقة 1 (سهلة):**
1. افتح المجلد الذي يحتوي على الملفات
2. اضغط بالزر الأيمن على الفضاء الفارغ → اختر **"Open in Terminal"** أو **"فتح نافذة أوامر هنا"**
3. اكتب:
```bash
python generate_excel_professional.py
```

**الطريقة 2 (بالنقر المزدوج):**
- اضغط مرتين على ملف `generate_excel_professional.py`

#### 🍎 على Mac:

1. افتح Terminal
2. اذهب إلى المجلد:
```bash
cd ~/Desktop/AUS_Maintenance
```
3. شغّل البرنامج:
```bash
python3 generate_excel_professional.py
```

### الخطوة 3: انتظر التوليد

سترى رسائل التقدم:

```
🚀 Starting AUS Maintenance Excel Generator...
📂 Loading maintenance data...
✅ Loaded 32 tasks
📝 Creating Excel file: AUS_Maintenance_Professional.xlsx
🎨 Creating cell formats...
📊 Creating Dashboard worksheet...
📝 Creating Tasks worksheet...
📊 Creating Analytics worksheet...
👥 Creating Vendors worksheet...
📄 Creating Executive Summary...

✅ SUCCESS! Excel file created: AUS_Maintenance_Professional.xlsx
📍 File location: Current directory
📊 Total worksheets: 5
💾 File size: ~64KB

🎉 You can now open the file in Microsoft Excel or upload to OneDrive!
```

### الخطوة 4: فتح الملف

1. سيتم إنشاء ملف **AUS_Maintenance_Professional.xlsx** في نفس المجلد
2. افتح الملف بالنقر المزدوج عليه (سيفتح في Excel)
3. أو ارفعه مباشرة إلى OneDrive

---

## 📊 محتويات ملف Excel

### 1️⃣ ورقة Dashboard (لوحة التحكم)

**المحتويات:**
- **مؤشرات الأداء الرئيسية (KPIs):**
  - إجمالي المهام: 32
  - المكتملة: 10 (31.3%)
  - المعلقة: 22 (68.7%)
  - معدل الإنجاز: 31.3%

- **الملخص المالي:**
  - الميزانية الكلية: 3,485,321 AED
  - المصروف: 157,481 AED
  - المتبقي: 3,327,840 AED
  - متوسط التكلفة: 108,916 AED

- **جدول تفصيلي حسب الفئة:**
  - عدد المهام لكل فئة
  - التكلفة الكلية
  - نسبة من الميزانية

- **رسم بياني دائري (Pie Chart):**
  - توزيع الميزانية على الفئات

**الألوان:**
- الأزرق 🔵: العناوين الرئيسية
- الأخضر ✅: المهام المكتملة
- البرتقالي 🟠: المهام المعلقة
- الأحمر 🔴: الأولويات الحرجة

---

### 2️⃣ ورقة All Tasks (جميع المهام)

**16 عمود:**
1. **ID** - رقم المهمة (MNT-001 إلى MNT-032)
2. **Title** - اسم المهمة
3. **Category** - الفئة (Civil/Building, HVAC/AC, إلخ)
4. **Location** - الموقع
5. **Term** - الفصل الدراسي
6. **Priority** - الأولوية (🔴 Critical, 🟠 High, 🟡 Medium)
7. **Status** - الحالة (✅ Completed, ⏳ Pending)
8. **Assigned To** - المسؤول
9. **Reported By** - المبلّغ
10. **Date Reported** - تاريخ البلاغ
11. **Due Date** - تاريخ الاستحقاق
12. **Date Completed** - تاريخ الإنجاز
13. **Cost (AED)** - التكلفة بالدرهم
14. **Vendor** - المورد
15. **Progress %** - نسبة الإنجاز
16. **Notes** - ملاحظات

**الميزات:**
- ✅ **Auto-Filter**: قابل للفرز والتصفية التلقائي
- 🎨 **تنسيق شرطي**: 
  - الأولويات الحرجة بخلفية حمراء
  - المهام المكتملة بخلفية خضراء
  - المهام المعلقة بخلفية صفراء
- 📏 **أعمدة قابلة للتعديل**: يمكن تغيير العرض حسب الحاجة

**طريقة الاستخدام:**
1. استخدم الفلاتر في الصف 3 لتصفية البيانات
2. اضغط على أي عمود للترتيب تصاعدياً/تنازلياً
3. ابحث عن مهام معينة باستخدام Ctrl+F

---

### 3️⃣ ورقة Analytics (التحليلات)

**3 أقسام رئيسية:**

#### أ) تحليل الحالة (Status Analysis)
- عدد المهام لكل حالة
- النسبة المئوية
- التكلفة الإجمالية
- **رسم بياني دائري** يوضح التوزيع

#### ب) تحليل الأولويات (Priority Analysis)
- عدد المهام حسب الأولوية
- متوسط التكلفة
- التكلفة الإجمالية

#### ج) تحليل المواقع (Location Analysis)
- عدد المهام في كل موقع
- المهام المكتملة
- التكلفة الكلية
- مرتب حسب التكلفة (الأعلى → الأقل)

**الرسوم البيانية:**
- 📊 Pie Chart - توزيع المهام حسب الحالة
- 📈 Bar Chart - التكلفة حسب الموقع

---

### 4️⃣ ورقة Vendors (الموردين)

**6 أعمدة:**
1. اسم المورد
2. إجمالي المهام
3. المهام المكتملة
4. المهام المعلقة
5. التكلفة الإجمالية
6. معدل الإنجاز %

**الميزات:**
- مرتب حسب التكلفة (الأعلى إنفاقاً أولاً)
- **رسم بياني عمودي** يوضح إنفاق كل مورد
- تقييم الأداء بناءً على معدل الإنجاز

**أمثلة الموردين:**
- Ghaleeb - 5 مهام - 215,800 AED
- Hampton Middle East - 3 مهام - 75,243 AED
- Al Saeediyah - 1 مهمة - 520,000 AED

---

### 5️⃣ ورقة Executive Summary (الملخص التنفيذي)

**ملخص شامل للإدارة:**

#### 📊 Overview
- Total Tasks: 32
- Completed: 10
- Pending: 22
- Completion Rate: 31.3%

#### 💰 Financial Summary
- Total Budget: 3,485,321 AED
- Amount Spent: 157,481 AED
- Remaining Budget: 3,327,840 AED
- Average Cost per Task: 108,916 AED

#### 🎯 Priority Breakdown
- 🔴 Critical: 6 مهام
- 🟠 High: 20 مهمة
- 🟡 Medium: 6 مهام

**الاستخدام:**
- مثالي للعرض على الإدارة العليا
- يمكن طباعته مباشرة
- تصميم نظيف وواضح

---

## 🎨 نظام الألوان

| اللون | الاستخدام | الكود الست عشري |
|-------|-----------|-----------------|
| 🔵 أزرق | العناوين الرئيسية | #1E40AF |
| ✅ أخضر | المهام المكتملة | #059669 |
| 🟠 برتقالي | التحذيرات والمعلق | #D97706 |
| 🔴 أحمر | الأولويات الحرجة | #DC2626 |
| 🔷 سماوي | العناوين الفرعية | #0891B2 |
| ⚪ رمادي فاتح | الخلفيات | #F3F4F6 |
| ⚫ رمادي داكن | النصوص | #374151 |

---

## 📤 رفع إلى OneDrive

### الطريقة 1: عبر المتصفح

1. اذهب إلى [onedrive.live.com](https://onedrive.live.com)
2. سجل الدخول بحساب Microsoft
3. اضغط **Upload** → **Files**
4. اختر **AUS_Maintenance_Professional.xlsx**
5. انتظر حتى ينتهي الرفع (2-3 ثوانٍ)
6. اضغط **Share** → أضف البريد الإلكتروني للفريق
7. اختر **Can Edit** للسماح بالتعديل
8. اضغط **Send**

### الطريقة 2: عبر OneDrive Desktop

1. افتح مجلد **OneDrive** على جهازك
2. انسخ الملف إلى المجلد
3. سيتم المزامنة تلقائياً
4. شارك الملف بالضغط الأيمن → **Share**

### الطريقة 3: عبر Excel Online

1. افتح الملف في Excel Desktop
2. File → Share → Upload to OneDrive
3. اختر المجلد المناسب
4. Share with Team

---

## ✏️ التعديل على الملف

### إضافة مهمة جديدة:

1. افتح ورقة **📝 All Tasks**
2. اذهب إلى آخر صف (حالياً صف 35)
3. أضف البيانات في الأعمدة:
   - ID: MNT-033
   - Title: اسم المهمة الجديدة
   - Category: اختر من القائمة
   - إلخ...

4. **ستتحدث التحليلات تلقائياً!**
   - Dashboard سيحسب الإحصاءات الجديدة
   - Analytics سيحدث الرسوم البيانية
   - Vendors سيضيف المورد الجديد

### تعديل بيانات موجودة:

1. اضغط مرتين على الخلية المطلوبة
2. عدّل البيانات
3. اضغط Enter
4. سيتم التحديث التلقائي

### حذف مهمة:

1. اختر الصف بالكامل (اضغط على رقم الصف)
2. Right Click → Delete
3. أو اضغط Ctrl + - (Minus)

---

## 🔄 تحديث البيانات

إذا أردت إعادة إنشاء الملف بعد تحديث البيانات في `AUS_Maintenance_Data.json`:

### الخطوة 1: تحديث JSON

افتح `AUS_Maintenance_Data.json` في أي محرر نصوص وعدّل البيانات.

### الخطوة 2: إعادة التشغيل

```bash
python generate_excel_professional.py
```

### الخطوة 3: استبدال الملف

- الملف الجديد سيستبدل القديم تلقائياً
- أو أعد تسميته قبل التشغيل

---

## 🆘 حل المشاكل الشائعة

### ❌ المشكلة: "Python is not recognized"

**الحل:**
- تأكد من تثبيت Python من [python.org](https://python.org)
- أعد تثبيت Python وحدد **"Add Python to PATH"**

### ❌ المشكلة: "No module named 'xlsxwriter'"

**الحل:**
```bash
pip install xlsxwriter
```

أو:
```bash
pip3 install xlsxwriter
```

### ❌ المشكلة: "File not found: AUS_Maintenance_Data.json"

**الحل:**
- تأكد من وجود ملف JSON في نفس المجلد
- تحقق من اسم الملف (حساس لحالة الأحرف)

### ❌ المشكلة: "Permission denied"

**الحل:**
- أغلق ملف Excel إذا كان مفتوحاً
- شغّل Terminal/CMD كـ Administrator

### ❌ المشكلة: الرسوم البيانية لا تظهر

**الحل:**
- تأكد من فتح الملف في **Microsoft Excel** (ليس Google Sheets)
- Excel Online يدعم الرسوم البيانية
- LibreOffice قد لا يدعم جميع الميزات

---

## 📊 مقارنة مع HTML Generator

| الميزة | Python Script | HTML Generator |
|--------|--------------|----------------|
| **ملف Excel حقيقي** | ✅ نعم (.xlsx) | ❌ لا (تنزيل فقط) |
| **تعديل مباشر** | ✅ نعم | ❌ لا |
| **رفع OneDrive** | ✅ بدون مشاكل | ⚠️ يحتاج تحويل |
| **الرسوم البيانية** | ✅ Excel Charts | ⚠️ HTML Charts |
| **الصيغ التلقائية** | ✅ نعم | ❌ لا |
| **Power BI** | ✅ متوافق 100% | ❌ غير متوافق |
| **Pivot Tables** | ✅ يدعم | ❌ لا يدعم |
| **العمل بدون إنترنت** | ✅ نعم | ⚠️ يحتاج للتحميل أولاً |

---

## 🎯 الخطوات التالية

بعد إنشاء الملف بنجاح:

### 1️⃣ رفع إلى OneDrive
```
✅ انتهى - راجع قسم "رفع إلى OneDrive" أعلاه
```

### 2️⃣ مشاركة مع الفريق
```
- أضف أعضاء الفريق كـ "Editors"
- شارك الرابط عبر Email أو Teams
```

### 3️⃣ إنشاء نسخ احتياطية
```
- احتفظ بنسخة محلية
- قم بالنسخ الاحتياطي أسبوعياً
```

### 4️⃣ تدريب الفريق
```
- اطبع هذا الدليل ووزعه
- أو شارك ملف EXCEL_GUIDE_AR.md
```

---

## 💡 نصائح احترافية

### 1. استخدام Conditional Formatting المتقدم

في Excel، اذهب إلى:
```
Home → Conditional Formatting → New Rule
```

**أمثلة:**
- تلوين المهام المتأخرة بالأحمر تلقائياً
- إبراز المهام فوق 100,000 AED

### 2. إنشاء Pivot Tables يدوياً

```
Insert → PivotTable → Select Data Range
```

**أمثلة:**
- تحليل التكاليف حسب الشهر
- مقارنة الأداء بين الأقسام

### 3. ربط مع Power BI

```
Power BI Desktop → Get Data → Excel
→ Select AUS_Maintenance_Professional.xlsx
→ Load Tables → Create Visualizations
```

### 4. إضافة Data Validation

لمنع إدخال بيانات خاطئة:
```
Data → Data Validation → List
→ Source: ✅ Completed,⏳ Pending
```

---

## 📞 الدعم والمساعدة

إذا واجهت أي مشكلة:

1. **راجع قسم "حل المشاكل"** أعلاه
2. **تحقق من المتطلبات** (Python + xlsxwriter)
3. **أعد التشغيل** في مجلد جديد للاختبار
4. **تأكد من وجود ملف JSON** في نفس المكان

---

## 📌 ملخص سريع

```bash
# 1. تثبيت المكتبة (مرة واحدة فقط)
pip install xlsxwriter

# 2. تشغيل البرنامج
python generate_excel_professional.py

# 3. فتح الملف
# ابحث عن: AUS_Maintenance_Professional.xlsx

# 4. رفع إلى OneDrive
# اذهب إلى: onedrive.live.com → Upload

# ✅ انتهى!
```

---

## 📄 الملفات المرفقة

| الملف | الوصف | الحجم |
|------|-------|------|
| `generate_excel_professional.py` | البرنامج الرئيسي | ~22 KB |
| `AUS_Maintenance_Data.json` | بيانات المهام (32 مهمة) | ~16 KB |
| `EXCEL_GUIDE_AR.md` | هذا الدليل | ~12 KB |
| `AUS_Maintenance_Professional.xlsx` | الملف الناتج (بعد التشغيل) | ~64 KB |

---

## 🎉 خلاصة

الآن لديك:
- ✅ ملف Excel احترافي بـ5 أوراق
- ✅ تحليلات تلقائية ورسوم بيانية
- ✅ تصميم احترافي بألوان موحدة
- ✅ جاهز للرفع على OneDrive
- ✅ قابل للتعديل والتوسع
- ✅ متوافق مع Power BI

**🚀 ابدأ الآن وأنشئ ملف Excel في أقل من دقيقة!**

---

## 📅 تاريخ التحديث

- **الإصدار:** 1.0
- **التاريخ:** 14 مارس 2026
- **المطور:** AUS IT Team
- **الترخيص:** للاستخدام الداخلي - مدرسة الوحدة العربية

---

**🌟 نتمنى لك تجربة ممتعة! 🌟**
