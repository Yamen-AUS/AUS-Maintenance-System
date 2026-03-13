# 🔄 AUS Maintenance System v2 — دليل التحديثات

## ✅ التحديثات المنفذة

### 1️⃣ **نظام المستخدمين والصلاحيات** ✅

**المستخدم الافتراضي**:
- Username: `admin`
- Password: `AUS2026`
- Role: Admin (Full Access)

**أنواع الأدوار**:
- **Admin**: كامل الصلاحيات (إضافة، تعديل، حذف، إدارة المستخدمين)
- **Manager**: عرض + تعديل (بدون حذف)
- **Staff**: عرض فقط

**الصلاحيات المتاحة**:
- ✅ View Tasks (عرض المهام)
- ✅ Add Tasks (إضافة مهام)
- ✅ Edit Tasks (تعديل المهام)
- ✅ Delete Tasks (حذف المهام)
- ✅ Export Data (تصدير البيانات)
- ✅ Manage Settings (إدارة الإعدادات)
- ✅ Manage Users (إدارة المستخدمين)

---

### 2️⃣ **تعديل جميع الخانات** ✅

**الآن يمكن تعديل**:
- ✅ Task Title
- ✅ Category
- ✅ Location
- ✅ Term
- ✅ Priority
- ✅ Status
- ✅ Assigned To
- ✅ Reported By
- ✅ Date Reported
- ✅ Due Date
- ✅ Cost
- ✅ Vendor
- ✅ Progress %
- ✅ Remarks/Notes
- ✅ Attachment

**كيفية التعديل**:
1. انقر على زر **Edit** بجانب المهمة
2. تفتح نافذة بجميع الحقول
3. عدّل ما تريد
4. اضغط **Save Task**

---

### 3️⃣ **إضافة خيارات جديدة** ✅

**في صفحة Settings**:
- ✅ إضافة/حذف Categories
- ✅ إضافة/حذف Locations
- ✅ إضافة/حذف Assigned To (Teams)

**كيفية الإضافة**:
1. اذهب إلى Settings
2. اضغط **+ Add Category** (أو Location/Team)
3. اكتب الاسم
4. يُضاف تلقائياً لجميع القوائم

---

### 4️⃣ **خانة Remarks/Notes** ✅

**مضافة في**:
- ✅ نموذج إضافة مهمة
- ✅ نموذج تعديل مهمة
- ✅ جدول المهام (عمود Remarks)
- ✅ تصدير CSV

**الاستخدام**:
- لتسجيل ملاحظات إضافية عن المهمة
- متاحة للتعديل في أي وقت

---

### 5️⃣ **تقسيم التكاليف في Dashboard** ✅

**الآن يعرض 5 بطاقات للتكلفة**:
1. **Total Cost**: إجمالي التكاليف
2. **Completed Cost**: تكلفة المهام المكتملة
3. **In Progress Cost**: تكلفة المهام قيد التنفيذ
4. **On Hold Cost**: تكلفة المهام المعلقة
5. **Cancelled Cost**: تكلفة المهام الملغاة

**الحساب تلقائي** بناءً على Status

---

### 6️⃣ **تصدير CSV بدون رموز** ✅

**التصدير الجديد**:
- ❌ **قبل**: `🔴 Critical`, `⏳ Pending`
- ✅ **الآن**: `Critical`, `Pending`

**الأعمدة المصدرة**:
```
Task ID, Title, Category, Location, Term, Priority, Status, 
Assigned To, Reported By, Date Reported, Due Date, Date Completed,
Cost, Vendor, Progress, Health Score, Remarks, Attachment
```

**جميع الأعمدة بنص واضح** بدون رموز أو إيموجي

---

### 7️⃣ **مشاركة البيانات (Sync)** ⚠️ محدود

**الوضع الحالي**:
- البيانات محفوظة محلياً في localStorage
- كل مستخدم له بياناته الخاصة
- التصدير/الاستيراد يدوي

**للمشاركة الحقيقية بين المستخدمين**:
يجب نشر النظام على خادم مع قاعدة بيانات

**الحل المؤقت**:
1. مستخدم واحد يُصدّر البيانات (Settings → Export)
2. يشارك الملف مع الآخرين
3. الآخرون يستوردون (Settings → Import)

---

## 🚀 كيفية الاستخدام

### **إنشاء مستخدم جديد**:

1. **تسجيل الدخول كـ Admin**:
   - Username: `admin`
   - Password: `AUS2026`

2. **اذهب إلى User Management**

