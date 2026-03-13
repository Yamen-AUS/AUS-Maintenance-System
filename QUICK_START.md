# 🚀 Quick Start Guide — AUS Maintenance System

## ⚡ 5-Minute Setup

### Step 1: Open the System
1. Locate the `index.html` file
2. Double-click to open in your default browser
3. Or right-click → Open With → Choose your browser (Chrome, Firefox, Safari, Edge)

### Step 2: Login
- **Password**: `AUS2026`
- Press **Enter** or click **Login**

### Step 3: Explore the Dashboard
You're now on the Dashboard! You'll see:
- **7 KPI cards** at the top showing current statistics
- **Smart alerts** highlighting any urgent issues
- **4 interactive charts** showing task distribution and trends

---

## 🎯 Common Tasks

### ✅ Add a New Maintenance Task
1. Click **Task Tracker** in the left sidebar
2. Click the blue **"+ Add Task"** button
3. Fill in the form:
   - **Task Title**: e.g., "Fix broken window in Room 205"
   - **Category**: Select from dropdown (Electrical, Plumbing, etc.)
   - **Location**: Select the area
   - **Term**: Current term
   - **Priority**: How urgent is it?
   - **Status**: Usually "Pending" for new tasks
   - **Assigned To**: Which team handles it?
   - **Due Date**: When it should be completed
   - **Cost**: Estimated cost in AED
4. Click **Add Task**

**Result**: Task appears immediately in the table with auto-generated ID (MNT-XXX)

---

### 📊 Check Maintenance Schedule
1. Click **Maintenance Schedule** in the left sidebar
2. Choose your view:
   - **Annual View**: See all 18 recurring tasks across 12 months
   - **Daily Calendar**: See what's due each specific day
3. In Annual View:
   - Click any cell to mark status: ⏳ → 🔄 → ✅ → ❌
4. In Daily View:
   - Select month from dropdown
   - Click any day to see tasks
   - Green days = all done, red = overdue

---

### 📈 View Analytics
1. Click **Analytics** in the left sidebar
2. Review:
   - **Completion Rate**: Are you meeting the 75% target?
   - **On-Time Rate**: Are tasks finishing on schedule?
   - **Cost Breakdown**: Where is the budget going?
   - **Vendor Performance**: Which contractors are reliable?
   - **Overdue Tasks**: What needs immediate attention?

---

### 🏢 Manage Vendors
1. Click **Vendors** in the left sidebar
2. To add new vendor:
   - Click **"+ Add Vendor"**
   - Fill in name, specialty, contact info
   - Set contract expiry and rating
3. To remove a vendor:
   - Click **Delete** on their card

---

### 💾 Export Your Data
**To CSV** (for Excel):
1. Go to **Task Tracker**
2. Click **"Export CSV"** button
3. File downloads: `AUS_Maintenance_Tasks.csv`
4. Open in Excel, Google Sheets, etc.

**To JSON** (complete backup):
1. Go to **Settings**
2. Click **"Export Data"**
3. File downloads: `AUS_Maintenance_Data.json`
4. Save this file as a backup!

---

## 🎨 Understanding the Color Codes

### Priority Badges
- 🔴 **Red = Critical**: Fix ASAP (safety/urgent issues)
- 🟠 **Orange = High**: Complete within 3 days
- 🟡 **Yellow = Medium**: Complete within 1-2 weeks
- 🟢 **Green = Low**: Complete when convenient

### Status Badges
- ⏳ **Grey = Pending**: Not started yet
- 🔄 **Blue = In Progress**: Someone is working on it
- ⏸ **Yellow = On Hold**: Temporarily paused
- ✅ **Green = Completed**: Finished!
- ❌ **Grey = Cancelled**: No longer needed

### Health Score
- 🟢 **70-100 = High**: Task is healthy
- 🟡 **40-69 = Medium**: Needs attention
- 🔴 **0-39 = Low**: Urgent issue

### Row Colors (Task Table)
- 🟢 **Green background** = Completed task
- 🔴 **Red background** = Overdue task
- ⚪ **White background** = Normal task

---

## 📅 Recurring Tasks Explained

The system tracks **18 recurring maintenance tasks** automatically:

**Daily Tasks**:
- Pool water treatment (Mon-Sat)
- Garden & landscaping (except Friday)

**Weekly Tasks**:
- Building inspection (Monday)
- Toilets cleaning (Tuesday & Thursday)
- Playground inspection (Wednesday)
- Lighting check (Friday)
- Generator test (Sunday)
- Canteen deep clean (Saturday)

**Bi-Weekly Tasks** (1st & 15th):
- AC filter cleaning
- Pest control

**Monthly Tasks**:
- Fire extinguisher check (1st)
- Sports hall floor (10th)
- Library AC (12th)
- CCTV system check (1st)

