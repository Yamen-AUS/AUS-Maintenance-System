# AUS Maintenance Management System - Complete Single-File Version

## 📋 Overview
**Arab Unity School Maintenance Management System** - نظام إدارة الصيانة الشامل للمدرسة

- ✅ ملف HTML واحد شامل
- ✅ تصميم Power BI داكن باللون الأزرق الداكن
- ✅ جميع البيانات محفوظة في localStorage
- ✅ 20 مهمة نموذجية + 12 مورد
- ✅ 6 صفحات كاملة

---

## 🔐 Login Credentials
- **Password:** `AUS2026`

---

## 📊 الصفحات المتوفرة

### 1. Dashboard (لوحة القيادة)
- **7 KPI Cards:**
  - Total Tasks
  - Completed Tasks  
  - In Progress Tasks
  - Pending Tasks
  - Overdue Tasks
  - Critical Pending Tasks
  - Annual Cost

- **Smart Alerts** (تنبيهات ذكية):
  - Overdue tasks
  - Critical pending tasks
  - High-cost tasks

- **4 Charts** (مخططات Chart.js):
  - Task Status Distribution (Doughnut)
  - Tasks by Category (Bar)
  - Tasks by Term (Bar)
  - Monthly Completion Trend (Line - Sep to Aug)

---

### 2. Task Tracker (متتبع المهام)
**جدول شامل ب 19 عمود:**
1. # (Number)
2. Task ID (MNT-XXX)
3. Title
4. Category
5. Location
6. Term
7. Priority (Badge: Low, Medium, High, Critical)
8. Status (Badge: Pending, In Progress, Completed, On Hold, Cancelled)
9. Assigned To
10. Date Reported
11. Due Date
12. Date Completed
13. **Days to Close** (calculated)
14. Cost (AED)
15. Vendor
16. **Progress %** (0-100)
17. **Health Score** (0-100 with color badge)
18. Remarks
19. **Attachment** (link)
20. Actions (Edit/Delete buttons)

**ميزات إضافية:**
- Add Task modal
- Advanced filters (Term, Status, Priority, Category)
- Search functionality
- Export to CSV
- Row highlighting (completed=green, overdue=red)
- Inline edit capability

---

### 3. Schedule (الجدول الزمني)
**Annual View (العرض السنوي):**
- 18 recurring tasks × 12 months grid
- Icons: ✓ (Done), ⏳ (In Progress), ○ (Planned), × (Skip)
- Term color coding
- Summary row showing done count per month

**Daily View (العرض اليومي):**
- Calendar selector (Sep 2025 - Aug 2026)
- Each day cell shows due tasks
- Click to view task details
- Color indicators:
  - Green: All done
  - Orange: In progress
  - Red: Overdue
  - Gray: No tasks
- Mark tasks as done

**18 Recurring Tasks:**
- Weekly building inspection (Monday)
- Toilets deep cleaning (Twice weekly)
- Fire extinguisher check (Monthly - 1st)
- Generator test run (Weekly - Sunday)
- AC filter cleaning (Bi-weekly)
- CCTV system check (Monthly - 1st)
- Pool water treatment (Daily Mon-Sat)
- Elevator maintenance (Quarterly)
- Pest control (Monthly - 15th)
- Fire alarm test (Monthly - 1st)
- Water tank cleaning (Bi-annual - Jan & Jul)
- Kitchen equipment deep clean (Monthly - last day)
- Emergency exit inspection (Monthly - 1st)
- Playground equipment check (Weekly - Monday)
- Roof & drainage inspection (Monthly - 1st)
- Electrical panel inspection (Quarterly)
- HVAC full servicing (Quarterly)
- Water quality testing (Weekly - Friday)

---

### 4. Analytics (التحليلات)
**Metrics (مقاييس رئيسية):**
- Completion Rate % (Target: 75%)
- On-Time Rate % (Target: 85%)
- Average Cost per Task (AED)

**Charts:**
- **Cost Breakdown by Status** (Pie Chart):
  - Completed Cost
  - In Progress Cost
  - Pending Cost
  - On Hold Cost
  - Cancelled Cost
- **Priority Distribution** (Pie Chart)
- **Term Comparison** (Bar Chart)
- **Average Health Score by Category** (Bar Chart)

**Tables:**
- **Vendor Performance Table** (vendor, tasks, completion rate, avg cost)
- **Top 5 Most Expensive Tasks**
- **Overdue Tasks List**

---

### 5. Vendors (الموردون)
- **12 Vendor Cards** with:
  - Vendor Name
  - Specialty
  - Contact Person
  - Phone
  - Email
  - Contract Expiry Date
  - Rating (⭐1-5)
  - Notes

