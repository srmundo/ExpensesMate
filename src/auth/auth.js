const api = new APIClient('https://apistorageforexpensesmate.onrender.com') ;

export async function addUser(name, nick, email, photo, password){
    localStorage.setItem('userLogged', 'true');
    localStorage.setItem('userData', JSON.stringify({ name, nick, email, photo }));

    await api.addUser( name, nick, email, photo, password );
}

export async function editUser(newData) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const updatedUserData = { ...userData, ...newData };
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
}

export async function getUsers() {
    return await api.getUsers();
}