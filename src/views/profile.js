import { loadView } from "../app.js";
import { getGoals, updateUser, getUsers } from "../data/storage.js";
import * as storageMobile from "../data/storageMobile.js";
export function profile() {
    return `
                <div class="container-profile">
                        <h1>Profile</h1>
                        <div class="profile-details">
                                <div id="image-preview-container">
                                    <div class="profile-image-preview">
                                            <img id="image-preview" class="image-preview-profile" src=""/>
                                    </div>
                                    <div class="profile-field profile-image-field">
                                        <label id="label-profile-image" for="profile-image"><span class='icon-edit'></span></label>
                                        <input type="file" id="profile-image" name="profile-image" accept="image/*" style="display: none;" onchange="previewImage(event)">
                                    </div>
                                </div>
                                <div class="profile-fields">
                                    <div class="profile-field">
                                        <label for="name">Name:</label>
                                        <input type="text" id="name" name="name" placeholder="Enter your name">
                                    </div>
                                    <button type="submit">Save changes</button>
                                </div>
                        </div>
                        <div class="about-profile">
                            <div class="profile-goals">
                                <h2>Goals</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Goal</th>
                                            <th>Amount</th>
                                            <th>Target Date</th>
                                            <th>Progress</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- Add more goals as needed -->
                                    </tbody>
                                </table>
                            </div>
                            <div class="profile-settings">
                                <h2>Settings</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Setting</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Currency</td>
                                            <td>USD</td>
                                        </tr>
                                        <tr>
                                            <td>Language</td>
                                            <td>English</td>
                                        </tr>
                                        <!-- Add more settings as needed -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </div>
        `;
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const imagePreview = document.getElementById('image-preview');
        imagePreview.src = reader.result;
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(event.target.files[0]);
}
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
function getSessionData() {
    const sessionData = sessionStorage.getItem('session');
    return sessionData ? JSON.parse(sessionData) : null;
}

async function getUserDataBySessionId() {
    const sessionData = getSessionData();
    if (!sessionData || !sessionData.id) {
        return null;
    }

    let users;
    if (isMobileDevice()) {
        users = await storageMobile.getUsers();
    }
    users = await getUsers();
    return users.find(user => user.id === sessionData.id) || null;
}

async function renderUserProfile() {
    const userData = await getUserDataBySessionId();
    if (!userData) {
        return;
    }

    const imagePreview = document.getElementById('image-preview');
    const nameField = document.getElementById('name');

    if (userData.photo) {
        imagePreview.src = userData.photo;
        imagePreview.style.display = 'block';
    }

    if (userData.name) {
        nameField.value = userData.name;
    }
}

async function saveProfileChanges() {
    const nameField = document.getElementById('name');
    const imageInput = document.getElementById('profile-image');
    const userData = await getUserDataBySessionId();

    if (!userData) {
        return;
    }

    const newName = nameField.value;
    const newPhoto = imageInput.files[0] ? await getBase64(imageInput.files[0]) : userData.photo;

    await updateUser(userData.id, newName, userData.nick, userData.email, userData.password, newPhoto);
    const sessionData = getSessionData();
    if (sessionData) {
        sessionData.name = newName;
        sessionData.photo = newPhoto;
        sessionStorage.setItem('session', JSON.stringify(sessionData));
    }

    const avatarNavApp = document.querySelector('.avatar-nav-app');
    if (avatarNavApp) {
        avatarNavApp.src = newPhoto;
    }

    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.src = newPhoto;
    }

    const profileHeader = document.querySelector('.profile-header');
    const profileName = profileHeader.querySelector('.profile-name');
    const profileNick = profileHeader.querySelector('.profile-nick');

    const sessionStorageProxy = new Proxy(sessionStorage, {
        set(target, key, value) {
            target.setItem(key, value);
            if (key === "name") {
                profileName.innerText = value;
            }
            return true;
        }
    });
    
    // Para cambiar la imagen sin recargar:
    sessionStorageProxy.name = newName;
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

async function renderUserGoals() {
    const userData = await getUserDataBySessionId();
    if (!userData) {
        return;
    }

    let goals;
    if (isMobileDevice()) {
        goals = await storageMobile.getGoals(userData.id);
    }
    goals = await getGoals(userData.id);
    const goalsTableBody = document.querySelector('.profile-goals tbody');
    goalsTableBody.innerHTML = '';

    goals.forEach(goal => {
        const row = document.createElement('tr');

        const goalCell = document.createElement('td');
        goalCell.textContent = goal.name;
        row.appendChild(goalCell);

        const amountCell = document.createElement('td');
        amountCell.textContent = goal.amount;
        row.appendChild(amountCell);

        const targetDateCell = document.createElement('td');
        targetDateCell.textContent = goal.date;
        row.appendChild(targetDateCell);

        const progressCell = document.createElement('td');
        let progressPercentage = (goal.currentAmount / goal.amount) * 100;
        if (progressPercentage > 100) {
            progressPercentage = 100;
        }
        progressCell.textContent = `${progressPercentage.toFixed(2)}%`;
        row.appendChild(progressCell);

        const statusCell = document.createElement('td');
        const currentDate = new Date();
        const targetDate = new Date(goal.date);

        if (progressPercentage >= 100 && currentDate <= targetDate) {
            statusCell.textContent = 'Completed';
            statusCell.style.color = 'green';
        } else if (progressPercentage < 100 && currentDate > targetDate) {
            statusCell.textContent = 'Not completed';
            statusCell.style.color = 'red';
        } else if (progressPercentage >= 100 && currentDate > targetDate) {
            statusCell.textContent = 'After the date';
            statusCell.style.color = 'orange';
        } else if (progressPercentage < 100 && currentDate <= targetDate) {
            statusCell.textContent = 'In progress';
            statusCell.style.color = 'blue';
        }else if (progressPercentage > 100 && currentDate > targetDate) {
            const excessAmount = goal.currentAmount - goal.amount;
            statusCell.textContent = `After the date and exceeded by ${excessAmount}`;
            statusCell.style.color = 'purple';
        } else if (progressPercentage > 100 && currentDate <= targetDate) {
            const excessAmount = goal.currentAmount - goal.amount;
            statusCell.textContent = `Exceeded by ${excessAmount}`;
            statusCell.style.color = 'purple';
        }
        row.appendChild(statusCell);

        goalsTableBody.appendChild(row);
    });
}
export async function initializeProfile() {
    document.getElementById('profile-image').addEventListener('change', previewImage);

    // console.log(getSessionData());
    // console.log(await getUserDataBySessionId());
    await renderUserProfile();

    await renderUserGoals();

    document.querySelector('button[type="submit"]').addEventListener('click', async (event) => {
        event.preventDefault();
        await saveProfileChanges();
        alert('Profile updated successfully!');
    });
    
    
}
