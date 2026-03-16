// ========================================
// AUS Maintenance System - Firestore Version
// 100% Cloud-Based - Real-time Sync
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
    orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// ========================================
// Global State
// ========================================
window.currentUser = null;
window.currentPage = 'dashboard';

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
    
    // Check if logged in
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
        window.currentUser = JSON.parse(savedUser);
        showMainApp();
        await loadDashboard();
    } else {
        showLogin();
    }
    
    // Setup real-time listeners
    setupRealtimeListeners();
    
    console.log('✅ App initialized successfully');
}

// ========================================
// Authentication
// ========================================
window.handleLogin = async function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('⚠️ Please enter username and password');
        return;
    }
    
    try {
        // Get users from Firestore
        const usersSnapshot = await getDocs(collection(db, COLLECTIONS.users));
        let foundUser = null;
        
        usersSnapshot.forEach(doc => {
            const user = doc.data();
            if (user.username === username && user.password === password) {
                foundUser = { id: doc.id, ...user };
            }
        });
        
        if (foundUser) {
            window.currentUser = foundUser;
            sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
            showMainApp();
            await loadDashboard();
            alert(`✅ Welcome, ${foundUser.name}!`);
        } else {
            alert('❌ Invalid username or password');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('❌ Login failed. Please try again.');
    }
};

window.handleLogout = function() {
    if (confirm('Are you sure you want to logout?')) {
        window.currentUser = null;
        sessionStorage.removeItem('currentUser');
        showLogin();
    }
};

function showLogin() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
}

function showMainApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';
    document.getElementById('currentUserName').textContent = window.currentUser.name;
    document.getElementById('currentUserRole').textContent = window.currentUser.role;
}

// ========================================
// Navigation
// ========================================
window.showPage = async function(pageName) {
    window.currentPage = pageName;
    
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
    
    // Update content
    const pages = ['dashboard', 'tasks', 'analytics', 'vendors', 'users', 'settings'];
    pages.forEach(page => {
        const el = document.getElementById(`${page}Page`);
        if (el) el.style.display = page === pageName ? 'block' : 'none';
    });
    
    // Load page data
    switch(pageName) {
        case 'dashboard':
            await loadDashboard();
            break;
        case 'tasks':
            await loadTasks();
            break;
        case 'analytics':
            await loadAnalytics();
            break;
        case 'vendors':
            await loadVendors();
            break;
        case 'users':
            await loadUsers();
            break;
        case 'settings':
            await loadSettings();
            break;
    }
};

// ========================================
// Dashboard
// ========================================
async function loadDashboard() {
    console.log('📊 Loading dashboard...');
    
    try {
        const tasksSnapshot = await getDocs(collection(db, COLLECTIONS.tasks));
        const tasks = [];
        tasksSnapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        
        // Calculate stats
        const completed = tasks.filter(t => t.status === '✅ Completed').length;
        const pending = tasks.filter(t => t.status === '⏳ Pending').length;
        const totalCost = tasks.reduce((sum, t) => sum + (t.cost || 0), 0);
        
        // Update UI
        document.getElementById('totalTasks').textContent = tasks.length;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('pendingTasks').textContent = pending;
        document.getElementById('totalCost').textContent = totalCost.toLocaleString() + ' AED';
        
        // Render overdue tasks
        const now = new Date();
        const overdue = tasks.filter(t => {
            if (t.status !== '⏳ Pending') return false;
            if (!t.dueDate) return false;
            return new Date(t.dueDate) < now;
        });
        
        renderOverdueTasks(overdue);
        
        console.log('✅ Dashboard loaded');
    } catch (error) {
        console.error('Dashboard load error:', error);
        alert('❌ Failed to load dashboard');
    }
}

function renderOverdueTasks(tasks) {
    const tbody = document.getElementById('overdueTasksTable');
    if (!tbody) return;
    
    if (tasks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">✅ No overdue tasks</td></tr>';
        return;
    }
    
    tbody.innerHTML = tasks.slice(0, 5).map(task => `
        <tr>
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${task.location}</td>
            <td>${task.dueDate}</td>
            <td><span class="status-badge status-critical">${task.priority}</span></td>
        </tr>
    `).join('');
}

