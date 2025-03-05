import { LoginPage } from "../public/loginPage.js";

if (localStorage.getItem("currency") === null) {
	localStorage.setItem("currency", JSON.stringify({ symbol: "$", name: "USD" }));
}
if (localStorage.getItem("language") === null) {
  localStorage.setItem("language", JSON.stringify({ lang: "en" }));
}
const language = JSON.parse(localStorage.getItem("language")).lang;
let languageData = {};

const budgetCategories = {
  income: [
    {
      name: "Salary",
      description: "Income from a regular job or employment.",
    },
    {
      name: "Freelance",
      description: "Income from freelance or self-employment work.",
    },
    {
      name: "Investments",
      description: "Income from investments like stocks, bonds, or dividends.",
    },
    {
      name: "Other Income",
      description: "Any other form of income not categorized elsewhere.",
    },
  ],
  expense: [
    {
      name: "Housing",
      description: "Rent, mortgage payments, and home maintenance.",
    },
    {
      name: "Food",
      description: "Groceries, dining out, and other food-related expenses.",
    },
    {
      name: "Transportation",
      description: "Public transportation, fuel, car maintenance, and parking.",
    },
    {
      name: "Utilities",
      description: "Electricity, water, gas, internet, and other essential services.",
    },
    {
      name: "Healthcare",
      description: "Medical expenses, health insurance, prescriptions, and treatments.",
    },
    {
      name: "Education",
      description: "Tuition fees, books, courses, and other educational costs.",
    },
    {
      name: "Entertainment",
      description: "Movies, concerts, subscriptions to streaming services, hobbies.",
    },
    {
      name: "Savings",
      description: "Money set aside for future savings or investments.",
    },
    {
      name: "Debt Repayments",
      description: "Payments for loans, credit cards, mortgages, and other debts.",
    },
    {
      name: "Other Expenses",
      description: "Expenses that don't fit into the above categories.",
    },
  ],
};

console.log(budgetCategories);

function init() {
  const userLogged = localStorage.getItem("userLogged");

  if (userLogged === null) {
    localStorage.setItem("userLogged", "false");
    // window.location.href = "../public/login.html";
    LoginPage();
  } else if (userLogged === "true") {
    loadAppHTML();
    localStorage.setItem("budgetCategories", JSON.stringify(budgetCategories));
  } else {
    // window.location.href = "../public/login.html";
    LoginPage();
  }
}



export function loadAppHTML() {
  console.log("🔵 Cargando app.html...");

  fetch("./src/app.html")
    .then((response) => response.text())
    .then((html) => {
      // Crear un elemento temporal para procesar el HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

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
          translateY: [-20, 0],
          duration: 500,
          easing: "easeOutQuad",
        });
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
          localStorage.clear();
          window.location.reload();
        }

        document.getElementById("btnLogout").addEventListener("click", logout);
      
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
  ];

  scripts.forEach((src) => {
    const script = document.createElement("script");
    script.src = src;
    script.type = "module";
    document.body.appendChild(script);
  });
}

globalThis.addEventListener("DOMContentLoaded", init);
