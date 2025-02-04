/** @format */

import { Router } from '../auth/router.js';
import { LoginPage } from '../public/loginPage.js';
// import { logoutUser } from '../auth/supabase.js';

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
	window.location.reload();
}
function logoutUser() {
    sessionStorage.setItem('isLoggedIn', 'false');
    logout();
}
let init = checkLoginStatus;

// function init() {
//     // LoginPage()

// }

export function loadAppHTML() {
	console.log('🔵 Cargando app.html...');

	fetch('./src/app.html')
		.then((response) => response.text())
		.then((html) => {
			// Crear un elemento temporal para procesar el HTML
			const tempDiv = document.createElement('div');
			tempDiv.innerHTML = html;

			// Extraer y aplicar los estilos manualmente antes de modificar el body
			const styles = tempDiv.querySelectorAll('link[rel="stylesheet"]');
			const additionalStyles = [
				'./src/css/default-styles.css',
				'./src/assets/fonts/Poppins/fonts.css',
				'./src/assets/icon/fonts/style.css',
			];

			styles.forEach((style) => {
				if (!document.querySelector(`link[href="${style.href}"]`)) {
					document.head.appendChild(style.cloneNode(true));
				}
			});

			additionalStyles.forEach((href) => {
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
				document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
					link.href = link.href; // Esto fuerza al navegador a recargar los estilos
				});
			}, 50);

			// Asegurar que los scripts de la app se ejecuten después de inyectar el HTML
			loadAppScripts();

            // Crear el menú flotante
            const profileMenu  = `
                <div class="menuFloatOptionsNone">
                    <div class="profile-header">
                    <img src="" alt="User Photo" class="profile-photo">
                    <div class="profile-info">
                        <p class="profile-name">John Doe</p>
                        <p class="profile-email">john.doe@example.com</p>
                    </div>
                </div>
                <div class="profile-actions">
                    <button id="btnProfile">Profile</button>
                    <button id="btnLogout">Logout</button>
                </div>
                </div>
            `;

            const contMenuFloatOptions = document.getElementById('cont-btn-propile-nav');
            contMenuFloatOptions.innerHTML += profileMenu;
            console.log(contMenuFloatOptions);

            // // Añadir eventos a los botones del menú
            // document.getElementById('btnProfile').addEventListener('click', () => {
            //     console.log('🔵 Profile button clicked');
            //     // Aquí puedes añadir la lógica para abrir la página de perfil
            // });

            document.getElementById('btnLogout').addEventListener('click', () => {
                console.log('🔵 Logout button clicked');
                logoutUser();
            });
            const menu = document.querySelector('.menuFloatOptionsNone');

            document.getElementById('btnProfileOpt').addEventListener('click', () => {
                if (menu.classList.contains('menuFloatOptions')) {
                    menu.classList.remove('menuFloatOptions');
                    menu.classList.add('menuFloatOptionsNone');
                } else {
                    menu.classList.remove('menuFloatOptionsNone');
                    menu.classList.add('menuFloatOptions');
                }
            anime({
                targets: menu,
                opacity: [0, 1],
                translateY: [-20, 0],
                duration: 500,
                easing: 'easeOutQuad'
            });
            });


		})
		.catch((error) => console.error('Error loading app.html:', error));
}

function loadAppScripts() {
	const scripts = [
		'./src/lib/jspdf.umd.min.js',
		'./src/lib/html2canvas.js',
		'./src/lib/xlsx.full.min.js',
		'./src/app.js',
	];

	scripts.forEach((src) => {
		const script = document.createElement('script');
		script.src = src;
		script.type = 'module';
		document.body.appendChild(script);
	});
}

globalThis.addEventListener('DOMContentLoaded', init);