**Quarterly Tasks**:
- Roof & drainage inspection
- Emergency lighting test

**Bi-Annual Tasks**:
- Water tanks cleaning (Jan & Jul)
- Fire drill (Oct & Mar)

These automatically appear in the **Daily Calendar** on their scheduled days!

---

## 🔐 Security & Data

### Your Data is Safe
- All data stored **locally** in your browser
- No external servers
- No data sent over internet
- Password protected

### Backup Recommendations
1. **Export data monthly**: Settings → Export Data
2. Save the JSON file in a secure location
3. If browser cache clears, you can restore from this file

### Changing Password
1. Go to **Settings**
2. Enter new password
3. Click **Update Password**
4. Remember it! (Write it down securely)

---

## 🆘 Quick Troubleshooting

**Can't see any tasks?**
→ Click **Settings** → **Reset to Sample Data** to restore 20 sample tasks

**Login not working?**
→ Password is case-sensitive: `AUS2026` (capital letters)

**Charts not showing?**
→ Ensure you have internet connection (charts load from online library)

**Filters not working?**
→ Press **Ctrl+F5** (Windows) or **Cmd+Shift+R** (Mac) to refresh

**Need to start fresh?**
→ Settings → Reset to Sample Data → Confirm

---

## 📱 Mobile Access

**Currently**: Best viewed on desktop/laptop  
**Coming Soon**: Mobile-optimized version for tablets and phones

**Tip**: You can access from tablet in landscape mode for best experience

---

## 🎓 Best Practices

### Daily Routine
1. **Morning**: Check Dashboard for alerts
2. **Check overdue tasks**: Analytics → Overdue Tasks table
3. **Update task status**: As work progresses
4. **Mark completed**: Move finished tasks to "Completed"

### Weekly Routine
1. **Monday**: Review all pending tasks
2. **Wednesday**: Check recurring schedule completion
3. **Friday**: Export CSV for weekly report

### Monthly Routine
1. **First of month**: Export data backup
2. **Review analytics**: Check completion rate
3. **Vendor review**: Check vendor performance table
4. **Plan next month**: Schedule preventive tasks

### Term-End Routine
1. Complete all term tasks
2. Export complete data
3. Generate summary report
4. Plan next term priorities

---

## 📊 Sample Report Format

Use the exported CSV to create reports:

**Weekly Report Structure**:
```
Week of: [Date Range]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Summary:
   • Total Tasks: [X]
   • Completed This Week: [X]
   • In Progress: [X]
   • Overdue: [X]

🚨 Urgent Items:
   • [Task ID] - [Title]
   • [Task ID] - [Title]

✅ Completed:
   • [Task ID] - [Title] - Cost: [X] AED
   • [Task ID] - [Title] - Cost: [X] AED

💰 Week Cost: [X] AED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎯 Tips for Maximum Efficiency

### 1. Use Priority Wisely
- Only mark true emergencies as **Critical**
- Most tasks should be **Medium** or **High**
- Reserve **Low** for cosmetic issues

### 2. Update Progress Regularly
- Change status as soon as work begins
- Update % progress weekly
- Mark completed immediately

### 3. Track Costs Accurately
- Enter actual costs, not estimates
- Include vendor quotes
- Update cost when final invoice received

### 4. Use Notes Field
- Document issues found
- Record solutions applied
- Note materials used
- Add follow-up reminders

### 5. Review Analytics Weekly
- Check completion rate trend
- Identify bottlenecks
- Monitor vendor performance
- Plan resource allocation

---

## 🏅 System Benefits

**For Management**:
- ✅ Real-time visibility of all maintenance
- ✅ Budget tracking per category
- ✅ Vendor performance metrics
- ✅ Compliance tracking (fire drills, inspections)

**For Facility Team**:
- ✅ Clear task prioritization
- ✅ No missed preventive maintenance
- ✅ Easy progress tracking
- ✅ Historical record of all work

**For Finance**:
- ✅ Accurate cost tracking
- ✅ Vendor invoice verification
- ✅ Budget vs. actual reporting
- ✅ Cost trend analysis

---

## 📞 Getting Help

**For technical issues**:
1. Check this Quick Start Guide
2. Review the full README.md
3. Contact IT Department

**For maintenance workflow questions**:
1. Contact Facility Manager
2. Review SOPs (Standard Operating Procedures)

---

## 🎉 You're Ready!

**Congratulations!** You now know how to:
- ✅ Navigate the system
- ✅ Add and manage tasks
- ✅ View schedules and analytics
- ✅ Export data
- ✅ Monitor performance

**Next Step**: Start using it for real tasks!

---

**🏫 Arab Unity School — Maintenance Excellence Starts Here**

**Password**: `AUS2026` | **Support**: IT Department