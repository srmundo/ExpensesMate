import { LoginPage } from "../public/loginPage.js";
import { addCategory, checkAndStoreCategories, syncLocalCategoriesWithAPI } from "../data/storage.js";
import { notify } from "./notifications.js";
// import { checkNotifications, checkUnviewedNotifications } from "../views/settings.js";
if (localStorage.getItem("currency") === null) {
	localStorage.setItem("currency", JSON.stringify({ symbol: "$", name: "USD" }));
}
if (localStorage.getItem("language") === null) {
  localStorage.setItem("language", JSON.stringify({ lang: "en" }));
}
const language = JSON.parse(localStorage.getItem("language")).lang;
let languageData = {};

if (localStorage.getItem("notifications") === null) {
  localStorage.setItem("notifications", JSON.stringify([]));
}

const budgetCategories = [
  {
    type: "income",
    name: "Salary",
    description: "Income from a regular job or employment.",
  },
  {
    type: "income",
    name: "Freelance",
    description: "Income from freelance or self-employment work.",
  },
  {
    type: "income",
    name: "Investments",
    description: "Income from investments like stocks, bonds, or dividends.",
  },
  {
    type: "income",
    name: "Other Income",
    description: "Any other form of income not categorized elsewhere.",
  },
  {
    type: "expense",
    name: "Housing",
    description: "Rent, mortgage payments, and home maintenance.",
  },
  {
    type: "expense",
    name: "Food",
    description: "Groceries, dining out, and other food-related expenses.",
  },
  {
    type: "expense",
    name: "Transportation",
    description: "Public transportation, fuel, car maintenance, and parking.",
  },
  {
    type: "expense",
    name: "Utilities",
    description: "Electricity, water, gas, internet, and other essential services.",
  },
  {
    type: "expense",
    name: "Healthcare",
    description: "Medical expenses, health insurance, prescriptions, and treatments.",
  },
  {
    type: "expense",
    name: "Education",
    description: "Tuition fees, books, courses, and other educational costs.",
  },
  {
    type: "expense",
    name: "Entertainment",
    description: "Movies, concerts, subscriptions to streaming services, hobbies.",
  },
  {
    type: "expense",
    name: "Savings",
    description: "Money set aside for future savings or investments.",
  },
  {
    type: "expense",
    name: "Debt Repayments",
    description: "Payments for loans, credit cards, mortgages, and other debts.",
  },
  {
    type: "expense",
    name: "Other Expenses",
    description: "Expenses that don't fit into the above categories.",
  },
];




// checkNotifications();

checkAndStoreCategories();

function init() {
  const loader = document.getElementById("loader");
  
  const userLogged = localStorage.getItem("userLogged");

  if (userLogged === null) {
    localStorage.setItem("userLogged", "false");
    LoginPage();
  } else if (userLogged === "true") {
    loadAppHTML();
    
  } else {
    LoginPage();
  }
}

