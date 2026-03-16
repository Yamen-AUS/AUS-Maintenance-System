// ========================================
// AUS Maintenance System - Firestore Version
// 100% Cloud-Based - Real-time Sync
// Fixed Version - Matching HTML IDs
// ========================================

import { db } from './firebase-config.js';
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    setDoc, 
    updateDoc, 
    deleteDoc, 
    onSnapshot,
    query,
    orderBy,
    where
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// ========================================
// Global State
// ========================================
window.currentUser = null;
window.currentPage = 'dashboard';
window.allTasks = [];
window.allVendors = [];
window.allUsers = [];

// Collections
const COLLECTIONS = {
    tasks: 'maintenance_tasks',
    users: 'system_users',
    vendors: 'vendors',
    settings: 'system_settings'
};

// ========================================
// Initialize Application
// ========================================
async function initApp() {
    console.log('🚀 Initializing AUS Maintenance System (Firestore)...');
    
    // Setup login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Setup navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const pageName = this.getAttribute('data-page');
            showPage(pageName);
        });
    });
    
    // Check if logged in
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
        window.currentUser = JSON.parse(savedUser);
        showMainApp();
        await loadDashboard();
        setupRealtimeListeners();
    } else {
        showLogin();
    }
    
    console.log('✅ App initialized successfully');
}

// ========================================
// Authentication
// ========================================
async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (!username || !password) {
        errorMessage.textContent = '⚠️ Please enter username and password';
        errorMessage.style.display = 'block';
        return;
    }
    
    try {
        // Get users from Firestore
        const usersSnapshot = await getDocs(collection(db, COLLECTIONS.users));
        let foundUser = null;
        
        usersSnapshot.forEach(docSnap => {
            const user = docSnap.data();
            if (user.username === username && user.password === password) {
                foundUser = { id: docSnap.id, ...user };
            }
        });
        
        if (foundUser) {
            window.currentUser = foundUser;
            sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
            showMainApp();
            await loadDashboard();
            setupRealtimeListeners();
            showSyncStatus('✅ Logged in successfully', 'synced');
        } else {
            errorMessage.textContent = '❌ Invalid username or password';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Login error:', error);
        errorMessage.textContent = '❌ Login failed. Please check your connection.';
        errorMessage.style.display = 'block';
    }
}

window.logout = function() {
    if (confirm('Are you sure you want to logout?')) {
        window.currentUser = null;
        sessionStorage.removeItem('currentUser');
        showLogin();
    }
};

function showLogin() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('appContainer').style.display = 'none';
}

function showMainApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('appContainer').style.display = 'block';
    
    // Update user info in sidebar
    const userInfo = document.getElementById('userInfo');
    if (userInfo && window.currentUser) {
        userInfo.innerHTML = `
            <div class="username">${window.currentUser.name || window.currentUser.username}</div>
            <div class="role">${window.currentUser.role || 'User'}</div>
        `;
    }
}

// ========================================
// Navigation
// ========================================
function showPage(pageName) {
    window.currentPage = pageName;
    
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageName) {
            item.classList.add('active');
        }
    });
    
    // Update content
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const activePage = document.getElementById(pageName);
    if (activePage) {
        activePage.classList.add('active');
    }
    
    // Load page data
    switch(pageName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'tasks':
            loadTasks();
            break;
        case 'analytics':
            loadAnalytics();
            break;
        case 'vendors':
            loadVendors();
            break;
        case 'users':
            loadUsers();
            break;
        case 'settings':
            loadSettings();
            break;
        case 'schedule':
            loadSchedule();
            break;
    }
}

// ========================================
// Dashboard
// ========================================
async function loadDashboard() {
    console.log('📊 Loading dashboard...');
    showSyncStatus('Loading dashboard...', 'syncing');
    
    try {
        const tasksSnapshot = await getDocs(collection(db, COLLECTIONS.tasks));
        const tasks = [];
        tasksSnapshot.forEach(docSnap => {
            tasks.push({ id: docSnap.id, ...docSnap.data() });
        });
        
        window.allTasks = tasks;
        
        // Calculate KPIs
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'Completed' || t.status.includes('✅')).length;
        const pending = tasks.filter(t => t.status === 'Pending' || t.status.includes('⏳')).length;
        const totalCost = tasks.reduce((sum, t) => sum + (parseFloat(t.cost) || 0), 0);
        
        // Update KPIs
        renderKPIs({
            total,
            completed,
            pending,
            inProgress: total - completed - pending,
            totalCost,
            avgCost: total > 0 ? totalCost / total : 0,
            completionRate: total > 0 ? (completed / total * 100).toFixed(1) : 0
        });
        
        // Render alerts
        renderAlerts(tasks);
        
        // Render charts
        renderDashboardCharts(tasks);
        
        showSyncStatus('✅ Dashboard loaded', 'synced');
        console.log('✅ Dashboard loaded:', tasks.length, 'tasks');
    } catch (error) {
        console.error('Dashboard load error:', error);
        showSyncStatus('❌ Failed to load dashboard', 'error');
    }
}

