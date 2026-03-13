// ============================================================================
// SCHEDULE PAGE FUNCTIONS
// ============================================================================

function showScheduleView(view) {
    if (view === 'annual') {
        document.getElementById('annualScheduleView').style.display = 'block';
        document.getElementById('dailyScheduleView').style.display = 'none';
        document.getElementById('annualViewBtn').style.background = '#2563A8';
        document.getElementById('dailyViewBtn').style.background = '#6c757d';
        renderAnnualSchedule();
    } else {
        document.getElementById('annualScheduleView').style.display = 'none';
        document.getElementById('dailyScheduleView').style.display = 'block';
        document.getElementById('annualViewBtn').style.background = '#6c757d';
        document.getElementById('dailyViewBtn').style.background = '#2563A8';
        renderDailyCalendar();
    }
}

function renderAnnualSchedule() {
    const tbody = document.getElementById('annualScheduleBody');
    if (!tbody) return;
    
    const recurringTasks = [
        { name: 'Weekly building inspection', frequency: 'Weekly' },
        { name: 'Toilets deep cleaning', frequency: 'Twice Weekly' },
        { name: 'Fire extinguisher check', frequency: 'Monthly' },
        { name: 'Generator test run', frequency: 'Weekly' },
        { name: 'AC filter cleaning', frequency: 'Bi-weekly' },
        { name: 'CCTV system check', frequency: 'Monthly' },
        { name: 'Playground inspection', frequency: 'Weekly' },
        { name: 'Pool water treatment', frequency: 'Daily' },
        { name: 'Pest control – canteen', frequency: 'Bi-weekly' },
        { name: 'Corridor lighting check', frequency: 'Weekly' },
        { name: 'Library AC maintenance', frequency: 'Monthly' },
        { name: 'Roof & drainage inspection', frequency: 'Quarterly' },
        { name: 'Sports hall floor maintenance', frequency: 'Monthly' },
        { name: 'Canteen deep clean', frequency: 'Weekly' },
        { name: 'Emergency lighting test', frequency: 'Quarterly' },
        { name: 'Water tanks cleaning', frequency: 'Bi-annual' },
        { name: 'Annual fire drill', frequency: 'Bi-annual' },
        { name: 'Garden & landscaping', frequency: 'Daily' }
    ];
    
    let html = '';
    recurringTasks.forEach((task, idx) => {
        html += `<tr style="border-bottom:1px solid #e0e0e0;">
            <td style="padding:10px 8px; font-weight:600; background:#f8f9fa; position:sticky; left:0; z-index:1;">${task.name}<br><small style="color:#666; font-weight:400;">${task.frequency}</small></td>`;
        
        for (let month = 0; month < 12; month++) {
            const statusValue = getScheduleStatus(idx, month);
            const bgColor = statusValue === 'done' ? '#d4edda' : statusValue === 'pending' ? '#fff3cd' : '#f8f9fa';
            const icon = statusValue === 'done' ? '✓' : statusValue === 'pending' ? '⏳' : '○';
            html += `<td onclick="toggleScheduleStatus(${idx}, ${month})" style="padding:10px 8px; text-align:center; background:${bgColor}; cursor:pointer; transition:all 0.3s;">${icon}</td>`;
        }
        
        html += '</tr>';
    });
    
    tbody.innerHTML = html;
}

function getScheduleStatus(taskIdx, month) {
    const key = `schedule_${taskIdx}_${month}`;
    return localStorage.getItem(key) || 'none';
}

function toggleScheduleStatus(taskIdx, month) {
    const key = `schedule_${taskIdx}_${month}`;
    const current = getScheduleStatus(taskIdx, month);
    const next = current === 'none' ? 'pending' : current === 'pending' ? 'done' : 'none';
    localStorage.setItem(key, next);
    renderAnnualSchedule();
}

function renderDailyCalendar() {
    const grid = document.getElementById('dailyCalendarGrid');
    if (!grid) return;
    
    const monthSelect = document.getElementById('calendarMonth');
    const month = parseInt(monthSelect.value);
    const year = month >= 9 ? 2025 : 2026;
    
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();
    
    let html = '<div style="display:grid; grid-template-columns:repeat(7, 1fr); gap:10px;">';
    
    // Headers
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        html += `<div style="font-weight:700; text-align:center; padding:12px; background:#0D1B2A; color:white; border-radius:8px;">${day}</div>`;
    });
    
    // Empty cells before month starts
    for (let i = 0; i < firstDay; i++) {
        html += '<div style="background:#f8f9fa; border-radius:8px; min-height:100px;"></div>';
    }
    
    // Days
    for (let day = 1; day <= daysInMonth; day++) {
        const tasksCount = Math.floor(Math.random() * 4); // Random for demo
        const bgColor = tasksCount === 0 ? '#f8f9fa' : tasksCount === 1 ? '#d4edda' : tasksCount === 2 ? '#fff3cd' : '#f8d7da';
        html += `<div style="background:${bgColor}; border:2px solid #e0e0e0; border-radius:8px; padding:8px; min-height:100px; cursor:pointer; transition:all 0.3s;" onmouseover="this.style.borderColor='#2563A8'" onmouseout="this.style.borderColor='#e0e0e0'">
            <div style="font-weight:700; color:#0D1B2A; margin-bottom:4px;">${day}</div>
            <div style="font-size:11px; color:#666;">${tasksCount} tasks</div>
        </div>`;
    }
    
    html += '</div>';
    grid.innerHTML = html;
}

