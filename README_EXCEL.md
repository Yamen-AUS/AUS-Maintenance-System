# 📊 AUS Maintenance System - Professional Excel Generator

## Overview

This Python script generates a **professional Excel workbook** for the Arab Unity School Maintenance System with:

- ✅ **5 Interactive Worksheets**
- ✅ **Automated Charts & Pivot Tables**
- ✅ **Conditional Formatting**
- ✅ **Professional Color Scheme**
- ✅ **OneDrive Ready**
- ✅ **Power BI Compatible**

---

## 📋 What's Inside the Excel File?

### 1. 📊 Dashboard
- Key Performance Indicators (KPIs)
- Financial Summary
- Category Breakdown with Pie Chart
- Budget Distribution Analysis

### 2. 📝 All Tasks (32 Tasks)
- 16 columns of detailed task information
- Auto-filter enabled
- Conditional formatting (Priority & Status)
- Complete maintenance records

### 3. 📊 Analytics
- Status Analysis (Completed vs Pending)
- Priority Breakdown (Critical, High, Medium)
- Location Analysis
- Interactive Pie & Bar Charts

### 4. 👥 Vendors
- Vendor Performance Metrics
- Total Cost per Vendor
- Completion Rate Analysis
- Vendor Spending Bar Chart

### 5. 📄 Executive Summary
- High-level Overview
- Financial Highlights
- Priority Statistics
- Perfect for Management Reporting

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Requirements

```bash
pip install xlsxwriter
```

### Step 2: Run the Script

```bash
python generate_excel_professional.py
```

Or on Mac:
```bash
python3 generate_excel_professional.py
```

### Step 3: Open the File

Find **AUS_Maintenance_Professional.xlsx** in the same directory and open it in Microsoft Excel.

**That's it! 🎉**

---

## 📦 Requirements

