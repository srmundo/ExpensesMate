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

        if (isMobileDevice()) {
            storageMobile.openDatabase().then(() => {
                console.log('🔵 Database opened successfully');
                storageMobile.insertUser(session.name, session.nickname, session.email, session.password, session.photo).then(() => {
                    console.log('User registered successfully');
                    storageMobile.getUsers().then(users => {
                        const user = users.find(user => user.nick === session.nickname && user.password === session.password);
                        if (user) {
                            session.id = user.id;
                            sessionStorage.setItem('session', JSON.stringify(session));
                        } else {
                            console.error('User not found after registration');
                        }
                    }).catch(error => {
                        console.error('Error retrieving user after registration', error);
                    });
                    sessionStorage.setItem('isLoggedIn', 'true');
                    try {
                        window.location.reload();
                    } catch (error) {
                        console.error('Error reloading the page', error);
                    }
                }).catch(error => {
                    console.error('Error registering user', error);
                });

        });
        }

        // const insertUserFunction = isMobileDevice() ? storageMobile.insertUser : insertUser;

        insertUser(session.name, session.nickname, session.email, session.password, session.photo).then(() => {
            console.log('User registered successfully');
            getUsers().then(users => {
                const user = users.find(user => user.nick === session.nickname && user.password === session.password);
                if (user) {
                    session.id = user.id;
                    sessionStorage.setItem('session', JSON.stringify(session));
                } else {
                    console.error('User not found after registration');
                }
            }).catch(error => {
                console.error('Error retrieving user after registration', error);
            });
            sessionStorage.setItem('isLoggedIn', 'true');
            try {
                window.location.reload();
            } catch (error) {
                console.error('Error reloading the page', error);
            }
        }).catch(error => {
            console.error('Error registering user', error);
        });
    } else {
        console.log('Sorry, your browser does not support Web Storage...');
    }
}

export function loginSession(nickname, password) {
    if (typeof(Storage) !== "undefined") {
        // const getUsersFunction = isMobileDevice() ? storageMobile.getUsers : getUsers;
        if (isMobileDevice()) {
            storageMobile.openDatabase().then(() => {
                console.log('🔵 Database opened successfully');
                storageMobile.getUsers().then(users => {
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
                    } else {
                        console.log('Invalid nickname or password');
                    }
                }).catch(error => {
                    console.error('Error logging in', error);
                });
            });
        }
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
    } else {
        console.log('Sorry, your browser does not support Web Storage...');
        return false;
    }
}