function renderKPIs(data) {
    const kpiGrid = document.getElementById('kpiGrid');
    if (!kpiGrid) return;
    
    kpiGrid.innerHTML = `
        <div class="kpi-card">
            <div class="label">Total Tasks</div>
            <div class="value">${data.total}</div>
            <div class="trend">Academic Year 2025-26</div>
        </div>
        <div class="kpi-card success">
            <div class="label">Completed</div>
            <div class="value">${data.completed}</div>
            <div class="trend">${data.completionRate}% completion rate</div>
        </div>
        <div class="kpi-card warning">
            <div class="label">Pending</div>
            <div class="value">${data.pending}</div>
            <div class="trend">Needs attention</div>
        </div>
        <div class="kpi-card">
            <div class="label">In Progress</div>
            <div class="value">${data.inProgress}</div>
            <div class="trend">Active tasks</div>
        </div>
        <div class="kpi-card">
            <div class="label">Total Cost</div>
            <div class="value">${data.totalCost.toLocaleString()} AED</div>
            <div class="trend">Avg: ${data.avgCost.toLocaleString()} AED</div>
        </div>
    `;
}

function renderAlerts(tasks) {
    const alertsList = document.getElementById('alertsList');
    if (!alertsList) return;
    
    const alerts = [];
    const now = new Date();
    
    // Find overdue tasks
    tasks.forEach(task => {
        if (task.status !== 'Completed' && task.dueDate) {
            const dueDate = new Date(task.dueDate);
            if (dueDate < now) {
                alerts.push({
                    type: 'danger',
                    message: `Task "${task.title}" is overdue (Due: ${task.dueDate})`
                });
            }
        }
    });
    
    // High priority pending tasks
    const highPriority = tasks.filter(t => 
        t.priority && t.priority.includes('Critical') && 
        (t.status === 'Pending' || t.status.includes('⏳'))
    );
    
    if (highPriority.length > 0) {
        alerts.push({
            type: 'warning',
            message: `${highPriority.length} critical priority task(s) pending`
        });
    }
    
    if (alerts.length === 0) {
        alertsList.innerHTML = '<div class="alert-item success">✅ All tasks are on track!</div>';
    } else {
        alertsList.innerHTML = alerts.map(alert => 
            `<div class="alert-item ${alert.type}">${alert.message}</div>`
        ).join('');
    }
}

