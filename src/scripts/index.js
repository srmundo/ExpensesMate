import { Router } from '../auth/router.js';
import { LoginPage } from '../public/loginPage.js';

if (!sessionStorage.getItem('isLoggedIn')) {
    sessionStorage.setItem('isLoggedIn', 'false');
}

function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        loadAppHTML();
    } else {
        LoginPage();
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    LoginPage();
}

let init = checkLoginStatus;

// function init() {
//     // LoginPage()
      
// }

export function loadAppHTML() {
    console.log("🔵 Cargando app.html...");

        fetch('./src/app.html')
        .then(response => response.text())
        .then(html => {
            // Crear un elemento temporal para procesar el HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Extraer y aplicar los estilos manualmente antes de modificar el body
            const styles = tempDiv.querySelectorAll('link[rel="stylesheet"]');
            const additionalStyles = [
                './src/css/default-styles.css',
                './src/assets/fonts/Poppins/fonts.css',
                './src/assets/icon/fonts/style.css'
            ];

            styles.forEach(style => {
                if (!document.querySelector(`link[href="${style.href}"]`)) {
                    document.head.appendChild(style.cloneNode(true));
                }
            });

            additionalStyles.forEach(href => {
                if (!document.querySelector(`link[href="${href}"]`)) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = href;
                    document.head.appendChild(link);
                }
            });

            // Reemplazar el contenido del body con el HTML cargado
            document.body.innerHTML = tempDiv.innerHTML;

            // Forzar la recarga de estilos con un pequeño retraso
            setTimeout(() => {
                document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
                    link.href = link.href; // Esto fuerza al navegador a recargar los estilos
                });
            }, 50);

            // Asegurar que los scripts de la app se ejecuten después de inyectar el HTML
            loadAppScripts();
        })
        .catch(error => console.error('Error loading app.html:', error));
    
}


function loadAppScripts() {
    const scripts = [
        './src/lib/jspdf.umd.min.js',
        './src/lib/html2canvas.js',
        './src/lib/xlsx.full.min.js',
        './src/app.js'
    ];

    scripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'module';
        document.body.appendChild(script);
    });
}


globalThis.addEventListener('DOMContentLoaded', init);
