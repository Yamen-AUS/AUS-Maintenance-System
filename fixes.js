// ===================================
// FIX FILE FOR AUS MAINTENANCE SYSTEM
// ===================================
// This file fixes all reported issues
// Add this script AFTER app-v2.js in index.html

// Fix 1: Update modal IDs
function openAddTaskModal() {
    const modal = document.getElementById('taskModal');
    if (modal) {
        modal.classList.add('active');
        document.getElementById('taskModalTitle').textContent = 'Add New Task';
        document.getElementById('editTaskId').value = '';
        document.getElementById('taskForm').reset();
        document.getElementById('taskReported').value = new Date().toISOString().split('T')[0];
    }
}

function closeTaskModal() {
    const modal = document.getElementById('taskModal');
    if (modal) {
        modal.classList.remove('active');
        document.getElementById('taskForm').reset();
    }
}

// Fix 2: Task Form Submit Handler
document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.onsubmit = function(e) {
            e.preventDefault();
            saveTask();
            return false;
        };
    }
});

// Fix 3: Save Task Function
function saveTask() {
    const editId = document.getElementById('editTaskId').value;
    const tasks = getTasks();
    
    const taskData = {
        id: editId || `MNT-${String(tasks.length + 1).padStart(3, '0')}`,
        title: document.getElementById('taskTitle').value,
        category: document.getElementById('taskCategory').value,
        location: document.getElementById('taskLocation').value,
        term: document.getElementById('taskTerm').value,
        priority: document.getElementById('taskPriority').value,
        status: document.getElementById('taskStatus').value,
        assignedTo: document.getElementById('taskAssigned').value,
        reportedBy: document.getElementById('taskReporter').value || 'Admin',
        dateReported: document.getElementById('taskReported').value,
        dueDate: document.getElementById('taskDueDate').value,
        dateCompleted: document.getElementById('taskCompleted').value || null,
        cost: parseFloat(document.getElementById('taskCost').value) || 0,
        vendor: document.getElementById('taskVendor').value || 'N/A',
        progress: parseInt(document.getElementById('taskProgress').value) || 0,
        notes: document.getElementById('taskRemarks').value || '',
        attachment: document.getElementById('taskAttachment').value || null
    };
    
    if (editId) {
        // Edit existing
        const index = tasks.findIndex(t => t.id === editId);
        if (index !== -1) {
            tasks[index] = taskData;
        }
    } else {
        // Add new
        tasks.push(taskData);
    }
    
    saveTasks(tasks);
    closeTaskModal();
    renderTaskTable();
    alert(editId ? 'Task updated successfully!' : 'Task added successfully!');
}

