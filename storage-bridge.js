// ========================================
// Firebase-LocalStorage Hybrid Bridge
// Allows gradual migration from localStorage to Firestore
// ========================================

import * as FirestoreFunctions from './firestore-functions.js';

// Global flag: set to 'firebase' or 'localStorage'
export const STORAGE_MODE = 'firebase'; // Change to 'localStorage' for fallback

// ========================================
// TASKS OPERATIONS
// ========================================

export async function getTasks() {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.getTasks();
    } else {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }
}

export async function saveTasks(tasks) {
    if (STORAGE_MODE === 'firebase') {
        // Firebase uses individual add/update operations
        console.warn('Use addTask() or updateTask() for Firebase mode');
    } else {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

export async function addTask(task) {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.addTask(task);
    } else {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        return task;
    }
}

export async function updateTask(taskId, updates) {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.updateTask(taskId, updates);
    } else {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const index = tasks.findIndex(t => t.id === taskId || t.firestoreId === taskId);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updates };
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
}

export async function deleteTask(taskId) {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.deleteTask(taskId);
    } else {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const filtered = tasks.filter(t => t.id !== taskId && t.firestoreId !== taskId);
        localStorage.setItem('tasks', JSON.stringify(filtered));
    }
}

// ========================================
// VENDORS OPERATIONS
// ========================================

export async function getVendors() {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.getVendors();
    } else {
        return JSON.parse(localStorage.getItem('vendors') || '[]');
    }
}

export async function addVendor(vendor) {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.addVendor(vendor);
    } else {
        const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
        vendors.push(vendor);
        localStorage.setItem('vendors', JSON.stringify(vendors));
        return vendor;
    }
}

export async function deleteVendor(vendorId) {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.deleteVendor(vendorId);
    } else {
        const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
        const filtered = vendors.filter((v, i) => i !== vendorId);
        localStorage.setItem('vendors', JSON.stringify(filtered));
    }
}

// ========================================
// USERS OPERATIONS
// ========================================

export async function getUsers() {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.getUsers();
    } else {
        return JSON.parse(localStorage.getItem('users') || '[]');
    }
}

export async function saveUsers(users) {
    if (STORAGE_MODE === 'firebase') {
        console.warn('Use addUser() for Firebase mode');
    } else {
        localStorage.setItem('users', JSON.stringify(users));
    }
}

export async function addUser(user) {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.addUser(user);
    } else {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return user;
    }
}

export async function deleteUser(userId) {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.deleteUser(userId);
    } else {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.splice(userId, 1);
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// ========================================
// SETTINGS OPERATIONS
// ========================================

export async function getSettings() {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.getSettings();
    } else {
        return {
            categories: JSON.parse(localStorage.getItem('categories') || '[]'),
            locations: JSON.parse(localStorage.getItem('locations') || '[]'),
            assignedTo: JSON.parse(localStorage.getItem('assignedTo') || '[]')
        };
    }
}

export async function saveSettings(settings) {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.saveSettings(settings);
    } else {
        if (settings.categories) localStorage.setItem('categories', JSON.stringify(settings.categories));
        if (settings.locations) localStorage.setItem('locations', JSON.stringify(settings.locations));
        if (settings.assignedTo) localStorage.setItem('assignedTo', JSON.stringify(settings.assignedTo));
    }
}

// ========================================
// SCHEDULE STATUS OPERATIONS
// ========================================

export async function getScheduleStatus() {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.getScheduleStatus();
    } else {
        return JSON.parse(localStorage.getItem('scheduleStatus') || '{}');
    }
}

export async function saveScheduleStatus(status) {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.saveScheduleStatus(status);
    } else {
        localStorage.setItem('scheduleStatus', JSON.stringify(status));
    }
}

// ========================================
// REAL-TIME LISTENERS (Firebase only)
// ========================================

export function listenToTasks(callback) {
    if (STORAGE_MODE === 'firebase') {
        return FirestoreFunctions.listenToTasks(callback);
    } else {
        console.warn('Real-time listeners only available in Firebase mode');
        return () => {}; // Return empty unsubscribe function
    }
}

export function listenToVendors(callback) {
    if (STORAGE_MODE === 'firebase') {
        return FirestoreFunctions.listenToVendors(callback);
    } else {
        console.warn('Real-time listeners only available in Firebase mode');
        return () => {};
    }
}

// ========================================
// BULK OPERATIONS
// ========================================

export async function exportAllData() {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.exportAllData();
    } else {
        return {
            tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
            vendors: JSON.parse(localStorage.getItem('vendors') || '[]'),
            users: JSON.parse(localStorage.getItem('users') || '[]'),
            scheduleStatus: JSON.parse(localStorage.getItem('scheduleStatus') || '{}'),
            settings: {
                categories: JSON.parse(localStorage.getItem('categories') || '[]'),
                locations: JSON.parse(localStorage.getItem('locations') || '[]'),
                assignedTo: JSON.parse(localStorage.getItem('assignedTo') || '[]')
            },
            exportDate: new Date().toISOString()
        };
    }
}

export async function importAllData(data) {
    if (STORAGE_MODE === 'firebase') {
        return await FirestoreFunctions.importAllData(data);
    } else {
        if (data.tasks) localStorage.setItem('tasks', JSON.stringify(data.tasks));
        if (data.vendors) localStorage.setItem('vendors', JSON.stringify(data.vendors));
        if (data.users) localStorage.setItem('users', JSON.stringify(data.users));
        if (data.scheduleStatus) localStorage.setItem('scheduleStatus', JSON.stringify(data.scheduleStatus));
        if (data.settings) {
            if (data.settings.categories) localStorage.setItem('categories', JSON.stringify(data.settings.categories));
            if (data.settings.locations) localStorage.setItem('locations', JSON.stringify(data.settings.locations));
            if (data.settings.assignedTo) localStorage.setItem('assignedTo', JSON.stringify(data.settings.assignedTo));
        }
    }
}

console.log(`✅ Storage bridge loaded - Mode: ${STORAGE_MODE}`);
