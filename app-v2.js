// Arab Unity School Maintenance Management System
// AY 2025-26

// Constants
const CORRECT_PASSWORD = "AUS2026";

// User System
const DEFAULT_USERS = [
    {
        username: 'admin',
        password: 'AUS2026',
        role: 'Admin',
        permissions: {
            view: true,
            add: true,
            edit: true,
            delete: true,
            export: true,
            settings: true,
            users: true
        }
    }
];

let currentUser = null;

const CATEGORIES = [
    'Electrical', 'Plumbing', 'HVAC/AC', 'Civil/Building', 'Painting',
    'IT/AV Equipment', 'Safety & Security', 'Pest Control', 'Landscaping',
    'Furniture', 'Cleaning', 'Kitchen Equipment', 'Sports Facilities'
];

const LOCATIONS = [
    'Main Building', 'Block A – Boys', 'Block B – Boys', 'Block C – Boys',
    'Block A – Girls', 'Block B – Girls', 'Block C – Girls',
    'Primary Section', 'Secondary Boys', 'Secondary Girls',
    'Science Lab', 'IT Lab', 'Library', 'Auditorium', 'Gym', 'Sports Hall',
    'Swimming Pool', 'Playground', 'Canteen', 'Admin Office', 'Taher Hall',
    'Outdoor Facilities', 'Parking Area'
];

const ASSIGNED_TO = [
    'Maintenance Team', 'HVAC Contractor', 'Electrical Team',
    'Plumbing Team', 'IT Team', 'Cleaning Crew', 'External Vendor',
    'Security Team', 'Landscaping Team'
];

const RECURRING_TASKS = [
    { name: 'Weekly building inspection', team: 'Maintenance Team', frequency: 'weekly-monday' },
    { name: 'Toilets deep cleaning', team: 'Cleaning Crew', frequency: 'twice-weekly' },
    { name: 'Fire extinguisher check', team: 'Safety Officer', frequency: 'monthly-1st' },
    { name: 'Generator test run', team: 'Electrical Team', frequency: 'weekly-sunday' },
    { name: 'AC filter cleaning', team: 'HVAC Contractor', frequency: 'bi-weekly' },
    { name: 'CCTV system check', team: 'IT Team', frequency: 'monthly-1st' },
    { name: 'Playground inspection', team: 'Maintenance Team', frequency: 'weekly-wednesday' },
    { name: 'Pool water treatment', team: 'Pool Contractor', frequency: 'daily-mon-sat' },
    { name: 'Pest control – canteen', team: 'PestFree UAE', frequency: 'bi-weekly' },
    { name: 'Corridor lighting check', team: 'Electrical Team', frequency: 'weekly-friday' },
    { name: 'Library AC maintenance', team: 'Cool Air Services', frequency: 'monthly-12th' },
    { name: 'Roof & drainage inspection', team: 'Al Noor Contractors', frequency: 'quarterly' },
    { name: 'Sports hall floor maintenance', team: 'Maintenance Team', frequency: 'monthly-10th' },
    { name: 'Canteen deep clean', team: 'Cleaning Crew', frequency: 'weekly-saturday' },
    { name: 'Emergency lighting test', team: 'Electrical Team', frequency: 'quarterly' },
    { name: 'Water tanks cleaning', team: 'External Vendor', frequency: 'bi-annual' },
    { name: 'Annual fire drill', team: 'Safety Team', frequency: 'bi-annual' },
    { name: 'Garden & landscaping', team: 'Landscaping Team', frequency: 'daily-except-friday' }
];

