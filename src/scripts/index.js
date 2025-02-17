/** @format */
// import { Router } from '../auth/router.js';
import { LoginPage } from '../public/loginPage.js';
import { openDatabase, insertCategory, insertCurrencyConfig, getCurrencyConfig } from '../data/storage.js';
import * as storageMobile from '../data/storageMobile.js';

if (!sessionStorage.getItem('isLoggedIn')) {
	sessionStorage.setItem('isLoggedIn', 'false');
}

const categories = {
		Income: [
		  "Salary",
		  "Additional income",
		  "Other income"
		],
		Expense: [
		  "Rent or Mortgage",
		  "Utilities",
		  "Internet and phone",
		  "Insurance",
		  "Taxes",
		  "Transportation",
		  "Education",
		  "Subscriptions",
		  "Food",
		  "Health and wellness",
		  "Clothing and accessories",
		  "Entertainment",
		  "Gifts and celebrations",
		  "Travel and vacations",
		  "Pets",
		  "Personal expenses",
		  "Personal loan payments",
		  "Credit card debt",
		  "Student loans",
		  "Other debts",
		  "Donations and charity",
		  "Unexpected expenses",
		  "Emergency savings",
		  "Savings for specific goals",
		  "Investments"
		]
	  };

	  async function insertCategories(userId) {
		for (const type in categories) {
			for (const name of categories[type]) {
				await insertCategory(userId, name, type);
			}
		}
	}

	async function insertUSDCurrency(userId) {
		try {
			const usdCurrency = 'USD';
			if (usdCurrency) {
					await insertCurrencyConfig(userId, usdCurrency);
				
				console.log('USD currency inserted successfully');
			} else {
				console.error('USD currency not found in currency data');
			}
		} catch (error) {
			console.error(`Error inserting USD currency for user ${userId}:`, error);
		}
	}

async function checkLoginStatus() {
	const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
	const session = sessionStorage.getItem("session");
	if (isLoggedIn && session) {
		loadAppHTML();

		openDatabase();
		const sessionId = JSON.parse(session).id;

		insertCategories(sessionId).then(null).catch(()=>null);

		getCurrencyConfig(sessionId).then((currencyConfig) => {
			if (!currencyConfig || currencyConfig.length === 0) {
				insertUSDCurrency(sessionId);
			} else {
				console.log('Currency data already exists for user:', sessionId);
			}
		}).catch((error) => {
			console.error('Error checking currency config:', error);
		});
		
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

			const userSession = JSON.parse(sessionStorage.getItem('session'));


            // Crear el menú flotante
            const profileMenu  = `
                <div class="menuFloatOptionsNone">
                    <div class="profile-header">
                    <img src="" alt="User Photo" class="profile-photo">
                    <div class="profile-info">
                        <p class="profile-name"></p>
                        <p class="profile-nick"></p>
                    </div>
                </div>
                <div class="profile-actions">
                    <button id="btnLogout">Logout</button>
                </div>
                </div>
            `;

			

            const contMenuFloatOptions = document.getElementById('cont-btn-propile-nav');
            contMenuFloatOptions.innerHTML += profileMenu;

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

    		if (userSession && userSession.photo) {
    		    const imgProfile = document.querySelector('.profile-photo');
    		    imgProfile.src = userSession.photo;
    		}

			if(userSession && userSession.name){
				const nameProfile = document.querySelector('.profile-name');
    		    nameProfile.innerHTML = userSession.name;
			}

			if(userSession && userSession.nickname){
				const nickProfile = document.querySelector('.profile-nick');
    		    nickProfile.innerHTML = userSession.nickname;
			}

		})
		.catch((error) => console.error('Error loading app.html:', error));
}

function loadAppScripts() {
	const scripts = [
		'./src/lib/jspdf.umd.min.js',
		'./src/lib/jspdf.plugin.autotable.min.js',
		'./src/lib/html2pdf.bundle.min.js',
		'./src/lib/html2canvas.js',
		'./src/lib/exceljs.min.js',
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

globalThis.addEventListener('DOMContentLoaded', init());
