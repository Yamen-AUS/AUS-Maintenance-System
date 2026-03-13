// ========================================
// Firestore CRUD Functions
// Arab Unity School Maintenance System
// ========================================

import { db } from './firebase-config.js';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    Timestamp,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Collection names
const COLLECTIONS = {
    TASKS: 'tasks',
    VENDORS: 'vendors',
    USERS: 'users',
    SCHEDULE_STATUS: 'scheduleStatus',
    SETTINGS: 'settings'
};

// ========================================
// TASKS OPERATIONS
// ========================================

/**
 * Get all tasks from Firestore
 * @returns {Promise<Array>} Array of tasks
 */
export async function getTasks() {
    try {
        const tasksCol = collection(db, COLLECTIONS.TASKS);
        const taskSnapshot = await getDocs(tasksCol);
        const tasks = taskSnapshot.docs.map(doc => ({
            firestoreId: doc.id,
            ...doc.data()
        }));
        console.log(`✅ Loaded ${tasks.length} tasks from Firestore`);
        return tasks;
    } catch (error) {
        console.error('❌ Error getting tasks:', error);
        return [];
    }
}

/**
 * Add a new task to Firestore
 * @param {Object} task - Task object to add
 * @returns {Promise<Object>} Added task with Firestore ID
 */
export async function addTask(task) {
    try {
        const tasksCol = collection(db, COLLECTIONS.TASKS);
        const taskWithTimestamp = {
            ...task,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };
        const docRef = await addDoc(tasksCol, taskWithTimestamp);
        console.log('✅ Task added with ID:', docRef.id);
        return { firestoreId: docRef.id, ...taskWithTimestamp };
    } catch (error) {
        console.error('❌ Error adding task:', error);
        throw error;
    }
}

/**
 * Update an existing task in Firestore
 * @param {string} firestoreId - Firestore document ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<void>}
 */
export async function updateTask(firestoreId, updates) {
    try {
        const taskRef = doc(db, COLLECTIONS.TASKS, firestoreId);
        await updateDoc(taskRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
        console.log('✅ Task updated:', firestoreId);
    } catch (error) {
        console.error('❌ Error updating task:', error);
        throw error;
    }
}

/**
 * Delete a task from Firestore
 * @param {string} firestoreId - Firestore document ID
 * @returns {Promise<void>}
 */
export async function deleteTask(firestoreId) {
    try {
        await deleteDoc(doc(db, COLLECTIONS.TASKS, firestoreId));
        console.log('✅ Task deleted:', firestoreId);
    } catch (error) {
        console.error('❌ Error deleting task:', error);
        throw error;
    }
}

/**
 * Listen to real-time task updates
 * @param {Function} callback - Called with updated tasks array
 * @returns {Function} Unsubscribe function
 */
export function listenToTasks(callback) {
    const tasksCol = collection(db, COLLECTIONS.TASKS);
    const q = query(tasksCol, orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map(doc => ({
            firestoreId: doc.id,
            ...doc.data()
        }));
        console.log(`🔄 Real-time update: ${tasks.length} tasks`);
        callback(tasks);
    }, (error) => {
        console.error('❌ Error in tasks listener:', error);
    });
}

// ========================================
// VENDORS OPERATIONS
// ========================================

/**
 * Get all vendors from Firestore
 * @returns {Promise<Array>} Array of vendors
 */
export async function getVendors() {
    try {
        const vendorsCol = collection(db, COLLECTIONS.VENDORS);
        const vendorSnapshot = await getDocs(vendorsCol);
        const vendors = vendorSnapshot.docs.map(doc => ({
            firestoreId: doc.id,
            ...doc.data()
        }));
        console.log(`✅ Loaded ${vendors.length} vendors from Firestore`);
        return vendors;
    } catch (error) {
        console.error('❌ Error getting vendors:', error);
        return [];
    }
}

/**
 * Add a new vendor to Firestore
 * @param {Object} vendor - Vendor object to add
 * @returns {Promise<Object>} Added vendor with Firestore ID
 */