3. **اضغط Add User**

4. **املأ البيانات**:
   ```
   Username: mohammed
   Password: pass123
   Role: Manager
   Permissions: 
   ✓ View Tasks
   ✓ Add Tasks
   ✓ Edit Tasks
   ✗ Delete Tasks
   ✓ Export Data
   ✗ Manage Settings
   ✗ Manage Users
   ```

5. **اضغط Create User**

6. **الآن يمكن لـ mohammed تسجيل الدخول** بصلاحيات محدودة

---

### **إضافة Category جديدة**:

1. **اذهب إلى Settings**

2. **في قسم Categories**

3. **اضغط + Add Category**

4. **اكتب**: `Window Repair`

5. **تُضاف تلقائياً** لجميع القوائم في Task Tracker

---

### **تعديل مهمة كاملة**:

1. **اذهب إلى Task Tracker**

2. **ابحث عن المهمة المطلوبة**

3. **اضغط Edit** (زر أزرق)

4. **تفتح نافذة بجميع الحقول**

5. **عدّل ما تريد**:
   - العنوان
   - الفئة
   - الموقع
   - التاريخ
   - التكلفة
   - الملاحظات
   - أي شيء!

6. **اضغط Save Task**

---

### **تصدير بيانات واضحة**:

1. **اذهب إلى Task Tracker**

2. **اضغط Export CSV**

3. **يُنزّل ملف Excel**

4. **افتحه** — ستجد:
   - Priority: `Critical` (بدلاً من 🔴)
   - Status: `Completed` (بدلاً من ✅)
   - كل شيء بنص واضح

---

### **مشاركة البيانات مع الفريق**:

#### **الطريقة 1 (يدوية)**:
1. Admin يذهب لـ Settings
2. Export All Data
3. يحفظ ملف JSON
4. يرسله للفريق عبر Email/WhatsApp
5. الفريق يفتح Settings → Import Data
6. يختار الملف
7. تُحمّل جميع البيانات

#### **الطريقة 2 (مجلد مشترك)**:
1. ضع النظام في مجلد مشترك على الشبكة
2. اتفق على Export يومي في نهاية الدوام
3. كل مستخدم يستورد البيانات في بداية اليوم

---

## 📊 الفروقات بين v1 و v2

| الميزة | v1 | v2 |
|--------|----|----|
| المستخدمين | مستخدم واحد | متعدد بصلاحيات |
| تعديل الحقول | Status فقط | جميع الحقول |
| CSV Export | مع رموز 🔴⏳ | نص واضح |
| إضافة خيارات | ثابتة | ديناميكية |
| Remarks | لا توجد | موجودة |
| تقسيم التكاليف | إجمالي فقط | 5 أقسام |
| UI | بسيط | محسّن بصلاحيات |

---

## ⚙️ الإعدادات الافتراضية

### **المستخدمين**:
```javascript
admin / AUS2026 / Admin
```

### **Categories** (13):
```
Electrical, Plumbing, HVAC/AC, Civil/Building, Painting,
IT/AV Equipment, Safety & Security, Pest Control, Landscaping,
Furniture, Cleaning, Kitchen Equipment, Sports Facilities
```

### **Locations** (23):
```
Main Building, Block A-Boys, Block B-Boys, Block C-Boys,
Block A-Girls, Block B-Girls, Block C-Girls,
Primary Section, Secondary Boys, Secondary Girls,
Science Lab, IT Lab, Library, Auditorium, Gym, Sports Hall,
Swimming Pool, Playground, Canteen, Admin Office, Taher Hall,
Outdoor Facilities, Parking Area
```

### **Assigned To** (9):
```
Maintenance Team, HVAC Contractor, Electrical Team,
Plumbing Team, IT Team, Cleaning Crew, External Vendor,
Security Team, Landscaping Team
```

---

## 🔐 الصلاحيات بالتفصيل

### **Admin**:
- ✅ عرض كل شيء
- ✅ إضافة مهام
- ✅ تعديل مهام
- ✅ حذف مهام
- ✅ تصدير البيانات
- ✅ إضافة/حذف Categories/Locations
- ✅ إضافة/حذف مستخدمين
- ✅ تغيير الصلاحيات

### **Manager**:
- ✅ عرض كل شيء
- ✅ إضافة مهام
- ✅ تعديل مهام
- ❌ حذف مهام
- ✅ تصدير البيانات
- ❌ إدارة الإعدادات
- ❌ إدارة المستخدمين

