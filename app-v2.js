// ============================================================================
// PART 8: TASK MANAGEMENT
// ============================================================================

function renderTaskTable() {
    const tasks = getTasks();
    const perms = currentUser.permissions;
    
    let html = '';
    tasks.forEach((task, index) => {
        const rowClass = task.status === 'Completed' ? 'completed' : (isOverdue(task) ? 'overdue' : '');
        const healthScore = calculateHealthScore(task);
        const healthClass = healthScore >= 70 ? 'high' : healthScore >= 40 ? 'medium' : 'low';

        const priorityBadge = getPriorityBadge(task.priority);
        const statusBadge = getStatusBadge(task.status);

        html += `
            <tr class="${rowClass}">
                <td>${index + 1}</td>
                <td><strong>${task.id}</strong></td>
                <td>${task.title}</td>
                <td>${task.category}</td>
                <td>${task.location}</td>
                <td>${task.term}</td>
                <td>${priorityBadge}</td>
                <td>${statusBadge}</td>
                <td>${task.assignedTo}</td>
                <td>${task.dueDate}</td>
                <td>${task.cost ? task.cost.toLocaleString() : '0'} AED</td>
                <td><span class="health-score ${healthClass}">${healthScore}</span></td>
                <td>${task.remarks || '-'}</td>
                <td>
                    ${perms.edit ? `<button onclick="editTask(${index})" class="edit-btn" style="padding:4px 10px; background:#17a2b8; color:white; border:none; border-radius:4px; cursor:pointer; margin-right:4px; font-size:11px;">Edit</button>` : ''}
                    ${perms.delete ? `<button onclick="deleteTask(${index})" class="delete-btn" style="padding:4px 10px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px;">Delete</button>` : ''}
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
    const filtered = tasks.filter(task => {
        const matchSearch = task.title.toLowerCase().includes(search) || 
                           task.id.toLowerCase().includes(search);
        const matchTerm = !filterTerm || task.term === filterTerm;
        const matchStatus = !filterStatus || task.status === filterStatus;
        const matchPriority = !filterPriority || task.priority === filterPriority;
        const matchCategory = !filterCategory || task.category === filterCategory;

        return matchSearch && matchTerm && matchStatus && matchPriority && matchCategory;
    });

    // Render filtered
    const perms = currentUser.permissions;
    let html = '';
    filtered.forEach((task, index) => {
        const actualIndex = tasks.indexOf(task);
        const rowClass = task.status === 'Completed' ? 'completed' : (isOverdue(task) ? 'overdue' : '');
        const healthScore = calculateHealthScore(task);
        const healthClass = healthScore >= 70 ? 'high' : healthScore >= 40 ? 'medium' : 'low';

        const priorityBadge = getPriorityBadge(task.priority);
        const statusBadge = getStatusBadge(task.status);

        html += `
            <tr class="${rowClass}">
                <td>${index + 1}</td>
                <td><strong>${task.id}</strong></td>
                <td>${task.title}</td>
                <td>${task.category}</td>
                <td>${task.location}</td>
                <td>${task.term}</td>
                <td>${priorityBadge}</td>
                <td>${statusBadge}</td>
                <td>${task.assignedTo}</td>
                <td>${task.dueDate}</td>
                <td>${task.cost ? task.cost.toLocaleString() : '0'} AED</td>
                <td><span class="health-score ${healthClass}">${healthScore}</span></td>
                <td>${task.remarks || '-'}</td>
                <td>
                    ${perms.edit ? `<button onclick="editTask(${actualIndex})" class="edit-btn" style="padding:4px 10px; background:#17a2b8; color:white; border:none; border-radius:4px; cursor:pointer; margin-right:4px; font-size:11px;">Edit</button>` : ''}
                    ${perms.delete ? `<button onclick="deleteTask(${actualIndex})" class="delete-btn" style="padding:4px 10px; background:#dc3545; color:white; border:none; border-radius:4px; cursor:pointer; font-size:11px;">Delete</button>` : ''}
                </td>
            </tr>
        `;
    });
    
    document.getElementById('taskTableBody').innerHTML = html;
}

function openAddTaskModal() {
    if (!currentUser.permissions.add) {
        alert('You do not have permission to add tasks.');
        return;
    }

    editingTaskIndex = null;
    document.getElementById('taskModalTitle').textContent = 'Add New Task';
    document.getElementById('taskForm').reset();
    document.getElementById('taskDateReported').value = new Date().toISOString().split('T')[0];
    document.getElementById('taskModal').classList.add('active');
}

function editTask(index) {
    if (!currentUser.permissions.edit) {
        alert('You do not have permission to edit tasks.');
        return;
    }

    const tasks = getTasks();
    const task = tasks[index];
    
    editingTaskIndex = index;
    document.getElementById('taskModalTitle').textContent = 'Edit Task';
    
    // Fill form
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskCategory').value = task.category;
    document.getElementById('taskLocation').value = task.location;
    document.getElementById('taskTerm').value = task.term;
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('taskStatus').value = task.status;
    document.getElementById('taskAssigned').value = task.assignedTo;
    document.getElementById('taskReporter').value = task.reportedBy || '';
    document.getElementById('taskDateReported').value = task.dateReported;
    document.getElementById('taskDueDate').value = task.dueDate;
    document.getElementById('taskCost').value = task.cost || '';
    document.getElementById('taskVendor').value = task.vendor || '';
    document.getElementById('taskProgress').value = task.progress || 0;
    document.getElementById('taskRemarks').value = task.remarks || '';
    document.getElementById('taskAttachment').value = task.attachment || '';
    
    document.getElementById('taskModal').classList.add('active');
}

function saveTask() {
    const tasks = getTasks();
    
    const taskData = {
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
        cost: parseFloat(document.getElementById('taskCost').value) || 0,
        vendor: document.getElementById('taskVendor').value || 'N/A',
        progress: parseInt(document.getElementById('taskProgress').value) || 0,
        remarks: document.getElementById('taskRemarks').value || '',
        attachment: document.getElementById('taskAttachment').value || null
    };

    if (editingTaskIndex !== null) {
        // Edit existing task
        const task = tasks[editingTaskIndex];
        Object.assign(task, taskData);
        
        // Auto-complete if status is Completed
        if (task.status === 'Completed' && !task.dateCompleted) {
            task.dateCompleted = new Date().toISOString().split('T')[0];
            task.progress = 100;
        }
    } else {
        // Add new task
        const newId = `MNT-${String(tasks.length + 1).padStart(3, '0')}`;
        const newTask = {
            id: newId,
            dateCompleted: taskData.status === 'Completed' ? new Date().toISOString().split('T')[0] : null,
            ...taskData
        };
        tasks.push(newTask);
    }

    saveTasks(tasks);
    closeTaskModal();
    renderTaskTable();
    
    if (document.getElementById('dashboard').classList.contains('active')) {
        renderDashboard();
    }
}

function deleteTask(index) {
    if (!currentUser.permissions.delete) {
        alert('You do not have permission to delete tasks.');
        return;
    }

    if (confirm('Are you sure you want to delete this task?')) {
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTaskTable();
        alert('Task deleted successfully!');
    }
}

function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
    editingTaskIndex = null;
}

// ============================================================================
// PART 9: EXPORT FUNCTIONS
// ============================================================================

function exportToCSV() {
    if (!currentUser.permissions.export) {
        alert('You do not have permission to export data.');
        return;
    }

    const tasks = getTasks();
    
    // CSV Header
    let csv = 'Task ID,Title,Category,Location,Term,Priority,Status,Assigned To,Reported By,Date Reported,Due Date,Date Completed,Cost (AED),Vendor,Progress %,Health Score,Remarks,Attachment\n';
    
    // CSV Rows - WITHOUT SYMBOLS
    tasks.forEach(task => {
        const healthScore = calculateHealthScore(task);
        const row = [
            task.id,
            `"${task.title}"`,
            task.category,
            task.location,
            task.term,
            task.priority, // Plain text: "Critical", "High", etc.
            task.status,   // Plain text: "Completed", "In Progress", etc.
            task.assignedTo,
            task.reportedBy || '',
            task.dateReported,
            task.dueDate,
            task.dateCompleted || '',
            task.cost || 0,
            task.vendor || '',
            task.progress || 0,
            healthScore,
            `"${(task.remarks || '').replace(/"/g, '""')}"`,
            task.attachment || ''
        ];
        csv += row.join(',') + '\n';
    });

    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AUS_Maintenance_Tasks_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function exportData() {
    if (!currentUser.permissions.export) {
        alert('You do not have permission to export data.');
        return;
    }

    const data = {
        tasks: getTasks(),
        categories: getCategories(),
        locations: getLocations(),
        assignedTo: getAssignedTo(),
        exportDate: new Date().toISOString()
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AUS_Maintenance_Full_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    alert('Data exported successfully!');
}

function importData() {
    if (!currentUser.permissions.settings) {
        alert('You do not have permission to import data.');
        return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                
                if (confirm('This will replace all current data. Are you sure?')) {
                    if (data.tasks) localStorage.setItem('tasks', JSON.stringify(data.tasks));
                    if (data.categories) {
                        localStorage.setItem('categories', JSON.stringify(data.categories));
                        CATEGORIES = data.categories;
                    }
                    if (data.locations) {
                        localStorage.setItem('locations', JSON.stringify(data.locations));
                        LOCATIONS = data.locations;
                    }
                    if (data.assignedTo) {
                        localStorage.setItem('assignedTo', JSON.stringify(data.assignedTo));
                        ASSIGNED_TO = data.assignedTo;
                    }
                    
                    alert('Data imported successfully! Reloading...');
                    location.reload();
                }
            } catch (error) {
                alert('Error importing data: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function resetData() {
    if (!currentUser.permissions.settings) {
        alert('You do not have permission to reset data.');
        return;
    }

    if (confirm('This will delete all current data and restore sample data. Are you sure?')) {
        if (confirm('Are you ABSOLUTELY sure? This cannot be undone!')) {
            localStorage.setItem('tasks', JSON.stringify(SAMPLE_TASKS));
            alert('Data reset to sample data successfully!');
            location.reload();
        }
    }
}

// ============================================================================
// PART 10: SETTINGS PAGE
// ============================================================================

function renderSettings() {
    if (!currentUser.permissions.settings) {
        document.getElementById('settings').innerHTML = '<div style="padding:40px; text-align:center; color:white;"><h2>Access Denied</h2><p>You do not have permission to view Settings.</p></div>';
        return;
    }

    // Render Categories
    renderOptionsList('category', CATEGORIES, 'categoryOptions');
    
    // Render Locations
    renderOptionsList('location', LOCATIONS, 'locationOptions');
    
    // Render Assigned To
    renderOptionsList('assignedTo', ASSIGNED_TO, 'assignedToOptions');
}

function renderOptionsList(type, options, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = '';
    options.forEach((option, index) => {
        html += `
            <div class="option-item">
                <span>${option}</span>
                <button onclick="deleteOption('${type}', ${index})">Delete</button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function addNewOption(type) {
    const optionName = prompt(`Enter new ${type} name:`);
    if (!optionName || optionName.trim() === '') return;
    
    const trimmed = optionName.trim();
    
    if (type === 'category') {
        if (CATEGORIES.includes(trimmed)) {
            alert('This category already exists!');
            return;
        }
        CATEGORIES.push(trimmed);
        saveCategories(CATEGORIES);
        populateCategoryDropdowns();
        renderOptionsList('category', CATEGORIES, 'categoryOptions');
    } else if (type === 'location') {
        if (LOCATIONS.includes(trimmed)) {
            alert('This location already exists!');
            return;
        }
        LOCATIONS.push(trimmed);
        saveLocations(LOCATIONS);
        populateLocationDropdowns();
        renderOptionsList('location', LOCATIONS, 'locationOptions');
    } else if (type === 'assignedTo') {
        if (ASSIGNED_TO.includes(trimmed)) {
            alert('This team already exists!');
            return;
        }
        ASSIGNED_TO.push(trimmed);
        saveAssignedTo(ASSIGNED_TO);
        populateAssignedToDropdowns();
        renderOptionsList('assignedTo', ASSIGNED_TO, 'assignedToOptions');
    }
    
    alert(`${trimmed} added successfully!`);
}

function deleteOption(type, index) {
    if (!confirm('Are you sure you want to delete this option?')) return;
    
    if (type === 'category') {
        const deleted = CATEGORIES[index];
        CATEGORIES.splice(index, 1);
        saveCategories(CATEGORIES);
        populateCategoryDropdowns();
        renderOptionsList('category', CATEGORIES, 'categoryOptions');
        alert(`${deleted} deleted successfully!`);
    } else if (type === 'location') {
        const deleted = LOCATIONS[index];
        LOCATIONS.splice(index, 1);
        saveLocations(LOCATIONS);
        populateLocationDropdowns();
        renderOptionsList('location', LOCATIONS, 'locationOptions');
        alert(`${deleted} deleted successfully!`);
    } else if (type === 'assignedTo') {
        const deleted = ASSIGNED_TO[index];
        ASSIGNED_TO.splice(index, 1);
        saveAssignedTo(ASSIGNED_TO);
        populateAssignedToDropdowns();
        renderOptionsList('assignedTo', ASSIGNED_TO, 'assignedToOptions');
        alert(`${deleted} deleted successfully!`);
    }
}

// ============================================================================
// PART 11: USER MANAGEMENT
// ============================================================================

function renderUsersPage() {
    if (!currentUser.permissions.users) {
        document.getElementById('users').innerHTML = '<div style="padding:40px; text-align:center; color:white;"><h2>Access Denied</h2><p>Only administrators can manage users.</p></div>';
        return;
    }

    const users = getUsers();
    let html = '';
    
    users.forEach((user, index) => {
        const permsList = Object.entries(user.permissions)
            .filter(([key, value]) => value)
            .map(([key]) => key)
            .join(', ');

        html += `
            <div class="user-card">
                <h4>${user.username} <span style="color:#666; font-size:14px; font-weight:normal;">— ${user.role}</span></h4>
                <div style="color:#666; font-size:13px; margin-top:5px;">
                    <strong>Permissions:</strong> ${permsList}
                </div>
                ${user.username !== 'admin' ? `
                    <button onclick="deleteUser(${index})" style="margin-top:12px; padding:8px 16px; background:#dc3545; color:white; border:none; border-radius:6px; cursor:pointer; font-size:13px;">Delete User</button>
                ` : '<div style="margin-top:12px; color:#28a745; font-size:12px; font-weight:600;">Default Admin (Cannot be deleted)</div>'}
            </div>
        `;
    });
    
    document.getElementById('usersList').innerHTML = html;
}

function openAddUserModal() {
    document.getElementById('userModal').classList.add('active');
    
    // Set default permissions based on role
    document.getElementById('newRole').addEventListener('change', function() {
        const role = this.value;
        if (role === 'Admin') {
            document.getElementById('permAdd').checked = true;
            document.getElementById('permEdit').checked = true;
            document.getElementById('permDelete').checked = true;
            document.getElementById('permExport').checked = true;
            document.getElementById('permSettings').checked = true;
            document.getElementById('permUsers').checked = true;
        } else if (role === 'Manager') {
            document.getElementById('permAdd').checked = true;
            document.getElementById('permEdit').checked = true;
            document.getElementById('permDelete').checked = false;
            document.getElementById('permExport').checked = true;
            document.getElementById('permSettings').checked = false;
            document.getElementById('permUsers').checked = false;
        } else if (role === 'Staff') {
            document.getElementById('permAdd').checked = false;
            document.getElementById('permEdit').checked = false;
            document.getElementById('permDelete').checked = false;
            document.getElementById('permExport').checked = false;
            document.getElementById('permSettings').checked = false;
            document.getElementById('permUsers').checked = false;
        }
    });
}

function saveUser() {
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value;
    const role = document.getElementById('newRole').value;
    
    if (!username || !password) {
        alert('Username and password are required!');
        return;
    }
    
    const users = getUsers();
    
    // Check if username already exists
    if (users.some(u => u.username === username)) {
        alert('Username already exists!');
        return;
    }
    
    const newUser = {
        username: username,
        password: password,
        role: role,
        permissions: {
            view: true, // Always true
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
    renderUsersPage();
    alert(`User ${username} created successfully!`);
}

function deleteUser(index) {
    const users = getUsers();
    const user = users[index];
    
    if (user.username === 'admin') {
        alert('Cannot delete the default admin user!');
        return;
    }
    
    if (confirm(`Are you sure you want to delete user "${user.username}"?`)) {
        users.splice(index, 1);
        saveUsers(users);
        renderUsersPage();
        alert('User deleted successfully!');
    }
}

function closeUserModal() {
    document.getElementById('userModal').classList.remove('active');
    document.getElementById('userForm').reset();
}

// ============================================================================
// PART 12: UTILITY FUNCTIONS
// ============================================================================

function isOverdue(task) {
    if (task.status === 'Completed' || task.status === 'Cancelled') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return today > dueDate;
}

function calculateHealthScore(task) {
    if (task.status === 'Completed') return 100;
    if (task.status === 'Cancelled') return 0;
    
    let score = 50;
    
    if (task.status === 'In Progress') score += 10;
    if (task.priority === 'Critical') score -= 40;
    else if (task.priority === 'High') score -= 20;
    else if (task.priority === 'Low') score += 20;
    
    if (isOverdue(task)) score -= 30;
    
    score += (task.progress || 0) * 0.3;
    
    return Math.max(0, Math.min(100, Math.round(score)));
}

function getPriorityBadge(priority) {
    const classes = {
        'Critical': 'critical',
        'High': 'high',
        'Medium': 'medium',
        'Low': 'low'
    };
    return `<span class="badge ${classes[priority] || ''}">${priority}</span>`;
}

function getStatusBadge(status) {
    const classes = {
        'Pending': 'pending',
        'In Progress': 'in-progress',
        'Completed': 'completed',
        'On Hold': 'on-hold',
        'Cancelled': 'cancelled'
    };
    return `<span class="badge ${classes[status] || ''}">${status}</span>`;
}

// ============================================================================
// END OF APPLICATION
// ============================================================================

console.log('AUS Maintenance System v2.0 Loaded Successfully');
console.log('Default Login: admin / AUS2026');