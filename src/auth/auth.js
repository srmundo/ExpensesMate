import { getUsers, insertUser, updateUser, deleteUser } from "../data/storage.js";
import * as storageMobile from "../data/storageMobile.js";

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

export function registerSessionData(nickname, name, password) {
    if (typeof(Storage) !== "undefined") {
        const session = {
            id: null,
            nickname: nickname,
            name: name,
            email: `${nickname}@example.com`,
            password: password,
            photo: '../src/assets/icon/avatar-boy-svgrepo-com.svg'
        };
        // const insertUserFunction = isMobileDevice() ? storageMobile.insertUser : insertUser;
        api.addUser(session.name, session.nickname, session.email, session.photo, session.password).then(() => {
            console.log('User registered successfully');
            return true;
        }).catch(error => {
            console.error('Error registering user', error);
            return false;
        });
    } else {
        console.log('Sorry, your browser does not support Web Storage...');
    }
}

export function loginSession(nickname, password) {
    if (typeof(Storage) !== "undefined") {
        // const getUsersFunction = isMobileDevice() ? storageMobile.getUsers : getUsers;
        getUsers().then(users => {
            const user = users.find(user => user.nick === nickname && user.password === password);
            console.log(user);
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
                try {
                    window.location.reload();
                } catch (error) {
                    console.error('Error reloading the page', error);
                }
                return true;
            } else {
                console.log('Invalid nickname or password');
                return false;
            }
        }).catch(error => {
            console.error('Error logging in', error);
            return false;
        });

        api.getUsers().then(users => {
            const user = users.find(user => user.nick === nickname && user.password === password);
            console.log(user);
            if (user) {
                const session = {
                    nickname: user.nick,
                    name: user.name,
                    email: user.email,
                    photo: user.photo,
                    id: user.id,
                };
                if (user) {
                    sessionStorage.setItem('session', JSON.stringify(session));
                    sessionStorage.setItem('isLoggedIn', 'true');
                }
                
                console.log('Login successful');
                try {
                    window.location.reload();
                } catch (error) {
                    console.error('Error reloading the page', error);
                }
                return true;
            } else {
                console.log('Invalid nickname or password');
                return false;
            }
        }
        ).catch(error => {
            console.error('Error logging in', error);
            return false;
        });
    } else {
        console.log('Sorry, your browser does not support Web Storage...');
        return false;
    }
}