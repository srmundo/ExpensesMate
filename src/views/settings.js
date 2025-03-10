import { getUsers, deleteUser, updateUser } from "../auth/auth.js";
import { deleteUserData } from "../data/storage.js";
import { notify } from "../scripts/notifications.js";

export function settings() {
  return `
                    <div class="container-settings">
                            <span class="title-settings"><h4>Settings</h4></span>
                                <div class="container-section-setting">
                                        <div class="settings-section">
                        <h2>Account</h2>
                        <ul>
                                <li><a href="#change-password">Change Password</a></li>
                                <li><a href="#update-email">Update Email</a></li>
                                <li><a href="#delete-account">Delete Account</a></li>
                        </ul>
                </div>
                <div class="settings-section">
                        <h2>Preferences</h2>
                        <ul>
                                <li><a href="#currency-settings">Currency Settings</a></li>
                                <li><a href="#language-settings">Language</a></li>
                                <li><a href="#notification-preferences">Notification Preferences</a></li>
                        </ul>
                </div>
                <!-- <div class="settings-section">
                        <h2>Integrations</h2>
                        <ul>
                                <li><a href="#server-database-settings">Server and Database Settings</a></li>
                                <li><a href="#bank-integration">Bank Integration</a></li>
                                <li><a href="#third-party-apps">Third-Party Apps</a></li>
                        </ul>
                </div> -->
                <!-- <div class="settings-section">
                        <h2>Security</h2>
                        <ul>
                                <li><a href="#two-factor-auth">Two-Factor Authentication</a></li>
                                <li><a href="#login-history">Login History</a></li>
                        </ul>
                </div> -->
                                </div>
                    </div>
            `;
}

export const initializeSettings = () => {
  document.querySelectorAll(".settings-section a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const sectionId = link.getAttribute("href").substring(1);
      showSection(sectionId);
    });
  });
};

function renderChangePasswordSection() {
  return `
                <div class="change-password-section">
                        <h3>Change Password</h3>
                        <form id="change-password-form">
                                <div class="form-group">
                                        <label for="current-password">Current Password:</label>
                                        <input type="password" id="current-password" name="current-password" required>
                                </div>
                                <div class="form-group">
                                        <label for="new-password">New Password:</label>
                                        <input type="password" id="new-password" name="new-password" required>
                                </div>
                                <div class="form-group">
                                        <label for="confirm-password">Confirm New Password:</label>
                                        <input type="password" id="confirm-password" name="confirm-password" required>
                                </div>
                                <button type="submit">Change Password</button>
                        </form>
                </div>
        `;
}

function renderUpdateEmailSection() {
  return `
                <div class="update-email-section">
                        <h3>Update Email</h3>
                        <form id="update-email-form">
                                <div class="form-group">
                                        <label for="current-email">Current Email:</label>
                                        <input type="email" id="current-email" name="current-email" required>
                                </div>
                                <div class="form-group">
                                        <label for="new-email">New Email:</label>
                                        <input type="email" id="new-email" name="new-email" required>
                                </div>
                                <button id="btn-update-email" type="button">Update Email</button>
                        </form>
                </div>
        `;
}

function renderDeleteAccountSection() {
  return `
                <div class="delete-account-section">
                        <h3>Delete Account</h3>
                        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                        <form id="delete-account-form">
                                <div class="form-group">
                                        <label for="confirm-delete">Type "DELETE" to confirm:</label>
                                        <input type="text" id="confirm-delete" name="confirm-delete" required>
                                </div>
                                <button type="submit" class="btn-delete">Delete Account</button>
                        </form>
                </div>
        `;
}

