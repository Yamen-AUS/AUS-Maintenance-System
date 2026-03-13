// ========================================
// PERMANENT CLOUD STORAGE SOLUTION
// Auto-saves all data to Firestore
// ========================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc,
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

console.log('🔥 Firebase Cloud Storage - Active');

// ========================================
// AUTO-SAVE TO CLOUD
// ========================================

// Watch localStorage changes and sync to Firestore
function watchLocalStorage() {
    // Save tasks to cloud every time they change
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        
        if (key === 'tasks' || key === 'vendors' || key === 'users') {
            saveToCloud(key, value);
        }
    };
}

// Save to Firestore
async function saveToCloud(key, value) {
    try {
        const data = JSON.parse(value);
        const docRef = doc(db, 'storage', key);
        
        await setDoc(docRef, {
            data: data,
            updatedAt: new Date().toISOString(),
            count: Array.isArray(data) ? data.length : 0
        }, { merge: true });
        
        console.log('☁️ Saved to cloud:', key, 
            Array.isArray(data) ? `(${data.length} items)` : '');
    } catch (error) {
        console.error('❌ Cloud save error:', key, error);
    }
}

// Load from Firestore on startup
async function loadFromCloud() {
    try {
        console.log('📥 Loading data from cloud...');
        
        // Load tasks
        const tasksDoc = await getDoc(doc(db, 'storage', 'tasks'));
        if (tasksDoc.exists()) {
            const tasks = tasksDoc.data().data;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            console.log('✅ Loaded tasks from cloud:', tasks.length);
        }
        
        // Load vendors
        const vendorsDoc = await getDoc(doc(db, 'storage', 'vendors'));
        if (vendorsDoc.exists()) {
            const vendors = vendorsDoc.data().data;
            localStorage.setItem('vendors', JSON.stringify(vendors));
            console.log('✅ Loaded vendors from cloud:', vendors.length);
        }
        
        // Load users
        const usersDoc = await getDoc(doc(db, 'storage', 'users'));
        if (usersDoc.exists()) {
            const users = usersDoc.data().data;
            localStorage.setItem('users', JSON.stringify(users));
            console.log('✅ Loaded users from cloud:', users.length);
        }
        
        console.log('✅ Cloud sync complete!');
        
        // Refresh UI if app is already loaded
        setTimeout(() => {
            if (typeof window.renderTaskTable === 'function') {
                window.renderTaskTable();
            }
            if (typeof window.renderDashboard === 'function') {
                window.renderDashboard();
            }
        }, 500);
        
    } catch (error) {
        console.error('❌ Cloud load error:', error);
    }
}

// Listen to cloud changes (real-time sync)
function listenToCloud() {
    // Listen to tasks
    onSnapshot(doc(db, 'storage', 'tasks'), (doc) => {
        if (doc.exists()) {
            const tasks = doc.data().data;
            const currentTasks = localStorage.getItem('tasks');
            const newTasks = JSON.stringify(tasks);
            
            if (currentTasks !== newTasks) {
                localStorage.setItem('tasks', newTasks);
                console.log('🔄 Tasks synced from cloud:', tasks.length);
                
                if (typeof window.renderTaskTable === 'function') {
                    window.renderTaskTable();
                }
                if (typeof window.renderDashboard === 'function') {
                    window.renderDashboard();
                }
            }
        }
    });
    
    // Listen to vendors
    onSnapshot(doc(db, 'storage', 'vendors'), (doc) => {
        if (doc.exists()) {
            const vendors = doc.data().data;
            localStorage.setItem('vendors', JSON.stringify(vendors));
            console.log('🔄 Vendors synced from cloud:', vendors.length);
            
            if (typeof window.renderVendorTable === 'function') {
                window.renderVendorTable();
            }
        }
    });
    
    console.log('👁️ Real-time sync enabled');
}

// ========================================
// INITIALIZE
// ========================================

// Start watching localStorage
watchLocalStorage();

// Load data from cloud after 1 second
setTimeout(() => {
    loadFromCloud();
    listenToCloud();
}, 1000);

console.log('✅ Permanent cloud storage active - Your data is safe!');