// ============================================================================
// ANALYTICS PAGE FUNCTIONS
// ============================================================================

function renderAnalytics() {
    renderAnalyticsMetrics();
    renderCostChart();
    renderPriorityChart();
    renderOverdueTasks();
    renderTopCategories();
}

function renderAnalyticsMetrics() {
    const tasks = getTasks();
    const completed = tasks.filter(t => t.status === '✅ Completed').length;
    const completionRate = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
    
    const completedOnTime = tasks.filter(t => t.status === '✅ Completed' && t.dateCompleted && t.dueDate && new Date(t.dateCompleted) <= new Date(t.dueDate)).length;
    const onTimeRate = completed > 0 ? Math.round((completedOnTime / completed) * 100) : 0;
    
    const totalCost = tasks.reduce((sum, t) => sum + (t.cost || 0), 0);
    const avgCost = tasks.length > 0 ? Math.round(totalCost / tasks.length) : 0;
    
    document.getElementById('completionRate').textContent = completionRate + '%';
    document.getElementById('onTimeRate').textContent = onTimeRate + '%';
    document.getElementById('avgCost').textContent = avgCost.toLocaleString() + ' AED';
}

function renderCostChart() {
    const ctx = document.getElementById('costChart');
    if (!ctx) return;
    
    const tasks = getTasks();
    const completedCost = tasks.filter(t => t.status === '✅ Completed').reduce((sum, t) => sum + (t.cost || 0), 0);
    const inProgressCost = tasks.filter(t => t.status === '🔄 In Progress').reduce((sum, t) => sum + (t.cost || 0), 0);
    const pendingCost = tasks.filter(t => t.status === '⏳ Pending').reduce((sum, t) => sum + (t.cost || 0), 0);
    const cancelledCost = tasks.filter(t => t.status === '❌ Cancelled').reduce((sum, t) => sum + (t.cost || 0), 0);
    const onHoldCost = tasks.filter(t => t.status === '⏸ On Hold').reduce((sum, t) => sum + (t.cost || 0), 0);
    
    if (window.costChartInstance) window.costChartInstance.destroy();
    window.costChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Completed', 'In Progress', 'Pending', 'Cancelled', 'On Hold'],
            datasets: [{
                label: 'Cost (AED)',
                data: [completedCost, inProgressCost, pendingCost, cancelledCost, onHoldCost],
                backgroundColor: ['#28a745', '#ffc107', '#6c757d', '#dc3545', '#17a2b8']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: { y: { beginAtZero: true } }
        }
    });
}

