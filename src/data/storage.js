export function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("FinanceDB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Crear la tabla de usuarios
            const usersStore = db.createObjectStore("users", {
                keyPath: "id",
                autoIncrement: true
            });
            usersStore.createIndex("name", "name", { unique: false });
            usersStore.createIndex("nick", "nick", { unique: true });
            usersStore.createIndex("email", "email", { unique: true });
            usersStore.createIndex("photo", "photo", { unique: false });
            usersStore.createIndex("password", "password", { unique: false });

            // Crear la tabla de seguimiento de presupuesto
            const budgetTrackingStore = db.createObjectStore("budgetTracking", {
                keyPath: "id",
                autoIncrement: true
            });
            budgetTrackingStore.createIndex("userId", "userId", { unique: false });
            budgetTrackingStore.createIndex("category", "category", { unique: false });
            budgetTrackingStore.createIndex("budgetedAmount", "budgetedAmount", { unique: false });
            budgetTrackingStore.createIndex("actualSpent", "actualSpent", { unique: false });
            budgetTrackingStore.createIndex("difference", "difference", { unique: false });
            
            // Crear la tabla de categorías
            const categoriesStore = db.createObjectStore("categories", {
                keyPath: "id",
                autoIncrement: true
            });
            categoriesStore.createIndex("userId", "userId", { unique: false });
            categoriesStore.createIndex("name", "name", { unique: false });
            categoriesStore.createIndex("type", "type", { unique: false });
            categoriesStore.createIndex('userId_name', ['userId', 'name'], { unique: true });
            
            // Crear la tabla de metas
            const goalsStore = db.createObjectStore("goals", {
                keyPath: "id",
                autoIncrement: true
            });
            goalsStore.createIndex("userId", "userId", { unique: false });
            goalsStore.createIndex("name", "name", { unique: false });
            goalsStore.createIndex("amount", "amount", { unique: false });
            goalsStore.createIndex("currentAmount", "currentAmount", { unique: false });
            goalsStore.createIndex("date", "date", { unique: false });
            
            // Crear la tabla de transacciones
            const transactionsStore = db.createObjectStore("transactions", {
                keyPath: "id",
                autoIncrement: true
            });
            transactionsStore.createIndex("userId", "userId", { unique: false });
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

export async function getBudgetTracking(userId) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("budgetTracking", "readonly");
            const store = transaction.objectStore("budgetTracking");
            const index = store.index("userId");
            const request = index.getAll(userId);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject("Error retrieving budget tracking: " + event.target.errorCode);
        });
    });
}

export async function insertBudgetTracking(userId, category, budgetedAmount, actualSpent, difference) {
    return insertData("budgetTracking", { userId, category, budgetedAmount, actualSpent, difference });
}

export async function updateBudgetTracking(userId, id, newCategory, newBudgetedAmount, newActualSpent, newDifference) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("budgetTracking", "readwrite");
            const store = transaction.objectStore("budgetTracking");

            const budgetTracking = { id, userId, category: newCategory, budgetedAmount: newBudgetedAmount, actualSpent: newActualSpent, difference: newDifference };
            const request = store.put(budgetTracking);

            request.onsuccess = () => resolve("Budget tracking updated successfully");
            request.onerror = (event) => reject("Error updating budget tracking: " + event.target.errorCode);
        });
    });
}

export async function deleteBudgetTracking(userId, id) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("budgetTracking", "readwrite");
            const store = transaction.objectStore("budgetTracking");
            const index = store.index("userId");
            const request = index.openCursor(userId);

            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.userId === userId && cursor.value.id === id) {
                        cursor.delete();
                        resolve("Budget tracking deleted successfully");
                    } else {
                        cursor.continue();
                    }
                } else {
                    reject("Budget tracking not found");
                }
            };

            request.onerror = (event) => reject("Error deleting budget tracking: " + event.target.errorCode);
        });
    });
}

export function insertCategory(userId, name, type) {
    return insertData("categories", { userId, name, type });
}

export function insertGoal(userId, name, amount, currentAmount, date) {
    return insertData("goals", { userId, name, amount, currentAmount, date });
}

export function insertTransaction(userId, amount, date, categoryId, type, note, goalId) {
    return insertData("transactions", { userId, amount, date, categoryId, type, note, goalId });
}

export async function getCategories(userId) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("categories", "readonly");
            const store = transaction.objectStore("categories");
            const index = store.index("userId");
            const request = index.getAll(userId);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject("Error retrieving categories: " + event.target.errorCode);
        });
    });
}

