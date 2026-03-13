# 🔧 Technical Deployment Guide — AUS Maintenance System

**For IT Department & System Administrators**

---

## 📋 System Overview

**Type**: Single-Page Web Application (SPA)  
**Architecture**: Client-side only, no backend required  
**Data Storage**: Browser localStorage  
**Dependencies**: CDN-hosted libraries (Chart.js, Font Awesome)  
**Total Size**: ~95 KB (3 files)

---

## 🚀 Deployment Options

### Option 1: Local Network (Recommended for AUS)

#### **Deploy on School Server**
1. Create folder: `/var/www/maintenance/` or `C:\inetpub\wwwroot\maintenance\`
2. Copy all files:
   ```
   maintenance/
   ├── index.html
   ├── app.js
   ├── README.md
   └── QUICK_START.md
   ```
3. Configure web server (Apache/Nginx/IIS)
4. Access via: `http://server-ip/maintenance/`

#### **Apache Configuration**
```apache
<VirtualHost *:80>
    ServerName maintenance.aus.ae
    DocumentRoot /var/www/maintenance
    
    <Directory /var/www/maintenance>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>
</VirtualHost>
```

#### **Nginx Configuration**
```nginx
server {
    listen 80;
    server_name maintenance.aus.ae;
    root /var/www/maintenance;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

### Option 2: Network Share (Easiest)

1. Create shared folder on network drive
2. Copy all files
3. Share with read permissions to staff
4. Access via: `\\server\maintenance\index.html`

**⚠️ Note**: Users must have network access

---

### Option 3: Local Installation (Individual PCs)

1. Create folder: `C:\AUS\Maintenance\`
2. Copy all files
3. Create desktop shortcut to `index.html`
4. Users open from local drive

**⚠️ Data Limitation**: Each PC has separate data

---

### Option 4: Cloud Hosting (Future)

**Services**: GitHub Pages, Netlify, Vercel, AWS S3  
**Status**: Not implemented yet (requires backend for shared data)

---

## 🔐 Security Configuration

### Password Management

**Current**: Hardcoded in `app.js` line 3
```javascript
const CORRECT_PASSWORD = "AUS2026";
```

**To Change**:
1. Edit `app.js`
2. Find line: `const CORRECT_PASSWORD = "AUS2026";`
3. Replace with new password
4. Save and redeploy

**⚠️ Security Note**: Password is visible in source code. For production:
- Use HTTPS
- Implement server-side authentication
- Hash passwords
- Add session management

---

### Access Control

**Current Level**: Basic password protection  

**Recommended Enhancements**:
1. Implement role-based access:
   - Admin: Full access
   - Facility Manager: View + Edit
   - Maintenance Staff: View only
2. Add user accounts
3. Implement audit logging
4. Session timeout (auto-logout after 30 min)

---

## 💾 Data Management

### localStorage Structure

**Keys Stored**:
```javascript
{
  "loggedIn": "true",
  "tasks": "[{...}, {...}, ...]",
  "vendors": "[{...}, {...}, ...]",
  "scheduleStatus": "{...}"
}
```

**Total Size**: ~50-100 KB (varies with data)  
**Limit**: 5-10 MB per domain (browser dependent)

---

### Data Backup Strategy

#### Automatic Backup (Recommended)
Create scheduled task to export data daily:

**Windows Task Scheduler**:
```powershell
# backup-maintenance.ps1
$browser = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url = "http://server/maintenance/#/settings"
Start-Process $browser $url
# Then manually export or automate via browser automation tools
```

**Linux Cron Job**:
```bash
0 2 * * * /path/to/backup-maintenance.sh
```

#### Manual Backup
1. Users: Settings → Export Data
2. IT: Copy localStorage data via browser DevTools

---

### Data Migration

**From localStorage to another browser**:
1. Export data as JSON
2. On new browser:
   - Open DevTools (F12)
   - Console tab
   - Paste:
```javascript
const data = /* paste JSON here */;
localStorage.setItem('tasks', JSON.stringify(data.tasks));
localStorage.setItem('vendors', JSON.stringify(data.vendors));
localStorage.setItem('scheduleStatus', JSON.stringify(data.scheduleStatus));
```

---

## 🌐 Network Configuration

### Required Ports
- **HTTP**: 80
- **HTTPS**: 443 (if SSL enabled)

### Firewall Rules
Allow outbound to CDNs:
- `cdn.jsdelivr.net` (Chart.js, Font Awesome)
- `fonts.googleapis.com` (Google Fonts)

### Offline Mode
**Limitation**: First load requires internet for CDN resources

**Solution**: Host libraries locally
1. Download Chart.js: https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js
2. Download Font Awesome CSS
3. Update `index.html` links:
```html
<!-- Change from CDN -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<!-- To local -->
<script src="./libs/chart.min.js"></script>
```

---

## 🔧 Customization

### Branding

**School Logo**:
Edit `index.html` line 155:
```html
<div class="logo">🏫</div>
<!-- Replace with -->
<img src="logo.png" style="width:60px; height:60px;">
```

**School Name**:
Edit `index.html` line 156:
```html
<h1>Arab Unity School</h1>
<!-- Or sidebar line 430 -->
<h1>🏫 AUS</h1>
```

**Color Scheme**:
Edit `index.html` CSS section (line 15-20):
```css
/* Primary Colors */
background: #0D1B2A;  /* Dark navy */
background: #1B3A5C;  /* Medium navy */
background: #2563A8;  /* Accent blue */
```

---

### Adding Custom Fields

**Example: Add "Building" field to tasks**

1. **Update Task Structure** (`app.js` line 40-60):
```javascript
const task = {
    id: newId,
    title: '...',
    building: 'Main Campus',  // New field
    category: '...',
    // ... rest of fields
};
```

2. **Add Form Input** (`index.html` line 900-910):
```html
<div class="form-group">
    <label>Building *</label>
    <select id="taskBuilding" required>
        <option value="Main Campus">Main Campus</option>
        <option value="Sports Complex">Sports Complex</option>
    </select>