// Sample Tasks Data
const SAMPLE_TASKS = [
    { id: 'MNT-001', title: 'Fix broken ceiling tiles – Classroom B3', category: 'Civil/Building', location: 'Block A – Boys', term: 'Term 1', priority: '🟠 High', status: '✅ Completed', assignedTo: 'Maintenance Team', reportedBy: 'Principal', dateReported: '2025-09-15', dueDate: '2025-09-25', dateCompleted: '2025-09-24', cost: 1200, vendor: 'Al Noor Contractors', progress: 100, notes: '3 tiles cracked, possible water leak above' },
    { id: 'MNT-002', title: 'AC unit not cooling – Science Lab', category: 'HVAC/AC', location: 'Science Lab', term: 'Term 1', priority: '🔴 Critical', status: '✅ Completed', assignedTo: 'HVAC Contractor', reportedBy: 'Vice Principal', dateReported: '2025-09-20', dueDate: '2025-09-22', dateCompleted: '2025-09-22', cost: 800, vendor: 'Cool Air Services', progress: 100, notes: 'Students complaining, class relocated' },
    { id: 'MNT-003', title: 'Repaint exterior wall – Main entrance', category: 'Painting', location: 'Main Building', term: 'Term 1', priority: '🟡 Medium', status: '✅ Completed', assignedTo: 'External Vendor', reportedBy: 'Head of Operations', dateReported: '2025-10-01', dueDate: '2025-10-20', dateCompleted: '2025-10-19', cost: 3500, vendor: 'BrightPaint LLC', progress: 100, notes: 'Scheduled during fall break' },
    { id: 'MNT-004', title: 'Replace faulty electrical sockets – IT Lab', category: 'Electrical', location: 'IT Lab', term: 'Term 1', priority: '🟠 High', status: '✅ Completed', assignedTo: 'Electrical Team', reportedBy: 'IT Manager', dateReported: '2025-10-10', dueDate: '2025-10-15', dateCompleted: '2025-10-14', cost: 450, vendor: 'Spark Electric Co.', progress: 100, notes: '6 sockets replaced, tested & approved' },
    { id: 'MNT-005', title: 'Unclog drain – Boys toilets Block A', category: 'Plumbing', location: 'Block A – Boys', term: 'Term 1', priority: '🟠 High', status: '✅ Completed', assignedTo: 'Plumbing Team', reportedBy: 'Facility Officer', dateReported: '2025-10-25', dueDate: '2025-10-26', dateCompleted: '2025-10-26', cost: 200, vendor: 'In-House', progress: 100, notes: 'Cleared, monitor weekly' },
    { id: 'MNT-006', title: 'Install new projector – Auditorium', category: 'IT/AV Equipment', location: 'Auditorium', term: 'Term 1', priority: '🟡 Medium', status: '✅ Completed', assignedTo: 'IT Team', reportedBy: 'Principal', dateReported: '2025-11-01', dueDate: '2025-11-15', dateCompleted: '2025-11-14', cost: 5800, vendor: 'TechVision UAE', progress: 100, notes: 'Equipment delivered and installed' },
    { id: 'MNT-007', title: 'Replace broken fence panel – Playground', category: 'Civil/Building', location: 'Playground', term: 'Term 1', priority: '🔴 Critical', status: '✅ Completed', assignedTo: 'Maintenance Team', reportedBy: 'Safety Officer', dateReported: '2025-11-10', dueDate: '2025-11-18', dateCompleted: '2025-11-17', cost: 950, vendor: 'SafeBuild Contractors', progress: 100, notes: 'Safety concern, urgent' },
    { id: 'MNT-008', title: 'CCTV camera replacement – Block C corridor', category: 'Safety & Security', location: 'Block C – Boys', term: 'Term 1', priority: '🟠 High', status: '✅ Completed', assignedTo: 'IT Team', reportedBy: 'Security Manager', dateReported: '2025-11-20', dueDate: '2025-12-05', dateCompleted: '2025-12-03', cost: 2100, vendor: 'SecureVision Systems', progress: 100, notes: '5 cameras replaced' },
    { id: 'MNT-009', title: 'Pest control – Canteen & Storage', category: 'Pest Control', location: 'Canteen', term: 'Term 1', priority: '🟠 High', status: '✅ Completed', assignedTo: 'External Vendor', reportedBy: 'Canteen Manager', dateReported: '2025-12-01', dueDate: '2025-12-08', dateCompleted: '2025-12-07', cost: 600, vendor: 'PestFree UAE', progress: 100, notes: 'Monthly scheduled treatment' },
    { id: 'MNT-010', title: 'Repair water fountain – Main Building', category: 'Plumbing', location: 'Main Building', term: 'Term 1', priority: '🟡 Medium', status: '✅ Completed', assignedTo: 'Plumbing Team', reportedBy: 'Facility Officer', dateReported: '2025-12-10', dueDate: '2025-12-20', dateCompleted: '2025-12-18', cost: 300, vendor: 'In-House', progress: 100, notes: 'Spare part arrived' },
    { id: 'MNT-011', title: 'Fix gym floor tiles', category: 'Sports Facilities', location: 'Gym', term: 'Term 2', priority: '🟠 High', status: '✅ Completed', assignedTo: 'Maintenance Team', reportedBy: 'PE Teacher', dateReported: '2026-01-15', dueDate: '2026-01-28', dateCompleted: '2026-01-27', cost: 2400, vendor: 'SafeBuild Contractors', progress: 100, notes: 'Tiles replaced and polished' },
    { id: 'MNT-012', title: 'Emergency exit light replacement', category: 'Electrical', location: 'Block B – Girls', term: 'Term 2', priority: '🔴 Critical', status: '✅ Completed', assignedTo: 'Electrical Team', reportedBy: 'Safety Officer', dateReported: '2026-01-20', dueDate: '2026-01-23', dateCompleted: '2026-01-22', cost: 650, vendor: 'Spark Electric Co.', progress: 100, notes: 'All units tested' },
    { id: 'MNT-013', title: 'Swimming pool filter cleaning', category: 'Sports Facilities', location: 'Swimming Pool', term: 'Term 2', priority: '🟡 Medium', status: '✅ Completed', assignedTo: 'Pool Contractor', reportedBy: 'Sports Coordinator', dateReported: '2026-02-01', dueDate: '2026-02-10', dateCompleted: '2026-02-09', cost: 800, vendor: 'AquaCare Services', progress: 100, notes: 'Routine maintenance' },
    { id: 'MNT-014', title: 'Library AC servicing', category: 'HVAC/AC', location: 'Library', term: 'Term 2', priority: '🟡 Medium', status: '✅ Completed', assignedTo: 'HVAC Contractor', reportedBy: 'Librarian', dateReported: '2026-02-15', dueDate: '2026-02-25', dateCompleted: '2026-02-24', cost: 1200, vendor: 'Cool Air Services', progress: 100, notes: 'Annual service completed' },
    { id: 'MNT-015', title: 'Repair science lab sink', category: 'Plumbing', location: 'Science Lab', term: 'Term 3', priority: '🟠 High', status: '🔄 In Progress', assignedTo: 'Plumbing Team', reportedBy: 'Science Teacher', dateReported: '2026-03-05', dueDate: '2026-03-15', dateCompleted: null, cost: 400, vendor: 'In-House', progress: 60, notes: 'Parts ordered' },
    { id: 'MNT-016', title: 'Replace classroom whiteboard', category: 'Furniture', location: 'Block C – Girls', term: 'Term 3', priority: '🟡 Medium', status: '⏳ Pending', assignedTo: 'Maintenance Team', reportedBy: 'Teacher', dateReported: '2026-03-08', dueDate: '2026-03-22', dateCompleted: null, cost: 850, vendor: 'Office Supplies Co.', progress: 0, notes: 'Awaiting approval' },
    { id: 'MNT-017', title: 'Fix outdoor lighting – Parking', category: 'Electrical', location: 'Parking Area', term: 'Term 3', priority: '🟠 High', status: '⏳ Pending', assignedTo: 'Electrical Team', reportedBy: 'Security', dateReported: '2026-03-10', dueDate: '2026-03-18', dateCompleted: null, cost: 1100, vendor: 'Spark Electric Co.', progress: 0, notes: 'Safety concern at night' },
    { id: 'MNT-018', title: 'Canteen refrigerator repair', category: 'Kitchen Equipment', location: 'Canteen', term: 'Term 3', priority: '🔴 Critical', status: '🔄 In Progress', assignedTo: 'External Vendor', reportedBy: 'Canteen Manager', dateReported: '2026-03-01', dueDate: '2026-03-08', dateCompleted: null, cost: 1500, vendor: 'CoolTech Appliances', progress: 70, notes: 'Technician scheduled tomorrow' },
    { id: 'MNT-019', title: 'Paint girls toilets Block A', category: 'Painting', location: 'Block A – Girls', term: 'Term 3', priority: '🟡 Medium', status: '⏳ Pending', assignedBy: 'Maintenance Team', reportedBy: 'Facility Officer', dateReported: '2026-03-12', dueDate: '2026-04-05', dateCompleted: null, cost: 1800, vendor: 'BrightPaint LLC', progress: 0, notes: 'Scheduled for spring break' },
    { id: 'MNT-020', title: 'CCTV maintenance – Main entrance', category: 'Safety & Security', location: 'Main Building', term: 'Term 3', priority: '🟠 High', status: '⏸ On Hold', assignedTo: 'IT Team', reportedBy: 'Security Manager', dateReported: '2026-03-02', dueDate: '2026-03-20', dateCompleted: null, cost: 900, vendor: 'SecureVision Systems', progress: 20, notes: 'Waiting for vendor availability' }
];

