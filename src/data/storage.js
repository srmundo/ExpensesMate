const api = new APIClient('https://apistorageforexpensesmate-production.up.railway.app') ;

async function getUserByNick() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.nick) {
        throw new Error('No user data found in localStorage');
    }

    const users = await api.getUsers();
    return users.find(user => user.nick === userData.nick);
}

export async function updateUserInLocalStorage() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || !userData.nick) {
        throw new Error('No user data found in localStorage');
    }

    const userFromAPI = await getUserByNick();
    if (!userFromAPI) {
        throw new Error('User not found in API');
    }

    if (JSON.stringify(userData) !== JSON.stringify(userFromAPI)) {
        localStorage.setItem('userData', JSON.stringify(userFromAPI));
    }
}

export async function checkAndStoreTransactions() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const transactions = await api.getTransactions();
    const userTransactions = transactions.filter(transaction => transaction.userId === user.id);

    if (userTransactions.length > 0) {
        localStorage.setItem('transactions', JSON.stringify(userTransactions));
    }
}

export async function syncLocalTransactionsWithAPI() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const localTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const apiTransactions = await api.getTransactions();
    const userApiTransactions = apiTransactions.filter(transaction => transaction.userId === user.id);

    for (const localTransaction of localTransactions) {
        const existsInAPI = userApiTransactions.some(apiTransaction => apiTransaction.id === localTransaction.id);
        if (!existsInAPI) {
            await api.addTransaction(
                user.id,
                localTransaction.amount,
                localTransaction.date,
                localTransaction.category,
                localTransaction.type,
                localTransaction.note,
                localTransaction.goalId
            );
        }
    }
}

export async function checkAndStoreGoals() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const goals = await api.getGoals();
    const userGoals = goals.filter(goal => goal.userId === user.id);

    if (userGoals.length > 0) {
        localStorage.setItem('goals', JSON.stringify(userGoals));
    }
}

export async function syncLocalGoalsWithAPI() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const localGoals = JSON.parse(localStorage.getItem('goals')) || [];
    const apiGoals = await api.getGoals();
    const userApiGoals = apiGoals.filter(goal => goal.userId === user.id);

    for (const localGoal of localGoals) {
        const existsInAPI = userApiGoals.some(apiGoal => apiGoal.id === localGoal.id);
        if (!existsInAPI) {
            await api.addGoal(
                user.id,
                localGoal.name,
                localGoal.amount,
                localGoal.currentAmount,
                localGoal.date
            );
        }
    }
}

export async function addTransaction(amount, date, category, type, note, goalId) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const newTransaction = await api.addTransaction(user.id, amount, date, category, type, note, goalId);
    const userTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    userTransactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(userTransactions));
}

// export async function checkAndStoreGoals() {
//     const user = await getUserByNick();
//     if (!user || !user.id) {
//         throw new Error('User not found or invalid user ID');
//     }

//     const goals = await api.getGoals();
//     const userGoals = goals.filter(goal => goal.userId === user.id);

//     if (userGoals.length > 0) {
//         localStorage.setItem('goals', JSON.stringify(userGoals));
//     }
// }

export async function addGoal(name, amount, currentAmount, date) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const newGoal = await api.addGoal(user.id, name, amount, currentAmount, date);
    const userGoals = JSON.parse(localStorage.getItem('goals')) || [];
    userGoals.push(newGoal);
    localStorage.setItem('goals', JSON.stringify(userGoals));
}

export async function updateGoal(id, name, amount, currentAmount, date) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const updatedGoal = await api.updateGoal(id, user.id, name, amount, currentAmount, date);
    const userGoals = JSON.parse(localStorage.getItem('goals')) || [];
    const goalIndex = userGoals.findIndex(goal => goal.id === id);

    if (goalIndex !== -1) {
        userGoals[goalIndex] = updatedGoal;
        localStorage.setItem('goals', JSON.stringify(userGoals));
    } else {
        throw new Error('Goal not found in local storage');
    }
}

export async function deleteGoal(id) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    await api.deleteGoal(id);
    const userGoals = JSON.parse(localStorage.getItem('goals')) || [];
    const updatedGoals = userGoals.filter(goal => goal.id !== id);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
}

export async function checkAndStoreBudgetTracking() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const budgetTracking = await api.getBudgetTracking();
    const userBudgetTracking = budgetTracking.filter(item => item.userId === user.id);

    if (userBudgetTracking.length > 0) {
        localStorage.setItem('budgetTracking', JSON.stringify(userBudgetTracking));
    }
}

export async function syncLocalBudgetTrackingWithAPI() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const localBudgetTracking = JSON.parse(localStorage.getItem('budgetTracking')) || [];
    const apiBudgetTracking = await api.getBudgetTracking();
    const userApiBudgetTracking = apiBudgetTracking.filter(item => item.userId === user.id);

    for (const localItem of localBudgetTracking) {
        const existsInAPI = userApiBudgetTracking.some(apiItem => apiItem.id === localItem.id);
        if (!existsInAPI) {
            await api.addBudgetTracking(
                user.id,
                localItem.category,
                localItem.budgetedAmount,
                localItem.actualSpent,
                localItem.difference
            );
        }
    }
}