- **Python** 3.6+ ([Download here](https://python.org))
- **xlsxwriter** library (`pip install xlsxwriter`)
- **AUS_Maintenance_Data.json** (included)

---

## 📂 File Structure

```
AUS_Maintenance/
├── generate_excel_professional.py    # Main script
├── AUS_Maintenance_Data.json         # Source data (32 tasks)
├── EXCEL_GUIDE_AR.md                 # Full guide (Arabic)
├── QUICK_START_AR.md                 # Quick start (Arabic)
├── README_EXCEL.md                   # This file (English)
└── AUS_Maintenance_Professional.xlsx # Generated output
```

---

## 📊 Key Statistics

| Metric | Value |
|--------|-------|
| **Total Tasks** | 32 |
| **Completed** | 10 (31.3%) |
| **Pending** | 22 (68.7%) |
| **Total Budget** | 3,485,321 AED |
| **Amount Spent** | 157,481 AED |
| **Remaining Budget** | 3,327,840 AED |
| **Average Cost/Task** | 108,916 AED |

---

## 🎨 Features

### ✨ Professional Design
- Consistent color palette (Blue, Green, Orange, Red)
- Clean, modern layout
- Print-ready formatting

### 📈 Automated Analytics
- Real-time calculations
- Auto-updating charts
- Dynamic KPIs

### 🔄 Data Integration
- Easy to update (edit JSON and re-run)
- Compatible with Power BI
- OneDrive synchronization ready

### 🛠️ Customizable
- Modify colors in the script
- Add new worksheets
- Extend with more charts

---

## 📤 Upload to OneDrive

1. Go to [onedrive.live.com](https://onedrive.live.com)
2. Click **Upload** → Select the Excel file
3. Click **Share** → Add team members
4. Choose **Can Edit** permissions
5. Click **Send**

**Team Collaboration Ready!** 🤝

---

## 🔧 Troubleshooting

### ❌ "Python is not recognized"
**Solution:** Install Python from [python.org](https://python.org) and check "Add Python to PATH"

### ❌ "No module named 'xlsxwriter'"
**Solution:** Run `pip install xlsxwriter` again

### ❌ "File not found: AUS_Maintenance_Data.json"
**Solution:** Ensure the JSON file is in the same directory as the script

### ❌ "Permission denied"
**Solution:** Close Excel if the file is open, or run Terminal/CMD as Administrator

---

## 📚 Documentation

- **QUICK_START_AR.md** - 3-step quick start guide (Arabic)
- **EXCEL_GUIDE_AR.md** - Complete user manual (Arabic)
- **README_EXCEL.md** - This overview (English)

---

## 🎯 Use Cases

### For School Administration:
- Track maintenance projects
- Monitor budget spending
- Analyze vendor performance
- Generate executive reports

### For Maintenance Team:
- Update task status
- Record completion dates
- Add new maintenance requests
- Track progress

### For Finance Department:
- Budget analysis
- Cost tracking
- Vendor spending reports
- Financial forecasting

---

## 🔄 Updating Data

### Method 1: Edit JSON File

1. Open `AUS_Maintenance_Data.json` in any text editor
2. Modify task data (add, edit, or remove tasks)
3. Save the file
4. Re-run the script:
   ```bash
   python generate_excel_professional.py
   ```

### Method 2: Edit Excel Directly

1. Open the generated Excel file
2. Go to **📝 All Tasks** sheet
3. Modify data directly
4. **All analytics update automatically!**

---

## 📊 Chart Types Included

| Chart | Location | Data Visualized |
|-------|----------|-----------------|
| **Pie Chart** | Dashboard | Budget by Category |
| **Pie Chart** | Analytics | Task Status Distribution |
| **Bar Chart** | Vendors | Spending per Vendor |

---

## 🏆 Why Use This vs. HTML Generator?

| Feature | Python Script | HTML Generator |
|---------|--------------|----------------|
| **Real Excel File** | ✅ Yes (.xlsx) | ❌ No |
| **Direct Editing** | ✅ Yes | ❌ No |
| **OneDrive Upload** | ✅ Seamless | ⚠️ Conversion needed |
| **Excel Charts** | ✅ Native | ⚠️ HTML only |
| **Formulas** | ✅ Yes | ❌ No |
| **Power BI** | ✅ 100% compatible | ❌ Incompatible |
| **Pivot Tables** | ✅ Supported | ❌ Not supported |
| **Offline Work** | ✅ Yes | ⚠️ Download first |

---

## 💡 Pro Tips

### 1. Create Pivot Tables

```
Insert → PivotTable → Select Data Range
```

**Examples:**
- Cost analysis by month
- Performance by department

### 2. Advanced Conditional Formatting

```
Home → Conditional Formatting → New Rule
```

**Examples:**
- Highlight overdue tasks in red
- Highlight tasks > 100,000 AED

### 3. Connect to Power BI

```
Power BI Desktop → Get Data → Excel
→ Select AUS_Maintenance_Professional.xlsx
→ Load Tables → Create Visualizations
```

### 4. Data Validation

Prevent incorrect data entry:
```
Data → Data Validation → List
→ Source: ✅ Completed,⏳ Pending
```

---

## 📊 Color Palette

| Color | Usage | Hex Code |
|-------|-------|----------|
| 🔵 Blue | Primary headers | #1E40AF |
| ✅ Green | Completed tasks | #059669 |
| 🟠 Orange | Warnings/Pending | #D97706 |
| 🔴 Red | Critical priority | #DC2626 |
| 🔷 Cyan | Sub-headers | #0891B2 |
| ⚪ Light Gray | Backgrounds | #F3F4F6 |
| ⚫ Dark Gray | Text | #374151 |

---

## 🎬 Demo (Conceptual Flow)

```
1. Run Script
   ↓
2. Load JSON Data (32 tasks)
   ↓
3. Create Workbook
   ↓
4. Generate 5 Worksheets
   ↓
5. Apply Formatting & Colors
   ↓
6. Create Charts
   ↓
7. Save Excel File
   ↓
8. ✅ Done!
```

**Time:** Less than 10 seconds

---

## 📈 Future Enhancements

- [ ] Add monthly trend analysis
- [ ] Include photo attachments
- [ ] Email notification system
- [ ] Mobile app integration
- [ ] Automated backup to cloud
- [ ] Multi-language support

---

## 📝 License

For internal use only - Arab Unity School Maintenance Department

---

## 👥 Credits

- **Developed by:** AUS IT Team
- **Version:** 1.0
- **Last Updated:** March 14, 2026
- **School:** Arab Unity School
- **Academic Year:** 2025-2026

---

## 📞 Support

For issues or questions:

1. Check the **Troubleshooting** section above
2. Read **EXCEL_GUIDE_AR.md** for detailed instructions
3. Ensure all requirements are installed
4. Verify file paths and permissions

---

## 🌟 Summary

This tool transforms raw JSON data into a **professional, interactive Excel workbook** in seconds:

✅ **5 worksheets** with advanced analytics  
✅ **Automated charts** and visualizations  
✅ **Professional design** with consistent branding  
✅ **OneDrive ready** for team collaboration  
✅ **Power BI compatible** for advanced reporting  
✅ **Easy to use** - just 3 commands!

**Start generating your professional Excel reports today!** 🚀

---

*Last updated: March 14, 2026*  
*Version: 1.0*  
*Arab Unity School - Maintenance System*