function renderCurrencySettingsSection() {
  return `
                <div class="currency-settings-section">
                        <h3>Currency Settings</h3>
                        <form id="currency-settings-form">
                                <div class="form-group">
                                        <label for="currency-type">Select Currency:</label>
                                        <select id="currency-type" name="currency-type" class="currency-select">
                                                <option value="USD">USD - US Dollar</option>
                                                <option value="EUR">EUR - Euro</option>
                                                <option value="GBP">GBP - British Pound</option>
                                                <option value="JPY">JPY - Japanese Yen</option>
                                                <option value="AUD">AUD - Australian Dollar</option>
                                                <option value="ARS">ARS - Argentine Peso</option>
                                                <option value="BOB">BOB - Bolivian Boliviano</option>
                                                <option value="BRL">BRL - Brazilian Real</option>
                                                <option value="CLP">CLP - Chilean Peso</option>
                                                <option value="COP">COP - Colombian Peso</option>
                                                <option value="CRC">CRC - Costa Rican Colón</option>
                                                <option value="CUP">CUP - Cuban Peso</option>
                                                <option value="DOP">DOP - Dominican Peso</option>
                                                <option value="GTQ">GTQ - Guatemalan Quetzal</option>
                                                <option value="HNL">HNL - Honduran Lempira</option>
                                                <option value="MXN">MXN - Mexican Peso</option>
                                                <option value="NIO">NIO - Nicaraguan Córdoba</option>
                                                <option value="PAB">PAB - Panamanian Balboa</option>
                                                <option value="PYG">PYG - Paraguayan Guarani</option>
                                                <option value="PEN">PEN - Peruvian Sol</option>
                                                <option value="UYU">UYU - Uruguayan Peso</option>
                                                <option value="VEF">VEF - Venezuelan Bolívar</option>
                                        </select>
                                </div>
                                <button type="submit" class="btn-save-currency">Save Currency</button>
                        </form>
                </div>
        `;
}

function renderLanguageSettingsSection() {
  return `
                <div class="language-settings-section">
                        <h3>Language Settings</h3>
                        <form id="language-settings-form">
                                <div class="form-group">
                                        <label for="language-type">Select Language:</label>
                                        <select id="language-type" name="language-type" class="language-select">
                                                <option value="en">English</option>
                                                <option value="es">Spanish</option>
                                                <option value="pt">Portuguese</option>
                                                <option value="fr">French</option>
                                                <option value="de">German</option>
                                                <option value="it">Italian</option>
                                                <option value="ja">Japanese</option>
                                                <option value="zh">Chinese</option>
                                        </select>
                                </div>
                                <button type="submit" class="btn-save-language">Save Language</button>
                        </form>
                </div>
        `;
}

function renderNotificationPreferencesSection() {
  return `
                <div class="notification-preferences-section">
                        <h3>Notification Preferences</h3>
                        <form id="notification-preferences-form">
                                <div class="form-group">
                                        <label for="notify-goals">Notify for Goals:</label>
                                        <input type="checkbox" id="notify-goals" name="notify-goals">
                                </div>
                                <div class="form-group">
                                        <label for="notify-budget-tracking">Notify for Budget Tracking:</label>
                                        <input type="checkbox" id="notify-budget-tracking" name="notify-budget-tracking">
                                </div>
                                <div class="form-group">
                                        <label for="notify-overspending">Notify for Overspending:</label>
                                        <input type="checkbox" id="notify-overspending" name="notify-overspending">
                                </div>
                                <div class="form-group">
                                        <label for="notify-top-categories">Notify for Top Spending Categories:</label>
                                        <input type="checkbox" id="notify-top-categories" name="notify-top-categories">
                                </div>
                                <button type="submit" class="btn-save-notifications">Save Notifications</button>
                        </form>
                </div>
        `;
}