export async function addVendor(vendor) {
    try {
        const vendorsCol = collection(db, COLLECTIONS.VENDORS);
        const vendorWithTimestamp = {
            ...vendor,
            createdAt: serverTimestamp()
        };
        const docRef = await addDoc(vendorsCol, vendorWithTimestamp);
        console.log('✅ Vendor added with ID:', docRef.id);
        return { firestoreId: docRef.id, ...vendorWithTimestamp };
    } catch (error) {
        console.error('❌ Error adding vendor:', error);
        throw error;
    }
}

/**
 * Delete a vendor from Firestore
 * @param {string} firestoreId - Firestore document ID
 * @returns {Promise<void>}
 */
export async function deleteVendor(firestoreId) {
    try {
        await deleteDoc(doc(db, COLLECTIONS.VENDORS, firestoreId));
        console.log('✅ Vendor deleted:', firestoreId);
    } catch (error) {
        console.error('❌ Error deleting vendor:', error);
        throw error;
    }
}

/**
 * Listen to real-time vendor updates
 * @param {Function} callback - Called with updated vendors array
 * @returns {Function} Unsubscribe function
 */
export function listenToVendors(callback) {
    const vendorsCol = collection(db, COLLECTIONS.VENDORS);
    
    return onSnapshot(vendorsCol, (snapshot) => {
        const vendors = snapshot.docs.map(doc => ({
            firestoreId: doc.id,
            ...doc.data()
        }));
        console.log(`🔄 Real-time update: ${vendors.length} vendors`);
        callback(vendors);
    }, (error) => {
        console.error('❌ Error in vendors listener:', error);
    });
}

// ========================================
// USERS OPERATIONS
// ========================================

/**
 * Get all users from Firestore
 * @returns {Promise<Array>} Array of users
 */
export async function getUsers() {
    try {
        const usersCol = collection(db, COLLECTIONS.USERS);
        const userSnapshot = await getDocs(usersCol);
        const users = userSnapshot.docs.map(doc => ({
            firestoreId: doc.id,
            ...doc.data()
        }));
        console.log(`✅ Loaded ${users.length} users from Firestore`);
        return users;
    } catch (error) {
        console.error('❌ Error getting users:', error);
        return [];
    }
}

/**
 * Add a new user to Firestore
 * @param {Object} user - User object to add
 * @returns {Promise<Object>} Added user with Firestore ID
 */
export async function addUser(user) {
    try {
        const usersCol = collection(db, COLLECTIONS.USERS);
        const docRef = await addDoc(usersCol, user);
        console.log('✅ User added with ID:', docRef.id);
        return { firestoreId: docRef.id, ...user };
    } catch (error) {
        console.error('❌ Error adding user:', error);
        throw error;
    }
}

/**
 * Delete a user from Firestore
 * @param {string} firestoreId - Firestore document ID
 * @returns {Promise<void>}
 */
export async function deleteUser(firestoreId) {
    try {
        await deleteDoc(doc(db, COLLECTIONS.USERS, firestoreId));
        console.log('✅ User deleted:', firestoreId);
    } catch (error) {
        console.error('❌ Error deleting user:', error);
        throw error;
    }
}

// ========================================
// SCHEDULE STATUS OPERATIONS
// ========================================

/**
 * Get schedule status from Firestore
 * @returns {Promise<Object>} Schedule status object
 */
export async function getScheduleStatus() {
    try {
        const docRef = doc(db, COLLECTIONS.SCHEDULE_STATUS, 'main');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            console.log('✅ Loaded schedule status from Firestore');
            return docSnap.data().status || {};
        } else {
            console.log('📝 No schedule status found, initializing...');
            return {};
        }
    } catch (error) {
        console.error('❌ Error getting schedule status:', error);
        return {};
    }
}

/**
 * Save schedule status to Firestore
 * @param {Object} status - Schedule status object
 * @returns {Promise<void>}
 */