**Sample Vendors:**
1. Al Noor Contractors (Civil/Building) ⭐⭐⭐⭐
2. Cool Air Services (HVAC/AC) ⭐⭐⭐⭐⭐
3. Spark Electric Co. (Electrical) ⭐⭐⭐⭐
4. Pro Plumbing LLC (Plumbing) ⭐⭐⭐⭐
5. BrightPaint LLC (Painting) ⭐⭐⭐
6. TechSolutions IT (IT/AV Equipment) ⭐⭐⭐⭐⭐
7. SecureGuard Systems (Safety & Security) ⭐⭐⭐⭐
8. PestAway Services (Pest Control) ⭐⭐⭐⭐
9. GreenScape Landscaping (Landscaping) ⭐⭐⭐⭐⭐
10. CleanPro Services (Cleaning) ⭐⭐⭐
11. Kitchen Masters (Kitchen Equipment) ⭐⭐⭐⭐
12. SportsMaintain Co. (Sports Facilities) ⭐⭐⭐⭐

**Features:**
- Add Vendor (modal form)
- Edit Vendor
- Delete Vendor
- All data saved in localStorage

---

### 6. Settings (الإعدادات)
**Security:**
- Change Password

**KPI Targets:**
- Completion Rate Target (%)
- On-Time Rate Target (%)
- Annual Budget (AED)

**School Information:**
- School Name
- School Logo URL

**Data Management:**
- Export All Data (JSON)
- Import Data
- Reset All Data

---

## 📦 Sample Data Included

### 20 Realistic Tasks:
Covers **Term 1 (Sep-Dec 2025)**, **Term 2 (Jan-Feb 2026)**, **Term 3 (Mar 2026)**

Examples:
- **MNT-001:** Ceiling tile repair - Main Building (Completed, AED 1,200)
- **MNT-007:** AC servicing - Admin Office (In Progress, AED 850)
- **MNT-014:** Library AC servicing (Completed, AED 1,200)
- **MNT-019:** Block A roof inspection (Overdue, Critical)
- **MNT-020:** CCTV maintenance (On Hold, AED 900)

Full breakdown:
- **Completed:** 8 tasks
- **In Progress:** 6 tasks
- **Pending:** 3 tasks
- **On Hold:** 2 tasks
- **Overdue:** 1 task

**Cost Distribution:**
- Total: AED 21,750
- Completed: AED 9,350
- In Progress: AED 6,450
- Pending: AED 2,450
- On Hold: AED 2,800
- Cancelled: AED 700

---

## 🎨 Design Features
- **Colors:**
  - Navy: `#0D1B2A`
  - Dark Blue: `#1B3A5C`
  - Accent: `#2563A8`
  - Success: `#10B981`
  - Warning: `#F59E0B`
  - Danger: `#EF4444`

- **Typography:** Inter font family (via Google Fonts)
- **Icons:** Font Awesome 6.4.0
- **Charts:** Chart.js 4.4.0
- **Responsive:** Tablet-optimized

---

## 💾 localStorage Structure
```json
{
  "tasks": [...],  // 20 sample tasks
  "vendors": [...],  // 12 vendors
  "scheduleStatus": {...},  // Annual schedule status
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

---

## 📏 File Size
- **Total:** ~150-180 KB
- **GitHub compatible:** Yes (limit 100 MB)
- **Single HTML file:** Yes (all CSS & JS embedded)

---

## 🚀 How to Use
1. **Download** `aus-maintenance-full.html`
2. **Upload** to GitHub repository
3. **Rename** to `index.html`
4. **Enable** GitHub Pages (Settings → Pages → Source: main/root)
5. **Access:** `https://yamen-aus.github.io/AUS-Maintenance-System/`
6. **Login** with password: `AUS2026`

---

## ✅ All Requirements Met

| Requirement | Status |
|---|---|
| Single HTML file | ✅ |
| Power BI Dark Navy theme | ✅ |
| Password login (AUS2026) | ✅ |
| School branding | ✅ |
| 7 KPI cards | ✅ |
| Cost breakdown (5 types) | ✅ |
| 4 Dashboard charts | ✅ |
| Smart Alerts | ✅ |
| Task Tracker with 19 columns | ✅ |
| Days to Close calculation | ✅ |
| Health Score (0-100) | ✅ |
| Progress % | ✅ |
| Attachment link | ✅ |
| Annual Schedule (18 tasks × 12 months) | ✅ |
| Daily Schedule (calendar view) | ✅ |
| 18 Recurring tasks | ✅ |
| Analytics metrics | ✅ |
| Vendor Performance table | ✅ |
| Top 5 expensive tasks | ✅ |
| Term Comparison chart | ✅ |
| 12 Vendors | ✅ |
| Settings (KPI targets, school info) | ✅ |
| Export JSON | ✅ |
| localStorage persistence | ✅ |
| 20 sample tasks | ✅ |
| Responsive design | ✅ |
| Chart.js integration | ✅ |

---

## 📞 Support
For any issues or enhancements, please update the code directly in the HTML file.

**System Version:** 3.0 Complete
**Last Updated:** 2026-03-13
**File:** `aus-maintenance-full.html`

---

**مدرسة اتحاد العرب 🏫**  
**نظام إدارة الصيانة المتكامل**