export async function loadAppHTML() {

  syncLocalCategoriesWithAPI();

  try {
    budgetCategories.forEach(category => {
      addCategory(category.name, category.type);
    });
  } catch (error) {
    
  }

  setTimeout(() => {
    const loader = document.getElementById('loader2');
    if (loader) {
        loader.style.display = 'none';
    }
  }, 2000);

  fetch("./src/app.html")
    .then((response) => response.text())
    .then((html) => {
      // Crear un elemento temporal para procesar el HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      tempDiv.innerHTML += '<div id="loader2"><h2>Expenses open</h2><div class="bars2"></div><h4>Loading...</h4></div>';
      // Extraer y aplicar los estilos manualmente antes de modificar el body
      const styles = tempDiv.querySelectorAll('link[rel="stylesheet"]');
      const additionalStyles = [
        "./src/css/default-styles.css",
        "./src/assets/fonts/Poppins/fonts.css",
        "./src/assets/icon/fonts/style.css",
      ];

      styles.forEach((style) => {
        if (!document.querySelector(`link[href="${style.href}"]`)) {
          document.head.appendChild(style.cloneNode(true));
        }
      });

      additionalStyles.forEach((href) => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = href;
          document.head.appendChild(link);
        }
      });

      document.body.innerHTML = tempDiv.innerHTML;

      // Forzar la recarga de estilos con un pequeño retraso
      setTimeout(() => {
        document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
          link.href = link.href; // Esto fuerza al navegador a recargar los estilos
        });
      }, 10);

      // Asegurar que los scripts de la app se ejecuten después de inyectar el HTML
      loadAppScripts();

      const windowNotification = document.querySelector(".notification-window");

      windowNotification.style.display = "none";

      function toggleNotificationWindow(e) {
        e.stopPropagation();
        const windowNotification = document.querySelector(".notification-window");
        const isMobile = window.innerWidth <= 768;



        if (windowNotification.style.display === "none" || windowNotification.style.display === "") {
          windowNotification.style.display = "block";
          notify();
          if (isMobile) {
            anime({
              targets: windowNotification,
              translateX: [-windowNotification.offsetWidth, 0],
              duration: 500,
              easing: "easeOutQuad",
            });
          } else {
            anime({
              targets: windowNotification,
              opacity: [0, 1],
              duration: 500,
              easing: "easeOutQuad",
            });
          }
        } else {
          if (isMobile) {
            anime({
              targets: windowNotification,
              translateX: [0, -windowNotification.offsetWidth],
              duration: 500,
              easing: "easeOutQuad",
              complete: () => {
                windowNotification.style.display = "none";
              },
            });
          } else {
            anime({
              targets: windowNotification,
              opacity: [1, 0],
              duration: 500,
              easing: "easeOutQuad",
              complete: () => {
                windowNotification.style.display = "none";
              },
            });
          }
        }
      }

      document.getElementById("btnNotification").addEventListener("click", toggleNotificationWindow);

      document.addEventListener("click", (e) => {
        const windowNotification = document.querySelector(".notification-window");
        const btnNotification = document.getElementById("btnNotification");

        if (windowNotification.style.display === "block" && !btnNotification.contains(e.target) && !windowNotification.contains(e.target)) {
          const isMobile = window.innerWidth <= 768;

          if (isMobile) {
            anime({
              targets: windowNotification,
              translateX: [0, -windowNotification.offsetWidth],
              duration: 500,
              easing: "easeOutQuad",
              complete: () => {
                windowNotification.style.display = "none";
              },
            });
          } else {
            anime({
              targets: windowNotification,
              opacity: [1, 0],
              duration: 500,
              easing: "easeOutQuad",
              complete: () => {
                windowNotification.style.display = "none";
              },
            });
          }
        }
      });

      document.getElementById("btnBack").addEventListener("click", () => {
        const windowNotification = document.querySelector(".notification-window");
        windowNotification.style.display = "none";
        
      });

      document.getElementById("btnCloseNotification").addEventListener("click", () => {
        const windowNotification = document.querySelector(".notification-window");
        windowNotification.style.display = "none";
      });

      // const btnDropNotification = document.getElementById("btnDropNotification");
      // btnDropNotification.style.display = "none";
      // const notifications = JSON.parse(localStorage.getItem("notifications"));
      // if (notifications.length > 0) {
      //   const btnDropNotification = document.getElementById("btnDropNotification");
      //   btnDropNotification.style.display = "block";
      //   btnDropNotification.addEventListener("click", () => {
      //     localStorage.setItem("notifications", JSON.stringify([]));
      //     windowNotification.style.display = "none";
      //   });
      // }

      const userSession = JSON.parse(localStorage.getItem("userData"));

      // Crear el menú flotante
      const profileMenu = `
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

      const contMenuFloatOptions = document.getElementById(
        "cont-btn-propile-nav"
      );
      contMenuFloatOptions.innerHTML += profileMenu;

      if (language === "en") {
        fetch("../src/locale/lang/en.json")
          .then((response) => response.json())
          .then((data) => {
            languageData = data;
            document.getElementById("btnLogout").innerText = languageData.profile.actions.logout;
            // You can use the fetched data here
          })
          .catch((error) => console.error("Error fetching language file:", error));
      } else if (language === "es") {
        fetch("../src/locale/lang/es.json")
          .then((response) => response.json())
          .then((data) => {
            languageData = data;
            document.getElementById("btnLogout").innerText = languageData.profile.actions.logout;
            // You can use the fetched data here
          })
          .catch((error) => console.error("Error fetching language file:", error));
      } else if (language === "pt") {
        fetch("../src/locale/lang/pt.json")
          .then((response) => response.json())
          .then((data) => {
            languageData = data;
            // You can use the fetched data here
          })
          .catch((error) => console.error("Error fetching language file:", error));
      }

      document.getElementById("btnLogout").addEventListener("click", () => {
        console.log("🔵 Logout button clicked");
      });
      const menu = document.querySelector(".menuFloatOptionsNone");

      document.getElementById("btnProfileOpt").addEventListener("click", () => {
        if (menu.classList.contains("menuFloatOptions")) {
          menu.classList.remove("menuFloatOptions");
          menu.classList.add("menuFloatOptionsNone");
        } else {
          menu.classList.remove("menuFloatOptionsNone");
          menu.classList.add("menuFloatOptions");
        }
        anime({
          targets: menu,
          opacity: [0, 1],
          duration: 500,
          easing: "easeOutQuad",
        });
      });

      document.addEventListener("click", (event) => {
        const menu = document.querySelector(".menuFloatOptions");
        const btnProfileOpt = document.getElementById("btnProfileOpt");

        if (menu && !btnProfileOpt.contains(event.target) && !menu.contains(event.target)) {
          menu.classList.remove("menuFloatOptions");
          menu.classList.add("menuFloatOptionsNone");
        }
      });


        const imgProfile = document.querySelector(".profile-photo");
        imgProfile.src = userSession.photo;
        const nameProfile = document.querySelector(".profile-name");
        nameProfile.innerHTML = userSession.name;
        const nickProfile = document.querySelector(".profile-nick");
        nickProfile.innerHTML = userSession.nick;

        function logout() {
          localStorage.removeItem("userLogged");
          localStorage.removeItem("userData");
          localStorage.removeItem('currency');
          localStorage.removeItem('budgetCategories');
          localStorage.clear();
          window.location.reload();
        }

        // checkUnviewedNotifications(); 
        document.getElementById("btnLogout").addEventListener("click", logout);
        // Simular un pequeño retraso antes de ocultar el loader (para asegurar que los estilos cargan bien)
      
        

    })
    .catch((error) => console.error("Error loading app.html:", error));
}

function loadAppScripts() {
  const scripts = [
    "./src/lib/jspdf.umd.min.js",
    "./src/lib/jspdf.plugin.autotable.min.js",
    "./src/lib/html2pdf.bundle.min.js",
    "./src/lib/html2canvas.js",
    "./src/lib/exceljs.min.js",
    "./src/lib/xlsx.full.min.js",
    "./src/app.js",
    "./src/scripts/notifications.js"
  ];

  scripts.forEach((src) => {
    const script = document.createElement("script");
    script.src = src;
    script.type = "module";
    document.body.appendChild(script);
  });
}

globalThis.addEventListener("DOMContentLoaded", init);