function renderPriorityChart() {
    const ctx = document.getElementById('priorityChart');
    if (!ctx) return;
    
    const tasks = getTasks();
    const critical = tasks.filter(t => t.priority === '🔴 Critical').length;
    const high = tasks.filter(t => t.priority === '🟠 High').length;
    const medium = tasks.filter(t => t.priority === '🟡 Medium').length;
    const low = tasks.filter(t => t.priority === '🟢 Low').length;
    
    if (window.priorityChartInstance) window.priorityChartInstance.destroy();
    window.priorityChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Critical', 'High', 'Medium', 'Low'],
            datasets: [{
                data: [critical, high, medium, low],
                backgroundColor: ['#dc3545', '#fd7e14', '#ffc107', '#28a745']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

function renderOverdueTasks() {
    const list = document.getElementById('overdueTasksList');
    if (!list) return;
    
    const tasks = getTasks();
    const overdue = tasks.filter(t => isOverdue(t));
    
    if (overdue.length === 0) {
        list.innerHTML = '<p style="color:#28a745; font-weight:600;">✓ No overdue tasks!</p>';
        return;
    }
    
    let html = '<div style="display:flex; flex-direction:column; gap:8px;">';
    overdue.slice(0, 10).forEach(task => {
        html += `<div style="padding:12px; background:#f8d7da; border-left:4px solid #dc3545; border-radius:4px;">
            <div style="font-weight:600; color:#721c24; margin-bottom:4px;">${task.title}</div>
            <div style="font-size:12px; color:#721c24;">Due: ${task.dueDate}</div>
        </div>`;
    });
    html += '</div>';
    
    list.innerHTML = html;
}

function renderTopCategories() {
    const list = document.getElementById('topCategoriesList');
    if (!list) return;
    
    const tasks = getTasks();
    const categories = {};
    
    tasks.forEach(task => {
        categories[task.category] = (categories[task.category] || 0) + 1;
    });
    
    const sorted = Object.entries(categories).sort((a, b) => b[1] - a[1]);
    
    let html = '<div style="display:flex; flex-direction:column; gap:8px;">';
    sorted.slice(0, 10).forEach(([cat, count]) => {
        const percentage = Math.round((count / tasks.length) * 100);
        html += `<div style="padding:12px; background:#f8f9fa; border-radius:4px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="font-weight:600; color:#0D1B2A;">${cat}</span>
                <span style="font-weight:600; color:#2563A8;">${count} tasks</span>
            </div>
            <div style="width:100%; height:6px; background:#e0e0e0; border-radius:3px;">
                <div style="width:${percentage}%; height:100%; background:#2563A8; border-radius:3px;"></div>
            </div>
        </div>`;
    });
    html += '</div>';
    
    list.innerHTML = html;
}

// ============================================================================
// VENDORS PAGE FUNCTIONS
// ============================================================================

function renderVendors() {
    const grid = document.getElementById('vendorsGrid');
    if (!grid) return;
    
    const vendors = getVendors();
    
    let html = '';
    vendors.forEach((vendor, index) => {
        html += `<div style="background:white; padding:24px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1); transition:all 0.3s; cursor:pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'">
            <h4 style="color:#0D1B2A; font-size:18px; margin-bottom:8px;">${vendor.name}</h4>
            <div style="color:#2563A8; font-size:14px; font-weight:600; margin-bottom:12px;">${vendor.specialty}</div>
            <div style="color:#666; font-size:13px; margin-bottom:4px;"><strong>Contact:</strong> ${vendor.contact || 'N/A'}</div>
            <div style="color:#666; font-size:13px; margin-bottom:4px;"><strong>Phone:</strong> ${vendor.phone || 'N/A'}</div>
            <div style="color:#666; font-size:13px; margin-bottom:4px;"><strong>Email:</strong> ${vendor.email || 'N/A'}</div>
            <div style="color:#666; font-size:13px; margin-bottom:8px;"><strong>Contract Exp:</strong> ${vendor.contractExp || 'N/A'}</div>
            <div style="color:#ffc107; font-size:16px; margin-top:8px;">${vendor.rating || '⭐⭐⭐'}</div>
            <div style="margin-top:12px; display:flex; gap:8px;">
                <button onclick="editVendor(${index})" style="padding:8px 16px; background:#17a2b8; color:white; border:none; border-radius:6px; cursor:pointer; font-size:12px; font-weight:600;">Edit</button>
                <button onclick="deleteVendor(${index})" style="padding:8px 16px; background:#dc3545; color:white; border:none; border-radius:6px; cursor:pointer; font-size:12px; font-weight:600;">Delete</button>
            </div>
        </div>`;
    });
    
    if (vendors.length === 0) {
        html = '<div style="grid-column:1/-1; background:white; padding:40px; border-radius:12px; text-align:center; color:#666;"><h3>No vendors added yet</h3><p>Click "Add Vendor" to get started!</p></div>';
    }
    
    grid.innerHTML = html;
}

function getVendors() {
    const vendors = localStorage.getItem('vendors');
    return vendors ? JSON.parse(vendors) : [];
}

function openAddVendorModal() {
    document.getElementById('vendorModal').classList.add('active');
    document.getElementById('vendorForm').reset();
}

function closeVendorModal() {
    document.getElementById('vendorModal').classList.remove('active');
}

function saveVendor() {
    const vendor = {
        name: document.getElementById('vendorName').value,
        specialty: document.getElementById('vendorSpecialty').value,
        contact: document.getElementById('vendorContact').value,
        phone: document.getElementById('vendorPhone').value,
        email: document.getElementById('vendorEmail').value,
        contractExp: document.getElementById('vendorContractExp').value,
        rating: document.getElementById('vendorRating').value
    };
    
    const vendors = getVendors();
    vendors.push(vendor);
    localStorage.setItem('vendors', JSON.stringify(vendors));
    
    closeVendorModal();
    renderVendors();
}

function editVendor(index) {
    alert('Edit vendor feature - Coming soon!');
}

function deleteVendor(index) {
    if (!confirm('Delete this vendor?')) return;
    
    const vendors = getVendors();
    vendors.splice(index, 1);
    localStorage.setItem('vendors', JSON.stringify(vendors));
    renderVendors();
}

// Initialize on page load
if (typeof window !== 'undefined') {
    const originalSwitchPage = window.switchPage;
    window.switchPage = function(pageName) {
        if (originalSwitchPage) originalSwitchPage(pageName);
        
        // Render page-specific content
        setTimeout(() => {
            if (pageName === 'schedule') {
                showScheduleView('annual');
            } else if (pageName === 'analytics') {
                renderAnalytics();
            } else if (pageName === 'vendors') {
                renderVendors();
            }
        }, 100);
    };
}
