// ========================================
// Firebase Initial Data Setup
// Run this ONCE to populate Firestore
// ========================================

import { db } from './firebase-config.js';
import { 
    collection, 
    doc, 
    setDoc, 
    getDocs
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

async function initializeFirestore() {
    console.log('🚀 Initializing Firestore with sample data...');
    
    try {
        // Check if data already exists
        const tasksSnapshot = await getDocs(collection(db, 'maintenance_tasks'));
        if (!tasksSnapshot.empty) {
            console.log('✅ Data already exists in Firestore');
            return;
        }
        
        // Create default admin user
        await setDoc(doc(db, 'system_users', 'user-admin'), {
            name: 'Administrator',
            username: 'admin',
            password: 'AUS2026',
            email: 'admin@aus-school.ae',
            role: 'Admin',
            createdAt: new Date().toISOString()
        });
        
        // Create sample maintenance user
        await setDoc(doc(db, 'system_users', 'user-maintenance'), {
            name: 'Maintenance Team',
            username: 'maintenance',
            password: 'maint2026',
            email: 'maintenance@aus-school.ae',
            role: 'Maintenance',
            createdAt: new Date().toISOString()
        });
        
        // Create sample tasks (4 examples)
        const sampleTasks = [
            {
                id: 'MNT-001',
                title: 'Wall Plaster Repair',
                category: 'Civil/Building',
                location: 'Playground',
                term: 'Term 2',
                priority: '🟠 High',
                status: '✅ Completed',
                assignedTo: 'External Vendor',
                reportedBy: 'Maintenance Team',
                dateReported: '2026-02-23',
                dueDate: '2026-03-02',
                dateCompleted: '2026-03-02',
                cost: 800,
                vendor: 'Ghaleeb',
                progress: 100,
                notes: 'Wall plaster of the sub-station next to Taher Hall pump room was damaged and has been thoroughly revamped.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'MNT-002',
                title: 'Fence of Open Area',
                category: 'Safety & Security',
                location: 'Playground',
                term: 'Term 2',
                priority: '🔴 Critical',
                status: '✅ Completed',
                assignedTo: 'Maintenance Team',
                reportedBy: 'Maintenance Team',
                dateReported: '2026-02-25',
                dueDate: '2026-03-07',
                dateCompleted: '2026-03-07',
                cost: 650,
                vendor: 'Internally with our maintenance team',
                progress: 100,
                notes: 'Open area around Taher hall pump has been fenced with welded mesh. Materials: Road base, cement, MS galvanised pipe, welded green mesh and padlock. Cost approx AED 650.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'MNT-003',
                title: 'Astro Turf - Main Football Ground',
                category: 'Sports Facilities',
                location: 'Playground',
                term: 'Summer',
                priority: '🟠 High',
                status: '⏳ Pending',
                assignedTo: 'External Vendor',
                reportedBy: 'Sports Coordinator',
                dateReported: '2025-02-21',
                dueDate: '2026-06-30',
                dateCompleted: null,
                cost: 447000,
                vendor: 'MM technical services LLC',
                progress: 0,
                notes: 'Football astro turf replacement work. Quotation submitted by Mr. Mohammed Ameen.',
                createdAt: new Date().toISOString()
            },
            {
                id: 'MNT-004',
                title: 'AIRCON Units Replacement',
                category: 'HVAC/AC',
                location: 'Multiple Classrooms',
                term: 'Summer',
                priority: '🔴 Critical',
                status: '⏳ Pending',
                assignedTo: 'External Vendor',
                reportedBy: 'Facilities Manager',
                dateReported: '2025-06-06',
                dueDate: '2026-08-20',
                dateCompleted: null,
                cost: 520000,
                vendor: 'Al Saeediyah',
                progress: 0,
                notes: 'Current ACs are not in good condition - making noise, not cooling properly, frequently breaking. Required: 90 AC units, but at least 40 units need immediate replacement.',
                createdAt: new Date().toISOString()
            }
        ];
        
        // Add tasks to Firestore
        for (const task of sampleTasks) {
            await setDoc(doc(db, 'maintenance_tasks', task.id), task);
        }
        
        // Create sample vendors
        const sampleVendors = [
            {
                name: 'Ghaleeb',
                company: 'Ghaleeb Contracting',
                phone: '+971 50 123 4567',
                email: 'ghaleeb@contractor.ae',
                category: 'Civil/Building',
                rating: '⭐⭐⭐⭐⭐',
                createdAt: new Date().toISOString()
            },
            {
                name: 'MM Technical',
                company: 'MM Technical Services LLC',
                phone: '+971 50 234 5678',
                email: 'info@mmtechnical.ae',
                category: 'Sports Facilities',
                rating: '⭐⭐⭐⭐',
                createdAt: new Date().toISOString()
            }
        ];
        
        for (let i = 0; i < sampleVendors.length; i++) {
            await setDoc(doc(db, 'vendors', `VENDOR-${i+1}`), sampleVendors[i]);
        }
        
        console.log('✅ Firestore initialized successfully!');
        console.log('📊 Sample data added:');
        console.log('  - 2 users (admin, maintenance)');
        console.log('  - 4 tasks (2 completed, 2 pending)');
        console.log('  - 2 vendors');
        
        alert('✅ Firestore initialized successfully!\n\nYou can now login with:\nUsername: admin\nPassword: AUS2026');
        
    } catch (error) {
        console.error('❌ Initialization error:', error);
        alert('❌ Failed to initialize Firestore: ' + error.message);
    }
}

// Auto-run on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 Checking Firestore initialization...');
    setTimeout(initializeFirestore, 2000);
});

export { initializeFirestore };
