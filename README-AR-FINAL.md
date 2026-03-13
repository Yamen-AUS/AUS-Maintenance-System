# 🏫 نظام إدارة الصيانة - مدرسة اتحاد العرب
## AUS Maintenance Management System

![Version](https://img.shields.io/badge/version-3.0-blue)
![Status](https://img.shields.io/badge/status-ready-green)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 نظرة عامة

نظام شامل لإدارة صيانة المدرسة للعام الدراسي 2025-2026، يتضمن:
- ✅ لوحة قيادة تفاعلية (Dashboard)
- ✅ متتبع مهام شامل (Task Tracker)
- ✅ جدول صيانة سنوي ويومي (Schedule)
- ✅ تحليلات وتقارير (Analytics)
- ✅ إدارة الموردين (Vendors)
- ✅ إعدادات النظام (Settings)

---

## 🚀 البدء السريع

### الملفات المطلوبة (3 فقط):
```
📁 AUS-Maintenance-System/
├── 📄 index.html          (~50 KB)  ← الصفحة الرئيسية
├── 📄 app-v2.js           (~53 KB)  ← البيانات والدوال
└── 📄 pages-functions.js  (~15 KB)  ← دوال الصفحات
```

### خطوات التشغيل:
1. **حمّل الملفات الثلاثة** من بيئة التطوير
2. **ارفعها إلى GitHub** في مستودع `AUS-Maintenance-System`
3. **فعّل GitHub Pages** من Settings → Pages
4. **افتح الموقع:** https://yamen-aus.github.io/AUS-Maintenance-System/
5. **سجّل الدخول** بكلمة المرور: `AUS2026`

📖 **للتعليمات التفصيلية:** اقرأ [`UPLOAD-GUIDE-AR.md`](UPLOAD-GUIDE-AR.md)

---

## 🔐 بيانات الدخول

```
Password: AUS2026
```

---

## 📊 الميزات الرئيسية

### 1️⃣ Dashboard (لوحة القيادة)
- **7 بطاقات KPI:**
  - Total Tasks (إجمالي المهام)
  - Completed (المكتملة)
  - In Progress (قيد التنفيذ)
  - Pending (قيد الانتظار)
  - Overdue (المتأخرة)
  - Critical Pending (الحرجة)
  - Annual Cost (التكلفة السنوية)

- **Smart Alerts:** تنبيهات ذكية للمهام المتأخرة والحرجة

- **4 مخططات Chart.js:**
  - Task Status Distribution (توزيع حالات المهام)
  - Tasks by Category (المهام حسب الفئة)
  - Tasks by Term (المهام حسب الفصل)
  - Monthly Completion Trend (اتجاه الإنجاز الشهري)

---

### 2️⃣ Task Tracker (متتبع المهام)

**جدول شامل ب 19 عمود:**
| # | العمود | الوصف |
|---|---|---|
| 1 | Task ID | معرّف المهمة (MNT-XXX) |
| 2 | Title | عنوان المهمة |
| 3 | Category | الفئة (كهرباء، سباكة، إلخ) |
| 4 | Location | الموقع |
| 5 | Term | الفصل الدراسي |
| 6 | Priority | الأولوية (Low, Medium, High, Critical) |
| 7 | Status | الحالة (Pending, In Progress, Completed, etc.) |
| 8 | Assigned To | المكلّف بها |
| 9 | Date Reported | تاريخ الإبلاغ |
| 10 | Due Date | تاريخ الاستحقاق |
| 11 | Date Completed | تاريخ الإكمال |
| 12 | **Days to Close** | عدد الأيام للإغلاق (محسوب تلقائياً) |
| 13 | Cost (AED) | التكلفة بالدرهم |
| 14 | Vendor | المورد |
| 15 | **Progress %** | نسبة الإنجاز (0-100) |
| 16 | **Health Score** | درجة الصحة (0-100 مع ألوان) |
| 17 | Remarks | ملاحظات |
| 18 | **Attachment** | رابط مرفق |
| 19 | Actions | تعديل/حذف |

**ميزات إضافية:**
- 🔍 بحث متقدم
- 🎯 فلاتر (Term, Status, Priority, Category)
- ➕ إضافة مهام جديدة
- ✏️ تعديل inline
- 📥 تصدير CSV
- 🎨 تلوين الصفوف (أخضر=مكتمل، أحمر=متأخر)

**20 مهمة نموذجية مُحمّلة مسبقاً** تغطي Term 1, Term 2, Term 3

---

### 3️⃣ Schedule (الجدول الزمني)

#### **Annual View (العرض السنوي):**
- جدول 18 مهمة متكررة × 12 شهر (سبتمبر - أغسطس)
- أيقونات الحالة: ✓ (تم) ⏳ (قيد التنفيذ) ○ (مخطط) × (تخطي)
- ترميز ألوان حسب الفصل الدراسي
- صف ملخص يُظهر عدد المهام المكتملة لكل شهر

#### **Daily View (العرض اليومي):**
- تقويم تفاعلي (سبتمبر 2025 - أغسطس 2026)
- كل يوم يُظهر المهام المستحقة
- النقر لعرض تفاصيل المهمة
- مؤشرات ألوان:
  - 🟢 أخضر: كل المهام تمت
  - 🟠 برتقالي: قيد التنفيذ
  - 🔴 أحمر: متأخرة
  - ⚪ رمادي: لا توجد مهام
- إمكانية تعليم المهام كمكتملة

#### **18 مهمة متكررة:**
- فحص المبنى الأسبوعي (الإثنين)
- التنظيف العميق للحمامات (مرتين أسبوعياً)
- فحص طفايات الحريق (شهرياً - اليوم الأول)
- اختبار المولد الكهربائي (أسبوعياً - الأحد)
- تنظيف فلاتر التكييف (كل أسبوعين)
- فحص نظام CCTV (شهرياً - اليوم الأول)
- معالجة مياه المسبح (يومياً الإثنين-السبت)
- صيانة المصاعد (ربع سنوي)
- مكافحة الآفات (شهرياً - اليوم الخامس عشر)
- اختبار إنذار الحريق (شهرياً)
- تنظيف خزانات المياه (نصف سنوي - يناير ويوليو)
- ... وأكثر!

---

### 4️⃣ Analytics (التحليلات)

#### **مقاييس رئيسية:**
- **Completion Rate** (معدل الإنجاز): % مع مقارنة بالهدف (75%)
- **On-Time Rate** (معدل الالتزام بالمواعيد): % مع مقارنة بالهدف (85%)
- **Average Cost** (متوسط التكلفة): لكل مهمة بالدرهم

#### **مخططات:**
1. **Cost Breakdown by Status** (تفصيل التكلفة حسب الحالة):
   - Completed Cost
   - In Progress Cost
   - Pending Cost
   - On Hold Cost
   - Cancelled Cost

2. **Priority Distribution** (توزيع الأولويات)
3. **Term Comparison** (مقارنة الفصول)
4. **Average Health Score by Category** (متوسط الصحة حسب الفئة)

#### **جداول:**
- **Vendor Performance** (أداء الموردين): المورد، عدد المهام، معدل الإنجاز، متوسط التكلفة
- **Top 5 Most Expensive Tasks** (أعلى 5 مهام تكلفة)
- **Overdue Tasks** (المهام المتأخرة)

---

### 5️⃣ Vendors (الموردون)

**12 بطاقة مورد** تتضمن:
- اسم المورد
- التخصص
- جهة الاتصال
- رقم الهاتف
- البريد الإلكتروني
- تاريخ انتهاء العقد
- التقييم (⭐ 1-5)
- ملاحظات

**الموردون المُحمّلون:**
1. Al Noor Contractors (Civil/Building) ⭐⭐⭐⭐
2. Cool Air Services (HVAC/AC) ⭐⭐⭐⭐⭐
3. Spark Electric Co. (Electrical) ⭐⭐⭐⭐
4. Pro Plumbing LLC (Plumbing) ⭐⭐⭐⭐
5. BrightPaint LLC (Painting) ⭐⭐⭐
6. TechSolutions IT (IT/AV) ⭐⭐⭐⭐⭐
7. SecureGuard Systems (Security) ⭐⭐⭐⭐
8. PestAway Services (Pest Control) ⭐⭐⭐⭐
9. GreenScape Landscaping ⭐⭐⭐⭐⭐
10. CleanPro Services (Cleaning) ⭐⭐⭐
11. Kitchen Masters (Kitchen Equipment) ⭐⭐⭐⭐
12. SportsMaintain Co. (Sports Facilities) ⭐⭐⭐⭐

**المميزات:**
- ➕ إضافة مورد جديد
- ✏️ تعديل بيانات المورد
- 🗑️ حذف مورد
- 💾 حفظ تلقائي في localStorage

---

### 6️⃣ Settings (الإعدادات)

#### **الأمان:**
- تغيير كلمة المرور

#### **أهداف KPI:**
- هدف معدل الإنجاز (%)
- هدف الالتزام بالمواعيد (%)
- الميزانية السنوية (AED)

#### **معلومات المدرسة:**
- اسم المدرسة
- رابط شعار المدرسة

#### **إدارة البيانات:**
- 📥 **Export All Data (JSON)** - تصدير كل البيانات
- 📤 **Import Data** - استيراد بيانات
- 🗑️ **Reset All Data** - إعادة تعيين النظام

---

## 💾 البيانات والتخزين

### localStorage Structure:
```json
{
  "tasks": [...],           // 20 مهمة نموذجية
  "vendors": [...],         // 12 مورد
  "scheduleStatus": {...},  // حالة الجدول السنوي
  "kpiTargets": {
    "completionRate": 75,
    "onTimeRate": 85,
    "annualBudget": 500000
  },
  "schoolInfo": {
    "name": "Arab Unity School",
    "logo": ""
  }
}
```

### البيانات النموذجية المُحمّلة:

#### **20 مهمة:**
- **Completed:** 8 مهام (AED 9,350)
- **In Progress:** 6 مهام (AED 6,450)
- **Pending:** 3 مهام (AED 2,450)
- **On Hold:** 2 مهام (AED 2,800)
- **Cancelled:** 1 مهمة (AED 700)

**إجمالي التكلفة:** AED 21,750

#### **الفئات المغطاة:**
- Electrical (كهرباء)
- Plumbing (سباكة)
- HVAC/AC (تكييف)
- Civil/Building (مباني)
- Painting (دهان)
- IT/AV Equipment (تقنية)
- Safety & Security (أمن)
- Pest Control (مكافحة آفات)
- Landscaping (تنسيق حدائق)
- Furniture (أثاث)
- Cleaning (نظافة)
- Kitchen Equipment (معدات مطبخ)
- Sports Facilities (مرافق رياضية)

---

## 🎨 التصميم

### نمط Power BI - داكن أزرق:
- **Navy:** `#0D1B2A`
- **Dark Blue:** `#1B3A5C`
- **Accent:** `#2563A8`
- **Success:** `#10B981`
- **Warning:** `#F59E0B`
- **Danger:** `#EF4444`
- **Info:** `#06B6D4`

### الخطوط:
- **Primary:** Inter (Google Fonts)
- **Fallback:** Calibri, sans-serif

### المكتبات المستخدمة:
- **Chart.js 4.4.0** - المخططات
- **Font Awesome 6.4.0** - الأيقونات

### استجابة الشاشة:
- ✅ سطح المكتب (Desktop)
- ✅ جهاز لوحي (Tablet)
- 🟡 جوال (Mobile - جزئياً)

---

## 📏 حجم الملفات

| الملف | الحجم | الأسطر |
|---|---|---|
| `index.html` | ~50 KB | ~1,462 |
| `app-v2.js` | ~53 KB | ~950 |
| `pages-functions.js` | ~15 KB | ~380 |
| **المجموع** | **~118 KB** | **~2,792** |

✅ **متوافق تماماً مع GitHub** (الحد الأقصى 100 MB)

---

## 🔧 المتطلبات التقنية

### المتصفحات المدعومة:
- ✅ Google Chrome (موصى به)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari
- ⚠️ Internet Explorer (غير مدعوم)

### JavaScript:
- يجب تفعيل JavaScript في المتصفح
- localStorage مطلوب لحفظ البيانات

### الإنترنت:
- مطلوب لتحميل الخطوط والأيقونات (CDN)
- بعد التحميل الأول، يعمل offline جزئياً

---

## 📖 الدلائل المتوفرة

| الملف | الوصف |
|---|---|
| [`README.md`](README.md) | هذا الملف - نظرة عامة |
| [`UPLOAD-GUIDE-AR.md`](UPLOAD-GUIDE-AR.md) | دليل الرفع التفصيلي بالعربية |
| [`README-COMPLETE-SYSTEM.md`](README-COMPLETE-SYSTEM.md) | وصف تقني شامل |

---

## ❓ الأسئلة الشائعة

### س: هل يمكن استخدام النظام بدون إنترنت؟
**ج:** نعم جزئياً. بعد التحميل الأول، ستعمل جميع الميزات عدا الخطوط والأيقونات من CDN.

### س: هل البيانات آمنة؟
**ج:** البيانات محفوظة في localStorage على المتصفح فقط. لا يتم إرسال أي بيانات لأي خادم خارجي.

### س: هل يمكن تعديل كلمة المرور؟
**ج:** نعم، من صفحة Settings → Security → Change Password.

### س: هل يمكن إضافة مستخدمين متعددين؟
**ج:** حالياً النظام يدعم مستخدم واحد فقط (admin).

### س: كيف أنسخ البيانات لجهاز آخر؟
**ج:** استخدم Settings → Export All Data (JSON)، ثم Import Data على الجهاز الآخر.

### س: ماذا لو حذفت البيانات عن طريق الخطأ؟
**ج:** يمكنك استعادة البيانات النموذجية من Settings → Reset Data.

---

## 🔄 التحديثات المستقبلية (اختياري)

إذا أردت إضافة ميزات جديدة:
- [ ] نظام مستخدمين متعدد
- [ ] تصدير PDF للتقارير
- [ ] إشعارات بالبريد الإلكتروني
- [ ] ربط مع قاعدة بيانات خارجية
- [ ] تطبيق جوال
- [ ] لوحة تحكم للموردين

---

## 📞 الدعم والتواصل

- **الموقع:** https://yamen-aus.github.io/AUS-Maintenance-System/
- **المستودع:** https://github.com/Yamen-AUS/AUS-Maintenance-System
- **كلمة المرور:** `AUS2026`

---

## 📜 الترخيص

MIT License - يمكنك استخدام وتعديل النظام بحرية.

---

## 🙏 شكر وتقدير

تم تطوير هذا النظام لخدمة **مدرسة اتحاد العرب** وتسهيل إدارة الصيانة.

---

<div align="center">

**🏫 مدرسة اتحاد العرب**  
**نظام إدارة الصيانة المتكامل**

**الإصدار 3.0** | **2025-2026**

[![Status](https://img.shields.io/badge/status-production-green)](https://yamen-aus.github.io/AUS-Maintenance-System/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/Yamen-AUS/AUS-Maintenance-System)

---

**تم التحديث:** 2026-03-13  
**الحالة:** ✅ جاهز للإنتاج

</div>
