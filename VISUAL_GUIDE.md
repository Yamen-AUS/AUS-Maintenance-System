# 🎨 AUS Maintenance System — Visual Guide

## 🗺️ System Navigation Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                    🏫 AUS MAINTENANCE SYSTEM                         │
│                         Password: AUS2026                            │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│  🔐 LOGIN PAGE                                                       │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  🏫                                                            │  │
│  │  Arab Unity School                                            │  │
│  │  Maintenance Management System                                │  │
│  │                                                                │  │
│  │  Password: [________________]                                 │  │
│  │           [      LOGIN      ]                                 │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │   MAIN APPLICATION        │
                    │   6 Sections              │
                    └─────────────┬─────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
        ▼                         ▼                         ▼
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│ 📊 DASHBOARD │         │ 📋 TASKS     │         │ 📅 SCHEDULE  │
│              │         │              │         │              │
│ • 7 KPIs     │         │ • Database   │         │ • Annual     │
│ • 4 Charts   │         │ • Add/Edit   │         │ • Daily Cal  │
│ • Alerts     │         │ • Filter     │         │ • Recurring  │
│              │         │ • Export     │         │              │
└──────────────┘         └──────────────┘         └──────────────┘
        │                         │                         │
        ▼                         ▼                         ▼
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│ 📈 ANALYTICS │         │ 🏢 VENDORS   │         │ ⚙️ SETTINGS  │
│              │         │              │         │              │
│ • Gauges     │         │ • Directory  │         │ • Password   │
│ • Cost       │         │ • Add/Delete │         │ • Export     │
│ • Vendor Perf│         │ • Ratings    │         │ • Reset      │
│ • Overdue    │         │              │         │              │
└──────────────┘         └──────────────┘         └──────────────┘
```

---

## 📊 Dashboard Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  📊 DASHBOARD                                                       │
│  Overview of maintenance operations for AY 2025-26                 │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │ 📋   │  │ ✅   │  │ 🔄   │  │ ⏳   │  │ 🚨   │  │ 🔴   │     │
│  │Total │  │Comp  │  │InPro │  │Pend  │  │Over  │  │Crit  │     │
│  │  20  │  │  14  │  │  3   │  │  2   │  │  1   │  │  0   │     │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘     │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ 🔔 SMART ALERTS                                               │ │
│  │                                                               │ │
│  │ 🚨 1 task is overdue. Immediate action required.             │ │
│  │ ✅ Completion rate is 70%. Target is 75%.                    │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐   │
│  │ Status Distrib  │  │ Tasks by Cat    │  │ Tasks by Term   │   │
│  │                 │  │                 │  │                 │   │
│  │   [Doughnut]    │  │   [Bar Chart]   │  │   [Bar Chart]   │   │
│  │                 │  │                 │  │                 │   │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘   │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ Monthly Completion Trend                                      │ │
│  │                                                               │ │
│  │                          [Line Chart]                         │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Task Tracker Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  📋 TASK TRACKER                                                    │
│  Annual maintenance tasks database                                 │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [+ Add] [Search...] [Term▼] [Status▼] [Priority▼] [Export CSV]  │
│                                                                     │
│  ┌────┬─────────┬──────────────────────┬──────────┬─────────┐     │
│  │ #  │ Task ID │ Title                │ Category │ Status  │     │
│  ├────┼─────────┼──────────────────────┼──────────┼─────────┤     │
│  │ 1  │ MNT-001 │ Fix ceiling tiles    │ Civil    │ ✅ Comp │     │
│  │ 2  │ MNT-002 │ AC not cooling       │ HVAC     │ ✅ Comp │     │
│  │ 3  │ MNT-003 │ Repaint wall         │ Painting │ ✅ Comp │     │
│  │ 4  │ MNT-004 │ Electrical sockets   │ Electric │ ✅ Comp │     │
│  │ 5  │ MNT-015 │ Repair lab sink      │ Plumbing │ 🔄 Prog │     │
│  │ 6  │ MNT-016 │ Replace whiteboard   │ Furnitur │ ⏳ Pend │     │
│  │ 7  │ MNT-017 │ Fix outdoor lights   │ Electric │ ⏳ Pend │     │
│  │ 8  │ MNT-018 │ Refrigerator repair  │ Kitchen  │ 🔄 Prog │     │
│  │ 9  │ MNT-019 │ Paint toilets        │ Painting │ ⏳ Pend │     │
│  │ 10 │ MNT-020 │ CCTV maintenance     │ Security │ ⏸ Hold │     │
│  └────┴─────────┴──────────────────────┴──────────┴─────────┘     │
│                                                                     │
│  🟢 Green rows = Completed | 🔴 Red rows = Overdue                 │
└────────────────────────────────────────────────────────────────────┘
```

---

## 📅 Schedule Views