export async function addBudgetTracking(category, budgetedAmount, actualSpent, difference) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const newBudgetTracking = await api.addBudgetTracking(user.id, category, budgetedAmount, actualSpent, difference);
    const userBudgetTracking = JSON.parse(localStorage.getItem('budgetTracking')) || [];
    userBudgetTracking.push(newBudgetTracking);
    localStorage.setItem('budgetTracking', JSON.stringify(userBudgetTracking));
}

export async function updateBudgetTracking(id, category, budgetedAmount, actualSpent, difference) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const updatedBudgetTracking = await api.updateBudgetTracking(id, user.id, category, budgetedAmount, actualSpent, difference);
    const userBudgetTracking = JSON.parse(localStorage.getItem('budgetTracking')) || [];
    const itemIndex = userBudgetTracking.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        userBudgetTracking[itemIndex] = updatedBudgetTracking;
        localStorage.setItem('budgetTracking', JSON.stringify(userBudgetTracking));
    } else {
        throw new Error('Budget tracking item not found in local storage');
    }
}

export async function deleteBudgetTracking(id) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    await api.deleteBudgetTracking(id);
    const userBudgetTracking = JSON.parse(localStorage.getItem('budgetTracking')) || [];
    const updatedBudgetTracking = userBudgetTracking.filter(item => item.id !== id);
    localStorage.setItem('budgetTracking', JSON.stringify(updatedBudgetTracking));
}

export async function deleteTransaction(id) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    await api.deleteTransaction(id);
    const userTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const updatedTransactions = userTransactions.filter(transaction => transaction.id !== id);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
}

export async function deleteUserData() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    // Delete transactions
    const transactions = await api.getTransactions();
    const userTransactions = transactions.filter(transaction => transaction.userId === user.id);
    for (const transaction of userTransactions) {
        await api.deleteTransaction(transaction.id);
    }

    // Delete goals
    const goals = await api.getGoals();
    const userGoals = goals.filter(goal => goal.userId === user.id);
    for (const goal of userGoals) {
        await api.deleteGoal(goal.id);
    }

    // Delete budget tracking
    const budgetTracking = await api.getBudgetTracking();
    const userBudgetTracking = budgetTracking.filter(item => item.userId === user.id);
    for (const item of userBudgetTracking) {
        await api.deleteBudgetTracking(item.id);
    }

    // Delete user
    await api.deleteUser(user.id);

    // Clear local storage
    localStorage.removeItem('userData');
    localStorage.removeItem('transactions');
    localStorage.removeItem('goals');
    localStorage.removeItem('budgetTracking');
    // Delete categories
    const categories = await api.getCategories();
    const userCategories = categories.filter(category => category.userId === user.id);
    for (const category of userCategories) {
        await api.deleteCategory(category.id);
    }
}

export async function checkAndStoreCategories() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const categories = await api.getCategories();
    const userCategories = categories.filter(category => category.userId === user.id);

    const localCategories = JSON.parse(localStorage.getItem('budgetCategories')) || [];
    const newCategories = userCategories.filter(category => 
        !localCategories.some(localCategory => 
            localCategory.name === category.name && localCategory.type === category.type
        )
    );

    if (newCategories.length > 0) {
        localStorage.setItem('budgetCategories', JSON.stringify([...localCategories, ...newCategories]));
    }
}

export async function syncLocalCategoriesWithAPI() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const localCategories = JSON.parse(localStorage.getItem('budgetCategories')) || [];
    const apiCategories = await api.getCategories();
    const userApiCategories = apiCategories.filter(category => category.userId === user.id);

    for (const localCategory of localCategories) {
        const existsInAPI = userApiCategories.some(apiCategory => 
            apiCategory.name === localCategory.name && apiCategory.type === localCategory.type
        );
        if (!existsInAPI) {
            await api.addCategory(user.id, localCategory.name, localCategory.type);
        }
    }
}

export async function addCategory(name, type) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const userCategories = JSON.parse(localStorage.getItem('budgetCategories')) || [];
    const categoryExists = userCategories.some(category => category.name === name && category.type === type);

    if (categoryExists) {
        throw new Error('Category with the same name and type already exists');
    }

    const newCategory = await api.addCategory(user.id, name, type);
    userCategories.push(newCategory);
    localStorage.setItem('budgetCategories', JSON.stringify(userCategories));
}

export async function updateCategory(id, name, type) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const updatedCategory = await api.updateCategory(id, user.id, name, type);
    const userCategories = JSON.parse(localStorage.getItem('budgetCategories')) || [];
    const categoryIndex = userCategories.findIndex(category => category.id === id);

    if (categoryIndex !== -1) {
        userCategories[categoryIndex] = updatedCategory;
        localStorage.setItem('budgetCategories', JSON.stringify(userCategories));
    } else {
        throw new Error('Category not found in local storage');
    }
}

export async function deleteCategory(id) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    await api.deleteCategory(id);
    const userCategories = JSON.parse(localStorage.getItem('budgetCategories')) || [];
    const updatedCategories = userCategories.filter(category => category.id !== id);
    localStorage.setItem('budgetCategories', JSON.stringify(updatedCategories));
}