// ========================================
// Tasks Management
// ========================================
async function loadTasks() {
    console.log('📝 Loading tasks...');
    
    try {
        const tasksSnapshot = await getDocs(
            query(collection(db, COLLECTIONS.tasks), orderBy('dateReported', 'desc'))
        );
        
        const tasks = [];
        tasksSnapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        
        renderTasksTable(tasks);
        console.log('✅ Tasks loaded:', tasks.length);
    } catch (error) {
        console.error('Tasks load error:', error);
        alert('❌ Failed to load tasks');
    }
}

function renderTasksTable(tasks) {
    const tbody = document.getElementById('tasksTableBody');
    if (!tbody) return;
    
    if (tasks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;">No tasks found</td></tr>';
        return;
    }
    
    tbody.innerHTML = tasks.map(task => {
        const statusClass = task.status === '✅ Completed' ? 'completed' : 'pending';
        const priorityClass = task.priority.includes('🔴') ? 'critical' : 
                             task.priority.includes('🟠') ? 'high' : 'medium';
        
        return `
            <tr>
                <td>${task.id}</td>
                <td>${task.title}</td>
                <td>${task.category}</td>
                <td>${task.location}</td>
                <td><span class="status-badge status-${priorityClass}">${task.priority}</span></td>
                <td><span class="status-badge status-${statusClass}">${task.status}</span></td>
                <td>${task.assignedTo}</td>
                <td>${task.cost.toLocaleString()} AED</td>
                <td>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width:${task.progress}%"></div>
                    </div>
                    <span class="progress-text">${task.progress}%</span>
                </td>
                <td>
                    <button onclick="editTask('${task.id}')" class="btn-icon" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteTask('${task.id}')" class="btn-icon" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

window.addTask = async function() {
    // Get form values
    const formData = {
        id: document.getElementById('taskId').value,
        title: document.getElementById('taskTitle').value,
        category: document.getElementById('taskCategory').value,
        location: document.getElementById('taskLocation').value,
        term: document.getElementById('taskTerm').value,
        priority: document.getElementById('taskPriority').value,
        status: document.getElementById('taskStatus').value,
        assignedTo: document.getElementById('taskAssignedTo').value,
        reportedBy: window.currentUser.name,
        dateReported: document.getElementById('taskDateReported').value,
        dueDate: document.getElementById('taskDueDate').value,
        dateCompleted: document.getElementById('taskDateCompleted').value || null,
        cost: parseFloat(document.getElementById('taskCost').value) || 0,
        vendor: document.getElementById('taskVendor').value,
        progress: parseInt(document.getElementById('taskProgress').value) || 0,
        notes: document.getElementById('taskNotes').value,
        createdAt: new Date().toISOString(),
        createdBy: window.currentUser.name
    };
    
    try {
        await setDoc(doc(db, COLLECTIONS.tasks, formData.id), formData);
        alert('✅ Task added successfully!');
        closeTaskModal();
        if (window.currentPage === 'tasks') await loadTasks();
        if (window.currentPage === 'dashboard') await loadDashboard();
    } catch (error) {
        console.error('Add task error:', error);
        alert('❌ Failed to add task');
    }
};

window.editTask = async function(taskId) {
    try {
        const taskDoc = await getDoc(doc(db, COLLECTIONS.tasks, taskId));
        if (!taskDoc.exists()) {
            alert('❌ Task not found');
            return;
        }
        
        const task = taskDoc.data();
        
        // Populate form
        document.getElementById('taskId').value = taskId;
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskCategory').value = task.category;
        document.getElementById('taskLocation').value = task.location;
        document.getElementById('taskTerm').value = task.term;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskStatus').value = task.status;
        document.getElementById('taskAssignedTo').value = task.assignedTo;
        document.getElementById('taskDateReported').value = task.dateReported;
        document.getElementById('taskDueDate').value = task.dueDate;
        document.getElementById('taskDateCompleted').value = task.dateCompleted || '';
        document.getElementById('taskCost').value = task.cost;
        document.getElementById('taskVendor').value = task.vendor;
        document.getElementById('taskProgress').value = task.progress;
        document.getElementById('taskNotes').value = task.notes;
        
        document.getElementById('taskId').readOnly = true;
        document.getElementById('taskModalTitle').textContent = 'Edit Task';
        openTaskModal();
    } catch (error) {
        console.error('Edit task error:', error);
        alert('❌ Failed to load task');
    }
};

window.deleteTask = async function(taskId) {
    if (!confirm(`Delete task ${taskId}?`)) return;
    
    try {
        await deleteDoc(doc(db, COLLECTIONS.tasks, taskId));
        alert('✅ Task deleted');
        if (window.currentPage === 'tasks') await loadTasks();
        if (window.currentPage === 'dashboard') await loadDashboard();
    } catch (error) {
        console.error('Delete task error:', error);
        alert('❌ Failed to delete task');
    }
};

// ========================================
// Vendors Management
// ========================================
async function loadVendors() {
    console.log('👥 Loading vendors...');
    
    try {
        const vendorsSnapshot = await getDocs(collection(db, COLLECTIONS.vendors));
        const vendors = [];
        vendorsSnapshot.forEach(doc => {
            vendors.push({ id: doc.id, ...doc.data() });
        });
        
        renderVendorsTable(vendors);
        console.log('✅ Vendors loaded:', vendors.length);
    } catch (error) {
        console.error('Vendors load error:', error);
        alert('❌ Failed to load vendors');
    }
}

function renderVendorsTable(vendors) {
    const tbody = document.getElementById('vendorsTableBody');
    if (!tbody) return;
    
    if (vendors.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No vendors found</td></tr>';
        return;
    }
    
    tbody.innerHTML = vendors.map(vendor => `
        <tr>
            <td>${vendor.name}</td>
            <td>${vendor.company}</td>
            <td>${vendor.phone}</td>
            <td>${vendor.email}</td>
            <td>${vendor.category}</td>
            <td>${vendor.rating}</td>
            <td>
                <button onclick="deleteVendor('${vendor.id}')" class="btn-icon" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

window.saveVendor = async function() {
    const vendor = {
        name: document.getElementById('vendorName').value,
        company: document.getElementById('vendorCompany').value,
        phone: document.getElementById('vendorPhone').value,
        email: document.getElementById('vendorEmail').value,
        category: document.getElementById('vendorCategory').value,
        rating: document.getElementById('vendorRating').value,
        createdAt: new Date().toISOString(),
        createdBy: window.currentUser.name
    };
    
    try {
        const vendorId = 'VENDOR-' + Date.now();
        await setDoc(doc(db, COLLECTIONS.vendors, vendorId), vendor);
        alert('✅ Vendor added successfully!');
        closeVendorModal();
        if (window.currentPage === 'vendors') await loadVendors();
    } catch (error) {
        console.error('Add vendor error:', error);
        alert('❌ Failed to add vendor');
    }
};

window.deleteVendor = async function(vendorId) {
    if (!confirm('Delete this vendor?')) return;
    
    try {
        await deleteDoc(doc(db, COLLECTIONS.vendors, vendorId));
        alert('✅ Vendor deleted');
        await loadVendors();
    } catch (error) {
        console.error('Delete vendor error:', error);
        alert('❌ Failed to delete vendor');
    }
};

// ========================================
// Users Management
// ========================================
async function loadUsers() {
    console.log('👤 Loading users...');
    
    try {
        const usersSnapshot = await getDocs(collection(db, COLLECTIONS.users));
        const users = [];
        usersSnapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });
        
        renderUsersTable(users);
        console.log('✅ Users loaded:', users.length);
    } catch (error) {
        console.error('Users load error:', error);
        alert('❌ Failed to load users');
    }
}

function renderUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No users found</td></tr>';
        return;
    }
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td><span class="role-badge role-${user.role.toLowerCase()}">${user.role}</span></td>
            <td>
                ${user.username !== 'admin' ? `
                    <button onclick="deleteUser('${user.id}')" class="btn-icon" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : '<span style="color:#999;">Protected</span>'}
            </td>
        </tr>
    `).join('');
}