// Fix 4: Export CSV Function
function exportCSV() {
    const tasks = getTasks();
    if (tasks.length === 0) {
        alert('No tasks to export!');
        return;
    }
    
    // CSV Headers
    const headers = [
        '#', 'Task ID', 'Title', 'Category', 'Location', 'Term', 'Priority', 'Status',
        'Assigned To', 'Date Reported', 'Due Date', 'Date Completed', 'Days to Close',
        'Cost (AED)', 'Vendor', 'Progress %', 'Health Score', 'Remarks', 'Attachment'
    ];
    
    // Build CSV content
    let csv = headers.join(',') + '\n';
    
    tasks.forEach((task, index) => {
        const daysToClose = task.dateCompleted && task.dateReported
            ? Math.ceil((new Date(task.dateCompleted) - new Date(task.dateReported)) / (1000 * 60 * 60 * 24))
            : '-';
        
        const healthScore = calculateHealthScore(task);
        
        const row = [
            index + 1,
            task.id,
            `"${task.title}"`,
            task.category,
            task.location,
            task.term,
            task.priority,
            task.status,
            task.assignedTo,
            task.dateReported,
            task.dueDate,
            task.dateCompleted || '-',
            daysToClose,
            task.cost,
            task.vendor,
            task.progress,
            healthScore,
            `"${task.notes || ''}"`,
            task.attachment || '-'
        ];
        
        csv += row.join(',') + '\n';
    });
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `AUS_Tasks_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Fix 5: Settings Functions
function addNewOption(type) {
    const value = prompt(`Enter new ${type}:`);
    if (!value) return;
    
    let array;
    let storageKey;
    
    switch(type) {
        case 'category':
            storageKey = 'categories';
            array = JSON.parse(localStorage.getItem(storageKey) || JSON.stringify(CATEGORIES));
            break;
        case 'location':
            storageKey = 'locations';
            array = JSON.parse(localStorage.getItem(storageKey) || JSON.stringify(LOCATIONS));
            break;
        case 'assignedTo':
            storageKey = 'assignedTo';
            array = JSON.parse(localStorage.getItem(storageKey) || JSON.stringify(ASSIGNED_TO));
            break;
    }
    
    if (!array.includes(value)) {
        array.push(value);
        localStorage.setItem(storageKey, JSON.stringify(array));
        alert(`${value} added successfully!`);
        location.reload(); // Reload to update dropdowns
    } else {
        alert(`${value} already exists!`);
    }
}

// Fix 6: Import/Export Data
function exportAllData() {
    const data = {
        tasks: getTasks(),
        vendors: getVendors(),
        scheduleStatus: JSON.parse(localStorage.getItem('scheduleStatus') || '{}'),
        kpiTargets: JSON.parse(localStorage.getItem('kpiTargets') || '{}'),
        schoolInfo: JSON.parse(localStorage.getItem('schoolInfo') || '{}')
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `AUS_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
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
                
                if (data.tasks) localStorage.setItem('tasks', JSON.stringify(data.tasks));
                if (data.vendors) localStorage.setItem('vendors', JSON.stringify(data.vendors));
                if (data.scheduleStatus) localStorage.setItem('scheduleStatus', JSON.stringify(data.scheduleStatus));
                if (data.kpiTargets) localStorage.setItem('kpiTargets', JSON.stringify(data.kpiTargets));
                if (data.schoolInfo) localStorage.setItem('schoolInfo', JSON.stringify(data.schoolInfo));
                
                alert('Data imported successfully!');
                location.reload();
            } catch (error) {
                alert('Error importing data: ' + error.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function resetData() {
    if (!confirm('Are you sure you want to reset all data? This will restore sample data.')) return;
    
    localStorage.removeItem('tasks');
    localStorage.removeItem('vendors');
    localStorage.removeItem('scheduleStatus');
    
    alert('Data reset successfully!');
    location.reload();
}

// Fix 7: Save Settings Functions
function changePassword() {
    const newPass = document.getElementById('newPassword').value;
    if (!newPass) {
        alert('Please enter a new password!');
        return;
    }
    localStorage.setItem('password', newPass);
    alert('Password changed successfully!');
    document.getElementById('newPassword').value = '';
}

function saveKPITargets() {
    const targets = {
        completionRate: parseInt(document.getElementById('completionTarget').value) || 75,
        onTimeRate: parseInt(document.getElementById('onTimeTarget').value) || 85,
        annualBudget: parseInt(document.getElementById('annualBudget').value) || 500000
    };
    localStorage.setItem('kpiTargets', JSON.stringify(targets));
    alert('KPI Targets saved successfully!');
}

function saveSchoolInfo() {
    const info = {
        name: document.getElementById('schoolName').value || 'Arab Unity School',
        logo: document.getElementById('schoolLogo').value || ''
    };
    localStorage.setItem('schoolInfo', JSON.stringify(info));
    alert('School information saved successfully!');
}

// Fix 8: User Management Functions
function openAddUserModal() {
    const modal = document.getElementById('userModal');
    if (modal) {
        modal.classList.add('active');
        document.getElementById('userForm').reset();
    }
}

function closeUserModal() {
    const modal = document.getElementById('userModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function saveUser() {
    const users = JSON.parse(localStorage.getItem('users') || JSON.stringify(DEFAULT_USERS));
    
    const newUser = {
        username: document.getElementById('newUsername').value,
        password: document.getElementById('newPassword').value,
        role: document.getElementById('newRole').value,
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
    
    if (!newUser.username || !newUser.password) {
        alert('Username and password are required!');
        return;
    }
    
    if (users.find(u => u.username === newUser.username)) {
        alert('Username already exists!');
        return;
    }
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    closeUserModal();
    alert('User created successfully!');
    renderUsersList();
}

function renderUsersList() {
    // This function would render the users list
    // Implementation depends on HTML structure
}

// Fix 9: Vendor Modal Functions
function openAddVendorModal() {
    const modal = document.getElementById('vendorModal');
    if (modal) {
        modal.classList.add('active');
        document.getElementById('vendorForm').reset();
    }
}

function closeVendorModal() {
    const modal = document.getElementById('vendorModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function saveVendor() {
    const vendors = getVendors();
    
    const newVendor = {
        id: 'VND-' + String(vendors.length + 1).padStart(3, '0'),
        name: document.getElementById('vendorName').value,
        specialty: document.getElementById('vendorSpecialty').value,
        contact: document.getElementById('vendorContact').value,
        phone: document.getElementById('vendorPhone').value,
        email: document.getElementById('vendorEmail').value,
        contractExpiry: document.getElementById('vendorContractExp').value,
        rating: document.getElementById('vendorRating').value,
        notes: ''
    };
    
    if (!newVendor.name || !newVendor.specialty) {
        alert('Name and specialty are required!');
        return;
    }
    
    vendors.push(newVendor);
    saveVendors(vendors);
    
    closeVendorModal();
    alert('Vendor added successfully!');
    renderVendors();
}

// Fix 10: Cost Breakdown in Dashboard
function renderDashboardFixed() {
    const tasks = getTasks();
    
    // Calculate costs by status
    const costByStatus = {
        'Completed': 0,
        'In Progress': 0,
        'Pending': 0,
        'On Hold': 0,
        'Cancelled': 0
    };
    
    tasks.forEach(task => {
        const status = task.status.replace(/[🔄✅⏳⏸️❌]/g, '').trim();
        if (costByStatus.hasOwnProperty(status)) {
            costByStatus[status] += task.cost || 0;
        }
    });
    
    // Update Annual Cost KPI to show breakdown
    const totalCost = Object.values(costByStatus).reduce((a, b) => a + b, 0);
    
    const costBreakdownHTML = `
        <div class="kpi-card info">
            <h3>Annual Cost</h3>
            <div class="value">${totalCost.toLocaleString()} AED</div>
            <div style="font-size: 12px; margin-top: 10px; text-align: left;">
                <div>✅ Completed: ${costByStatus['Completed'].toLocaleString()} AED</div>
                <div>🔄 In Progress: ${costByStatus['In Progress'].toLocaleString()} AED</div>
                <div>⏳ Pending: ${costByStatus['Pending'].toLocaleString()} AED</div>
                <div>⏸️ On Hold: ${costByStatus['On Hold'].toLocaleString()} AED</div>
                <div>❌ Cancelled: ${costByStatus['Cancelled'].toLocaleString()} AED</div>
            </div>
        </div>
    `;
    
    // Find and replace the Annual Cost card
    const kpiGrid = document.getElementById('kpiGrid');
    if (kpiGrid) {
        const cards = kpiGrid.querySelectorAll('.kpi-card');
        if (cards.length >= 7) {
            cards[6].outerHTML = costBreakdownHTML;
        }
    }
}

// Override renderDashboard to include cost breakdown
const originalRenderDashboard = window.renderDashboard;
if (originalRenderDashboard) {
    window.renderDashboard = function() {
        originalRenderDashboard();
        setTimeout(renderDashboardFixed, 100);
    };
}

console.log('✅ AUS Fixes Applied Successfully!');
