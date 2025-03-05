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