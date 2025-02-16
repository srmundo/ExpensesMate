const dbName = "FinanceDB";

function getData(userId, storeName) {
    const data = localStorage.getItem(`${dbName}_${userId}_${storeName}`);
    return data ? JSON.parse(data) : [];
}

function setData(userId, storeName, data) {
    const uniqueData = Array.from(new Set(data.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
    localStorage.setItem(`${dbName}_${userId}_${storeName}`, JSON.stringify(uniqueData));
}

export function openDatabase() {
    return Promise.resolve();
}

async function insertData(userId, storeName, data) {
    return new Promise((resolve) => {
        const storeData = getData(userId, storeName);
        data.id = storeData.length ? storeData[storeData.length - 1].id + 1 : 1;
        storeData.push(data);
        setData(userId, storeName, storeData);
        resolve("Data inserted successfully");
    });
}

export async function getBudgetTracking(userId) {
    return new Promise((resolve) => {
        const storeData = getData(userId, "budgetTracking");
        resolve(storeData);
    });
}

export async function insertBudgetTracking(userId, category, budgetedAmount, actualSpent, difference) {
    return insertData(userId, "budgetTracking", { userId, category, budgetedAmount, actualSpent, difference });
}

export async function updateBudgetTracking(userId, id, newCategory, newBudgetedAmount, newActualSpent, newDifference) {
    return new Promise((resolve, reject) => {
        const storeData = getData(userId, "budgetTracking");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData[index] = { id, userId, category: newCategory, budgetedAmount: newBudgetedAmount, actualSpent: newActualSpent, difference: newDifference };
            setData(userId, "budgetTracking", storeData);
            resolve("Budget tracking updated successfully");
        } else {
            reject("Budget tracking not found");
        }
    });
}

export async function deleteBudgetTracking(userId, id) {
    return new Promise((resolve, reject) => {
        const storeData = getData(userId, "budgetTracking");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData.splice(index, 1);
            setData(userId, "budgetTracking", storeData);
            resolve("Budget tracking deleted successfully");
        } else {
            reject("Budget tracking not found");
        }
    });
}

export function insertCategory(userId, name, type) {
    return insertData(userId, "categories", { userId, name, type });
}

export function insertGoal(userId, name, amount, currentAmount, date) {
    return insertData(userId, "goals", { userId, name, amount, currentAmount, date });
}

export function insertTransaction(userId, amount, date, categoryId, type, note, goalId) {
    return insertData(userId, "transactions", { userId, amount, date, categoryId, type, note, goalId });
}

export async function getCategories(userId) {
    return new Promise((resolve) => {
        const storeData = getData(userId, "categories");
        resolve(storeData);
    });
}

export async function getGoals(userId) {
    return new Promise((resolve) => {
        const storeData = getData(userId, "goals");
        resolve(storeData);
    });
}

export async function getTransactions(userId) {
    return new Promise((resolve) => {
        const storeData = getData(userId, "transactions");
        resolve(storeData);
    });
}

export async function updateCategory(userId, id, newName, newType) {
    return new Promise((resolve, reject) => {
        const storeData = getData(userId, "categories");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData[index] = { id, userId, name: newName, type: newType };
            setData(userId, "categories", storeData);
            resolve("Category updated successfully");
        } else {
            reject("Category not found");
        }
    });
}

export async function updateGoal(userId, id, newName, newAmount, currentAmount, newDate) {
    return new Promise((resolve, reject) => {
        const storeData = getData(userId, "goals");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData[index] = { id, userId, name: newName, amount: newAmount, currentAmount, date: newDate };
            setData(userId, "goals", storeData);
            resolve("Goal updated successfully");
        } else {
            reject("Goal not found");
        }
    });
}

export async function updateTransaction(userId, id, newAmount, newDate, newCategoryId, newType, newNote, newGoalId) {
    return new Promise((resolve, reject) => {
        const storeData = getData(userId, "transactions");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData[index] = { id, userId, amount: newAmount, date: newDate, categoryId: newCategoryId, type: newType, note: newNote, goalId: newGoalId };
            setData(userId, "transactions", storeData);
            resolve("Transaction updated successfully");
        } else {
            reject("Transaction not found");
        }
    });
}

