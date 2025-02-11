
import { loadView } from "../app.js";
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
                                        <label for="name">Nombre:</label>
                                        <input type="text" id="name" name="name" placeholder="Ingresa tu nombre">
                                    </div>
                                    <button type="submit">Guardar cambios</button>
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

const goals = [
    { goal: 'Save for vacation', amount: 2000, date: '2023-12-31', progress: '50%', status: 'in-progress' },
    { goal: 'Emergency fund', amount: 5000, date: '2024-06-30', progress: '20%', status: 'in-progress' },
    { goal: 'Buy a new laptop', amount: 1500, date: '2023-11-15', progress: '100%', status: 'achieved' }
];

function renderGoals() {
    const tbody = document.querySelector('.profile-goals tbody');
    tbody.innerHTML = '';

    goals.forEach(goal => {
        const row = document.createElement('tr');
        const goalCell = document.createElement('td');
        const amountCell = document.createElement('td');
        const dateCell = document.createElement('td');
        const progressCell = document.createElement('td');
        const statusCell = document.createElement('td');

        goalCell.textContent = goal.goal;
        amountCell.textContent = goal.amount;
        dateCell.textContent = goal.date;
        progressCell.textContent = goal.progress;
        statusCell.textContent = goal.status;

        row.appendChild(goalCell);
        row.appendChild(amountCell);
        row.appendChild(dateCell);
        row.appendChild(progressCell);
        row.appendChild(statusCell);

        if (goal.status === 'achieved') {
            statusCell.style.color = 'blue';
        } else if (goal.status === 'in-progress') {
            statusCell.style.color = 'green';
        } else if (goal.status === 'not-achieved') {
            statusCell.style.color = 'red';
        }
        tbody.appendChild(row);
    });

    const userSession = JSON.parse(sessionStorage.getItem('session'));
    if (userSession && userSession.photo) {
        const imagePreview = document.getElementById('image-preview');
        const imgProfile = document.querySelector('.profile-photo');

        imgProfile.src = userSession.photo;
        imagePreview.src = userSession.photo;
        imagePreview.style.display = 'block';
    }

    const nameInput = document.getElementById('name');

    if (userSession) {
        nameInput.value = userSession.name || '';
    }

    document.querySelector('.profile-fields button[type="submit"]').addEventListener('click', async (event) => {
        event.preventDefault();
        const updatedName = nameInput.value;
        const profileImageInput = document.getElementById('profile-image');
        let updatedPhoto = userSession.photo;

        if (profileImageInput.files.length > 0) {
            const file = profileImageInput.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                updatedPhoto = reader.result;
                userSession.photo = updatedPhoto;
                sessionStorage.setItem('userSession', JSON.stringify(userSession));
                updateUserInSessionStorage(updatedName, updatedPhoto);
            };
            reader.readAsDataURL(file);
        } else {
            updateUserInSessionStorage(updatedName, updatedPhoto);
        }
    });

    const containerView = document.querySelector(".section-app");

    function updateUserInSessionStorage(name, photo) {
        const userSession = JSON.parse(sessionStorage.getItem('session')) || {};
        userSession.name = name;
        userSession.photo = photo;
        sessionStorage.setItem('session', JSON.stringify(userSession));
        window.location.reload();
        globalThis.addEventListener('load', () => {
            loadView("profile", containerView);
            initializeProfile();
        });
    }

}

export function initializeProfile() {
    document.getElementById('profile-image').addEventListener('change', previewImage);
    renderGoals();
}
