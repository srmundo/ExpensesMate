export function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("FinanceDB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // Crear la tabla de categorías
            const categoriesStore = db.createObjectStore("categories", {
                keyPath: "id",
                autoIncrement: true
            });
            categoriesStore.createIndex("name", "name", { unique: true });
            categoriesStore.createIndex("type", "type", { unique: false });
            
            // Crear la tabla de metas
            const goalsStore = db.createObjectStore("goals", {
                keyPath: "id",
                autoIncrement: true
            });
            goalsStore.createIndex("name", "name", { unique: false });
            goalsStore.createIndex("amount", "amount", { unique: false });
            goalsStore.createIndex("currentAmount", "currentAmount", { unique: false });
            goalsStore.createIndex("date", "date", { unique: false });
            
            // Crear la tabla de transacciones
            const transactionsStore = db.createObjectStore("transactions", {
                keyPath: "id",
                autoIncrement: true
            });
            transactionsStore.createIndex("amount", "amount", { unique: false });
            transactionsStore.createIndex("date", "date", { unique: false });
            transactionsStore.createIndex("categoryId", "categoryId", { unique: false });
            transactionsStore.createIndex("type", "type", { unique: false });
            transactionsStore.createIndex("note", "note", { unique: false });
            transactionsStore.createIndex("goalId", "goalId", { unique: false });
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject("Error opening database: " + event.target.errorCode);
        };
    });
}

openDatabase().then(db => {
    console.log("Database opened successfully", db);
}).catch(error => {
    console.error(error);
});


async function insertData(storeName, data) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.add(data);
            
            request.onsuccess = () => resolve("Data inserted successfully");
            request.onerror = (event) => reject("Error inserting data: " + event.target.errorCode);
        });
    });
}

export function insertCategory(name, type) {
    return insertData("categories", { name, type });
}

export function insertGoal(name, amount, currentAmount, date) {
    return insertData("goals", { name, amount, currentAmount, date });
}

export function insertTransaction(amount, date, categoryId, type, note, goalId) {
    return insertData("transactions", { amount, date, categoryId, type, note, goalId });
}

export async function getCategories() {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("categories", "readonly");
            const store = transaction.objectStore("categories");
            const request = store.getAll();  // Devuelve todos los registros de la tabla de categorías

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject("Error retrieving categories: " + event.target.errorCode);
        });
    });
}


export async function getGoals() {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("goals", "readonly");
            const store = transaction.objectStore("goals");
            const request = store.getAll();  // Devuelve todos los registros de la tabla de metas

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject("Error retrieving goals: " + event.target.errorCode);
        });
    });
}

export async function getTransactions() {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("transactions", "readonly");
            const store = transaction.objectStore("transactions");
            const request = store.getAll();  // Devuelve todos los registros de la tabla de transacciones

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject("Error retrieving transactions: " + event.target.errorCode);
        });
    });
}

export async function updateCategory(id, newName, newType) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("categories", "readwrite");
            const store = transaction.objectStore("categories");

            const category = { id, name: newName, type:newType };  // Crear el objeto actualizado
            const request = store.put(category);  // Usamos 'put' para actualizar

            request.onsuccess = () => resolve("Category updated successfully");
            request.onerror = (event) => reject("Error updating category: " + event.target.errorCode);
        });
    });
}

export async function updateGoal(id, newName, newAmount, newDate) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("goals", "readwrite");
            const store = transaction.objectStore("goals");

            const goal = { id, name: newName, amount: newAmount, date: newDate };  // Crear el objeto actualizado
            const request = store.put(goal);  // Usamos 'put' para actualizar

            request.onsuccess = () => resolve("Goal updated successfully");
            request.onerror = (event) => reject("Error updating goal: " + event.target.errorCode);
        });
    });
}

export async function updateTransaction(id, newAmount, newDate, newCategoryId, newType, newNote, newGoalId) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("transactions", "readwrite");
            const store = transaction.objectStore("transactions");

            const transactionData = { id, amount: newAmount, date: newDate, categoryId: newCategoryId, type: newType, note: newNote, goalId: newGoalId };  // Crear el objeto actualizado
            const request = store.put(transactionData);  // Usamos 'put' para actualizar

            request.onsuccess = () => resolve("Transaction updated successfully");
            request.onerror = (event) => reject("Error updating transaction: " + event.target.errorCode);
        });
    });
}

export async function deleteCategory(id) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("categories", "readwrite");
            const store = transaction.objectStore("categories");

            const request = store.delete(id);  // Usamos 'delete' para eliminar el registro

            request.onsuccess = () => resolve("Category deleted successfully");
            request.onerror = (event) => reject("Error deleting category: " + event.target.errorCode);
        });
    });
}

export async function deleteGoal(id) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("goals", "readwrite");
            const store = transaction.objectStore("goals");

            const request = store.delete(id);  // Usamos 'delete' para eliminar el registro

            request.onsuccess = () => resolve("Goal deleted successfully");
            request.onerror = (event) => reject("Error deleting goal: " + event.target.errorCode);
        });
    });
}

export async function deleteTransaction(id) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("transactions", "readwrite");
            const store = transaction.objectStore("transactions");

            const request = store.delete(id);  // Usamos 'delete' para eliminar el registro

            request.onsuccess = () => resolve("Transaction deleted successfully");
            request.onerror = (event) => reject("Error deleting transaction: " + event.target.errorCode);
        });
    });
}


openDatabase().then(db => {
    console.log("Database opened successfully", db);
}).catch(error => {
    console.error(error);
});
