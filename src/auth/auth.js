import { getUsers, insertUser, updateUser, deleteUser } from "../data/storage.js";
export function registerSessionData(nickname, name, password) {
    if (typeof(Storage) !== "undefined") {
        const session = {
            nickname: nickname,
            name: name,
            email: `${nickname}@example.com`,
            password: password,
            photo: '../src/assets/icon/avatar-boy-svgrepo-com.svg'
        };
        insertUser(session.name, session.nickname, session.email, session.password, session.photo).then(() => {
            console.log('User registered successfully');
        }).catch(error => {
            console.error('Error registering user', error);
        });
    } else {
        console.log('Sorry, your browser does not support Web Storage...');
    }
}

export function loginSession(nickname, password) {
    if (typeof(Storage) !== "undefined") {
        getUsers().then(users => {
            const user = users.find(user => user.nick === nickname && user.password === password);
            console.log(user)
            if (user) {
                const session = {
                    nickname: user.nick,
                    name: user.name,
                    email: user.email,
                    photo: user.photo,
                    id: user.id,
                };
                sessionStorage.setItem('session', JSON.stringify(session));
                if (sessionStorage.getItem('session')) {
                    sessionStorage.setItem('isLoggedIn', 'true');
                }
                
                console.log('Login successful');
                window.location.reload();
                return true;
            } else {
                console.log('Invalid nickname or password');
                return false;
            }
        }).catch(error => {
            console.error('Error logging in', error);
            return false;
        });
    } else {
        console.log('Sorry, your browser does not support Web Storage...');
        return false;
    }
}