function showSection(sectionId) {
  const sections = {
    "change-password": renderChangePasswordSection(),
    "update-email": renderUpdateEmailSection(),
    "delete-account": renderDeleteAccountSection(),
    "currency-settings": renderCurrencySettingsSection(),
    "language-settings": renderLanguageSettingsSection(),
    "notification-preferences": renderNotificationPreferencesSection(),
    "bank-integration":
      "<h3>Bank Integration</h3><p>Here you can integrate with banks.</p>",
    "third-party-apps":
      "<h3>Third-Party Apps</h3><p>Here you can manage third-party apps.</p>",
    "two-factor-auth":
      "<h3>Two-Factor Authentication</h3><p>Here you can configure two-factor authentication.</p>",
    "login-history":
      "<h3>Login History</h3><p>Here you can view the login history.</p>",
  };

  const content =
    sections[sectionId] ||
    "<h3>Section not found</h3><p>The requested section does not exist.</p>";
  document.querySelector(".container-settings").innerHTML =
    content + '<button id="back-to-settings">Back to Settings</button>';

  document.getElementById("back-to-settings").addEventListener("click", () => {
    document.querySelector(".container-settings").innerHTML = settings();
    initializeSettings();
  });

  if (sectionId === "currency-settings") {
    initCurrency();
  } else if (sectionId === "change-password") {
    initChangePassword();
  } else if (sectionId === "update-email") {
    initUpdateEmail();
  } else if (sectionId === "delete-account") {
    initDeleteAccount();
  } else if (sectionId === "language-settings") {
    initLanguageSettings();
  } else if (sectionId === "notification-preferences") {
    initNotificationPreferences();
  }
}

async function fetchCurrencyData() {
  try {
    const response = await fetch("../src/locale/currency/currency.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch currency data:", error);
    return null;
  }
}

function updateLocalStorageCurrency(currencyCode, currencyData) {
  if (currencyData && currencyData[currencyCode]) {
    const selectedCurrency = {
      symbol: currencyData[currencyCode].symbol,
      name: currencyCode,
    };
    localStorage.setItem("currency", JSON.stringify(selectedCurrency));
    alert("Currency updated successfully!");
  } else {
    alert("Invalid currency code");
  }
}

function initCurrency() {
  document
    .getElementById("currency-settings-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const currencyCode = document.getElementById("currency-type").value;
      const currencyData = await fetchCurrencyData();
      updateLocalStorageCurrency(currencyCode, currencyData);
    });

  const savedCurrency = JSON.parse(localStorage.getItem("currency"));
  if (savedCurrency) {
    document.getElementById("currency-type").value = savedCurrency.name;
  }
}

function initChangePassword() {
  document
    .getElementById("change-password-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const currentPassword = document.getElementById("current-password").value;
      const password = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        alert("New passwords do not match.");
        return;
      }

      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const userNick = userData ? userData.nick : null;
        if (!userNick) {
          alert("User not found. Please log in again.");
          return;
        }

        await updateUser({ nick: userNick, currentPassword, password });
        alert("Password updated successfully!");
        document.getElementById("change-password-form").reset();
      } catch (error) {
        console.error("Failed to update password:", error);
        alert("Failed to update password. Please try again.");
      }
    });
}

function initUpdateEmail() {
  document
    .getElementById("btn-update-email")
    .addEventListener("click", async (event) => {
      event.preventDefault();
      const currentEmail = document.getElementById("current-email").value;
      const newEmail = document.getElementById("new-email").value;

      try {
        const users = await getUsers();
        const userData = users.find(
          (user) =>
            user.nick === JSON.parse(localStorage.getItem("userData")).nick
        );
        const userPassword = userData ? userData.password : null;
        const userNick = userData ? userData.nick : null;
        if (!userNick) {
          alert("User not found. Please log in again.");
          return;
        }
        if (userData.email !== currentEmail) {
          alert("Current email is incorrect.");
          return;
        }

        await updateUser({
          nick: userNick,
          email: newEmail,
          password: userPassword,
        });
        alert("Email updated successfully!");
        document.getElementById("update-email-form").reset();
      } catch (error) {
        console.error("Failed to update email:", error);
        alert("Failed to update email. Please try again.");
      }
    });
}

function initDeleteAccount() {
  document
    .getElementById("delete-account-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const confirmationText = document.getElementById("confirm-delete").value;
      if (confirmationText === "DELETE") {
        try {
          const userData = JSON.parse(localStorage.getItem("userData"));
          const userNick = userData ? userData.nick : null;
          if (!userNick) {
            alert("User not found. Please log in again.");
            return;
          }
          await deleteUserData();
          // await deleteUser(userNick);
          localStorage.removeItem("userLogged");
          localStorage.removeItem("currency");
          localStorage.removeItem("budgetCategories");
          localStorage.clear();
          alert("Account deleted successfully!");
          // Redirect to login or home page after account deletion
          window.location.reload();
        } catch (error) {
          console.error("Failed to delete account:", error);
          alert("Failed to delete account. Please try again.");
        }
      } else {
        alert('Please type "DELETE" to confirm.');
      }
    });
}

