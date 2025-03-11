export function notify() {
  const notificationList = document.querySelector(".notification-list");

  const notifications = JSON.parse(localStorage.getItem("notifications")) || [];

  try {
    if (notifications.length > 0) {
        notificationList.innerHTML = "";
      }
    
    notifications.sort((a, b) => new Date(b.date) - new Date(a.date));
    notifications.forEach((notification) => {
      const li = document.createElement("li");
      li.className = "notification-item";
      li.innerHTML = `<div class="notification-item">
                            <h5>${notification.functionName}</h5>
                            <p>${notification.message}</p>
                            <p>${notification.date}</p>
                        </div>`;
    //   ${notification.date} - ${notification.message}`;
      notificationList.appendChild(li);
    });
    
      const notifyElement = document.querySelector(".id-notify");
    
      const hasUnviewedNotifications = notifications.some(
        (notification) => !notification.view
      );
    
      if (hasUnviewedNotifications) {
        notifyElement.style.display = "block";
        notifications.forEach((notification) => {
          notification.view = true;
        });
        localStorage.setItem("notifications", JSON.stringify(notifications));
      } else {
        notifyElement.style.display = "none";
      }
  } catch (error) {
  }

  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  const updatedNotifications = notifications.filter(notification => {
    return new Date(notification.date) >= fiveDaysAgo;
  });

  localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

}

notify();
