import { createLinkStyle } from "./scripts/createLinkStyle.js";
import { home, updateScore } from "./views/home.js";
import { transactions, funcTransactions } from "./views/transactions.js";
import { reports, funcReport } from "./views/reports.js";
import { goals, initializeGoals } from "./views/goals.js";
import { settings, initializeSettings } from "./views/settings.js";
import { profile, initializeProfile } from "./views/profile.js";
import { useState } from "./scripts/useState.js";
let exampleStorage = ["default-style"];

export function main() {
  const userSession = JSON.parse(sessionStorage.getItem("userSession"));
  const avatarNavApp = document.querySelector(".avatar-nav-app");
  // Añadir el menú flotante al contenedor .cont-btn-profile-nav
  if (userSession && userSession.photo) {
    avatarNavApp.src = userSession.photo;
  }
  // const jsPDFScript = document.createElement("script");
  // jsPDFScript.src = "./src/lib/jspdf.umd.min.js";
  // jsPDFScript.onload = () => {
  // };
  window.jsPDF = window.jspdf.jsPDF;

  // document.head.appendChild(jsPDFScript);
  const [getActiveButton, setActiveButton] = useState(0);
  const containerView = document.querySelector(".section-app");


  // if (exampleStorage[0] === "default-style") {
  //   createLinkStyle("./src/css/default-styles.css");
  // }
  loadView("home", containerView);

  const buttonsAside = document.querySelectorAll(
    ".aside-section-app .aside-app ul li button"
  );

  bntAside();
  buttonsAside.forEach((button, index) => {
    button.addEventListener("click", () => {
      setActiveButton(index);
      bntAside();
    });
  });

  function bntAside() {
    buttonsAside.forEach((button, index) => {
      if (index === getActiveButton()) {
        button.classList.add("button-active");
        switch (button.innerText) {
          case "Home":
            loadView("home", containerView);
            updateScore(75);
            break;
          case "Transactions":
            loadView("transactions", containerView);
            funcTransactions();
            break;
          case "Reports":
            loadView("reports", containerView);
            funcReport(jsPDF);
            break;
          case "Goals":
            loadView("goals", containerView);
            initializeGoals();
            break;
          case "Settings":
            loadView("settings", containerView);
            initializeSettings();
            break;
          case "Profile":
            loadView("profile", containerView);
            initializeProfile();
            break;
        }
      } else {
        button.classList.remove("button-active");
      }
    });
  }

  
}

function loadView(view, containerView) {
  switch (view) {
    case "home":
      containerView.innerHTML = home();
      break;
    case "transactions":
      containerView.innerHTML = transactions();
      break;
    case "reports":
      containerView.innerHTML = reports();
      break;
    case "goals":
      containerView.innerHTML = goals();
      break;
    case "settings":
      containerView.innerHTML = settings();
      break;
    case "profile":
      containerView.innerHTML = profile();
      break;
    default:
      break;
  }
}

document.addEventListener("DOMContentLoaded", main());
