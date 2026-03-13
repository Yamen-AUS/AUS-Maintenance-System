// ========================================
// Firebase Configuration
// Arab Unity School Maintenance System
// ========================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNKhsWA0jwQ4EzdfxLtFmFkAJMAkG_Wv4",
    authDomain: "aus-maintenance.firebaseapp.com",
    projectId: "aus-maintenance",
    storageBucket: "aus-maintenance.firebasestorage.app",
    messagingSenderId: "716255496751",
    appId: "1:716255496751:web:0ed4a8ad9f44514ad794da",
    measurementId: "G-102Z766RDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

console.log('✅ Firebase initialized successfully');
console.log('📊 Firestore database:', db);

// Export for use in other modules
export { app, db, analytics };
