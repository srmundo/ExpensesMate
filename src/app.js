import { createLinkStyle } from "./scripts/createLinkStyle.js";
import { home, updateScore, initializeHome } from "./views/home.js";
import { transactions, funcTransactions } from "./views/transactions.js";
import { reports, initializeReport } from "./views/reports.js";
import { goals, initializeGoals } from "./views/goals.js";
import { settings, initializeSettings } from "./views/settings.js";
import { profile, initializeProfile } from "./views/profile.js";
import { useState } from "./scripts/useState.js";
let exampleStorage = ["default-style"];

const language = JSON.parse(localStorage.getItem("language")).lang;
let languageData = {};


export function main() {
  const userSession = JSON.parse(localStorage.getItem("userData"));
  const avatarNavApp = document.querySelector(".avatar-nav-app");

const titleApp = document.querySelector(".title-app").innerText;
const btnNotification = document.querySelector("#btnNotification").innerText;
const btnProfileOpt = document.querySelector("#btnProfileOpt").innerText;
const btnHome = document.querySelector("#btn-home p").innerText;
const btnTransactions = document.querySelector("#btn-transactions p").innerText;
const btnReports = document.querySelector("#btn-reports p").innerText;
const btnGoals = document.querySelector("#btn-goals p").innerText;
const btnSettings = document.querySelector("#btn-settings p").innerText;
const btnProfile = document.querySelector("#btn-profile p").innerText;
const footerVersion = document.querySelector(".footer-app div p:nth-child(1)").innerText;
const footerUser = document.querySelector(".footer-app div p:nth-child(2)").innerText;
const footerDate = document.querySelector(".footer-app div p:nth-child(3)").innerText;
const footerTime = document.querySelector(".footer-app div p:nth-child(4)").innerText;
const footerLicense = document.querySelector(".footer-app p:nth-child(2)").innerText;
const footerDeveloper = document.querySelector(".footer-app p:nth-child(3)").innerText;

if (language === "en") {
  fetch("./src/locale/lang/en.json")
    .then((response) => response.json())
    .then((data) => {
      languageData = data;
      document.querySelector("#btn-home p").innerText = languageData.aside.home;
      document.querySelector("#btn-transactions p").innerText = languageData.aside.transactions;
      document.querySelector("#btn-reports p").innerText = languageData.aside.reports;
      document.querySelector("#btn-goals p").innerText = languageData.aside.goals;
      document.querySelector("#btn-settings p").innerText = languageData.aside.settings;
      document.querySelector("#btn-profile p").innerText = languageData.aside.profile;
      document.querySelector(".footer-app div p:nth-child(1)").innerText = languageData.footer.version;
      document.querySelector(".footer-app div p:nth-child(2)").innerText = languageData.footer.user;
      document.querySelector(".footer-app div p:nth-child(3)").innerText = languageData.footer.date;
      document.querySelector(".footer-app div p:nth-child(4)").innerText = languageData.footer.time;
      document.querySelector(".footer-app p:nth-child(2)").innerText = languageData.footer.license;
      document.querySelector(".footer-app p:nth-child(3)").innerText = languageData.footer.developedBy;
      // You can use the fetched data here
    })
    .catch((error) => console.error("Error fetching language file:", error));
  } else if (language === "es") {
  fetch("../src/locale/lang/es.json")
    .then((response) => response.json())
    .then((data) => {
      languageData = data;
      document.querySelector("#btn-home p").innerText = languageData.aside.home;
      document.querySelector("#btn-transactions p").innerText = languageData.aside.transactions;
      document.querySelector("#btn-reports p").innerText = languageData.aside.reports;
      document.querySelector("#btn-goals p").innerText = languageData.aside.goals;
      document.querySelector("#btn-settings p").innerText = languageData.aside.settings;
      document.querySelector("#btn-profile p").innerText = languageData.aside.profile;
      document.querySelector(".footer-app div p:nth-child(1)").innerText = languageData.footer.version;
      document.querySelector(".footer-app div p:nth-child(2)").innerText = languageData.footer.user;
      document.querySelector(".footer-app div p:nth-child(3)").innerText = languageData.footer.date;
      document.querySelector(".footer-app div p:nth-child(4)").innerText = languageData.footer.time;
      document.querySelector(".footer-app p:nth-child(2)").innerText = languageData.footer.license;
      document.querySelector(".footer-app p:nth-child(3)").innerText = languageData.footer.developedBy;
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

  avatarNavApp.src = userSession.photo;

  const [getActiveButton, setActiveButton] = useState(0);
  const containerView = document.querySelector(".section-app");

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
