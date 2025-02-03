import { Router } from '../auth/router.js';
import { LoginPage } from '../public/loginPage.js';

// function loadAppHTML() {
//     console.log("🔵 Cargando app.html...");

//         fetch('./src/app.html')
//         .then(response => response.text())
//         .then(html => {
//             // Crear un elemento temporal para procesar el HTML
//             const tempDiv = document.createElement('div');
//             tempDiv.innerHTML = html;

//             // Extraer y aplicar los estilos manualmente antes de modificar el body
//             const styles = tempDiv.querySelectorAll('link[rel="stylesheet"]');
//             const additionalStyles = [
//                 './src/css/default-styles.css',
//                 './src/assets/fonts/Poppins/fonts.css',
//                 './src/assets/icon/fonts/style.css'
//             ];

//             styles.forEach(style => {
//                 if (!document.querySelector(`link[href="${style.href}"]`)) {
//                     document.head.appendChild(style.cloneNode(true));
//                 }
//             });

//             additionalStyles.forEach(href => {
//                 if (!document.querySelector(`link[href="${href}"]`)) {
//                     const link = document.createElement('link');
//                     link.rel = 'stylesheet';
//                     link.href = href;
//                     document.head.appendChild(link);
//                 }
//             });

//             // Reemplazar el contenido del body con el HTML cargado
//             document.body.innerHTML = tempDiv.innerHTML;

//             // Forzar la recarga de estilos con un pequeño retraso
//             setTimeout(() => {
//                 document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
//                     link.href = link.href; // Esto fuerza al navegador a recargar los estilos
//                 });
//             }, 50);

//             // Asegurar que los scripts de la app se ejecuten después de inyectar el HTML
//             loadAppScripts();
//         })
//         .catch(error => console.error('Error loading app.html:', error));
    
// }

function loadAppHTML() {
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


function handlePath () {
    const path = window.location.hash
    if (path === '#app') {
        loadAppHTML()
        console.log('Cargando app.html...')
    }
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


// function init() {
//     Router.config({ mode: 'hash' })
//     .add(/login/, () => {
//         if (!sessionStorage.getItem('userSession')) {
//             LoginPage();
//         } else {
//             Router.navigate('/app'); // Redirige a app si ya hay sesión
//         }
//     })
//     .add(/app/, () => {
//         if (sessionStorage.getItem('userSession')) {
//             // loadAppHTML();  // Cargar app.html cuando la ruta es /app
//             handlePath();
//         } else {
//             Router.navigate('/login'); // Si no hay sesión, redirigir a login
//         }
//     })
//     .listen();

//     if (!sessionStorage.getItem('userSession')) {
//         console.log('No hay sesión de usuario');
//         Router.navigate('/login');  // Redirige a login si no hay sesión
//     } else {
//         Router.navigate('/app');  // Redirige a app si ya hay sesión
//         console.log('Hay sesión de usuario');
//     }

//     // Esto se asegura de que haya un hash en la URL, redirige a login si no hay
//     if (!location.hash) {
//         location.replace('#login');  // O cualquier ruta inicial que desees
//     }
// }

function init() {
    Router.config({ mode: 'hash' })
    .add(/login/, () => {
        if (!sessionStorage.getItem('userSession')) {
            LoginPage();
        } else {
            Router.navigate('/app'); // Redirige a app si ya hay sesión
        }
    })
    .add(/app/, () => {
        if (sessionStorage.getItem('userSession')) {
            loadAppHTML();  // Asegúrate de cargar app.html cuando la ruta es /app
        } else {
            Router.navigate('/login'); // Si no hay sesión, redirigir a login
        }
    })
    .listen();

    if (!sessionStorage.getItem('userSession')) {
        console.log('No hay sesión de usuario');
        Router.navigate('/login');  // Redirige a login si no hay sesión
    } else {
        Router.navigate('/app');  // Redirige a app si ya hay sesión
        console.log('Hay sesión de usuario');
    }

    // Esto se asegura de que haya un hash en la URL, redirige a login si no hay
    if (!location.hash) {
        location.replace('#login');  // O cualquier ruta inicial que desees
    }
}


globalThis.addEventListener('DOMContentLoaded', init());
