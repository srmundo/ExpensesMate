import { loadAppHTML } from "../scripts/index.js";
import { registerSessionData, loginSession } from "../auth/auth.js";
import { getUsers } from "../data/storage.js";
export const LoginPage = function() {
    const app = document.getElementById('app');
    const style = document.createElement('style');
    style.innerHTML = `
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
        }
        #app {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
        }
        h2 {
            margin-top: 0;
        }
        form {
            display: flex;
            flex-direction: column;
        }
        label {
            margin-top: 10px;
        }
        input {
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            margin-top: 20px;
            padding: 10px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #218838;
        }
        p {
            margin-top: 20px;
            text-align: center;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
            h1 {
                font-size: 2em;
                color: #333;
                text-align: center;
                margin-bottom: 20px;
            }
    `;
    document.head.appendChild(style);
    function createLoginForm() {
        app.innerHTML = `
            <h2>ExpensesMate</h2>
            <form id="loginForm">
            <h4>Login</h4>
            <input type="text" id="nicknameOrEmail" name="nicknameOrEmail" placeholder="Nickname" required>
            <br>
            <input type="password" id="password" name="password" placeholder="Password" required>
            <br>
            <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="#" id="showRegisterForm">Register</a></p>
        `;
        // document.getElementById('loginForm').addEventListener('submit', function(event) {
        //     event.preventDefault();
        //     const nicknameOrEmail = document.getElementById('nicknameOrEmail').value;
        //     const password = document.getElementById('password').value;

        //     // Simulate authentication logic
        //     const storedUser = JSON.parse(sessionStorage.getItem('userSession'));
        //     if (storedUser && storedUser.nicknameOrEmail === nicknameOrEmail && storedUser.password === password) {
        //     console.log('Login successful');
        //     sessionStorage.setItem('isLoggedIn', 'true');
        //     loadAppHTML()
        //     window.location.reload();
        //     } else {
        //     console.log('Invalid credentials');
        //     alert('Invalid nickname/email or password. Please try again.');
        //     }
        // });

        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('nicknameOrEmail').value;
            const password = document.getElementById('password').value;

            loginSession(name, password);
        });

        document.getElementById('showRegisterForm').addEventListener('click', function(event) {
            event.preventDefault();
            anime({
                targets: '#app',
                translateY: ['0%', '-100%'],
                opacity: [1, 0],
                duration: 500,
                easing: 'easeInOutSine',
                complete: function() {
                    createRegisterForm();
                    anime({
                        targets: '#app',
                        translateY: ['100%', '0%'],
                        opacity: [0, 1],
                        duration: 500,
                        easing: 'easeInOutSine'
                    });
                }
            });
            // createRegisterForm();
            
    
        });
    }

    function createRegisterForm() {
        app.innerHTML = `
            <h2>ExpensesMate</h2>
            <form id="registerForm">
            <h4>Register</h4>
            <input type="text" id="nickname" name="nickname" placeholder="Nickname" required>
            <br>
            <input type="text" id="name" name="name" placeholder="Full name" required>
            <br>
            <input type="password" id="password" name="password" placeholder="Password" required>
            <br>
            <input type="password" id="repeatPassword" name="repeatPassword" placeholder="Repeat Password" required>
            <br>
            <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="#" id="showLoginForm">Login</a></p>
        `;

        // document.getElementById('registerForm').addEventListener('submit', function(event) {
        //     event.preventDefault();
        //     const nickname = document.getElementById('nickname').value;
        //     const email = document.getElementById('email').value;
        //     const password = document.getElementById('password').value;
        //     const repeatPassword = document.getElementById('repeatPassword').value;

        //     if (password !== repeatPassword) {
        //     alert('Passwords do not match. Please try again.');
        //     return;
        //     }

        //     const newUser = {
        //     photo: '../src/assets/icon/avatar-boy-svgrepo-com.svg',
        //     nicknameOrEmail: nickname,
        //     email: email,
        //     password: password
        //     };

        //     sessionStorage.setItem('userSession', JSON.stringify(newUser));
        //     console.log('User registered successfully');
        //     // loadAppHTML();
        //     alert('Registration successful. You can now log in.');
        //     createLoginForm();
        // });

        document.getElementById('registerForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('nickname').value;
            const fullName = document.getElementById('name').value;
            const password = document.getElementById('password').value;
            const repeatPassword = document.getElementById('repeatPassword').value;
            const photo = '../src/assets/icon/avatar-boy-svgrepo-com.svg'; // Imagen por defecto
        
            if (password !== repeatPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            registerSessionData(name, fullName, password);

        
            createLoginForm();
        });
        
        document.getElementById('showLoginForm').addEventListener('click', function(event) {
            event.preventDefault();
            anime({
                targets: '#app',
                translateY: ['0%', '-100%'],
                opacity: [1, 0],
                duration: 500,
                easing: 'easeInOutSine',
                complete: function() {
                    createLoginForm();
                    anime({
                        targets: '#app',
                        translateY: ['100%', '0%'],
                        opacity: [0, 1],
                        duration: 500,
                        easing: 'easeInOutSine'
                    });
                }
            });
            // createLoginForm();
            
    
        });
    }

    createLoginForm();
};
