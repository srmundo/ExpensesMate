const dbName = "FinanceDB";

function getData(storeName) {
    const data = localStorage.getItem(`${dbName}_${storeName}`);
    return data ? JSON.parse(data) : [];
}

function setData(storeName, data) {
    localStorage.setItem(`${dbName}_${storeName}`, JSON.stringify(data));
}

export function openDatabase() {
    return Promise.resolve();
}

async function insertData(storeName, data) {
    return new Promise((resolve) => {
        const storeData = getData(storeName);
        data.id = storeData.length ? storeData[storeData.length - 1].id + 1 : 1;
        storeData.push(data);
        setData(storeName, storeData);
        resolve("Data inserted successfully");
    });
}

export async function getBudgetTracking(userId) {
    return new Promise((resolve) => {
        const storeData = getData("budgetTracking");
        resolve(storeData.filter(item => item.userId === userId));
    });
}

export async function insertBudgetTracking(userId, category, budgetedAmount, actualSpent, difference) {
    return insertData("budgetTracking", { userId, category, budgetedAmount, actualSpent, difference });
}

export async function updateBudgetTracking(userId, id, newCategory, newBudgetedAmount, newActualSpent, newDifference) {
    return new Promise((resolve, reject) => {
        const storeData = getData("budgetTracking");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData[index] = { id, userId, category: newCategory, budgetedAmount: newBudgetedAmount, actualSpent: newActualSpent, difference: newDifference };
            setData("budgetTracking", storeData);
            resolve("Budget tracking updated successfully");
        } else {
            reject("Budget tracking not found");
        }
    });
}

export async function deleteBudgetTracking(userId, id) {
    return new Promise((resolve, reject) => {
        const storeData = getData("budgetTracking");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData.splice(index, 1);
            setData("budgetTracking", storeData);
            resolve("Budget tracking deleted successfully");
        } else {
            reject("Budget tracking not found");
        }
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
    return new Promise((resolve) => {
        const storeData = getData("categories");
        resolve(storeData.filter(item => item.userId === userId));
    });
}

export async function getGoals(userId) {
    return new Promise((resolve) => {
        const storeData = getData("goals");
        resolve(storeData.filter(item => item.userId === userId));
    });
}

export async function getTransactions(userId) {
    return new Promise((resolve) => {
        const storeData = getData("transactions");
        resolve(storeData.filter(item => item.userId === userId));
    });
}

export async function updateCategory(userId, id, newName, newType) {
    return new Promise((resolve, reject) => {
        const storeData = getData("categories");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData[index] = { id, userId, name: newName, type: newType };
            setData("categories", storeData);
            resolve("Category updated successfully");
        } else {
            reject("Category not found");
        }
    });
}

export async function updateGoal(userId, id, newName, newAmount, currentAmount, newDate) {
    return new Promise((resolve, reject) => {
        const storeData = getData("goals");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData[index] = { id, userId, name: newName, amount: newAmount, currentAmount, date: newDate };
            setData("goals", storeData);
            resolve("Goal updated successfully");
        } else {
            reject("Goal not found");
        }
    });
}

export async function updateTransaction(userId, id, newAmount, newDate, newCategoryId, newType, newNote, newGoalId) {
    return new Promise((resolve, reject) => {
        const storeData = getData("transactions");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData[index] = { id, userId, amount: newAmount, date: newDate, categoryId: newCategoryId, type: newType, note: newNote, goalId: newGoalId };
            setData("transactions", storeData);
            resolve("Transaction updated successfully");
        } else {
            reject("Transaction not found");
        }
    });
}

export async function deleteCategory(userId, id) {
    return new Promise((resolve, reject) => {
        const storeData = getData("categories");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData.splice(index, 1);
            setData("categories", storeData);
            resolve("Category deleted successfully");
        } else {
            reject("Category not found");
        }
    });
}

export async function deleteGoal(userId, id) {
    return new Promise((resolve, reject) => {
        const storeData = getData("goals");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData.splice(index, 1);
            setData("goals", storeData);
            resolve("Goal deleted successfully");
        } else {
            reject("Goal not found");
        }
    });
}

export async function deleteTransaction(userId, id) {
    return new Promise((resolve, reject) => {
        const storeData = getData("transactions");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData.splice(index, 1);
            setData("transactions", storeData);
            resolve("Transaction deleted successfully");
        } else {
            reject("Transaction not found");
        }
    });
}

export async function getUsers() {
    return new Promise((resolve) => {
        const storeData = getData("users");
        resolve(storeData);
    });
}

export function insertUser(name, nickname, email, password, photo) {
    return insertData("users", { name, nick: nickname, email, password, photo });
}

export async function updateUser(id, newName, newNick, newEmail, newPassword, newPhoto) {
    return new Promise((resolve, reject) => {
        const storeData = getData("users");
        const index = storeData.findIndex(item => item.id === id);
        if (index !== -1) {
            storeData[index] = { id, name: newName, nick: newNick, email: newEmail, password: newPassword, photo: newPhoto };
            setData("users", storeData);
            resolve("User updated successfully");
        } else {
            reject("User not found");
        }
    });
}

export async function deleteUser(id) {
    return new Promise((resolve, reject) => {
        const storeData = getData("users");
        const index = storeData.findIndex(item => item.id === id);
        if (index !== -1) {
            storeData.splice(index, 1);
            setData("users", storeData);
            resolve("User deleted successfully");
        } else {
            reject("User not found");
        }
    });
}