### **Staff**:
- ✅ عرض المهام فقط
- ❌ أي تعديل
- ❌ تصدير
- ❌ إعدادات

---

## 📱 واجهة الاستخدام

### **شريط جانبي جديد**:
```
🏫 AUS
Maintenance System v2

👤 admin
Admin

────────────
📊 Dashboard
📋 Task Tracker
📅 Schedule
📈 Analytics
🏢 Vendors
⚙️ Settings
👥 User Management  ← جديد
────────────
🚪 Logout
```

### **جدول المهام المحسّن**:
```
# | Task ID | Title | Category | Location | Term | Priority | Status | 
Assigned To | Due Date | Cost | Health | Remarks | Actions
                                                              ↑ جديد
```

### **نموذج التعديل الشامل**:
```
┌─────────────────────────────────────────┐
│ Edit Task                               │
├─────────────────────────────────────────┤
│ Title:     [__________________________] │
│ Category:  [Electrical        ▼]        │
│ Location:  [Main Building     ▼]        │
│ Term:      [Term 3            ▼]        │
│ Priority:  [High              ▼]        │
│ Status:    [In Progress       ▼]        │
│ Assigned:  [Electrical Team   ▼]        │
│ Reporter:  [Ahmed             ]         │
│ Reported:  [2026-03-10        ]         │
│ Due:       [2026-03-20        ]         │
│ Cost:      [1500              ]         │
│ Vendor:    [Spark Electric    ]         │
│ Progress:  [60%               ▼]        │
│ Remarks:   [____________________]       │
│            [____________________]       │
│ Attach:    [https://...       ]         │
│                                         │
│   [Cancel]          [Save Task]         │
└─────────────────────────────────────────┘
```

---

## 💡 نصائح مهمة

### 1. **حفظ البيانات بانتظام**:
```
Settings → Export All Data
احفظ ملف JSON كل يوم
```

### 2. **منح الصلاحيات بحذر**:
```
❌ لا تعطي صلاحية Delete للجميع
✅ أعطي View/Edit فقط للموظفين
✅ احتفظ بصلاحية Admin لشخص واحد
```

### 3. **استخدام Remarks بذكاء**:
```
✅ سجّل: المشكلة، الحل، المواد المستخدمة
✅ اكتب: متى يجب المراجعة
✅ أضف: رقم طلب الشراء أو الفاتورة
```

### 4. **تنظيم Categories**:
```
✅ استخدم أسماء واضحة
✅ لا تكثر الفئات (أقصى 20)
❌ تجنب التكرار
```

### 5. **مشاركة البيانات**:
```
الطريقة الأفضل:
1. نشر النظام على خادم المدرسة
2. الجميع يدخل من نفس الرابط
3. قاعدة بيانات مركزية

الطريقة المؤقتة:
1. Export يومي من Admin
2. مشاركة الملف
3. Import للجميع
```

---

## 🐛 حل المشاكل

### **مشكلة: لا أستطيع تعديل المهام**
**الحل**: تأكد أنك تملك صلاحية Edit Tasks

### **مشكلة: زر Add Task معطل**
**الحل**: تأكد أنك تملك صلاحية Add Tasks

### **مشكلة: لا أرى User Management**
**الحل**: هذه الصفحة للـ Admin فقط

### **مشكلة: CSV به رموز غريبة**
**الحل**: افتح v2 وليس v1 — النسخة الجديدة بدون رموز

### **مشكلة: التعديلات لا تظهر للآخرين**
**الحل**: 
- الحل المؤقت: Export/Import يدوي
- الحل الدائم: نشر على خادم

---

## 📞 ملخص سريع

**للبدء**:
1. افتح `index-v2.html`
2. Username: `admin`
3. Password: `AUS2026`

**لإضافة مستخدم**:
User Management → Add User

**لتعديل مهمة**:
Task Tracker → Edit → عدّل → Save

**لإضافة Category**:
Settings → + Add Category

**للتصدير بدون رموز**:
Task Tracker → Export CSV

**للمشاركة**:
Settings → Export → شارك الملف → الآخرون Import

---

## 🎯 الملفات الجديدة

1. **index-v2.html** — الواجهة المحدثة
2. **app-v2.js** — المنطق المحدث (قيد الإنشاء)
3. **INSTRUCTIONS_AR.md** — هذا الملف

**استخدم v2 للميزات الجديدة!**

---

**🏫 Arab Unity School — Maintenance System v2**

**للدعم**: راجع هذا الملف أو اتصل بقسم IT