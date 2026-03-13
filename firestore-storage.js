// ========================================
// SIMPLE FIRESTORE STORAGE WRAPPER
// Replaces localStorage with Firestore
// ========================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    getDoc,
    getDocs,
    onSnapshot
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpwt5gZ8YqO0xYzKXLHc6VxQWzGvQw8kM",
    authDomain: "aus-maintenance.firebaseapp.com",
    projectId: "aus-maintenance",
    storageBucket: "aus-maintenance.firebasestorage.app",
    messagingSenderId: "62270048952",
    appId: "1:62270048952:web:c3a9d8e0b5f7e8d9a2e3f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('🔥 Firebase initialized - Firestore ready');

// Storage key
const STORAGE_KEY = 'aus_maintenance_data';

// ========================================
// CORE FUNCTIONS
// ========================================

/**
 * Save data to Firestore
 */
async function saveToFirestore(key, data) {
    try {
        const docRef = doc(db, 'storage', key);
        await setDoc(docRef, {
            data: data,
            updatedAt: new Date().toISOString()
        }, { merge: true });
        
        console.log('✅ Saved to Firestore:', key, '(', 
            Array.isArray(data) ? data.length + ' items' : 'object', ')');
        return true;
    } catch (error) {
        console.error('❌ Firestore save error:', error);
        return false;
    }
}

/**
 * Load data from Firestore
 */
async function loadFromFirestore(key) {
    try {
        const docRef = doc(db, 'storage', key);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const result = docSnap.data().data;
            console.log('✅ Loaded from Firestore:', key, '(',
                Array.isArray(result) ? result.length + ' items' : 'object', ')');
            return result;
        } else {
            console.log('⚠️ No data in Firestore for:', key);
            return null;
        }
    } catch (error) {
        console.error('❌ Firestore load error:', error);
        return null;
    }
}

/**
 * Listen to real-time changes
 */
function listenToFirestore(key, callback) {
    const docRef = doc(db, 'storage', key);
    return onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
            callback(doc.data().data);
        }
    });
}

// ========================================
// OVERRIDE LOCALSTORAGE FUNCTIONS
// ========================================

// Store original localStorage
const originalLocalStorage = {
    getItem: localStorage.getItem.bind(localStorage),
    setItem: localStorage.setItem.bind(localStorage)
};

// Override getTasks
window.getTasks = async function() {
    const tasks = await loadFromFirestore('tasks');
    return tasks || [];
};

// Override saveTasks
window.saveTasks = async function(tasks) {
    await saveToFirestore('tasks', tasks);
    // Also save to localStorage as backup
    originalLocalStorage.setItem('tasks', JSON.stringify(tasks));
};

// Override getVendors
window.getVendors = async function() {
    const vendors = await loadFromFirestore('vendors');
    return vendors || [];
};

// Override saveVendors
window.saveVendors = async function(vendors) {
    await saveToFirestore('vendors', vendors);
    originalLocalStorage.setItem('vendors', JSON.stringify(vendors));
};

// Override getUsers
window.getUsers = async function() {
    const users = await loadFromFirestore('users');
    return users || [];
};

// Override saveUsers
window.saveUsers = async function(users) {
    await saveToFirestore('users', users);
    originalLocalStorage.setItem('users', JSON.stringify(users));
};

// ========================================
// AUTO-SYNC FROM FIRESTORE
// ========================================

// Listen to tasks changes
listenToFirestore('tasks', (tasks) => {
    console.log('🔄 Tasks updated from Firestore:', tasks.length);
    originalLocalStorage.setItem('tasks', JSON.stringify(tasks));
    if (typeof window.renderTaskTable === 'function') {
        window.renderTaskTable();
    }
});

// Listen to vendors changes
listenToFirestore('vendors', (vendors) => {
    console.log('🔄 Vendors updated from Firestore:', vendors.length);
    originalLocalStorage.setItem('vendors', JSON.stringify(vendors));
    if (typeof window.renderVendorTable === 'function') {
        window.renderVendorTable();
    }
});

// ========================================
// INITIAL SYNC
// ========================================

async function initialSync() {
    console.log('🔄 Starting initial sync from Firestore...');
    
    // Load tasks
    const tasks = await loadFromFirestore('tasks');
    if (tasks) {
        originalLocalStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Load vendors
    const vendors = await loadFromFirestore('vendors');
    if (vendors) {
        originalLocalStorage.setItem('vendors', JSON.stringify(vendors));
    }
    
    // Load users
    const users = await loadFromFirestore('users');
    if (users) {
        originalLocalStorage.setItem('users', JSON.stringify(users));
    }
    
    console.log('✅ Initial sync complete');
}

// Run initial sync
setTimeout(initialSync, 1000);

console.log('✅ Firestore storage wrapper loaded - All data now saved to cloud');