export async function getGoals(userId) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("goals", "readonly");
            const store = transaction.objectStore("goals");
            const index = store.index("userId");
            const request = index.getAll(userId);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject("Error retrieving goals: " + event.target.errorCode);
        });
    });
}

export async function getTransactions(userId) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("transactions", "readonly");
            const store = transaction.objectStore("transactions");
            const index = store.index("userId");
            const request = index.getAll(userId);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject("Error retrieving transactions: " + event.target.errorCode);
        });
    });
}

export async function updateCategory(userId, id, newName, newType) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("categories", "readwrite");
            const store = transaction.objectStore("categories");

            const category = { id, userId, name: newName, type: newType };
            const request = store.put(category);

            request.onsuccess = () => resolve("Category updated successfully");
            request.onerror = (event) => reject("Error updating category: " + event.target.errorCode);
        });
    });
}

export async function updateGoal(userId, id, newName, newAmount, currentAmount, newDate) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("goals", "readwrite");
            const store = transaction.objectStore("goals");

            const goal = { id, userId, name: newName, amount: newAmount, currentAmount, date: newDate };
            const request = store.put(goal);

            request.onsuccess = () => resolve("Goal updated successfully");
            request.onerror = (event) => reject("Error updating goal: " + event.target.errorCode);
        });
    });
}

export async function updateTransaction(userId, id, newAmount, newDate, newCategoryId, newType, newNote, newGoalId) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("transactions", "readwrite");
            const store = transaction.objectStore("transactions");

            const transactionData = { id, userId, amount: newAmount, date: newDate, categoryId: newCategoryId, type: newType, note: newNote, goalId: newGoalId };
            const request = store.put(transactionData);

            request.onsuccess = () => resolve("Transaction updated successfully");
            request.onerror = (event) => reject("Error updating transaction: " + event.target.errorCode);
        });
    });
}

export async function deleteCategory(userId, id) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("categories", "readwrite");
            const store = transaction.objectStore("categories");
            const index = store.index("userId");
            const request = index.openCursor(userId);

            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.userId === userId && cursor.value.id === id) {
                        cursor.delete();
                        resolve("Category deleted successfully");
                    } else {
                        cursor.continue();
                    }
                } else {
                    reject("Category not found");
                }
            };

            request.onerror = (event) => reject("Error deleting category: " + event.target.errorCode);
        });
    });
}

export async function deleteGoal(userId, id) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("goals", "readwrite");
            const store = transaction.objectStore("goals");
            const index = store.index("userId");
            const request = index.openCursor(userId);

            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.userId === userId && cursor.value.id === id) {
                        cursor.delete();
                        resolve("Goal deleted successfully");
                    } else {
                        cursor.continue();
                    }
                } else {
                    reject("Goal not found");
                }
            };

            request.onerror = (event) => reject("Error deleting goal: " + event.target.errorCode);
        });
    });
}

export async function deleteTransaction(userId, id) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("transactions", "readwrite");
            const store = transaction.objectStore("transactions");
            const index = store.index("userId");
            const request = index.openCursor(userId);

            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.userId === userId && cursor.value.id === id) {
                        cursor.delete();
                        resolve("Transaction deleted successfully");
                    } else {
                        cursor.continue();
                    }
                } else {
                    reject("Transaction not found");
                }
            };

            request.onerror = (event) => reject("Error deleting transaction: " + event.target.errorCode);
        });
    });
}

export async function getUsers() {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("users", "readonly");
            const store = transaction.objectStore("users");
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject("Error retrieving users: " + event.target.errorCode);
        });
    });
}

export function insertUser(name, nickname, email, password, photo) {
    return insertData("users", { name, nick: nickname, email, password, photo });
}

export async function updateUser(id, newName, newNick, newEmail, newPassword, newPhoto) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("users", "readwrite");
            const store = transaction.objectStore("users");

            const user = { id, name: newName, nick: newNick, email: newEmail, password: newPassword, photo: newPhoto };
            const request = store.put(user);

            request.onsuccess = () => resolve("User updated successfully");
            request.onerror = (event) => reject("Error updating user: " + event.target.errorCode);
        });
    });
}

export async function deleteUser(id) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("users", "readwrite");
            const store = transaction.objectStore("users");

            const request = store.delete(id);

            request.onsuccess = () => resolve("User deleted successfully");
            request.onerror = (event) => reject("Error deleting user: " + event.target.errorCode);
        });
    });
}
