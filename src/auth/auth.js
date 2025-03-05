const api = new APIClient('https://apistorageforexpensesmate-production.up.railway.app') ;

export async function addUser(name, nick, email, photo, password){
    localStorage.setItem('userLogged', 'true');
    localStorage.setItem('userData', JSON.stringify({ name, nick, email, photo }));

    await api.addUser( name, nick, email, photo, password );
}

export async function editUser(newData) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const updatedUserData = { ...userData, ...newData };
    const { password, ...userDataWithoutPassword } = updatedUserData;
    localStorage.setItem('userData', JSON.stringify(userDataWithoutPassword));
}

export async function updateUser(newData) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const updatedUserData = { ...userData, ...newData };
    const { password, ...userDataWithoutPassword } = updatedUserData;
    localStorage.setItem('userData', JSON.stringify(userDataWithoutPassword));

    const users = await api.getUsers();
    const user = users.find(user => user.nick === userData.nick);
    const id = user ? user.id : null;
    if (!id) {
        throw new Error('User not found');
    }

    await api.updateUser(id, updatedUserData.name, updatedUserData.nick, updatedUserData.email, updatedUserData.photo, newData.password);
}

export async function getUsers() {
    return await api.getUsers();
}

export async function deleteUser(nick) {
    const users = await api.getUsers();
    const user = users.find(user => user.nick === nick);
    const id = user ? user.id : null;
    if (!id) {
        throw new Error('User not found');
    }
    await api.deleteUser(id);
    localStorage.removeItem('userLogged');
    localStorage.removeItem('userData');
}

export async function loginUser(nick, password) {
    const users = await api.getUsers();
    const user = users.find(user => user.nick === nick && user.password === password);
    if (user) {
        localStorage.setItem('userLogged', 'true');
        localStorage.setItem('userData', JSON.stringify({ name: user.name, nick: user.nick, email: user.email, photo: user.photo }));
        return true;
    }
    return false;
}