</div>
```

3. **Update Table Column** (`index.html` line 700):
```html
<th>Building</th>
```

4. **Update Render Function** (`app.js` line 350):
```javascript
<td>${task.building}</td>
```

---

### Adding New Analytics

**Example: Add "Average Cost per Task" KPI**

Edit `app.js` renderDashboard function:
```javascript
const avgCost = Math.round(totalCost / totalTasks);

// Add to kpiHTML:
<div class="kpi-card">
    <div class="label">Avg Cost/Task</div>
    <div class="value">${avgCost} AED</div>
</div>
```

---

## 📊 Database Migration (Future)

**To migrate from localStorage to MySQL/PostgreSQL**:

### Schema Design
```sql
CREATE TABLE tasks (
    id VARCHAR(20) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    location VARCHAR(100),
    term VARCHAR(20),
    priority VARCHAR(20),
    status VARCHAR(30),
    assigned_to VARCHAR(100),
    reported_by VARCHAR(100),
    date_reported DATE,
    due_date DATE,
    date_completed DATE,
    cost DECIMAL(10,2),
    vendor VARCHAR(100),
    progress INT,
    health_score INT,
    notes TEXT,
    attachment VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE vendors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100),
    contact VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    contract_exp DATE,
    rating VARCHAR(20),
    notes TEXT
);

CREATE TABLE schedule_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_index INT,
    month_index INT,
    status VARCHAR(10),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY (task_index, month_index)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🧪 Testing Checklist

### Pre-Deployment Tests

**Browser Compatibility**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Functionality Tests**:
- [ ] Login with correct password
- [ ] Login with wrong password (should fail)
- [ ] Add new task
- [ ] Edit task status
- [ ] Delete task
- [ ] Filter tasks by all criteria
- [ ] Export CSV
- [ ] Export JSON
- [ ] Add vendor
- [ ] Delete vendor
- [ ] Toggle schedule status
- [ ] Switch between schedule views
- [ ] View daily calendar
- [ ] All charts render correctly
- [ ] Logout

