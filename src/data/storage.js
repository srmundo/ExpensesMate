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

export async function checkAndStoreNotifications() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const notifications = await api.getNotifications();
    const userNotifications = notifications.filter(notification => notification.userId === user.id);

    if (userNotifications.length > 0) {
        localStorage.setItem('notifications', JSON.stringify(userNotifications));
    }
}

export async function syncLocalNotificationsWithAPI() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const localNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const apiNotifications = await api.getNotifications();
    const userApiNotifications = apiNotifications.filter(notification => notification.userId === user.id);

    for (const localNotification of localNotifications) {
        const existsInAPI = userApiNotifications.some(apiNotification => apiNotification.id === localNotification.id);
        if (!existsInAPI) {
            await api.addNotification(
                user.id,
                localNotification.date,
                localNotification.exec,
                localNotification.functionName,
                localNotification.message,
                localNotification.view
            );
        }
    }
}

export async function addNotification(date, exec, functionName, message, view) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const newNotification = await api.addNotification(user.id, date, exec, functionName, message, view);
    const userNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    userNotifications.push(newNotification);
    localStorage.setItem('notifications', JSON.stringify(userNotifications));
}

export async function updateNotification(id, date, exec, functionName, message, view) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const updatedNotification = await api.updateNotification(id, user.id, date, exec, functionName, message, view);
    const userNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const notificationIndex = userNotifications.findIndex(notification => notification.id === id);

    if (notificationIndex !== -1) {
        userNotifications[notificationIndex] = updatedNotification;
        localStorage.setItem('notifications', JSON.stringify(userNotifications));
    } else {
        throw new Error('Notification not found in local storage');
    }
}

export async function deleteNotification(id) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    await api.deleteNotification(id);
    const userNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const updatedNotifications = userNotifications.filter(notification => notification.id !== id);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
}

export async function getNotificationFrequency() {
    return api.getNotificationFrequency();
}

export async function addNotificationFrequency(frequency) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const newFrequency = await api.addNotificationFrequency(user.id, frequency);
    const userFrequencies = JSON.parse(localStorage.getItem('notificationFrequencies')) || [];
    userFrequencies.push(newFrequency);
    localStorage.setItem('notificationFrequencies', JSON.stringify(userFrequencies));
}

export async function updateNotificationFrequency(id, frequency) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const updatedFrequency = await api.updateNotificationFrequency(id, user.id, frequency);
    const userFrequencies = JSON.parse(localStorage.getItem('notificationFrequencies')) || [];
    const frequencyIndex = userFrequencies.findIndex(f => f.id === id);

    if (frequencyIndex !== -1) {
        userFrequencies[frequencyIndex] = updatedFrequency;
        localStorage.setItem('notificationFrequencies', JSON.stringify(userFrequencies));
    } else {
        throw new Error('Notification frequency not found in local storage');
    }
}

export async function deleteNotificationFrequency(id) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    await api.deleteNotificationFrequency(id);
    const userFrequencies = JSON.parse(localStorage.getItem('notificationFrequencies')) || [];
    const updatedFrequencies = userFrequencies.filter(f => f.id !== id);
    localStorage.setItem('notificationFrequencies', JSON.stringify(updatedFrequencies));
}

export async function getNotificationFrequencyById(id) {
    return api.getNotificationFrequencyById(id);
}

export async function getNotificationPreferences() {
    return api.getNotificationPreferences();
}

export async function addNotificationPreferences(notifyBudgetTracking, notifyGoals, notifyOverspending, notifyTopCategories) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const newPreferences = await api.addNotificationPreferences(user.id, notifyBudgetTracking, notifyGoals, notifyOverspending, notifyTopCategories);
    const userPreferences = JSON.parse(localStorage.getItem('notificationPreferences')) || [];
    userPreferences.push(newPreferences);
    localStorage.setItem('notificationPreferences', JSON.stringify(userPreferences));
}

export async function updateNotificationPreferences(id, notifyBudgetTracking, notifyGoals, notifyOverspending, notifyTopCategories) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const updatedPreferences = await api.updateNotificationPreferences(id, user.id, notifyBudgetTracking, notifyGoals, notifyOverspending, notifyTopCategories);
    const userPreferences = JSON.parse(localStorage.getItem('notificationPreferences')) || [];
    const preferencesIndex = userPreferences.findIndex(p => p.id === id);

    if (preferencesIndex !== -1) {
        userPreferences[preferencesIndex] = updatedPreferences;
        localStorage.setItem('notificationPreferences', JSON.stringify(userPreferences));
    } else {
        throw new Error('Notification preferences not found in local storage');
    }
}

export async function deleteNotificationPreferences(id) {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    await api.deleteNotificationPreferences(id);
    const userPreferences = JSON.parse(localStorage.getItem('notificationPreferences')) || [];
    const updatedPreferences = userPreferences.filter(p => p.id !== id);
    localStorage.setItem('notificationPreferences', JSON.stringify(updatedPreferences));
}

export async function getNotificationPreferencesById(id) {
    return api.getNotificationPreferencesById(id);
}

export async function syncLocalNotificationFrequenciesWithAPI() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const localFrequencies = JSON.parse(localStorage.getItem('notificationFrequency')) || [];
    const apiFrequencies = await api.getNotificationFrequency();
    const userApiFrequencies = apiFrequencies.filter(frequency => frequency.userId === user.id);

    if (userApiFrequencies.length === 0) {
        for (const key in localFrequencies) {
            if (localFrequencies.hasOwnProperty(key)) {
                const localFrequency = localFrequencies[key];
                await api.addNotificationFrequency(user.id, localFrequency);
            }
        }
    } else {
        console.log('User already has notification frequencies in the API');
    }
}

export async function syncApiNotificationFrequenciesWithLocal() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const apiFrequencies = await api.getNotificationFrequency();
    const userApiFrequencies = apiFrequencies.filter(frequency => frequency.userId === user.id);

    localStorage.setItem('notificationFrequency', JSON.stringify(userApiFrequencies));
}

export async function syncApiNotificationPreferencesWithLocal() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const apiPreferences = await api.getNotificationPreferences();
    const userApiPreferences = apiPreferences.filter(preference => preference.userId === user.id);

    const booleanPreferences = userApiPreferences.map(preference => ({
        ...preference,
        notifyBudgetTracking: !!preference.notifyBudgetTracking,
        notifyGoals: !!preference.notifyGoals,
        notifyOverspending: !!preference.notifyOverspending,
        notifyTopCategories: !!preference.notifyTopCategories
    }));

    localStorage.setItem('notificationPreferences', JSON.stringify(booleanPreferences));
}

export async function syncLocalNotificationPreferencesWithAPI() {
    const user = await getUserByNick();
    if (!user || !user.id) {
        throw new Error('User not found or invalid user ID');
    }

    const localPreferences = JSON.parse(localStorage.getItem('notificationPreferences')) || {};
    console.log(localPreferences);
    const apiPreferences = await api.getNotificationPreferences();
    const userApiPreferences = apiPreferences.filter(preference => preference.userId === user.id);

    if (userApiPreferences.length === 0) {
        await api.addNotificationPreferences(
            user.id,
            localPreferences.notifyBudgetTracking,
            localPreferences.notifyGoals,
            localPreferences.notifyOverspending,
            localPreferences.notifyTopCategories
        );
    } else {
        console.log('User already has notification preferences in the API');
    }
}