function renderDashboardCharts(tasks) {
    // Status Chart
    const statusCounts = {
        'Completed': tasks.filter(t => t.status === 'Completed' || t.status.includes('✅')).length,
        'Pending': tasks.filter(t => t.status === 'Pending' || t.status.includes('⏳')).length,
        'In Progress': tasks.filter(t => t.status === 'In Progress' || t.status.includes('🔄')).length
    };
    
    const statusCanvas = document.getElementById('statusChart');
    if (statusCanvas) {
        const ctx = statusCanvas.getContext('2d');
        if (window.statusChartInstance) {
            window.statusChartInstance.destroy();
        }
        window.statusChartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    data: Object.values(statusCounts),
                    backgroundColor: ['#28a745', '#ffc107', '#17a2b8']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
    
    // Category Chart
    const categoryCounts = {};
    tasks.forEach(task => {
        const cat = task.category || 'Other';
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
    
    const categoryCanvas = document.getElementById('categoryChart');
    if (categoryCanvas) {
        const ctx = categoryCanvas.getContext('2d');
        if (window.categoryChartInstance) {
            window.categoryChartInstance.destroy();
        }
        window.categoryChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(categoryCounts),
                datasets: [{
                    label: 'Tasks',
                    data: Object.values(categoryCounts),
                    backgroundColor: '#2563A8'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
    
    // Term Chart
    const termCounts = {
        'Term 1': 0,
        'Term 2': 0,
        'Term 3': 0,
        'Summer': 0
    };
    tasks.forEach(task => {
        if (task.term && termCounts.hasOwnProperty(task.term)) {
            termCounts[task.term]++;
        }
    });
    
    const termCanvas = document.getElementById('termChart');
    if (termCanvas) {
        const ctx = termCanvas.getContext('2d');
        if (window.termChartInstance) {
            window.termChartInstance.destroy();
        }
        window.termChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(termCounts),
                datasets: [{
                    label: 'Tasks by Term',
                    data: Object.values(termCounts),
                    backgroundColor: '#0D1B2A'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
}

// ========================================
// Tasks Management
// ========================================
async function loadTasks() {
    console.log('📝 Loading tasks...');
    showSyncStatus('Loading tasks...', 'syncing');
    
    try {
        const tasksSnapshot = await getDocs(
            query(collection(db, COLLECTIONS.tasks), orderBy('id', 'desc'))
        );
        
        const tasks = [];
        tasksSnapshot.forEach(docSnap => {
            tasks.push({ id: docSnap.id, ...docSnap.data() });
        });
        
        window.allTasks = tasks;
        
        // Populate filter dropdowns
        populateFilterDropdowns(tasks);
        
        // Render table
        renderTasksTable(tasks);
        
        showSyncStatus('✅ Tasks loaded', 'synced');
        console.log('✅ Tasks loaded:', tasks.length);
    } catch (error) {
        console.error('Tasks load error:', error);
        showSyncStatus('❌ Failed to load tasks', 'error');
    }
}

function populateFilterDropdowns(tasks) {
    // Status filter
    const statusFilter = document.getElementById('filterStatus');
    if (statusFilter) {
        const statuses = [...new Set(tasks.map(t => t.status))];
        statusFilter.innerHTML = '<option value="">All Status</option>' +
            statuses.map(s => `<option value="${s}">${s}</option>`).join('');
    }
    
    // Priority filter
    const priorityFilter = document.getElementById('filterPriority');
    if (priorityFilter) {
        const priorities = [...new Set(tasks.map(t => t.priority))];
        priorityFilter.innerHTML = '<option value="">All Priority</option>' +
            priorities.map(p => `<option value="${p}">${p}</option>`).join('');
    }
    
    // Category filter
    const categoryFilter = document.getElementById('filterCategory');
    if (categoryFilter) {
        const categories = [...new Set(tasks.map(t => t.category))];
        categoryFilter.innerHTML = '<option value="">All Categories</option>' +
            categories.map(c => `<option value="${c}">${c}</option>`).join('');
    }
}

function renderTasksTable(tasks) {
    const tbody = document.getElementById('taskTableBody');
    if (!tbody) return;
    
    if (tasks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="14" style="text-align:center; padding:40px;">No tasks found. Click "Add Task" to create one.</td></tr>';
        return;
    }
    
    tbody.innerHTML = tasks.map((task, index) => {
        const statusClass = task.status === 'Completed' || task.status.includes('✅') ? 'completed' : '';
        const priorityBadge = getPriorityBadge(task.priority);
        const statusBadge = getStatusBadge(task.status);
        const health = calculateHealth(task);
        
        return `
            <tr class="${statusClass}">
                <td>${index + 1}</td>
                <td>${task.id || 'N/A'}</td>
                <td>${task.title || 'Untitled'}</td>
                <td>${task.category || 'N/A'}</td>
                <td>${task.location || 'N/A'}</td>
                <td>${task.term || 'N/A'}</td>
                <td>${priorityBadge}</td>
                <td>${statusBadge}</td>
                <td>${task.assignedTo || 'Unassigned'}</td>
                <td>${task.dueDate || 'N/A'}</td>
                <td>${(parseFloat(task.cost) || 0).toLocaleString()} AED</td>
                <td><span class="health-score ${health.class}">${health.value}</span></td>
                <td>${task.notes || '-'}</td>
                <td>
                    <button onclick="editTask('${task.id}')" class="btn-icon" title="Edit">
                        ✏️
                    </button>
                    <button onclick="deleteTask('${task.id}')" class="btn-icon" title="Delete">
                        🗑️
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function getPriorityBadge(priority) {
    const p = priority || 'Medium';
    const classes = {
        'Critical': 'critical',
        'High': 'high',
        'Medium': 'medium',
        'Low': 'low'
    };
    
    const className = classes[p] || 'medium';
    return `<span class="badge ${className}">${p}</span>`;
}

function getStatusBadge(status) {
    const s = status || 'Pending';
    const classes = {
        'Completed': 'completed',
        'In Progress': 'in-progress',
        'Pending': 'pending',
        'On Hold': 'on-hold',
        'Cancelled': 'cancelled'
    };
    
    let cleanStatus = s.replace('✅ ', '').replace('⏳ ', '').replace('🔄 ', '');
    const className = classes[cleanStatus] || 'pending';
    return `<span class="badge ${className}">${s}</span>`;
}

function calculateHealth(task) {
    let score = 100;
    
    // Reduce for overdue
    if (task.dueDate) {
        const due = new Date(task.dueDate);
        const now = new Date();
        if (due < now && task.status !== 'Completed') {
            score -= 40;
        }
    }
    
    // Reduce for high priority pending
    if (task.priority === 'Critical' && task.status === 'Pending') {
        score -= 20;
    }
    
    // Increase for completed
    if (task.status === 'Completed' || task.status.includes('✅')) {
        score = 100;
    }
    
    if (score >= 70) return { value: score + '%', class: 'high' };
    if (score >= 40) return { value: score + '%', class: 'medium' };
    return { value: score + '%', class: 'low' };
}

window.filterTasks = function() {
    const search = document.getElementById('searchBox').value.toLowerCase();
    const termFilter = document.getElementById('filterTerm').value;
    const statusFilter = document.getElementById('filterStatus').value;
    const priorityFilter = document.getElementById('filterPriority').value;
    const categoryFilter = document.getElementById('filterCategory').value;
    
    const filtered = window.allTasks.filter(task => {
        const matchSearch = !search || 
            task.title.toLowerCase().includes(search) ||
            task.id.toLowerCase().includes(search) ||
            (task.notes && task.notes.toLowerCase().includes(search));
        
        const matchTerm = !termFilter || task.term === termFilter;
        const matchStatus = !statusFilter || task.status === statusFilter;
        const matchPriority = !priorityFilter || task.priority === priorityFilter;
        const matchCategory = !categoryFilter || task.category === categoryFilter;
        
        return matchSearch && matchTerm && matchStatus && matchPriority && matchCategory;
    });
    
    renderTasksTable(filtered);
};

window.openAddTaskModal = function() {
    // Populate dropdowns
    populateTaskFormDropdowns();
    
    // Show modal
    document.getElementById('taskModal').classList.add('active');
    document.getElementById('taskModalTitle').textContent = 'Add New Task';
    document.getElementById('taskForm').reset();
    
    // Set default dates
    document.getElementById('taskDateReported').valueAsDate = new Date();
};

function populateTaskFormDropdowns() {
    // Categories
    const categories = [
        'Civil/Building',
        'Electrical',
        'Plumbing',
        'HVAC/AC',
        'IT/Network',
        'Sports Facilities',
        'Safety & Security',
        'Furniture',
        'Grounds/Landscaping',
        'Painting',
        'Other'
    ];
    
    const categorySelect = document.getElementById('taskCategory');
    if (categorySelect) {
        categorySelect.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
    }
    
    // Locations
    const locations = [
        'Main Building',
        'Primary Wing',
        'Secondary Wing',
        'Playground',
        'Sports Hall',
        'Cafeteria',
        'Library',
        'Labs',
        'Admin Block',
        'Parking',
        'Entrance',
        'Other'
    ];
    
    const locationSelect = document.getElementById('taskLocation');
    if (locationSelect) {
        locationSelect.innerHTML = locations.map(l => `<option value="${l}">${l}</option>`).join('');
    }
    
    // Assigned To
    const teams = [
        'Facilities Team',
        'Maintenance Team',
        'IT Team',
        'External Contractor',
        'Security Team',
        'Admin Staff'
    ];
    
    const assignedSelect = document.getElementById('taskAssigned');
    if (assignedSelect) {
        assignedSelect.innerHTML = teams.map(t => `<option value="${t}">${t}</option>`).join('');
    }
}

window.closeTaskModal = function() {
    document.getElementById('taskModal').classList.remove('active');
};

window.addTask = async function() {
    const form = document.getElementById('taskForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Generate task ID
    const taskCount = window.allTasks.length + 1;
    const taskId = 'MNT-' + String(taskCount).padStart(3, '0');
    
    const taskData = {
        id: taskId,
        title: document.getElementById('taskTitle').value,
        category: document.getElementById('taskCategory').value,
        location: document.getElementById('taskLocation').value,
        term: document.getElementById('taskTerm').value,
        priority: document.getElementById('taskPriority').value,
        status: document.getElementById('taskStatus').value,
        assignedTo: document.getElementById('taskAssigned').value,
        reportedBy: document.getElementById('taskReporter').value || window.currentUser.name,
        dateReported: document.getElementById('taskDateReported').value,
        dueDate: document.getElementById('taskDueDate').value,
        cost: parseFloat(document.getElementById('taskCost').value) || 0,
        vendor: document.getElementById('taskVendor').value || '',
        progress: parseInt(document.getElementById('taskProgress').value) || 0,
        notes: document.getElementById('taskNotes').value || '',
        attachment: document.getElementById('taskAttachment').value || '',
        createdAt: new Date().toISOString(),
        createdBy: window.currentUser.name
    };
    
    showSyncStatus('Saving task...', 'syncing');
    
    try {
        await setDoc(doc(db, COLLECTIONS.tasks, taskId), taskData);
        showSyncStatus('✅ Task saved successfully', 'synced');
        closeTaskModal();
        
        if (window.currentPage === 'tasks') {
            await loadTasks();
        } else if (window.currentPage === 'dashboard') {
            await loadDashboard();
        }
    } catch (error) {
        console.error('Add task error:', error);
        showSyncStatus('❌ Failed to save task', 'error');
        alert('❌ Failed to save task: ' + error.message);
    }
};

window.editTask = async function(taskId) {
    showSyncStatus('Loading task...', 'syncing');
    
    try {
        const taskDoc = await getDoc(doc(db, COLLECTIONS.tasks, taskId));
        if (!taskDoc.exists()) {
            alert('❌ Task not found');
            return;
        }
        
        const task = taskDoc.data();
        
        // Populate form
        populateTaskFormDropdowns();
        
        document.getElementById('taskTitle').value = task.title || '';
        document.getElementById('taskCategory').value = task.category || '';
        document.getElementById('taskLocation').value = task.location || '';
        document.getElementById('taskTerm').value = task.term || 'Term 1';
        document.getElementById('taskPriority').value = task.priority || 'Medium';
        document.getElementById('taskStatus').value = task.status || 'Pending';
        document.getElementById('taskAssigned').value = task.assignedTo || '';
        document.getElementById('taskReporter').value = task.reportedBy || '';
        document.getElementById('taskDateReported').value = task.dateReported || '';
        document.getElementById('taskDueDate').value = task.dueDate || '';
        document.getElementById('taskCost').value = task.cost || 0;
        document.getElementById('taskVendor').value = task.vendor || '';
        document.getElementById('taskProgress').value = task.progress || 0;
        document.getElementById('taskNotes').value = task.notes || '';
        document.getElementById('taskAttachment').value = task.attachment || '';
        
        document.getElementById('taskModalTitle').textContent = 'Edit Task: ' + taskId;
        document.getElementById('taskModal').classList.add('active');
        
        // Change button to update
        const saveBtn = document.querySelector('#taskModal .btn-primary');
        if (saveBtn) {
            saveBtn.textContent = 'Update Task';
            saveBtn.onclick = async function() {
                await updateTask(taskId);
            };
        }
        
        showSyncStatus('', 'synced');
    } catch (error) {
        console.error('Edit task error:', error);
        showSyncStatus('❌ Failed to load task', 'error');
        alert('❌ Failed to load task: ' + error.message);
    }
};

async function updateTask(taskId) {
    const form = document.getElementById('taskForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const taskData = {
        title: document.getElementById('taskTitle').value,
        category: document.getElementById('taskCategory').value,
        location: document.getElementById('taskLocation').value,
        term: document.getElementById('taskTerm').value,
        priority: document.getElementById('taskPriority').value,
        status: document.getElementById('taskStatus').value,
        assignedTo: document.getElementById('taskAssigned').value,
        reportedBy: document.getElementById('taskReporter').value,
        dateReported: document.getElementById('taskDateReported').value,
        dueDate: document.getElementById('taskDueDate').value,
        cost: parseFloat(document.getElementById('taskCost').value) || 0,
        vendor: document.getElementById('taskVendor').value || '',
        progress: parseInt(document.getElementById('taskProgress').value) || 0,
        notes: document.getElementById('taskNotes').value || '',
        attachment: document.getElementById('taskAttachment').value || '',
        updatedAt: new Date().toISOString(),
        updatedBy: window.currentUser.name
    };
    
    showSyncStatus('Updating task...', 'syncing');
    
    try {
        await updateDoc(doc(db, COLLECTIONS.tasks, taskId), taskData);
        showSyncStatus('✅ Task updated successfully', 'synced');
        closeTaskModal();
        
        // Reset button
        const saveBtn = document.querySelector('#taskModal .btn-primary');
        if (saveBtn) {
            saveBtn.textContent = 'Save Task';
            saveBtn.onclick = window.addTask;
        }
        
        if (window.currentPage === 'tasks') {
            await loadTasks();
        } else if (window.currentPage === 'dashboard') {
            await loadDashboard();
        }
    } catch (error) {
        console.error('Update task error:', error);
        showSyncStatus('❌ Failed to update task', 'error');
        alert('❌ Failed to update task: ' + error.message);
    }
}

window.deleteTask = async function(taskId) {
    if (!confirm(`Are you sure you want to delete task ${taskId}?`)) return;
    
    showSyncStatus('Deleting task...', 'syncing');
    
    try {
        await deleteDoc(doc(db, COLLECTIONS.tasks, taskId));
        showSyncStatus('✅ Task deleted', 'synced');
        
        if (window.currentPage === 'tasks') {
            await loadTasks();
        } else if (window.currentPage === 'dashboard') {
            await loadDashboard();
        }
    } catch (error) {
        console.error('Delete task error:', error);
        showSyncStatus('❌ Failed to delete task', 'error');
        alert('❌ Failed to delete task: ' + error.message);
    }
};

window.exportToCSV = function() {
    const tasks = window.allTasks;
    if (tasks.length === 0) {
        alert('No tasks to export');
        return;
    }
    
    const headers = ['ID', 'Title', 'Category', 'Location', 'Term', 'Priority', 'Status', 'Assigned To', 'Due Date', 'Cost', 'Notes'];
    const rows = tasks.map(t => [
        t.id,
        t.title,
        t.category,
        t.location,
        t.term,
        t.priority,
        t.status,
        t.assignedTo,
        t.dueDate,
        t.cost,
        t.notes
    ]);
    
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.map(field => `"${field || ''}"`).join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AUS_Maintenance_Tasks_' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
    
    showSyncStatus('✅ CSV exported', 'synced');
};

// ========================================
// Vendors Management
// ========================================
async function loadVendors() {
    console.log('🏢 Loading vendors...');
    showSyncStatus('Loading vendors...', 'syncing');
    
    try {
        const vendorsSnapshot = await getDocs(collection(db, COLLECTIONS.vendors));
        const vendors = [];
        vendorsSnapshot.forEach(docSnap => {
            vendors.push({ id: docSnap.id, ...docSnap.data() });
        });
        
        window.allVendors = vendors;
        renderVendorsGrid(vendors);
        
        showSyncStatus('✅ Vendors loaded', 'synced');
        console.log('✅ Vendors loaded:', vendors.length);
    } catch (error) {
        console.error('Vendors load error:', error);
        showSyncStatus('❌ Failed to load vendors', 'error');
    }
}

function renderVendorsGrid(vendors) {
    const grid = document.getElementById('vendorsGrid');
    if (!grid) return;
    
    if (vendors.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding:40px;">No vendors found. Click "Add Vendor" to create one.</p>';
        return;
    }
    
    grid.innerHTML = vendors.map(vendor => `
        <div style="background:white; padding:24px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            <h3 style="color:#0D1B2A; font-size:18px; margin-bottom:8px;">${vendor.name || 'Unnamed Vendor'}</h3>
            <p style="color:#666; font-size:14px; margin-bottom:16px;">${vendor.specialty || 'General'}</p>
            <div style="font-size:13px; color:#333; line-height:1.8;">
                ${vendor.contact ? `<div><strong>Contact:</strong> ${vendor.contact}</div>` : ''}
                ${vendor.phone ? `<div><strong>Phone:</strong> ${vendor.phone}</div>` : ''}
                ${vendor.email ? `<div><strong>Email:</strong> ${vendor.email}</div>` : ''}
                ${vendor.contractExp ? `<div><strong>Contract Expires:</strong> ${vendor.contractExp}</div>` : ''}
                ${vendor.rating ? `<div><strong>Rating:</strong> ${vendor.rating}</div>` : ''}
            </div>
            <div style="margin-top:16px; padding-top:16px; border-top:1px solid #e0e0e0;">
                <button onclick="deleteVendor('${vendor.id}')" style="padding:8px 16px; background:#dc3545; color:white; border:none; border-radius:6px; cursor:pointer; font-size:13px;">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

window.openAddVendorModal = function() {
    document.getElementById('vendorModal').classList.add('active');
    document.getElementById('vendorForm').reset();
};

window.closeVendorModal = function() {
    document.getElementById('vendorModal').classList.remove('active');
};

window.saveVendor = async function() {
    const form = document.getElementById('vendorForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const vendorId = 'VEN-' + Date.now();
    const vendorData = {
        name: document.getElementById('vendorName').value,
        specialty: document.getElementById('vendorSpecialty').value,
        contact: document.getElementById('vendorContact').value || '',
        phone: document.getElementById('vendorPhone').value || '',
        email: document.getElementById('vendorEmail').value || '',
        contractExp: document.getElementById('vendorContractExp').value || '',
        rating: document.getElementById('vendorRating').value,
        createdAt: new Date().toISOString(),
        createdBy: window.currentUser.name
    };
    
    showSyncStatus('Saving vendor...', 'syncing');
    
    try {
        await setDoc(doc(db, COLLECTIONS.vendors, vendorId), vendorData);
        showSyncStatus('✅ Vendor saved successfully', 'synced');
        closeVendorModal();
        await loadVendors();
    } catch (error) {
        console.error('Add vendor error:', error);
        showSyncStatus('❌ Failed to save vendor', 'error');
        alert('❌ Failed to save vendor: ' + error.message);
    }
};

window.deleteVendor = async function(vendorId) {
    if (!confirm('Are you sure you want to delete this vendor?')) return;
    
    showSyncStatus('Deleting vendor...', 'syncing');
    
    try {
        await deleteDoc(doc(db, COLLECTIONS.vendors, vendorId));
        showSyncStatus('✅ Vendor deleted', 'synced');
        await loadVendors();
    } catch (error) {
        console.error('Delete vendor error:', error);
        showSyncStatus('❌ Failed to delete vendor', 'error');
        alert('❌ Failed to delete vendor: ' + error.message);
    }
};

// ========================================
// Analytics
// ========================================
async function loadAnalytics() {
    console.log('📈 Loading analytics...');
    showSyncStatus('Loading analytics...', 'syncing');
    
    try {
        const tasks = window.allTasks.length > 0 ? window.allTasks : await loadTasksData();
        
        // Calculate metrics
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'Completed' || t.status.includes('✅')).length;
        const completionRate = total > 0 ? (completed / total * 100).toFixed(1) : 0;
        
        const onTimeCompleted = tasks.filter(t => {
            if (t.status !== 'Completed' && !t.status.includes('✅')) return false;
            if (!t.dueDate || !t.dateCompleted) return true;
            return new Date(t.dateCompleted) <= new Date(t.dueDate);
        }).length;
        const onTimeRate = completed > 0 ? (onTimeCompleted / completed * 100).toFixed(1) : 0;
        
        const totalCost = tasks.reduce((sum, t) => sum + (parseFloat(t.cost) || 0), 0);
        const avgCost = total > 0 ? (totalCost / total).toFixed(0) : 0;
        
        // Update gauges
        document.getElementById('completionRate').textContent = completionRate + '%';
        document.getElementById('onTimeRate').textContent = onTimeRate + '%';
        document.getElementById('avgCost').textContent = parseInt(avgCost).toLocaleString() + ' AED';
        
        // Render charts
        renderAnalyticsCharts(tasks);
        
        // Render overdue list
        renderOverdueList(tasks);
        
        // Render top categories
        renderTopCategories(tasks);
        
        showSyncStatus('✅ Analytics loaded', 'synced');
    } catch (error) {
        console.error('Analytics load error:', error);
        showSyncStatus('❌ Failed to load analytics', 'error');
    }
}

async function loadTasksData() {
    const tasksSnapshot = await getDocs(collection(db, COLLECTIONS.tasks));
    const tasks = [];
    tasksSnapshot.forEach(docSnap => {
        tasks.push({ id: docSnap.id, ...docSnap.data() });
    });
    window.allTasks = tasks;
    return tasks;
}

function renderAnalyticsCharts(tasks) {
    // Cost breakdown chart
    const costByCategory = {};
    tasks.forEach(task => {
        const cat = task.category || 'Other';
        costByCategory[cat] = (costByCategory[cat] || 0) + (parseFloat(task.cost) || 0);
    });
    
    const costCanvas = document.getElementById('costChart');
    if (costCanvas) {
        const ctx = costCanvas.getContext('2d');
        if (window.costChartInstance) {
            window.costChartInstance.destroy();
        }
        window.costChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(costByCategory),
                datasets: [{
                    data: Object.values(costByCategory),
                    backgroundColor: [
                        '#2563A8', '#28a745', '#ffc107', '#dc3545',
                        '#17a2b8', '#6c757d', '#fd7e14', '#e83e8c'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
    
    // Priority chart
    const priorityCounts = {
        'Critical': 0,
        'High': 0,
        'Medium': 0,
        'Low': 0
    };
    tasks.forEach(task => {
        const p = task.priority || 'Medium';
        if (priorityCounts.hasOwnProperty(p)) {
            priorityCounts[p]++;
        }
    });
    
    const priorityCanvas = document.getElementById('priorityChart');
    if (priorityCanvas) {
        const ctx = priorityCanvas.getContext('2d');
        if (window.priorityChartInstance) {
            window.priorityChartInstance.destroy();
        }
        window.priorityChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(priorityCounts),
                datasets: [{
                    label: 'Tasks',
                    data: Object.values(priorityCounts),
                    backgroundColor: ['#dc3545', '#ff9800', '#ffc107', '#28a745']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
}

function renderOverdueList(tasks) {
    const container = document.getElementById('overdueTasksList');
    if (!container) return;
    
    const now = new Date();
    const overdue = tasks.filter(t => {
        if (t.status === 'Completed' || t.status.includes('✅')) return false;
        if (!t.dueDate) return false;
        return new Date(t.dueDate) < now;
    });
    
    if (overdue.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#28a745; padding:20px;">✅ No overdue tasks</p>';
        return;
    }
    
    container.innerHTML = overdue.slice(0, 10).map(task => `
        <div style="padding:12px; border-bottom:1px solid #e0e0e0; font-size:13px;">
            <div style="font-weight:600; color:#dc3545;">${task.id}: ${task.title}</div>
            <div style="color:#666; margin-top:4px;">Due: ${task.dueDate} • ${task.location}</div>
        </div>
    `).join('');
}

function renderTopCategories(tasks) {
    const container = document.getElementById('topCategoriesList');
    if (!container) return;
    
    const categoryCounts = {};
    tasks.forEach(task => {
        const cat = task.category || 'Other';
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
    
    const sorted = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    if (sorted.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:20px;">No data</p>';
        return;
    }
    
    container.innerHTML = sorted.map(([cat, count]) => `
        <div style="padding:12px; border-bottom:1px solid #e0e0e0; display:flex; justify-content:space-between; font-size:13px;">
            <span>${cat}</span>
            <span style="font-weight:600; color:#2563A8;">${count} tasks</span>
        </div>
    `).join('');
}

// ========================================
// Settings
// ========================================
async function loadSettings() {
    console.log('⚙️ Settings page loaded');
    
    // Load current options from tasks
    if (window.allTasks.length === 0) {
        await loadTasksData();
    }
    
    renderSettingsOptions();
}

function renderSettingsOptions() {
    const tasks = window.allTasks;
    
    // Extract unique categories
    const categories = [...new Set(tasks.map(t => t.category).filter(Boolean))];
    renderOptionsList('categoryOptions', categories);
    
    // Extract unique locations
    const locations = [...new Set(tasks.map(t => t.location).filter(Boolean))];
    renderOptionsList('locationOptions', locations);
    
    // Extract unique assigned to
    const assignedTo = [...new Set(tasks.map(t => t.assignedTo).filter(Boolean))];
    renderOptionsList('assignedToOptions', assignedTo);
}

function renderOptionsList(containerId, options) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (options.length === 0) {
        container.innerHTML = '<p style="padding:10px; color:#999; font-size:13px;">No options yet. Add one below.</p>';
        return;
    }
    
    container.innerHTML = options.map(option => `
        <div class="option-item">
            <span>${option}</span>
            <button onclick="removeOption('${containerId}', '${option}')">Remove</button>
        </div>
    `).join('');
}

window.addNewOption = function(type) {
    const optionName = prompt(`Enter new ${type}:`);
    if (!optionName || !optionName.trim()) return;
    
    // Just show a message for now - options are dynamic based on tasks
    alert(`✅ To add "${optionName.trim()}" as a ${type}, simply use it when creating a new task. It will appear in the dropdown automatically.`);
};

window.removeOption = function(containerId, optionName) {
    alert(`⚠️ To remove "${optionName}", you need to:\n\n1. Edit all tasks using this ${containerId.replace('Options', '')}\n2. Change them to a different value\n3. The option will disappear automatically`);
};

window.exportData = function() {
    const data = {
        tasks: window.allTasks,
        vendors: window.allVendors,
        exportDate: new Date().toISOString(),
        version: '2.0'
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AUS_Maintenance_Data_' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    
    showSyncStatus('✅ Data exported', 'synced');
};

window.importData = function() {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        showSyncStatus('📥 Importing data...', 'syncing');
        
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            if (!data.tasks || !Array.isArray(data.tasks)) {
                alert('❌ Invalid file format. Expected JSON with "tasks" array.');
                showSyncStatus('❌ Import failed', 'error');
                return;
            }
            
            // Confirm import
            const confirmMsg = `Import ${data.tasks.length} task(s)${data.vendors ? ' and ' + data.vendors.length + ' vendor(s)' : ''}?\n\n⚠️ This will ADD to existing data (not replace).`;
            
            if (!confirm(confirmMsg)) {
                showSyncStatus('Import cancelled', 'synced');
                return;
            }
            
            let imported = 0;
            
            // Import tasks
            for (const task of data.tasks) {
                try {
                    const taskId = task.id || 'MNT-' + Date.now() + '-' + imported;
                    await setDoc(doc(db, COLLECTIONS.tasks, taskId), {
                        ...task,
                        importedAt: new Date().toISOString(),
                        importedBy: window.currentUser.name
                    });
                    imported++;
                } catch (error) {
                    console.error('Failed to import task:', task.id, error);
                }
            }
            
            // Import vendors if exist
            if (data.vendors && Array.isArray(data.vendors)) {
                for (const vendor of data.vendors) {
                    try {
                        const vendorId = vendor.id || 'VEN-' + Date.now();
                        await setDoc(doc(db, COLLECTIONS.vendors, vendorId), {
                            ...vendor,
                            importedAt: new Date().toISOString(),
                            importedBy: window.currentUser.name
                        });
                    } catch (error) {
                        console.error('Failed to import vendor:', vendor.id, error);
                    }
                }
            }
            
            showSyncStatus(`✅ Imported ${imported} items successfully`, 'synced');
            alert(`✅ Successfully imported ${imported} items!`);
            
            // Reload current page
            if (window.currentPage === 'tasks') {
                await loadTasks();
            } else if (window.currentPage === 'dashboard') {
                await loadDashboard();
            } else if (window.currentPage === 'vendors') {
                await loadVendors();
            }
            
        } catch (error) {
            console.error('Import error:', error);
            showSyncStatus('❌ Import failed', 'error');
            alert('❌ Failed to import data: ' + error.message);
        }
    };
    
    // Trigger file selection
    input.click();
};

window.resetData = function() {
    alert('Reset Data is disabled in cloud mode. Please use Firebase Console to manage data.');
};

// ========================================
// Schedule
// ========================================
async function loadSchedule() {
    console.log('📅 Schedule page loaded');
}

// ========================================
// Users Management
// ========================================
async function loadUsers() {
    console.log('👥 Loading users...');
    // Only admins can see this page
    if (window.currentUser.role !== 'Admin') {
        alert('❌ Access denied. Admin only.');
        showPage('dashboard');
        return;
    }
    
    showSyncStatus('Loading users...', 'syncing');
    
    try {
        const usersSnapshot = await getDocs(collection(db, COLLECTIONS.users));
        const users = [];
        usersSnapshot.forEach(docSnap => {
            users.push({ id: docSnap.id, ...docSnap.data() });
        });
        
        window.allUsers = users;
        renderUsersList(users);
        
        showSyncStatus('✅ Users loaded', 'synced');
    } catch (error) {
        console.error('Users load error:', error);
        showSyncStatus('❌ Failed to load users', 'error');
    }
}

function renderUsersList(users) {
    const container = document.getElementById('usersList');
    if (!container) return;
    
    if (users.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:40px;">No users found.</p>';
        return;
    }
    
    container.innerHTML = users.map(user => `
        <div class="user-card">
            <h4>${user.name || user.username}</h4>
            <p style="color:#666; font-size:14px; margin-bottom:12px;">
                <strong>Username:</strong> ${user.username}<br>
                <strong>Role:</strong> ${user.role || 'User'}
            </p>
            ${user.username !== 'admin' ? `
                <button onclick="deleteUser('${user.id}')" style="padding:8px 16px; background:#dc3545; color:white; border:none; border-radius:6px; cursor:pointer; font-size:13px;">
                    Delete User
                </button>
            ` : '<p style="color:#999; font-size:12px;">Protected account</p>'}
        </div>
    `).join('');
}

window.openAddUserModal = function() {
    document.getElementById('userModal').classList.add('active');
    document.getElementById('userForm').reset();
};

window.closeUserModal = function() {
    document.getElementById('userModal').classList.remove('active');
};

window.saveUser = async function() {
    const form = document.getElementById('userForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const userId = 'USER-' + Date.now();
    const userData = {
        name: document.getElementById('newUsername').value,
        username: document.getElementById('newUsername').value.toLowerCase().replace(/\s+/g, ''),
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
        },
        createdAt: new Date().toISOString(),
        createdBy: window.currentUser.name
    };
    
    showSyncStatus('Creating user...', 'syncing');
    
    try {
        await setDoc(doc(db, COLLECTIONS.users, userId), userData);
        showSyncStatus('✅ User created successfully', 'synced');
        closeUserModal();
        await loadUsers();
    } catch (error) {
        console.error('Add user error:', error);
        showSyncStatus('❌ Failed to create user', 'error');
        alert('❌ Failed to create user: ' + error.message);
    }
};

window.deleteUser = async function(userId) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    showSyncStatus('Deleting user...', 'syncing');
    
    try {
        await deleteDoc(doc(db, COLLECTIONS.users, userId));
        showSyncStatus('✅ User deleted', 'synced');
        await loadUsers();
    } catch (error) {
        console.error('Delete user error:', error);
        showSyncStatus('❌ Failed to delete user', 'error');
        alert('❌ Failed to delete user: ' + error.message);
    }
};

// ========================================
// Real-time Listeners
// ========================================
function setupRealtimeListeners() {
    console.log('👂 Setting up real-time listeners...');
    
    // Listen to tasks changes
    onSnapshot(collection(db, COLLECTIONS.tasks), (snapshot) => {
        console.log('🔄 Tasks updated in real-time');
        showSyncStatus('🔄 Data synced', 'synced');
        
        if (window.currentPage === 'tasks') {
            loadTasks();
        } else if (window.currentPage === 'dashboard') {
            loadDashboard();
        } else if (window.currentPage === 'analytics') {
            loadAnalytics();
        }
    });
    
    // Listen to vendors changes
    onSnapshot(collection(db, COLLECTIONS.vendors), (snapshot) => {
        console.log('🔄 Vendors updated in real-time');
        if (window.currentPage === 'vendors') {
            loadVendors();
        }
    });
    
    // Listen to users changes
    onSnapshot(collection(db, COLLECTIONS.users), (snapshot) => {
        console.log('🔄 Users updated in real-time');
        if (window.currentPage === 'users') {
            loadUsers();
        }
    });
}

// ========================================
// Sync Status Indicator
// ========================================
function showSyncStatus(message, status) {
    const syncStatus = document.getElementById('syncStatus');
    const syncStatusText = document.getElementById('syncStatusText');
    
    if (!syncStatus || !syncStatusText) return;
    
    syncStatusText.textContent = message;
    syncStatus.className = 'sync-status ' + status;
    syncStatus.style.display = 'flex';
    
    if (status === 'synced') {
        setTimeout(() => {
            syncStatus.style.display = 'none';
        }, 3000);
    }
}

// ========================================
// Initialize on page load
// ========================================
window.addEventListener('DOMContentLoaded', initApp);

console.log('✅ Firestore app script loaded (Fixed Version)');
