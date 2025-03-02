import { createLinkStyle } from "./scripts/createLinkStyle.js";
import { home, updateScore, initializeHome } from "./views/home.js";
import { transactions, funcTransactions } from "./views/transactions.js";
import { reports, initializeReport } from "./views/reports.js";
import { goals, initializeGoals } from "./views/goals.js";
import { settings, initializeSettings } from "./views/settings.js";
import { profile, initializeProfile } from "./views/profile.js";
import { useState } from "./scripts/useState.js";
let exampleStorage = ["default-style"];

export function main() {
  const userSession = JSON.parse(sessionStorage.getItem("session"));
  const avatarNavApp = document.querySelector(".avatar-nav-app");
  // Añadir el menú flotante al contenedor .cont-btn-profile-nav
  if (userSession && userSession.photo) {
    avatarNavApp.src = userSession.photo;
  }
  const [getActiveButton, setActiveButton] = useState(0);
  const containerView = document.querySelector(".section-app");


  // if (exampleStorage[0] === "default-style") {
  //   createLinkStyle("./src/css/default-styles.css");
  // }
  loadView("home", containerView);
  initializeHome();

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
        switch (button.id) {
          case "btn-home":
            loadView("home", containerView);
            // updateScore(75);
            initializeHome();
            break;
          case "btn-transactions":
            loadView("transactions", containerView);
            funcTransactions();
            break;
          case "btn-reports":
            loadView("reports", containerView);
            initializeReport();
            break;
          case "btn-goals":
            loadView("goals", containerView);
            initializeGoals();
            break;
          case "btn-settings":
            loadView("settings", containerView);
            initializeSettings();
            break;
          case "btn-profile":
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

export function loadView(view, containerView) {
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