function initLanguageSettings() {
  document
    .getElementById("language-settings-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const selectedLanguage = document.getElementById("language-type").value;
      localStorage.setItem(
        "language",
        JSON.stringify({ lang: selectedLanguage })
      );
      window.location.reload();
      alert("Language updated successfully!");
    });

  const savedLanguage = JSON.parse(localStorage.getItem("language"));
  if (savedLanguage) {
    document.getElementById("language-type").value = savedLanguage.lang;
  }
}

function initNotificationPreferences() {
  document
    .getElementById("notification-preferences-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const notifyGoals = document.getElementById("notify-goals").checked;
      const notifyBudgetTracking = document.getElementById(
        "notify-budget-tracking"
      ).checked;
      const notifyOverspending = document.getElementById(
        "notify-overspending"
      ).checked;
      const notifyTopCategories = document.getElementById(
        "notify-top-categories"
      ).checked;

      const preferences = {
        notifyGoals,
        notifyBudgetTracking,
        notifyOverspending,
        notifyTopCategories,
      };
      localStorage.setItem(
        "notificationPreferences",
        JSON.stringify(preferences)
      );

      if (notifyGoals) checkGoals();
      if (notifyBudgetTracking) checkBudgetTracking();
      if (notifyOverspending) checkBudgetCategories();
      if (notifyTopCategories) checkTransactions();
    });

  const preferencesSel = getLocalStorageData("notificationPreferences");
  if (preferencesSel) {
    document.getElementById("notify-goals").checked =
      preferencesSel.notifyGoals;
    document.getElementById("notify-budget-tracking").checked =
      preferencesSel.notifyBudgetTracking;
    document.getElementById("notify-overspending").checked =
      preferencesSel.notifyOverspending;
    document.getElementById("notify-top-categories").checked =
      preferencesSel.notifyTopCategories;
  }
}

function getLocalStorageData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function createNotification(message) {
  if (Notification.permission === "granted") {
    new Notification("Expenses mate open", { body: message });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Expenses mate open", { body: message });
      }
    });
  }

  const audio = new Audio("./src/assets/notification-sound.mp3");
  var playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise
      .then((_) => {
        // Automatic playback started!
        // Show playing UI.
      })
      .catch((error) => {
        // Auto-play was prevented
        // Show paused UI.
      });
  }

  const notificationElement = document.createElement("div");
  notificationElement.className = "notification";
  notificationElement.innerText = message;
  document.body.appendChild(notificationElement);

  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification, index) => {
    notification.style.marginBottom = `${index * 200}px`; // Adjust the spacing as needed
  });

  setTimeout(() => {
    notificationElement.remove();
  }, 5000);
}

function checkGoals() {
  const goals = getLocalStorageData("goals");
if (goals) {
        goals.forEach((goal) => {
                const goalDate = new Date(goal.date);
                const currentDate = new Date();
                const daysDifference = Math.floor((currentDate - goalDate) / (1000 * 60 * 60 * 24));

                const notifications = getLocalStorageData("notifications") || [];
                const existingNotification = notifications.find(
                        (notif) => notif.message.includes(goal.name) && notif.exec === false
                );

          //       if (goal.amount === goal.currentAmount) {
          //         const message = `Goal achieved: ${goal.name}`;
          //         createNotification(message);
          //         saveNotification("Goals", message);
          //         notify();
          // } else {
          //         const remainingAmount = goal.amount - goal.currentAmount;
          //         const message = `Keep going! You need $${remainingAmount} more to achieve your goal "${goal.name}".`;
          //         createNotification(message);
          //         saveNotification("Goals", message);
          //         notify();
          // }

                if (!existingNotification) {
                        if (goal.amount === goal.currentAmount) {
                                const message = `Goal achieved: ${goal.name}`;
                                createNotification(message);
                                saveNotification("Goals", message);
                                notify();
                        } else {
                                const remainingAmount = goal.amount - goal.currentAmount;
                                const message = `Keep going! You need $${remainingAmount} more to achieve your goal "${goal.name}".`;
                                createNotification(message);
                                saveNotification("Goals", message);
                                notify();
                        }
                }
        });
}
}