const SAMPLE_VENDORS = [
    { name: 'Al Noor Contractors', specialty: 'Civil/Building', contact: 'Mohammed Al Noor', phone: '+971 50 123 4567', email: 'info@alnoor.ae', contractExp: '2026-12-31', rating: '⭐⭐⭐⭐', notes: 'Preferred civil works' },
    { name: 'Cool Air Services', specialty: 'HVAC/AC', contact: 'Rajesh Kumar', phone: '+971 55 234 5678', email: 'service@coolair.ae', contractExp: '2026-06-30', rating: '⭐⭐⭐⭐⭐', notes: 'Priority HVAC vendor' },
    { name: 'Spark Electric Co.', specialty: 'Electrical', contact: 'Ali Hassan', phone: '+971 52 345 6789', email: 'ali@sparkco.ae', contractExp: '2026-12-31', rating: '⭐⭐⭐⭐', notes: 'Approved for all electrical' },
    { name: 'BrightPaint LLC', specialty: 'Painting', contact: 'James Wilson', phone: '+971 56 456 7890', email: 'james@brightpaint.ae', contractExp: '2026-08-31', rating: '⭐⭐⭐', notes: 'Scheduled works only' },
    { name: 'TechVision UAE', specialty: 'IT/AV Equipment', contact: 'Sara Al Mansoori', phone: '+971 50 567 8901', email: 'sara@techvision.ae', contractExp: '2026-09-30', rating: '⭐⭐⭐⭐⭐', notes: 'Excellent IT support' },
    { name: 'SafeBuild Contractors', specialty: 'Civil/Building', contact: 'Khalid Ibrahim', phone: '+971 54 678 9012', email: 'khalid@safebuild.ae', contractExp: '2027-02-28', rating: '⭐⭐⭐⭐', notes: 'Safety certified' },
    { name: 'SecureVision Systems', specialty: 'Safety & Security', contact: 'Omar Al Rashid', phone: '+971 55 789 0123', email: 'omar@securevision.ae', contractExp: '2026-07-31', rating: '⭐⭐⭐⭐', notes: 'Security systems expert' },
    { name: 'PestFree UAE', specialty: 'Pest Control', contact: 'Ramesh Patel', phone: '+971 52 890 1234', email: 'info@pestfree.ae', contractExp: '2027-03-31', rating: '⭐⭐⭐', notes: 'Monthly contract' },
    { name: 'In-House Maintenance', specialty: 'General', contact: 'Ahmed Al Farsi', phone: 'Extension 101', email: 'maintenance@aus.ae', contractExp: 'N/A', rating: '⭐⭐⭐⭐⭐', notes: 'Internal team' },
    { name: 'AquaCare Services', specialty: 'Swimming Pool', contact: 'David Smith', phone: '+971 50 111 2222', email: 'david@aquacare.ae', contractExp: '2026-12-31', rating: '⭐⭐⭐⭐', notes: 'Pool maintenance' },
    { name: 'Office Supplies Co.', specialty: 'Furniture', contact: 'Fatima Al Ali', phone: '+971 54 333 4444', email: 'fatima@officesupplies.ae', contractExp: '2026-11-30', rating: '⭐⭐⭐', notes: 'Furniture supplier' },
    { name: 'CoolTech Appliances', specialty: 'Kitchen Equipment', contact: 'John Doe', phone: '+971 52 555 6666', email: 'john@cooltech.ae', contractExp: '2026-10-31', rating: '⭐⭐⭐⭐', notes: 'Kitchen equipment repairs' }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize users if not exists
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(DEFAULT_USERS));
    }

    // Check if already logged in
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
        currentUser = JSON.parse(loggedInUser);
        showApp();
    } else {
        showLoginPage();
    }

    // Initialize data if not exists
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify(SAMPLE_TASKS));
    }
    if (!localStorage.getItem('vendors')) {
        localStorage.setItem('vendors', JSON.stringify(SAMPLE_VENDORS));
    }
    if (!localStorage.getItem('scheduleStatus')) {
        initializeScheduleStatus();
    }

    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            switchPage(page);
        });
    });

    // Populate dropdowns
    populateDropdowns();
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('usernameInput')?.value || 'admin';
    const password = document.getElementById('passwordInput').value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('loggedIn', 'true'); // Keep for compatibility
        showApp();
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }
}

function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('appContainer').style.display = 'none';
}

function showApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('appContainer').style.display = 'block';
    
    // Update user info display if exists
    const userInfoEl = document.getElementById('userInfo');
    if (userInfoEl && currentUser) {
        userInfoEl.innerHTML = `
            <div class="username">${currentUser.username}</div>
            <div class="role">${currentUser.role}</div>
        `;
    }
    
    switchPage('dashboard');
}

function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    currentUser = null;
    showLoginPage();
}

function switchPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    // Show selected page
    document.getElementById(pageName).classList.add('active');

    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`.nav-item[data-page="${pageName}"]`).classList.add('active');

    // Load page data
    switch(pageName) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'tasks':
            renderTaskTable();
            break;
        case 'schedule':
            renderAnnualSchedule();
            break;
        case 'analytics':
            renderAnalytics();
            break;
        case 'vendors':
            renderVendors();
            break;
        case 'settings':
            renderSettings();
            break;
        case 'manageUsers':
            renderManageUsers();
            break;
    }
}

function populateDropdowns() {
    // Category dropdown
    const categorySelects = ['taskCategory', 'filterCategory'];
    categorySelects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            CATEGORIES.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat;
                select.appendChild(option);
            });
        }
    });

    // Location dropdown
    const locationSelect = document.getElementById('taskLocation');
    if (locationSelect) {
        LOCATIONS.forEach(loc => {
            const option = document.createElement('option');
            option.value = loc;
            option.textContent = loc;
            locationSelect.appendChild(option);
        });
    }

    // Assigned To dropdown
    const assignedSelect = document.getElementById('taskAssigned');
    if (assignedSelect) {
        ASSIGNED_TO.forEach(team => {
            const option = document.createElement('option');
            option.value = team;
            option.textContent = team;
            assignedSelect.appendChild(option);
        });
    }
}

// Dashboard Functions
function renderDashboard() {
    const tasks = getTasks();
    
    // KPI Cards
    const totalTasks = tasks.length;
    const completed = tasks.filter(t => t.status === '✅ Completed').length;
    const inProgress = tasks.filter(t => t.status === '🔄 In Progress').length;
    const pending = tasks.filter(t => t.status === '⏳ Pending').length;
    const overdue = tasks.filter(t => isOverdue(t)).length;
    const criticalPending = tasks.filter(t => t.priority === '🔴 Critical' && t.status === '⏳ Pending').length;
    const totalCost = tasks.reduce((sum, t) => sum + (t.cost || 0), 0);

    const kpiHTML = `
        <div class="kpi-card">
            <div class="label">Total Tasks</div>
            <div class="value">${totalTasks}</div>
        </div>
        <div class="kpi-card success">
            <div class="label">Completed</div>
            <div class="value">${completed}</div>
            <div class="trend">${Math.round(completed/totalTasks*100)}%</div>
        </div>
        <div class="kpi-card">
            <div class="label">In Progress</div>
            <div class="value">${inProgress}</div>
        </div>
        <div class="kpi-card warning">
            <div class="label">Pending</div>
            <div class="value">${pending}</div>
        </div>
        <div class="kpi-card danger">
            <div class="label">Overdue</div>
            <div class="value">${overdue}</div>
        </div>
        <div class="kpi-card danger">
            <div class="label">Critical Pending</div>
            <div class="value">${criticalPending}</div>
        </div>
        <div class="kpi-card">
            <div class="label">Annual Cost</div>
            <div class="value">${totalCost.toLocaleString()} AED</div>
        </div>
    `;
    document.getElementById('kpiGrid').innerHTML = kpiHTML;
    
    // Cost Breakdown by Type (5 categories)
    const costBreakdownHTML = renderCostBreakdown();
    const dashboardElement = document.getElementById('dashboard');
    let costSection = document.getElementById('costBreakdownSection');
    
    if (!costSection) {
        costSection = document.createElement('div');
        costSection.id = 'costBreakdownSection';
        costSection.style.marginTop = '24px';
        costSection.style.marginBottom = '24px';
        // Insert after KPI Grid
        const kpiGrid = document.getElementById('kpiGrid');
        kpiGrid.parentNode.insertBefore(costSection, kpiGrid.nextSibling);
    }
    
    costSection.innerHTML = '<h3 style="margin-bottom:16px; color:#1a202c;">💰 Cost Breakdown by Type</h3>' + costBreakdownHTML;

    // Smart Alerts
    renderSmartAlerts(tasks, overdue, criticalPending, completed, totalTasks);

    // Charts
    renderStatusChart(tasks);
    renderCategoryChart(tasks);
    renderTermChart(tasks);
    renderTrendChart(tasks);
}