### Annual View
```
┌────────────────────────────────────────────────────────────────────┐
│  📅 MAINTENANCE SCHEDULE                                            │
│  [📅 Annual View] [📆 Daily Calendar]                              │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Task / Activity            │ Sep │ Oct │ Nov │ Dec │ Jan │ Feb...│
│  ──────────────────────────┼─────┼─────┼─────┼─────┼─────┼───────│
│  Weekly building inspection │ ✅  │ ✅  │ ✅  │ ✅  │ 🔄  │ ⏳    │
│  Toilets deep cleaning      │ ✅  │ ✅  │ ✅  │ ✅  │ ✅  │ ⏳    │
│  Fire extinguisher check    │ ✅  │ ✅  │ ✅  │ ✅  │ ✅  │ ⏳    │
│  Generator test run         │ ✅  │ ✅  │ ✅  │ ✅  │ 🔄  │ ⏳    │
│  AC filter cleaning         │ ✅  │ ✅  │ ✅  │ ✅  │ ✅  │ ⏳    │
│  CCTV system check          │ ✅  │ ✅  │ ✅  │ ✅  │ ✅  │ ⏳    │
│  ...                        │     │     │     │     │     │       │
│                                                                     │
│  Click any cell: ⏳ → 🔄 → ✅ → ❌                                  │
└────────────────────────────────────────────────────────────────────┘
```

### Daily Calendar View
```
┌────────────────────────────────────────────────────────────────────┐
│  📆 DAILY CALENDAR                                                  │
│  Month: [March 2026 ▼]                                             │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Sun   Mon   Tue   Wed   Thu   Fri   Sat                          │
│  ────  ────  ────  ────  ────  ────  ────                         │
│   1     2     3     4     5     6     7                            │
│  🟢    🟢    🟡    🟢    🟡    🔴    🟢                           │
│  3 ✅  4 ✅  5 🔄  4 ✅  6 🔄  8 🚨  3 ✅                          │
│                                                                     │
│   8     9    10    11    12    13    14                            │
│  🟢    🟡    🟢    🟢    🟡    🔴    🟢                           │
│  2 ✅  5 🔄  3 ✅  4 ✅  7 🔄  6 🚨  2 ✅                          │
│                                                                     │
│  🟢 All done | 🟡 In progress | 🔴 Overdue | ⚪ No tasks            │
│  Click any day to see task details                                │
└────────────────────────────────────────────────────────────────────┘
```

---

## 📈 Analytics Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  📈 DETAILED ANALYTICS                                              │
│  In-depth performance metrics                                      │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐       │
│  │ Completion     │  │ On-Time        │  │ Cost Breakdown │       │
│  │ Rate           │  │ Rate           │  │                │       │
│  │                │  │                │  │                │       │
│  │   [70%]        │  │   [100%]       │  │   [Pie Chart]  │       │
│  │   Target: 75%  │  │   Target: 85%  │  │                │       │
│  └────────────────┘  └────────────────┘  └────────────────┘       │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ 🏢 VENDOR PERFORMANCE                                         │ │
│  │                                                               │ │
│  │ Vendor              Tasks  Completed  Cost      Health       │ │
│  │ ─────────────────────────────────────────────────────────    │ │
│  │ Cool Air Services     5       5      6,000 AED    100       │ │
│  │ Al Noor Contractors   4       4      5,650 AED    100       │ │
│  │ Spark Electric Co.    3       3      2,200 AED    100       │ │
│  │ BrightPaint LLC       2       2      5,300 AED    100       │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ 🚨 OVERDUE TASKS                                              │ │
│  │                                                               │ │
│  │ MNT-018 │ Canteen refrigerator │ 03/08/2026 │ 🔄 In Progress │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

---