**Data Persistence**:
- [ ] Add task, close browser, reopen (task still there)
- [ ] Logout, close browser, reopen (requires login again)
- [ ] Export data, clear cache, import (data restored)

**Performance**:
- [ ] Page loads in < 2 seconds
- [ ] No console errors (F12)
- [ ] Charts render smoothly
- [ ] Filtering responds instantly

---

## 📈 Monitoring & Analytics

### User Activity Tracking (Optional Enhancement)

Add Google Analytics:
```html
<!-- Before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Track events:
```javascript
// In app.js, add after successful actions:
gtag('event', 'task_added', { 'category': category });
gtag('event', 'task_completed', { 'task_id': taskId });
```

---

## 🐛 Debugging

### Enable Debug Mode

Add to `app.js` top:
```javascript
const DEBUG = true;

function log(...args) {
    if (DEBUG) console.log('[AUS-Maintenance]', ...args);
}

// Use throughout code:
log('Task added:', task);
log('Filter applied:', filterTerm);
```

### Common Issues

**Issue**: Charts not rendering  
**Debug**:
```javascript
// Check if Chart.js loaded
console.log(typeof Chart); // Should return "function"
```

**Issue**: localStorage not working  
**Debug**:
```javascript
// Check if localStorage available
console.log(typeof Storage); // Should return "function"
// Check current data
console.log(localStorage.getItem('tasks'));
```

**Issue**: Performance slow with many tasks  
**Solution**: Implement pagination or virtual scrolling

---

## 🔄 Update Procedure

### Rolling Out Updates

1. **Backup current version**:
```bash
cp -r /var/www/maintenance /var/www/maintenance.backup.$(date +%Y%m%d)
```

2. **Test updates on staging**:
   - Deploy to test server
   - Run full test suite
   - Get user acceptance

3. **Deploy to production**:
   - Schedule maintenance window
   - Update files
   - Clear browser cache instructions to users
   - Monitor for issues

4. **Rollback if needed**:
```bash
rm -r /var/www/maintenance
mv /var/www/maintenance.backup.20260310 /var/www/maintenance
```

---

## 📞 Support Escalation

**Level 1**: User issues  
→ Refer to QUICK_START.md

**Level 2**: Technical issues  
→ This guide + README.md

**Level 3**: Code modifications  
→ Developer documentation + source code comments

---

## 🔐 Compliance & Audit

### Data Protection
- All data stored locally (no external transmission)
- No personal identifiable information (PII) collected
- Password-protected access
- Regular backup procedures

### Audit Trail (Future Enhancement)
Implement change logging:
```javascript
function logChange(action, entity, data) {
    const auditLog = JSON.parse(localStorage.getItem('auditLog') || '[]');
    auditLog.push({
        timestamp: new Date().toISOString(),
        user: getCurrentUser(),
        action: action,
        entity: entity,
        data: data
    });
    localStorage.setItem('auditLog', JSON.stringify(auditLog));
}
```

---

## 📋 Maintenance Schedule (System)

**Monthly**:
- Review error logs
- Check storage usage
- Verify backups
- Test restore procedure

**Quarterly**:
- Update dependencies (Chart.js, Font Awesome)
- Security audit
- Performance optimization
- User feedback review

**Annually**:
- Major version upgrade
- Feature additions
- Database migration (if applicable)

---

## 🎯 Performance Optimization

### If Loading Slow

**1. Minify JavaScript**:
```bash
# Install terser
npm install -g terser

# Minify app.js
terser app.js -o app.min.js -c -m
```

**2. Lazy Load Charts**:
```javascript
// Load Chart.js only when needed
if (currentPage === 'dashboard' || currentPage === 'analytics') {
    loadChartLibrary().then(() => renderCharts());
}
```

**3. Implement Pagination**:
```javascript
// Show 20 tasks per page instead of all
const TASKS_PER_PAGE = 20;
let currentPage = 1;
```

---

## 📞 Technical Support Contacts

**Developer**: [Contact Info]  
**Server Admin**: [Contact Info]  
**IT Department**: [Contact Info]

---

**Last Updated**: March 2026  
**Version**: 1.0.0  
**Maintained by**: AUS IT Department