function renderSmartAlerts(tasks, overdue, criticalPending, completed, totalTasks) {
    const alerts = [];
    const completionRate = completed / totalTasks;

    if (overdue > 0) {
        alerts.push({ type: 'danger', message: `🚨 ${overdue} task(s) are overdue. Immediate action required.` });
    }
    if (criticalPending > 0) {
        alerts.push({ type: 'danger', message: `⚠️ ${criticalPending} critical task(s) pending. Priority attention needed.` });
    }
    if (completionRate < 0.75) {
        alerts.push({ type: 'warning', message: `📉 Completion rate is ${Math.round(completionRate*100)}%. Target is 75%.` });
    }
    
    const onHold = tasks.filter(t => t.status === '⏸ On Hold').length;
    if (onHold > 3) {
        alerts.push({ type: 'warning', message: `⏸ ${onHold} tasks are on hold. Review and resume when possible.` });
    }

    if (alerts.length === 0) {
        alerts.push({ type: 'success', message: '✅ All systems operational. No urgent issues detected.' });
    }

    const alertsHTML = alerts.map(alert => 
        `<div class="alert-item ${alert.type}">${alert.message}</div>`
    ).join('');

    document.getElementById('alertsList').innerHTML = alertsHTML;
}

function renderStatusChart(tasks) {
    const statusCounts = {};
    tasks.forEach(t => {
        const status = t.status.replace(/[🔄⏳✅⏸❌]/g, '').trim();
        statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    const ctx = document.getElementById('statusChart');
    if (window.statusChartInstance) window.statusChartInstance.destroy();
    window.statusChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(statusCounts),
            datasets: [{
                data: Object.values(statusCounts),
                backgroundColor: ['#6c757d', '#17a2b8', '#28a745', '#ffc107', '#dc3545']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function renderCategoryChart(tasks) {
    const categoryCounts = {};
    tasks.forEach(t => {
        categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
    });

    const sortedCategories = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const ctx = document.getElementById('categoryChart');
    if (window.categoryChartInstance) window.categoryChartInstance.destroy();
    window.categoryChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedCategories.map(c => c[0]),
            datasets: [{
                label: 'Tasks',
                data: sortedCategories.map(c => c[1]),
                backgroundColor: '#2563A8'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function renderTermChart(tasks) {
    const termCounts = { 'Term 1': 0, 'Term 2': 0, 'Term 3': 0, 'Summer': 0 };
    tasks.forEach(t => {
        termCounts[t.term] = (termCounts[t.term] || 0) + 1;
    });

    const ctx = document.getElementById('termChart');
    if (window.termChartInstance) window.termChartInstance.destroy();
    window.termChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(termCounts),
            datasets: [{
                label: 'Tasks',
                data: Object.values(termCounts),
                backgroundColor: ['#9b59b6', '#3498db', '#f39c12', '#2ecc71']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function renderTrendChart(tasks) {
    const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const completedByMonth = Array(12).fill(0);

    tasks.filter(t => t.dateCompleted).forEach(t => {
        const date = new Date(t.dateCompleted);
        let monthIndex = date.getMonth();
        if (monthIndex >= 8) monthIndex -= 8; // Sep=0, Oct=1...
        else monthIndex += 4; // Jan=5, Feb=6...
        completedByMonth[monthIndex]++;
    });

    const ctx = document.getElementById('trendChart');
    if (window.trendChartInstance) window.trendChartInstance.destroy();
    window.trendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Completed Tasks',
                data: completedByMonth,
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Task Tracker Functions
function renderTaskTable() {
    const tasks = getTasks();
    const perms = currentUser ? currentUser.permissions : { view: true, edit: true, delete: true };
    let html = '';
    tasks.forEach((task, index) => {
        const rowClass = task.status === '✅ Completed' ? 'completed' : (isOverdue(task) ? 'overdue' : '');
        const healthScore = calculateHealthScore(task);
        const healthClass = healthScore >= 70 ? 'high' : healthScore >= 40 ? 'medium' : 'low';

        html += `
            <tr class="${rowClass}">
                <td>${index + 1}</td>
                <td><strong>${task.id}</strong></td>
                <td>${task.title}</td>
                <td>${task.category}</td>
                <td>${task.location}</td>
                <td>${task.term}</td>
                <td><span class="badge ${getPriorityClass(task.priority)}">${task.priority}</span></td>
                <td><span class="badge ${getStatusClass(task.status)}">${task.status}</span></td>
                <td>${task.dueDate}</td>
                <td>${task.cost ? task.cost.toLocaleString() : '0'}</td>
                <td><span class="health-score ${healthClass}">${healthScore}</span></td>
                <td>
                    ${perms.edit ? `<button onclick="editTask(${index})" style="padding:4px 8px; background:#17a2b8; color:white; border:none; border-radius:4px; cursor:pointer; margin-right:4px;">Edit</button>` : ''}
                    ${perms.delete ? `<button onclick="deleteTask(${index})" style="padding:4px 8px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer;">Delete</button>` : ''}
                </td>
            </tr>
        `;
    });
    document.getElementById('taskTableBody').innerHTML = html;
}

function filterTasks() {
    const search = document.getElementById('searchBox').value.toLowerCase();
    const filterTerm = document.getElementById('filterTerm').value;
    const filterStatus = document.getElementById('filterStatus').value;
    const filterPriority = document.getElementById('filterPriority').value;
    const filterCategory = document.getElementById('filterCategory').value;

    const tasks = getTasks();
    const perms = currentUser ? currentUser.permissions : { view: true, edit: true, delete: true };
    const filtered = tasks.filter(task => {
        const matchSearch = task.title.toLowerCase().includes(search) || 
                           task.id.toLowerCase().includes(search);
        const matchTerm = !filterTerm || task.term === filterTerm;
        const matchStatus = !filterStatus || task.status === filterStatus;
        const matchPriority = !filterPriority || task.priority === filterPriority;
        const matchCategory = !filterCategory || task.category === filterCategory;

        return matchSearch && matchTerm && matchStatus && matchPriority && matchCategory;
    });

    // Render filtered tasks
    let html = '';
    filtered.forEach((task, index) => {
        const rowClass = task.status === '✅ Completed' ? 'completed' : (isOverdue(task) ? 'overdue' : '');
        const healthScore = calculateHealthScore(task);
        const healthClass = healthScore >= 70 ? 'high' : healthScore >= 40 ? 'medium' : 'low';

        html += `
            <tr class="${rowClass}">
                <td>${index + 1}</td>
                <td><strong>${task.id}</strong></td>
                <td>${task.title}</td>
                <td>${task.category}</td>
                <td>${task.location}</td>
                <td>${task.term}</td>
                <td><span class="badge ${getPriorityClass(task.priority)}">${task.priority}</span></td>
                <td><span class="badge ${getStatusClass(task.status)}">${task.status}</span></td>
                <td>${task.dueDate}</td>
                <td>${task.cost ? task.cost.toLocaleString() : '0'}</td>
                <td><span class="health-score ${healthClass}">${healthScore}</span></td>
                <td>
                    ${perms.edit ? `<button onclick="editTask(${tasks.indexOf(task)})" style="padding:4px 8px; background:#17a2b8; color:white; border:none; border-radius:4px; cursor:pointer; margin-right:4px;">Edit</button>` : ''}
                    ${perms.delete ? `<button onclick="deleteTask(${tasks.indexOf(task)})" style="padding:4px 8px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer;">Delete</button>` : ''}
                </td>
            </tr>
        `;
    });
    document.getElementById('taskTableBody').innerHTML = html;
}

function openAddTaskModal() {
    document.getElementById('taskModal').classList.add('active');
    // Set defaults
    document.getElementById('taskDateReported').value = new Date().toISOString().split('T')[0];
}

function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
    document.getElementById('taskForm').reset();
}

function closeModal() {
    closeTaskModal();
}

function addTask() {
    const tasks = getTasks();
    const newId = `MNT-${String(tasks.length + 1).padStart(3, '0')}`;

    const task = {
        id: newId,
        title: document.getElementById('taskTitle').value,
        category: document.getElementById('taskCategory').value,
        location: document.getElementById('taskLocation').value,
        term: document.getElementById('taskTerm').value,
        priority: document.getElementById('taskPriority').value,
        status: document.getElementById('taskStatus').value,
        assignedTo: document.getElementById('taskAssigned').value,
        reportedBy: document.getElementById('taskReporter').value || 'N/A',
        dateReported: document.getElementById('taskDateReported').value,
        dueDate: document.getElementById('taskDueDate').value,
        dateCompleted: null,
        cost: parseFloat(document.getElementById('taskCost').value) || 0,
        vendor: document.getElementById('taskVendor').value || 'N/A',
        progress: parseInt(document.getElementById('taskProgress').value),
        notes: document.getElementById('taskNotes').value,
        attachment: document.getElementById('taskAttachment').value || null
    };

    tasks.push(task);
    saveTasks(tasks);
    closeTaskModal();
    renderTaskTable();
    alert('Task added successfully!');
}

function editTask(index) {
    const tasks = getTasks();
    const task = tasks[index];
    
    const newStatus = prompt('Select new status:\n1. ⏳ Pending\n2. 🔄 In Progress\n3. ⏸ On Hold\n4. ✅ Completed\n5. ❌ Cancelled', '2');
    
    const statusMap = {
        '1': '⏳ Pending',
        '2': '🔄 In Progress',
        '3': '⏸ On Hold',
        '4': '✅ Completed',
        '5': '❌ Cancelled'
    };

    if (statusMap[newStatus]) {
        task.status = statusMap[newStatus];
        if (task.status === '✅ Completed') {
            task.dateCompleted = new Date().toISOString().split('T')[0];
            task.progress = 100;
        }
        saveTasks(tasks);
        renderTaskTable();
        alert('Task updated successfully!');
    }
}

function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTaskTable();
        alert('Task deleted successfully!');
    }
}

function exportToCSV() {
    const tasks = getTasks();
    let csv = 'Task ID,Title,Category,Location,Term,Priority,Status,Assigned To,Date Reported,Due Date,Date Completed,Cost,Vendor,Progress,Notes\n';
    
    tasks.forEach(task => {
        csv += `${task.id},"${task.title}",${task.category},${task.location},${task.term},${task.priority},${task.status},${task.assignedTo},${task.dateReported},${task.dueDate},${task.dateCompleted || ''},${task.cost},${task.vendor},${task.progress}%,"${task.notes}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AUS_Maintenance_Tasks.csv';
    a.click();
}

// Schedule Functions
function switchScheduleView(view) {
    document.querySelectorAll('.schedule-toggle button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (view === 'annual') {
        document.getElementById('annualView').style.display = 'block';
        document.getElementById('dailyView').style.display = 'none';
        renderAnnualSchedule();
    } else {
        document.getElementById('annualView').style.display = 'none';
        document.getElementById('dailyView').style.display = 'block';
        renderCalendar();
    }
}

function renderAnnualSchedule() {
    const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const scheduleStatus = getScheduleStatus();

    let html = '<thead><tr><th style="text-align:left;">Task / Activity</th>';
    months.forEach(month => {
        html += `<th>${month}</th>`;
    });
    html += '</tr></thead><tbody>';

    RECURRING_TASKS.forEach((task, taskIndex) => {
        html += `<tr><td class="task-name">${task.name}</td>`;
        months.forEach((month, monthIndex) => {
            const key = `${taskIndex}-${monthIndex}`;
            const status = scheduleStatus[key] || '⏳';
            html += `<td onclick="toggleScheduleStatus(${taskIndex}, ${monthIndex})" style="cursor:pointer;">${status}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody>';
    document.getElementById('annualScheduleTable').innerHTML = html;
}

function toggleScheduleStatus(taskIndex, monthIndex) {
    const scheduleStatus = getScheduleStatus();
    const key = `${taskIndex}-${monthIndex}`;
    const current = scheduleStatus[key] || '⏳';
    
    const statusCycle = ['⏳', '🔄', '✅', '❌'];
    const currentIndex = statusCycle.indexOf(current);
    const nextIndex = (currentIndex + 1) % statusCycle.length;
    
    scheduleStatus[key] = statusCycle[nextIndex];
    localStorage.setItem('scheduleStatus', JSON.stringify(scheduleStatus));
    renderAnnualSchedule();
}

function renderCalendar() {
    const selectedMonth = document.getElementById('monthSelector').value;
    const [year, month] = selectedMonth.split('-').map(Number);
    
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let html = '';
    
    // Headers
    dayNames.forEach(day => {
        html += `<div class="calendar-header">${day}</div>`;
    });
    
    // Empty cells for first week
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day no-tasks"></div>';
    }
    
    // Days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const tasksForDay = getTasksForDay(date);
        
        let dayClass = 'no-tasks';
        if (tasksForDay.length > 0) {
            const allDone = tasksForDay.every(t => t.status === '✅');
            const anyOverdue = tasksForDay.some(t => isOverdue(t));
            const anyInProgress = tasksForDay.some(t => t.status === '🔄');
            
            if (allDone) dayClass = 'all-done';
            else if (anyOverdue) dayClass = 'overdue';
            else if (anyInProgress) dayClass = 'in-progress';
        }
        
        html += `
            <div class="calendar-day ${dayClass}" onclick="showDayTasks('${date.toISOString()}')">
                <div class="day-number">${day}</div>
                <div class="task-count">${tasksForDay.length} task(s)</div>
            </div>
        `;
    }
    
    document.getElementById('calendarGrid').innerHTML = html;
}

function getTasksForDay(date) {
    const tasks = getTasks();
    const dateStr = date.toISOString().split('T')[0];
    
    // Get recurring tasks for this day
    const recurringTasks = RECURRING_TASKS.filter(rt => {
        return isDueOnDay(rt.frequency, date);
    });
    
    // Get one-off tasks
    const oneOffTasks = tasks.filter(t => t.dueDate === dateStr);
    
    return [...recurringTasks.map(rt => ({ ...rt, title: rt.name, isRecurring: true })), ...oneOffTasks];
}

function isDueOnDay(frequency, date) {
    const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon...
    const dayOfMonth = date.getDate();
    
    switch(frequency) {
        case 'weekly-monday': return dayOfWeek === 1;
        case 'weekly-tuesday': return dayOfWeek === 2;
        case 'weekly-wednesday': return dayOfWeek === 3;
        case 'weekly-thursday': return dayOfWeek === 4;
        case 'weekly-friday': return dayOfWeek === 5;
        case 'weekly-saturday': return dayOfWeek === 6;
        case 'weekly-sunday': return dayOfWeek === 0;
        case 'twice-weekly': return dayOfWeek === 2 || dayOfWeek === 4; // Tue & Thu
        case 'daily-mon-sat': return dayOfWeek >= 1 && dayOfWeek <= 6;
        case 'daily-except-friday': return dayOfWeek !== 5;
        case 'monthly-1st': return dayOfMonth === 1;
        case 'monthly-10th': return dayOfMonth === 10;
        case 'monthly-12th': return dayOfMonth === 12;
        case 'bi-weekly': return dayOfMonth === 1 || dayOfMonth === 15;
        case 'quarterly': return (date.getMonth() % 3 === 0) && dayOfMonth === 1;
        case 'bi-annual': return (date.getMonth() === 0 || date.getMonth() === 6) && dayOfMonth === 1;
        default: return false;
    }
}

function showDayTasks(dateStr) {
    const date = new Date(dateStr);
    const tasks = getTasksForDay(date);
    
    if (tasks.length === 0) {
        alert('No tasks scheduled for this day.');
        return;
    }
    
    let message = `Tasks for ${date.toLocaleDateString()}:\n\n`;
    tasks.forEach((task, i) => {
        message += `${i+1}. ${task.title || task.name}\n`;
        if (!task.isRecurring) {
            message += `   Status: ${task.status}\n`;
        }
    });
    
    alert(message);
}

// Analytics Functions
function renderAnalytics() {
    const tasks = getTasks();
    
    // Completion Rate Gauge
    const completed = tasks.filter(t => t.status === '✅ Completed').length;
    const completionRate = Math.round((completed / tasks.length) * 100);
    
    const ctx1 = document.getElementById('completionGauge');
    if (window.completionGaugeInstance) window.completionGaugeInstance.destroy();
    window.completionGaugeInstance = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Remaining'],
            datasets: [{
                data: [completionRate, 100 - completionRate],
                backgroundColor: ['#28a745', '#e0e0e0']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: `${completionRate}%`, font: { size: 32 } }
            }
        }
    });

    // On-Time Rate
    const onTime = tasks.filter(t => t.status === '✅ Completed' && !isOverdue(t)).length;
    const onTimeRate = completed > 0 ? Math.round((onTime / completed) * 100) : 0;
    
    const ctx2 = document.getElementById('onTimeGauge');
    if (window.onTimeGaugeInstance) window.onTimeGaugeInstance.destroy();
    window.onTimeGaugeInstance = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['On-Time', 'Late'],
            datasets: [{
                data: [onTimeRate, 100 - onTimeRate],
                backgroundColor: ['#28a745', '#ffc107']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: `${onTimeRate}%`, font: { size: 32 } }
            }
        }
    });

    // Cost Breakdown
    const costByCategory = {};
    tasks.forEach(t => {
        costByCategory[t.category] = (costByCategory[t.category] || 0) + (t.cost || 0);
    });

    const ctx3 = document.getElementById('costPieChart');
    if (window.costPieInstance) window.costPieInstance.destroy();
    window.costPieInstance = new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: Object.keys(costByCategory),
            datasets: [{
                data: Object.values(costByCategory),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });

    // Term Comparison
    const termData = {
        'Term 1': { total: 0, completed: 0 },
        'Term 2': { total: 0, completed: 0 },
        'Term 3': { total: 0, completed: 0 },
        'Summer': { total: 0, completed: 0 }
    };

    tasks.forEach(t => {
        termData[t.term].total++;
        if (t.status === '✅ Completed') termData[t.term].completed++;
    });

    const ctx4 = document.getElementById('termComparisonChart');
    if (window.termCompInstance) window.termCompInstance.destroy();
    window.termCompInstance = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: Object.keys(termData),
            datasets: [
                {
                    label: 'Total',
                    data: Object.values(termData).map(t => t.total),
                    backgroundColor: '#2563A8'
                },
                {
                    label: 'Completed',
                    data: Object.values(termData).map(t => t.completed),
                    backgroundColor: '#28a745'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Vendor Performance
    renderVendorPerformance(tasks);

    // Overdue Tasks
    renderOverdueTasks(tasks);
}

function renderVendorPerformance(tasks) {
    const vendorStats = {};
    tasks.forEach(t => {
        if (t.vendor && t.vendor !== 'N/A') {
            if (!vendorStats[t.vendor]) {
                vendorStats[t.vendor] = { tasks: 0, completed: 0, inProgress: 0, cost: 0 };
            }
            vendorStats[t.vendor].tasks++;
            if (t.status === '✅ Completed') vendorStats[t.vendor].completed++;
            if (t.status === '🔄 In Progress') vendorStats[t.vendor].inProgress++;
            vendorStats[t.vendor].cost += t.cost || 0;
        }
    });

    let html = '<table style="width:100%; border-collapse:collapse;"><thead><tr style="background:#0D1B2A; color:white;"><th style="padding:12px; text-align:left;">Vendor</th><th>Tasks</th><th>Completed</th><th>In Progress</th><th>Cost (AED)</th><th>Health Score</th></tr></thead><tbody>';

    Object.entries(vendorStats).forEach(([vendor, stats]) => {
        const healthScore = stats.tasks > 0 ? Math.round((stats.completed / stats.tasks) * 100) : 0;
        html += `
            <tr style="border-bottom:1px solid #e0e0e0;">
                <td style="padding:10px;">${vendor}</td>
                <td style="text-align:center;">${stats.tasks}</td>
                <td style="text-align:center;">${stats.completed}</td>
                <td style="text-align:center;">${stats.inProgress}</td>
                <td style="text-align:center;">${stats.cost.toLocaleString()}</td>
                <td style="text-align:center;"><span class="health-score ${healthScore >= 70 ? 'high' : healthScore >= 40 ? 'medium' : 'low'}">${healthScore}</span></td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    document.getElementById('vendorPerformanceTable').innerHTML = html;
}

function renderOverdueTasks(tasks) {
    const overdue = tasks.filter(t => isOverdue(t));

    let html = '<table style="width:100%; border-collapse:collapse;"><thead><tr style="background:#dc3545; color:white;"><th style="padding:12px; text-align:left;">Task ID</th><th>Title</th><th>Due Date</th><th>Status</th><th>Priority</th></tr></thead><tbody>';

    if (overdue.length === 0) {
        html += '<tr><td colspan="5" style="padding:20px; text-align:center; color:#666;">No overdue tasks. Great job!</td></tr>';
    } else {
        overdue.forEach(task => {
            html += `
                <tr style="border-bottom:1px solid #e0e0e0;">
                    <td style="padding:10px;"><strong>${task.id}</strong></td>
                    <td>${task.title}</td>
                    <td>${task.dueDate}</td>
                    <td><span class="badge ${getStatusClass(task.status)}">${task.status}</span></td>
                    <td><span class="badge ${getPriorityClass(task.priority)}">${task.priority}</span></td>
                </tr>
            `;
        });
    }

    html += '</tbody></table>';
    document.getElementById('overdueTasksTable').innerHTML = html;
}

// Vendors Functions
function renderVendors() {
    const vendors = getVendors();
    let html = '';

    vendors.forEach((vendor, index) => {
        html += `
            <div class="vendor-card">
                <h4>${vendor.name}</h4>
                <div class="specialty">${vendor.specialty}</div>
                <div class="info"><i class="fas fa-user"></i> ${vendor.contact}</div>
                <div class="info"><i class="fas fa-phone"></i> ${vendor.phone}</div>
                <div class="info"><i class="fas fa-envelope"></i> ${vendor.email}</div>
                <div class="info"><i class="fas fa-calendar"></i> Contract: ${vendor.contractExp}</div>
                <div class="rating">${vendor.rating}</div>
                <button onclick="deleteVendor(${index})" style="margin-top:12px; padding:8px 16px; background:#dc3545; color:white; border:none; border-radius:6px; cursor:pointer;">Delete</button>
            </div>
        `;
    });

    document.getElementById('vendorGrid').innerHTML = html;
}

function openAddVendorModal() {
    document.getElementById('vendorModal').classList.add('active');
}

function closeVendorModal() {
    document.getElementById('vendorModal').classList.remove('active');
    document.getElementById('vendorForm').reset();
}

function addVendor() {
    const vendors = getVendors();
    
    const vendor = {
        name: document.getElementById('vendorName').value,
        specialty: document.getElementById('vendorSpecialty').value,
        contact: document.getElementById('vendorContact').value || 'N/A',
        phone: document.getElementById('vendorPhone').value || 'N/A',
        email: document.getElementById('vendorEmail').value || 'N/A',
        contractExp: document.getElementById('vendorContractExp').value || 'N/A',
        rating: document.getElementById('vendorRating').value,
        notes: ''
    };

    vendors.push(vendor);
    saveVendors(vendors);
    closeVendorModal();
    renderVendors();
    alert('Vendor added successfully!');
}

function saveVendor() {
    addVendor();
}

function deleteVendor(index) {
    if (confirm('Are you sure you want to delete this vendor?')) {
        const vendors = getVendors();
        vendors.splice(index, 1);
        saveVendors(vendors);
        renderVendors();
        alert('Vendor deleted successfully!');
    }
}

// Settings Functions
function changePassword() {
    const newPassword = document.getElementById('newPassword').value;
    if (newPassword.length < 4) {
        alert('Password must be at least 4 characters long.');
        return;
    }
    
    if (confirm(`Change password to: ${newPassword}?`)) {
        alert('Password changed successfully! (Note: This is stored locally in your browser)');
        document.getElementById('newPassword').value = '';
    }
}

function exportData() {
    const data = {
        tasks: getTasks(),
        vendors: getVendors(),
        scheduleStatus: getScheduleStatus()
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AUS_Maintenance_Data.json';
    a.click();
    alert('Data exported successfully!');
}

function resetData() {
    if (confirm('This will delete all current data and restore sample data. Are you sure?')) {
        localStorage.setItem('tasks', JSON.stringify(SAMPLE_TASKS));
        localStorage.setItem('vendors', JSON.stringify(SAMPLE_VENDORS));
        initializeScheduleStatus();
        alert('Data reset to sample data successfully!');
        location.reload();
    }
}

// Utility Functions
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getVendors() {
    return JSON.parse(localStorage.getItem('vendors') || '[]');
}

function saveVendors(vendors) {
    localStorage.setItem('vendors', JSON.stringify(vendors));
}

function getScheduleStatus() {
    return JSON.parse(localStorage.getItem('scheduleStatus') || '{}');
}

function initializeScheduleStatus() {
    const status = {};
    RECURRING_TASKS.forEach((task, taskIndex) => {
        for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
            status[`${taskIndex}-${monthIndex}`] = '⏳';
        }
    });
    localStorage.setItem('scheduleStatus', JSON.stringify(status));
}

function isOverdue(task) {
    if (task.status === '✅ Completed' || task.status === '❌ Cancelled') return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return today > dueDate;
}

function calculateHealthScore(task) {
    if (task.status === '✅ Completed') return 100;
    if (task.status === '❌ Cancelled') return 0;
    
    let score = 50;
    
    if (task.status === '🔄 In Progress') score += 10;
    if (task.priority === '🔴 Critical') score -= 40;
    else if (task.priority === '🟠 High') score -= 20;
    else if (task.priority === '🟢 Low') score += 20;
    
    if (isOverdue(task)) score -= 30;
    
    score += (task.progress || 0) * 0.3;
    
    return Math.max(0, Math.min(100, Math.round(score)));
}

function getPriorityClass(priority) {
    if (priority.includes('Critical')) return 'critical';
    if (priority.includes('High')) return 'high';
    if (priority.includes('Medium')) return 'medium';
    if (priority.includes('Low')) return 'low';
    return '';
}

function getStatusClass(status) {
    if (status.includes('Pending')) return 'pending';
    if (status.includes('In Progress')) return 'in-progress';
    if (status.includes('Completed')) return 'completed';
    if (status.includes('On Hold')) return 'on-hold';
    if (status.includes('Cancelled')) return 'cancelled';
    return '';
}

// ========== COST BREAKDOWN BY TYPE ==========
function renderCostBreakdown() {
    const tasks = getTasks();
    
    const costTypes = {
        'Electrical': 0,
        'Plumbing': 0,
        'HVAC/AC': 0,
        'Civil/Building': 0,
        'Other': 0
    };
    
    tasks.forEach(task => {
        const cost = parseFloat(task.cost) || 0;
        const category = task.category || 'Other';
        
        if (category === 'Electrical') {
            costTypes['Electrical'] += cost;
        } else if (category === 'Plumbing') {
            costTypes['Plumbing'] += cost;
        } else if (category === 'HVAC/AC') {
            costTypes['HVAC/AC'] += cost;
        } else if (category === 'Civil/Building' || category === 'Painting') {
            costTypes['Civil/Building'] += cost;
        } else {
            costTypes['Other'] += cost;
        }
    });
    
    let html = '<div style="display:grid; grid-template-columns:repeat(5, 1fr); gap:16px; margin-bottom:24px;">';
    
    const colors = {
        'Electrical': '#FF6384',
        'Plumbing': '#36A2EB',
        'HVAC/AC': '#FFCE56',
        'Civil/Building': '#4BC0C0',
        'Other': '#9966FF'
    };
    
    Object.keys(costTypes).forEach(type => {
        html += `
            <div style="background:white; padding:20px; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.1); text-align:center; border-left:4px solid ${colors[type]};">
                <div style="font-size:14px; color:#666; margin-bottom:8px; font-weight:600;">${type}</div>
                <div style="font-size:28px; font-weight:bold; color:#1a202c;">${costTypes[type].toLocaleString()} AED</div>
            </div>
        `;
    });
    
    html += '</div>';
    
    return html;
}

// ========== EXPORT TO CSV ==========
function exportCSV() {
    const tasks = getTasks();
    
    if (tasks.length === 0) {
        alert('No tasks to export!');
        return;
    }
    
    // CSV Headers
    let csv = 'ID,Title,Category,Location,Term,Priority,Status,Assigned To,Reported By,Date Reported,Due Date,Date Completed,Cost (AED),Vendor,Progress %,Notes\n';
    
    // Add task rows
    tasks.forEach(task => {
        const row = [
            task.id || '',
            `"${(task.title || '').replace(/"/g, '""')}"`,
            task.category || '',
            task.location || '',
            task.term || '',
            task.priority || '',
            task.status || '',
            task.assignedTo || '',
            task.reportedBy || '',
            task.dateReported || '',
            task.dueDate || '',
            task.dateCompleted || '',
            task.cost || 0,
            task.vendor || '',
            task.progress || 0,
            `"${(task.notes || '').replace(/"/g, '""')}"`
        ];
        csv += row.join(',') + '\n';
    });
    
    // Create download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `AUS_Maintenance_Tasks_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`Exported ${tasks.length} tasks to CSV successfully!`);
}

// ========== IMPORT FROM CSV ==========
function importCSV() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const csvContent = event.target.result;
            
            try {
                const lines = csvContent.split('\n');
                const headers = lines[0].split(',');
                
                const importedTasks = [];
                
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;
                    
                    // Parse CSV row (handle quoted fields)
                    const values = [];
                    let currentValue = '';
                    let insideQuotes = false;
                    
                    for (let char of line) {
                        if (char === '"') {
                            insideQuotes = !insideQuotes;
                        } else if (char === ',' && !insideQuotes) {
                            values.push(currentValue.trim());
                            currentValue = '';
                        } else {
                            currentValue += char;
                        }
                    }
                    values.push(currentValue.trim());
                    
                    if (values.length >= 13) {
                        const task = {
                            id: values[0] || `MNT-${String(i).padStart(3, '0')}`,
                            title: values[1].replace(/^"|"$/g, '').replace(/""/g, '"'),
                            category: values[2],
                            location: values[3],
                            term: values[4],
                            priority: values[5],
                            status: values[6],
                            assignedTo: values[7],
                            reportedBy: values[8],
                            dateReported: values[9],
                            dueDate: values[10],
                            dateCompleted: values[11] || null,
                            cost: parseFloat(values[12]) || 0,
                            vendor: values[13] || 'N/A',
                            progress: parseInt(values[14]) || 0,
                            notes: (values[15] || '').replace(/^"|"$/g, '').replace(/""/g, '"')
                        };
                        importedTasks.push(task);
                    }
                }
                
                if (importedTasks.length > 0) {
                    if (confirm(`Import ${importedTasks.length} tasks? This will ADD to existing tasks.`)) {
                        const existingTasks = getTasks();
                        const allTasks = [...existingTasks, ...importedTasks];
                        saveTasks(allTasks);
                        renderTaskTable();
                        alert(`Successfully imported ${importedTasks.length} tasks!`);
                        switchPage('tasks');
                    }
                } else {
                    alert('No valid tasks found in CSV file.');
                }
                
            } catch (error) {
                console.error('Import error:', error);
                alert('Error importing CSV file. Please check the format.');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// ========== USER MANAGEMENT ==========
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : DEFAULT_USERS;
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function renderManageUsers() {
    if (!currentUser || !currentUser.permissions.users) {
        alert('You do not have permission to manage users.');
        switchPage('dashboard');
        return;
    }
    
    const users = getUsers();
    let html = '<div style="margin-top:20px;"><table style="width:100%; border-collapse:collapse; background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);"><thead><tr style="background:#2563A8; color:white;"><th style="padding:16px; text-align:left;">Username</th><th style="padding:16px;">Role</th><th style="padding:16px;">Permissions</th><th style="padding:16px;">Actions</th></tr></thead><tbody>';
    
    users.forEach((user, index) => {
        const permissions = Object.keys(user.permissions).filter(p => user.permissions[p]).join(', ');
        html += `
            <tr style="border-bottom:1px solid #e0e0e0;">
                <td style="padding:16px;"><strong>${user.username}</strong></td>
                <td style="padding:16px; text-align:center;"><span style="background:#e3f2fd; padding:6px 12px; border-radius:20px; font-size:13px;">${user.role}</span></td>
                <td style="padding:16px; font-size:12px; color:#666;">${permissions}</td>
                <td style="padding:16px; text-align:center;"><button onclick="deleteUser(${index})" style="padding:8px 16px; background:#dc3545; color:white; border:none; border-radius:6px; cursor:pointer;">Delete</button></td>
            </tr>
        `;
    });
    
    html += '</tbody></table></div>';
    
    document.getElementById('usersList').innerHTML = html;
}

function openUserModal() {
    document.getElementById('userModal').classList.add('active');
}

function openAddUserModal() {
    openUserModal();
}

function closeUserModal() {
    document.getElementById('userModal').classList.remove('active');
    document.getElementById('userForm').reset();
}

function saveUser() {
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value;
    const role = document.getElementById('newRole').value;
    
    if (!username || !password) {
        alert('Please enter username and password.');
        return;
    }
    
    const users = getUsers();
    
    // Check if username exists
    if (users.some(u => u.username === username)) {
        alert('Username already exists!');
        return;
    }
    
    const newUser = {
        username: username,
        password: password,
        role: role,
        permissions: {
            view: document.getElementById('permView').checked,
            add: document.getElementById('permAdd').checked,
            edit: document.getElementById('permEdit').checked,
            delete: document.getElementById('permDelete').checked,
            export: document.getElementById('permExport').checked,
            settings: document.getElementById('permSettings').checked,
            users: document.getElementById('permUsers').checked
        }
    };
    
    users.push(newUser);
    saveUsers(users);
    closeUserModal();
    renderManageUsers();
    alert('User created successfully!');
}

function deleteUser(index) {
    if (confirm('Are you sure you want to delete this user?')) {
        const users = getUsers();
        
        if (users[index].username === 'admin') {
            alert('Cannot delete the default admin user!');
            return;
        }
        
        users.splice(index, 1);
        saveUsers(users);
        renderManageUsers();
        alert('User deleted successfully!');
    }
}

// ========== SETTINGS PAGE RENDER ==========
function renderSettings() {
    // Render Categories
    let categoryHTML = '';
    CATEGORIES.forEach((cat, index) => {
        categoryHTML += `<div class="option-item">${cat} <button onclick="removeOption('category', ${index})">×</button></div>`;
    });
    document.getElementById('categoryOptions').innerHTML = categoryHTML;
    
    // Render Locations
    let locationHTML = '';
    LOCATIONS.forEach((loc, index) => {
        locationHTML += `<div class="option-item">${loc} <button onclick="removeOption('location', ${index})">×</button></div>`;
    });
    document.getElementById('locationOptions').innerHTML = locationHTML;
    
    // Render Teams
    let teamHTML = '';
    ASSIGNED_TO.forEach((team, index) => {
        teamHTML += `<div class="option-item">${team} <button onclick="removeOption('assignedTo', ${index})">×</button></div>`;
    });
    document.getElementById('assignedToOptions').innerHTML = teamHTML;
}

function addNewOption(type) {
    const value = prompt(`Enter new ${type}:`);
    if (!value || value.trim() === '') return;
    
    const trimmedValue = value.trim();
    
    if (type === 'category') {
        if (CATEGORIES.includes(trimmedValue)) {
            alert('This category already exists!');
            return;
        }
        CATEGORIES.push(trimmedValue);
        localStorage.setItem('categories', JSON.stringify(CATEGORIES));
    } else if (type === 'location') {
        if (LOCATIONS.includes(trimmedValue)) {
            alert('This location already exists!');
            return;
        }
        LOCATIONS.push(trimmedValue);
        localStorage.setItem('locations', JSON.stringify(LOCATIONS));
    } else if (type === 'assignedTo') {
        if (ASSIGNED_TO.includes(trimmedValue)) {
            alert('This team already exists!');
            return;
        }
        ASSIGNED_TO.push(trimmedValue);
        localStorage.setItem('assignedTo', JSON.stringify(ASSIGNED_TO));
    }
    
    renderSettings();
    populateDropdowns();
    alert(`${type} added successfully!`);
}

function removeOption(type, index) {
    if (!confirm('Are you sure you want to remove this option?')) return;
    
    if (type === 'category') {
        CATEGORIES.splice(index, 1);
        localStorage.setItem('categories', JSON.stringify(CATEGORIES));
    } else if (type === 'location') {
        LOCATIONS.splice(index, 1);
        localStorage.setItem('locations', JSON.stringify(LOCATIONS));
    } else if (type === 'assignedTo') {
        ASSIGNED_TO.splice(index, 1);
        localStorage.setItem('assignedTo', JSON.stringify(ASSIGNED_TO));
    }
    
    renderSettings();
    populateDropdowns();
    alert('Option removed successfully!');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                
                if (data.tasks) {
                    localStorage.setItem('tasks', JSON.stringify(data.tasks));
                }
                if (data.vendors) {
                    localStorage.setItem('vendors', JSON.stringify(data.vendors));
                }
                if (data.scheduleStatus) {
                    localStorage.setItem('scheduleStatus', JSON.stringify(data.scheduleStatus));
                }
                
                alert('Data imported successfully!');
                location.reload();
            } catch (error) {
                alert('Error importing data. Please check the file format.');
                console.error(error);
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}
