import { createLinkStyle } from "./scripts/createLinkStyle.js";
import { home, updateScore } from "./views/home.js";
import { transactions, funcTransactions } from "./views/transactions.js";
import { reports, funcReport } from "./views/reports.js";
import { goals, initializeGoals } from "./views/goals.js";
import { settings, initializeSettings } from "./views/settings.js";
import { profile, initializeProfile } from "./views/profile.js";
import { useState } from "./scripts/useState.js";
let exampleStorage = ["default-style"];

export function app(){
  return `
    <main class="main-app">
      <nav class="nav-app">
        <h2 class="title-app">ExpenseMate</h2>
        <ul class="menu-nav-app">
          <li>
            <button class="btn-nav-app" id="btnNotification">
              <span class="icon-bell"></span>
            </button>
          </li>
          <li>
            <button class="btn-nav-app" id="btnProfileOpt">
              <img
                class="avatar-nav-app"
                src="https://api.dicebear.com/9.x/fun-emoji/svg?seed=Liliana"
                alt="avatar"
              />
            </button>
          </li>
        </ul>
      </nav>
      <div class="aside-section-app">
        <aside class="aside-app">
          <ul class="aside-menu-app">
            <li>
              <button class="btn-aside-menu">
                <p>Home</p>
                <span class="icon-home"></span>
              </button>
            </li>
            <li>
              <button class="btn-aside-menu">
                <p>Transactions</p>
                <span class="icon-dollar-sign"></span>
              </button>
            </li>
            <li>
              <button class="btn-aside-menu">
                <p>Reports</p>
                <span class="icon-book"></span>
              </button>
            </li>
            <li>
              <button class="btn-aside-menu">
                <p>Goals</p>
                <span class="icon-target"></span>
              </button>
            </li>
            <li>
              <button class="btn-aside-menu">
                <p>Settings</p>
                <span class="icon-settings"></span>
              </button>
            </li>
            <li>
              <button class="btn-aside-menu">
                <p>Profile</p>
                <span class="icon-user"></span>
              </button>
            </li>
          </ul>
        </aside>
        <section class="section-app"></section>
      </div>
      <footer class="footer-app">
        <div>
          <p>version 1.0.0</p>
          <p>name user</p>
          <p>0000-00-00</p>
          <p>00:00</p>
        </div>
        <p>MIT License 2024</p>
        <p>Developed by Whoami</p>
      </footer>
    </main>

  `;
}

globalThis.addEventListener("DOMContentLoaded", main());

export function main() {
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

