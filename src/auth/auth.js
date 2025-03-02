const api = new APIClient('https://storageexpensesmate.onrender.com');

export async function addUser(name, nick, email, photo, password){
    api.addUser(name, nick, email, photo, password);
    localStorage.setItem('userLogged', 'true');
    localStorage.setItem('userData', JSON.stringify({ name, nick, email, photo }));
}

export async function getUser(params) {
    
}