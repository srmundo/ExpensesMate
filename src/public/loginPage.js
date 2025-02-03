import { Router } from '../auth/router.js';
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
            <input type="text" id="nicknameOrEmail" name="nicknameOrEmail" placeholder="Nickname or Email" required>
            <br>
            <input type="password" id="password" name="password" placeholder="Password" required>
            <br>
            <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="#" id="showRegisterForm">Register</a></p>
        `;
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            // Aquí iría la lógica de autenticación
            sessionStorage.setItem('userSession', 'true');
            Router.navigate('/app');
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
            <input type="email" id="email" name="email" placeholder="Email" required>
            <br>
            <input type="password" id="password" name="password" placeholder="Password" required>
            <br>
            <input type="password" id="repeatPassword" name="repeatPassword" placeholder="Repeat Password" required>
            <br>
            <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="#" id="showLoginForm">Login</a></p>
        `;

        document.getElementById('registerForm').addEventListener('submit', function(event) {
            event.preventDefault();
            // Aquí iría la lógica de registro
            console.log('Registering user...');
            sessionStorage.setItem('userSession', 'true');
            Router.navigate('/app');
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