window.saveUser = async function() {
    const user = {
        name: document.getElementById('userName').value,
        username: document.getElementById('userUsername').value,
        email: document.getElementById('userEmail').value,
        password: document.getElementById('userPassword').value,
        role: document.getElementById('userRole').value,
        createdAt: new Date().toISOString(),
        createdBy: window.currentUser.name
    };
    
    try {
        const userId = 'USER-' + Date.now();
        await setDoc(doc(db, COLLECTIONS.users, userId), user);
        alert('✅ User added successfully!');
        closeUserModal();
        if (window.currentPage === 'users') await loadUsers();
    } catch (error) {
        console.error('Add user error:', error);
        alert('❌ Failed to add user');
    }
};

window.deleteUser = async function(userId) {
    if (!confirm('Delete this user?')) return;
    
    try {
        await deleteDoc(doc(db, COLLECTIONS.users, userId));
        alert('✅ User deleted');
        await loadUsers();
    } catch (error) {
        console.error('Delete user error:', error);
        alert('❌ Failed to delete user');
    }
};

// ========================================
// Analytics
// ========================================
async function loadAnalytics() {
    console.log('📊 Loading analytics...');
    
    try {
        const tasksSnapshot = await getDocs(collection(db, COLLECTIONS.tasks));
        const tasks = [];
        tasksSnapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        
        renderAnalyticsCharts(tasks);
        console.log('✅ Analytics loaded');
    } catch (error) {
        console.error('Analytics load error:', error);
        alert('❌ Failed to load analytics');
    }
}

