// ========================================
// Firebase-LocalStorage Sync Layer
// Real-time synchronization between localStorage and Firestore
// ========================================

import { db } from './firebase-config.js';
import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Enable/disable sync
const SYNC_ENABLED = true;
const SYNC_INTERVAL = 5000; // 5 seconds

// Collections
const COLLECTIONS = {
    TASKS: 'tasks',
    VENDORS: 'vendors',
    USERS: 'users',
    SCHEDULE: 'scheduleStatus'
};

console.log('🔄 Firebase Sync Layer loaded');

// ========================================
// SYNC TASKS
// ========================================

// Listen to Firestore tasks and update localStorage
export function startTasksSync() {
    if (!SYNC_ENABLED) return;
    
    const tasksCol = collection(db, COLLECTIONS.TASKS);
    
    return onSnapshot(tasksCol, (snapshot) => {
        const firestoreTasks = snapshot.docs.map(doc => ({
            firestoreId: doc.id,
            ...doc.data()
        }));
        
        // Update localStorage
        localStorage.setItem('tasks', JSON.stringify(firestoreTasks));
        
        // Trigger UI update if window.renderTasks exists
        if (typeof window.renderTasks === 'function') {
            window.renderTasks();
        }
        
        console.log(`🔄 Synced ${firestoreTasks.length} tasks from Firestore`);
    });
}

// Push localStorage tasks to Firestore
export async function pushTasksToFirestore() {
    if (!SYNC_ENABLED) return;
    
    try {
        const localTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const tasksCol = collection(db, COLLECTIONS.TASKS);
        
        // Get existing Firestore tasks
        const snapshot = await getDocs(tasksCol);
        const firestoreIds = snapshot.docs.map(doc => doc.data().id);
        
        // Add new tasks
        for (const task of localTasks) {
            if (!firestoreIds.includes(task.id)) {
                await addDoc(tasksCol, {
                    ...task,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                console.log(`➕ Pushed task ${task.id} to Firestore`);
            }
        }
    } catch (error) {
        console.error('❌ Error pushing tasks:', error);
    }
}

// ========================================
// SYNC VENDORS
// ========================================

export function startVendorsSync() {
    if (!SYNC_ENABLED) return;
    
    const vendorsCol = collection(db, COLLECTIONS.VENDORS);
    
    return onSnapshot(vendorsCol, (snapshot) => {
        const firestoreVendors = snapshot.docs.map(doc => ({
            firestoreId: doc.id,
            ...doc.data()
        }));
        
        localStorage.setItem('vendors', JSON.stringify(firestoreVendors));
        
        if (typeof window.renderVendors === 'function') {
            window.renderVendors();
        }
        
        console.log(`🔄 Synced ${firestoreVendors.length} vendors from Firestore`);
    });
}

export async function pushVendorsToFirestore() {
    if (!SYNC_ENABLED) return;
    
    try {
        const localVendors = JSON.parse(localStorage.getItem('vendors') || '[]');
        const vendorsCol = collection(db, COLLECTIONS.VENDORS);
        
        const snapshot = await getDocs(vendorsCol);
        const firestoreNames = snapshot.docs.map(doc => doc.data().name);
        
        for (const vendor of localVendors) {
            if (!firestoreNames.includes(vendor.name)) {
                await addDoc(vendorsCol, {
                    ...vendor,
                    createdAt: serverTimestamp()
                });
                console.log(`➕ Pushed vendor ${vendor.name} to Firestore`);
            }
        }
    } catch (error) {
        console.error('❌ Error pushing vendors:', error);
    }
}

// ========================================
// SYNC USERS
// ========================================

export function startUsersSync() {
    if (!SYNC_ENABLED) return;
    
    const usersCol = collection(db, COLLECTIONS.USERS);
    
    return onSnapshot(usersCol, (snapshot) => {
        const firestoreUsers = snapshot.docs.map(doc => ({
            firestoreId: doc.id,
            ...doc.data()
        }));
        
        localStorage.setItem('users', JSON.stringify(firestoreUsers));
        
        if (typeof window.renderManageUsers === 'function') {
            window.renderManageUsers();
        }
        
        console.log(`🔄 Synced ${firestoreUsers.length} users from Firestore`);
    });
}

export async function pushUsersToFirestore() {
    if (!SYNC_ENABLED) return;
    
    try {
        const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const usersCol = collection(db, COLLECTIONS.USERS);
        
        const snapshot = await getDocs(usersCol);
        const firestoreUsernames = snapshot.docs.map(doc => doc.data().username);
        
        for (const user of localUsers) {
            if (!firestoreUsernames.includes(user.username)) {
                await addDoc(usersCol, user);
                console.log(`➕ Pushed user ${user.username} to Firestore`);
            }
        }
    } catch (error) {
        console.error('❌ Error pushing users:', error);
    }
}

// ========================================
// AUTO-INIT ON LOAD
// ========================================

if (SYNC_ENABLED) {
    console.log('🚀 Starting Firebase sync...');
    
    // Wait for Firebase to initialize
    setTimeout(() => {
        // Start listening to Firestore
        startTasksSync();
        startVendorsSync();
        startUsersSync();
        
        // Push local data to Firestore (initial sync)
        pushTasksToFirestore();
        pushVendorsToFirestore();
        pushUsersToFirestore();
        
        console.log('✅ Firebase sync active - Real-time updates enabled');
    }, 2000);
}

console.log('✅ firebase-sync.js loaded');
