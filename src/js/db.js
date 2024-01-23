
const DB_NAME = "StudentDB";
const STORE_NAME = 'students';

const openDB = ()=>{
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME,1);

        req.onupgradeneeded = (event)=>{
            const db = event.target.result;
            if(!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME,{key:'studentId', autoIncrement:true})
            }
        };

        req.onsuccess = (event)=>{
            resolve(event.target.result)
        };
        req.onerror = (event) =>{
            reject(event.target.result);
        };
    });
}

const addStudent = (db , student) =>{
    return new Promise((resolve, reject) => {
        const transaction = db.objectStoreNames(STORE_NAME,'readWrite');
        const store = transaction.objectStoreNames(STORE_NAME);
        
        const req = store.add(student);

        req.onsuccess = (event) => {
            resolve(event.target.result)
        };

        req.onerror = (event) => {
            reject(event.target.result)
        };

    });
};

const getAllStudent = (db) =>{
    return new Promise((resolve, reject) => {
        const transaction = db.objectStoreNames(STORE_NAME,'readonly');
        const store = transaction.objectStoreNames(STORE_NAME);

        const req = store.getAll();

        req.onsuccess = (event) =>{
            resolve(event.target.result)
        };

        req.onerror = (event) =>{
            reject(event.target.result)
        }
    })
}
const removeStudent = (db, studentId) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const req = store.delete(studentId);

        req.onsuccess = (event) => {
            resolve(event.target.result);
        };

        req.onerror = (event) => {
            reject(event.target.result);
        };
    });
};