function checkTransactions() {
  const transactions = getLocalStorageData("transactions");
if (transactions) {
        transactions.forEach((transaction) => {
                if (transaction.amount > 1000) {
                        // Example condition
                        const message = `High transaction: ${transaction.categoryId} - $${transaction.amount}`;
                        const notifications = getLocalStorageData("notifications") || [];
                        const existingNotification = notifications.find(
                                (notif) => notif.message === message && notif.exec === false
                        );

                        if (!existingNotification) {
                                createNotification(message);
                                saveNotification("Transactions", message);
                                notify();
                        }
                }
        });
}
}

function checkBudgetCategories() {
  const budgetCategories = getLocalStorageData("budgetCategories");
  if (budgetCategories) {
    budgetCategories.forEach((category) => {
      if (category.actualSpent > category.budgetedAmount) {
        const message = `Overspending in category: ${category.name}`;
        createNotification(message);
        saveNotification("Budget categories", message);
        notify();
      }
    });
  }
}

function checkBudgetTracking() {
  const budgetTracking = getLocalStorageData("budgetTracking");
if (budgetTracking) {
        const difference = budgetTracking.budgetedAmount - budgetTracking.ActualSpent;
        if (difference <= 10 && difference > 0) {
                const message = `You are close to exceeding your budget for ${budgetTracking.category}. Only $${difference} left.`;
                createNotification(message);
                saveNotification("Budget tracking", message);
                notify();
        } else if (difference <= 0) {
                const message = `You have exceeded your budget for ${budgetTracking.category} by $${Math.abs(difference)}!`;
                createNotification(message);
                saveNotification("Budget tracking", message);
                notify();
        }
}
}

function saveNotification(functionName, message) {
  const notifications = getLocalStorageData("notifications") || [];
  const notification = {
    functionName,
    message,
    view: false,
    exec: false,
    date: new Date().toLocaleString(),
  };
  notifications.push(notification);
  localStorage.setItem("notifications", JSON.stringify(notifications));
}

window.onload = () => {
  checkNotifications();
  setInterval(checkNotifications, 1000); // Verificar cada 60 segundos
};

window.onload = () => {
  notificationsReminder();
};

export function notificationsReminder() {
        function checkGoalsEveryTwoDays() {
                const goals = getLocalStorageData("goals");
                if (goals) {
                        goals.forEach((goal) => {
                                const goalDate = new Date(goal.date);
                                const currentDate = new Date();
                                const daysDifference = Math.floor((currentDate - goalDate) / (1000 * 60 * 60 * 24));
        
                                const notifications = getLocalStorageData("notifications") || [];
                                const existingNotification = notifications.find(
                                        (notif) => notif.message.includes(goal.name) && notif.exec === false
                                );
        
                                if (!existingNotification && daysDifference % 2 === 0) {
                                        if (goal.amount === goal.currentAmount) {
                                                const message = `Goal achieved: ${goal.name}`;
                                                createNotification(message);
                                                saveNotification("Goals", message);
                                                notify();
                                        } else {
                                                const remainingAmount = goal.amount - goal.currentAmount;
                                                const message = `Reminder: Keep saving for your goal "${goal.name}". You still need $${remainingAmount}. Don't give up!`;
                                                createNotification(message);
                                                saveNotification("Goals", message);
                                                notify();
                                        }
                                }
                        });
                }
        }
        
        setInterval(checkGoalsEveryTwoDays, 2 * 24 * 60 * 60 * 1000); // Check every 2 days
}

export function checkNotifications() {
  const preferences = getLocalStorageData("notificationPreferences");
  if (preferences) {
    if (preferences.notifyGoals) checkGoals();
    if (preferences.notifyBudgetTracking) checkBudgetTracking();
    if (preferences.notifyOverspending) checkBudgetCategories();
    if (preferences.notifyTopCategories) checkTransactions();
  }
}