export async function deleteCategory(userId, id) {
    return new Promise((resolve, reject) => {
        const storeData = getData(userId, "categories");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData.splice(index, 1);
            setData(userId, "categories", storeData);
            resolve("Category deleted successfully");
        } else {
            reject("Category not found");
        }
    });
}

export async function deleteGoal(userId, id) {
    return new Promise((resolve, reject) => {
        const storeData = getData(userId, "goals");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData.splice(index, 1);
            setData(userId, "goals", storeData);
            resolve("Goal deleted successfully");
        } else {
            reject("Goal not found");
        }
    });
}

export async function deleteTransaction(userId, id) {
    return new Promise((resolve, reject) => {
        const storeData = getData(userId, "transactions");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData.splice(index, 1);
            setData(userId, "transactions", storeData);
            resolve("Transaction deleted successfully");
        } else {
            reject("Transaction not found");
        }
    });
}

export async function getUsers() {
    return new Promise((resolve) => {
        const storeData = getData(null, "users");
        resolve(storeData);
    });
}

export function insertUser(name, nickname, email, password, photo) {
    return insertData(null, "users", { name, nick: nickname, email, password, photo });
}

export async function updateUser(id, newName, newNick, newEmail, newPassword, newPhoto) {
    return new Promise((resolve, reject) => {
        const storeData = getData(null, "users");
        const index = storeData.findIndex(item => item.id === id);
        if (index !== -1) {
            storeData[index] = { id, name: newName, nick: newNick, email: newEmail, password: newPassword, photo: newPhoto };
            setData(null, "users", storeData);
            resolve("User updated successfully");
        } else {
            reject("User not found");
        }
    });
}

export async function deleteUser(id) {
    return new Promise((resolve, reject) => {
        const storeData = getData(null, "users");
        const index = storeData.findIndex(item => item.id === id);
        if (index !== -1) {
            storeData.splice(index, 1);
            setData(null, "users", storeData);
            resolve("User deleted successfully");
        } else {
            reject("User not found");
        }
    });
}

export async function getCurrencySettings(userId) {
    return new Promise((resolve) => {
        const storeData = getData(userId, "currencySettings");
        resolve(storeData);
    });
}

export async function getLanguageSettings(userId) {
    return new Promise((resolve) => {
        const storeData = getData(userId, "languageSettings");
        resolve(storeData);
    });
}

export function insertCurrencySettings(userId, currency) {
    return insertData(userId, "currencySettings", { userId, currency });
}

export function insertLanguageSettings(userId, language) {
    return insertData(userId, "languageSettings", { userId, language });
}

export async function updateCurrencySettings(userId, id, newCurrency) {
    return new Promise((resolve, reject) => {
        const storeData = getData(userId, "currencySettings");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData[index] = { id, userId, currency: newCurrency };
            setData(userId, "currencySettings", storeData);
            resolve("Currency settings updated successfully");
        } else {
            reject("Currency settings not found");
        }
    });
}

export async function updateLanguageSettings(userId, id, newLanguage) {
    return new Promise((resolve, reject) => {
        const storeData = getData(userId, "languageSettings");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData[index] = { id, userId, language: newLanguage };
            setData(userId, "languageSettings", storeData);
            resolve("Language settings updated successfully");
        } else {
            reject("Language settings not found");
        }
    });
}

export async function deleteCurrencySettings(userId, id) {
    return new Promise((resolve, reject) => {
        const storeData = getData(userId, "currencySettings");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData.splice(index, 1);
            setData(userId, "currencySettings", storeData);
            resolve("Currency settings deleted successfully");
        } else {
            reject("Currency settings not found");
        }
    });
}

export async function deleteLanguageSettings(userId, id) {
    return new Promise((resolve, reject) => {
        const storeData = getData(userId, "languageSettings");
        const index = storeData.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
            storeData.splice(index, 1);
            setData(userId, "languageSettings", storeData);
            resolve("Language settings deleted successfully");
        } else {
            reject("Language settings not found");
        }
    });
}