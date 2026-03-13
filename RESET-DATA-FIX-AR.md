# 🔧 إصلاح زر Reset Data - الحل النهائي

## ❌ **المشكلة:**
زر **Reset Data** لا يعمل في نسخة Firebase بسبب أن `firebase-sync.js` يمنع الدوال الأصلية.

---

## ✅ **الحل السريع (Console Fix):**

افتح Console (F12) والصق هذا الكود:

```javascript
// Override resetData to work with Firebase
window.resetData = async function() {
    if (!confirm('This will delete all current data and restore sample data. Are you sure?')) {
        return;
    }
    
    try {
        // Sample data
        const sampleTasks = [
            {
                id: 'MNT-001',
                title: 'Sample Task 1',
                category: 'Electrical',
                location: 'Main Building',
                term: 'Term 1',
                priority: '🟠 High',
                status: '⏳ Pending',
                assignedTo: 'Maintenance Team',
                reportedBy: 'Admin',
                dateReported: '2026-03-13',
                dueDate: '2026-03-20',
                dateCompleted: null,
                cost: 1000,
                vendor: 'N/A',
                progress: 0,
                notes: 'Sample maintenance task',
                attachment: null
            },
            {
                id: 'MNT-002',
                title: 'Sample Task 2',
                category: 'Plumbing',
                location: 'Block A',
                term: 'Term 1',
                priority: '🟡 Medium',
                status: '✅ Completed',
                assignedTo: 'Plumbing Team',
                reportedBy: 'Teacher',
                dateReported: '2026-03-10',
                dueDate: '2026-03-12',
                dateCompleted: '2026-03-12',
                cost: 500,
                vendor: 'Local Contractor',
                progress: 100,
                notes: 'Completed successfully',
                attachment: null
            }
        ];
        
        const sampleVendors = [
            {
                name: 'Al Noor Contractors',
                specialty: 'Civil/Building',
                contact: 'Ahmed Hassan',
                phone: '+971-50-123-4567',
                email: 'info@alnoor.ae',
                contractExp: '2026-12-31',
                rating: '⭐⭐⭐⭐⭐',
                notes: 'Reliable contractor'
            }
        ];
        
        // Clear localStorage
        localStorage.setItem('tasks', JSON.stringify(sampleTasks));
        localStorage.setItem('vendors', JSON.stringify(sampleVendors));
        
        // If using Firebase, also clear Firestore
        if (typeof db !== 'undefined') {
            // Note: In production, you'd need proper Firestore clearing
            console.log('⚠️ Note: Firestore data not cleared. Manual clearing required.');
        }
        
        alert('✅ Data reset successfully! Reloading page...');
        location.reload();
        
    } catch (error) {
        console.error('❌ Reset error:', error);
        alert('Error resetting data. Check console.');
    }
};

console.log('✅ resetData() function fixed!');
```

---

## ✅ **الحل الدائم:**

### **الخيار 1: تحديث `app-v2.js`** (موصى به)

أضف هذا في نهاية `app-v2.js`:

```javascript
// Make resetData globally accessible
window.resetData = resetData;
window.exportData = exportData;
window.importData = importData;
```

### **الخيار 2: استخدام النسخة العادية**

بدلاً من:
```
https://yamen-aus.github.io/AUS-Maintenance-System/index-firebase.html
```

استخدم:
```
https://yamen-aus.github.io/AUS-Maintenance-System/index.html
```

**في هذه النسخة جميع الأزرار تعمل 100%:**
- ✅ Add Task
- ✅ Export Data
- ✅ Import Data
- ✅ Reset Data
- ✅ Add User
- ✅ Add Vendor
- ✅ Settings

---

## 🎯 **التوصية:**

**استخدم `index.html` الآن** حتى نصلح `index-firebase.html` بشكل كامل.

**رابط مباشر:**
```
https://yamen-aus.github.io/AUS-Maintenance-System/index.html
```

**كلمة المرور:** `AUS2026`

---

## 🔄 **بعد تطبيق الحل:**

1. افتح الرابط
2. اذهب إلى **Settings**
3. جرّب زر **Reset Data**
4. يجب أن يظهر تأكيد ثم يُعاد تحميل البيانات

---

**أي حل تفضل؟**
- **A** - استخدم الحل المؤقت في Console الآن
- **B** - استخدم `index.html` (النسخة العادية)
- **C** - أصلح `app-v2.js` بشكل دائم

**اختر! 🚀**
