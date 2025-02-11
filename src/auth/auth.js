export function registerSessionData(nickname, password) {
    if (typeof(Storage) !== "undefined") {
        const session = {
            nickname: nickname,
            password: password,
            photo: '../src/assets/icon/avatar-boy-svgrepo-com.svg'
        };
        sessionStorage.setItem('session', JSON.stringify(session));
        console.log('Data registered in session storage');
    } else {
        console.log('Sorry, your browser does not support Web Storage...');
    }
}

export function loginSession(nickname, password) {
    if (typeof(Storage) !== "undefined") {
        const session = JSON.parse(sessionStorage.getItem('session'));
        if (session && session.nickname === nickname && session.password === password) {
            console.log('Login successful');
            sessionStorage.setItem('isLoggedIn', true);
            window.location.reload();
            return true;
        } else {
            console.log('Invalid nickname or password');
            return false;
        }
    } else {
        console.log('Sorry, your browser does not support Web Storage...');
        return false;
    }
}