## 🏢 Vendors Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  🏢 VENDORS & CONTRACTORS                                           │
│  Approved vendor directory                                         │
│                                                                     │
│  [+ Add Vendor]                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐       │
│  │ Al Noor        │  │ Cool Air       │  │ Spark Electric │       │
│  │ Contractors    │  │ Services       │  │ Co.            │       │
│  │                │  │                │  │                │       │
│  │ Civil/Building │  │ HVAC/AC        │  │ Electrical     │       │
│  │                │  │                │  │                │       │
│  │ 📞 +971 50 123 │  │ 📞 +971 55 234 │  │ 📞 +971 52 345 │       │
│  │ ✉ info@al...   │  │ ✉ service@...  │  │ ✉ ali@spark... │       │
│  │ 📅 31/12/2026  │  │ 📅 30/06/2026  │  │ 📅 31/12/2026  │       │
│  │ ⭐⭐⭐⭐       │  │ ⭐⭐⭐⭐⭐     │  │ ⭐⭐⭐⭐       │       │
│  │                │  │                │  │                │       │
│  │   [Delete]     │  │   [Delete]     │  │   [Delete]     │       │
│  └────────────────┘  └────────────────┘  └────────────────┘       │
│                                                                     │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐       │
│  │ BrightPaint    │  │ TechVision     │  │ SecureVision   │       │
│  │ LLC            │  │ UAE            │  │ Systems        │       │
│  │ ...            │  │ ...            │  │ ...            │       │
│  └────────────────┘  └────────────────┘  └────────────────┘       │
└────────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Settings Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  ⚙️ SETTINGS                                                        │
│  System configuration                                              │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ CHANGE PASSWORD                                               │ │
│  │                                                               │ │
│  │ New Password: [________________]                             │ │
│  │                                                               │ │
│  │              [Update Password]                                │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ DATA MANAGEMENT                                               │ │
│  │                                                               │ │
│  │  [📥 Export Data]   [🔄 Reset to Sample Data]                │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ KPI TARGETS                                                   │ │
│  │                                                               │ │
│  │ Completion Rate Target:  75%                                 │ │
│  │ Max Overdue Tasks:       5                                   │ │
│  │ Budget Threshold:        100,000 AED                         │ │
│  └───────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Code Reference

### Priority Colors
```
🔴 Critical   ══════  Red background, white text
🟠 High       ══════  Orange background, white text
🟡 Medium     ══════  Yellow background, dark text
🟢 Low        ══════  Green background, white text
```

### Status Colors
```
⏳ Pending        ══════  Grey background
🔄 In Progress    ══════  Blue background
⏸ On Hold        ══════  Yellow background
✅ Completed      ══════  Green background
❌ Cancelled      ══════  Grey background
```

### Health Score Colors
```
70-100  High     ══════  Green text
40-69   Medium   ══════  Yellow text
0-39    Low      ══════  Red text
```

### Row Colors
```
Completed row   ══════  Light green background (#d4edda)
Overdue row     ══════  Light red background (#f8d7da)
Normal row      ══════  White background
```

---

## 📱 Data Flow Diagram

```
┌──────────────┐
│   USER       │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────────┐
│  BROWSER (Chrome/Firefox/Safari/Edge)    │
│                                           │
│  ┌────────────────────────────────────┐  │
│  │  index.html (UI)                   │  │
│  └───────────────┬────────────────────┘  │
│                  │                        │
│  ┌───────────────▼────────────────────┐  │
│  │  app.js (Logic)                    │  │
│  └───────────────┬────────────────────┘  │
│                  │                        │
│  ┌───────────────▼────────────────────┐  │
│  │  localStorage (Data Storage)       │  │
│  │  • tasks                           │  │
│  │  • vendors                         │  │
│  │  • scheduleStatus                  │  │
│  │  • loggedIn                        │  │
│  └────────────────────────────────────┘  │
│                                           │
│  ┌────────────────────────────────────┐  │
│  │  Chart.js (CDN) ────► Charts       │  │
│  └────────────────────────────────────┘  │
│                                           │
│  ┌────────────────────────────────────┐  │
│  │  Font Awesome (CDN) ────► Icons    │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
       │
       ▼
┌──────────────┐
│  EXPORTS     │
│  • CSV       │
│  • JSON      │
└──────────────┘
```

---

## 🔄 Task Lifecycle

```
┌─────────────┐
│  Task       │
│  Created    │
└──────┬──────┘
       │
       ▼
┌─────────────┐     Assigned to team
│  ⏳ PENDING │ ─────────────────────────┐
└──────┬──────┘                          │
       │                                 │
       │ Work starts                     │
       ▼                                 ▼
┌─────────────┐                   ┌─────────────┐
│ 🔄 IN       │                   │ ⏸ ON HOLD  │
│  PROGRESS   │◄──────────────────│             │
└──────┬──────┘    Resume work    └─────────────┘
       │
       │ Work completed
       ▼
┌─────────────┐
│ ✅ COMPLETED│
└─────────────┘

       OR

┌─────────────┐
│ ❌ CANCELLED│  (No longer needed)
└─────────────┘
```

---

## 📊 Reporting Workflow

```
┌─────────────────┐
│  DAILY WORK     │
│  • Add tasks    │
│  • Update status│
│  • Mark complete│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  WEEKLY REVIEW  │
│  • Check alerts │
│  • View analytics│
│  • Export CSV   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ MONTHLY REPORT  │
│  • Export data  │
│  • Backup       │
│  • Management   │
│    presentation │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ TERM SUMMARY    │
│  • All tasks    │
│  • Cost analysis│
│  • Vendor review│
│  • Planning     │
└─────────────────┘
```

---

**🎯 This visual guide shows the complete system structure at a glance!**

**For detailed instructions**: See QUICK_START.md  
**For technical details**: See TECHNICAL_GUIDE.md  
**For full features**: See README.md