function renderAnalyticsCharts(tasks) {
    // Status Chart
    const statusCounts = {
        'Completed': tasks.filter(t => t.status === '✅ Completed').length,
        'Pending': tasks.filter(t => t.status === '⏳ Pending').length
    };
    
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        new Chart(statusCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    data: Object.values(statusCounts),
                    backgroundColor: ['#10b981', '#f59e0b']
                }]
            }
        });
    }
    
    // Cost by Category Chart
    const costByCategory = {};
    tasks.forEach(task => {
        if (!costByCategory[task.category]) {
            costByCategory[task.category] = 0;
        }
        costByCategory[task.category] += task.cost || 0;
    });
    
    const costCtx = document.getElementById('costChart');
    if (costCtx) {
        new Chart(costCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(costByCategory),
                datasets: [{
                    label: 'Cost (AED)',
                    data: Object.values(costByCategory),
                    backgroundColor: '#3b82f6'
                }]
            },
            options: {
                indexAxis: 'y'
            }
        });
    }
}

// ========================================
// Settings
// ========================================
async function loadSettings() {
    console.log('⚙️ Loading settings...');
    // Settings implementation here
}

// ========================================
// Modal Functions
// ========================================
window.openTaskModal = function() {
    document.getElementById('taskModal').style.display = 'flex';
    document.getElementById('taskId').readOnly = false;
    document.getElementById('taskModalTitle').textContent = 'Add New Task';
};

window.closeTaskModal = function() {
    document.getElementById('taskModal').style.display = 'none';
    document.getElementById('taskForm').reset();
};

window.openVendorModal = function() {
    document.getElementById('vendorModal').style.display = 'flex';
};

window.closeVendorModal = function() {
    document.getElementById('vendorModal').style.display = 'none';
    document.getElementById('vendorForm').reset();
};

window.openUserModal = function() {
    document.getElementById('userModal').style.display = 'flex';
};

window.closeUserModal = function() {
    document.getElementById('userModal').style.display = 'none';
    document.getElementById('userForm').reset();
};

// ========================================
// Real-time Listeners
// ========================================
function setupRealtimeListeners() {
    console.log('👂 Setting up real-time listeners...');
    
    // Listen to tasks changes
    onSnapshot(collection(db, COLLECTIONS.tasks), (snapshot) => {
        console.log('🔄 Tasks updated in real-time');
        if (window.currentPage === 'tasks') loadTasks();
        if (window.currentPage === 'dashboard') loadDashboard();
    });
    
    // Listen to vendors changes
    onSnapshot(collection(db, COLLECTIONS.vendors), (snapshot) => {
        console.log('🔄 Vendors updated in real-time');
        if (window.currentPage === 'vendors') loadVendors();
    });
    
    // Listen to users changes
    onSnapshot(collection(db, COLLECTIONS.users), (snapshot) => {
        console.log('🔄 Users updated in real-time');
        if (window.currentPage === 'users') loadUsers();
    });
}

// ========================================
// Initialize on page load
// ========================================
window.addEventListener('DOMContentLoaded', initApp);

console.log('✅ Firestore app script loaded');