export async function saveScheduleStatus(status) {
    try {
        const docRef = doc(db, COLLECTIONS.SCHEDULE_STATUS, 'main');
        await updateDoc(docRef, {
            status: status,
            updatedAt: serverTimestamp()
        }).catch(async (error) => {
            // If document doesn't exist, create it
            if (error.code === 'not-found') {
                await addDoc(collection(db, COLLECTIONS.SCHEDULE_STATUS), {
                    status: status,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
            } else {
                throw error;
            }
        });
        console.log('✅ Schedule status saved to Firestore');
    } catch (error) {
        console.error('❌ Error saving schedule status:', error);
        throw error;
    }
}

// ========================================
// SETTINGS OPERATIONS
// ========================================

/**
 * Get settings (categories, locations, assigned teams) from Firestore
 * @returns {Promise<Object>} Settings object
 */
export async function getSettings() {
    try {
        const docRef = doc(db, COLLECTIONS.SETTINGS, 'main');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            console.log('✅ Loaded settings from Firestore');
            return docSnap.data();
        } else {
            console.log('📝 No settings found');
            return null;
        }
    } catch (error) {
        console.error('❌ Error getting settings:', error);
        return null;
    }
}

/**
 * Save settings to Firestore
 * @param {Object} settings - Settings object (categories, locations, assignedTo)
 * @returns {Promise<void>}
 */
export async function saveSettings(settings) {
    try {
        const docRef = doc(db, COLLECTIONS.SETTINGS, 'main');
        await updateDoc(docRef, {
            ...settings,
            updatedAt: serverTimestamp()
        }).catch(async (error) => {
            // If document doesn't exist, create it
            if (error.code === 'not-found') {
                const settingsCol = collection(db, COLLECTIONS.SETTINGS);
                await addDoc(settingsCol, {
                    ...settings,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
            } else {
                throw error;
            }
        });
        console.log('✅ Settings saved to Firestore');
    } catch (error) {
        console.error('❌ Error saving settings:', error);
        throw error;
    }
}

// ========================================
// BULK OPERATIONS
// ========================================

/**
 * Import all data to Firestore (tasks, vendors, users, settings)
 * @param {Object} data - Data object with tasks, vendors, users, settings
 * @returns {Promise<void>}
 */
export async function importAllData(data) {
    try {
        // Import tasks
        if (data.tasks && Array.isArray(data.tasks)) {
            for (const task of data.tasks) {
                await addTask(task);
            }
        }
        
        // Import vendors
        if (data.vendors && Array.isArray(data.vendors)) {
            for (const vendor of data.vendors) {
                await addVendor(vendor);
            }
        }
        
        // Import users
        if (data.users && Array.isArray(data.users)) {
            for (const user of data.users) {
                await addUser(user);
            }
        }
        
        // Import settings
        if (data.categories || data.locations || data.assignedTo) {
            await saveSettings({
                categories: data.categories || [],
                locations: data.locations || [],
                assignedTo: data.assignedTo || []
            });
        }
        
        // Import schedule status
        if (data.scheduleStatus) {
            await saveScheduleStatus(data.scheduleStatus);
        }
        
        console.log('✅ All data imported successfully');
    } catch (error) {
        console.error('❌ Error importing data:', error);
        throw error;
    }
}

/**
 * Export all data from Firestore
 * @returns {Promise<Object>} Complete data export
 */
export async function exportAllData() {
    try {
        const tasks = await getTasks();
        const vendors = await getVendors();
        const users = await getUsers();
        const settings = await getSettings();
        const scheduleStatus = await getScheduleStatus();
        
        const exportData = {
            tasks,
            vendors,
            users,
            settings,
            scheduleStatus,
            exportDate: new Date().toISOString()
        };
        
        console.log('✅ All data exported successfully');
        return exportData;
    } catch (error) {
        console.error('❌ Error exporting data:', error);
        throw error;
    }
}

console.log('✅ Firestore functions module loaded');
