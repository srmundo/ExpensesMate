import { editUser,updateUser, getUsers } from "../auth/auth.js";
export function profile() {
    return `
                <div class="container-profile">
                        <div id="loader"><div class="bars"></div></div>
                        <div id="content-profile">
                            <h1>Profile</h1>
                        <div class="profile-details">
                                <div id="image-preview-container">
                                    <div class="profile-image-preview">
                                            <img id="image-preview" class="image-preview-profile" src=""/>
                                    </div>
                                    <div class="profile-field profile-image-field">
                                        <label id="label-profile-image" for="profile-image"><span class='icon-edit'></span></label>
                                        <input type="file" id="profile-image" name="profile-image" accept="image/*" style="display: none;">
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
                </div>
        `;
}

function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.src = reader.result;
        img.onload = function () {
            // Reducir la imagen
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const maxWidth = 300; // Ajusta el tamaño máximo
            const maxHeight = 300;
            let width = img.width;
            let height = img.height;

            if (width > maxWidth || height > maxHeight) {
                if (width > height) {
                    height *= maxWidth / width;
                    width = maxWidth;
                } else {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // Convertir a Base64 y mostrar
            const imagePreview = document.getElementById("image-preview");
            imagePreview.src = canvas.toDataURL("image/jpeg", 0.7); // 0.7 = calidad
        };
    };
    reader.readAsDataURL(file);
}


export async function initializeProfile() {
    const content = document.getElementById("content-profile");
      content.style.display = "none";
    
      async function loadData() {
        const loader = document.getElementById("loader");
    
        try {
            // // Obtener los datos
            // await checkAndStoreTransactions();
            // await checkAndStoreGoals();
            // // await syncLocalTransactionsWithAPI();
            // await checkAndStoreBudgetTracking();

            const currencyData = JSON.parse(localStorage.getItem('currency')) || {};
    const currencySymbol = currencyData.symbol;
const userData = JSON.parse(localStorage.getItem('userData'));
const users = await getUsers();
const currentUser = users.find(user => user.nick === userData.nick);
const currency = localStorage.getItem('currency') || 'USD';
const goals = JSON.parse(localStorage.getItem('goals')) || [];
document.querySelector('.profile-settings tbody').innerHTML = `
    <tr>
        <td>Currency</td>
        <td>Code: ${currencyData.name} | Symbol: ${currencyData.symbol}</td>
    </tr>
    <tr>
        <td>Language</td>
        <td>English</td>
    </tr>
`;

const goalsTableBody = document.querySelector('.profile-goals tbody');
goals.forEach(goal => {
    const goalTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const goalAmount = parseFloat(goal.amount);
    const goalProgress = goalTransactions
        .filter(transaction => transaction.categoryId.toLowerCase().includes(goal.name.toLowerCase()))
        .reduce((sum, transaction) => sum + transaction.amount, 0);
    goal.progress = ((goalProgress / goalAmount) * 100).toFixed(0) + '%';
    goal.status = goalProgress >= goalAmount ? 'Completed' : 'In Progress';
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${goal.name}</td>
        <td>${currencySymbol} ${goal.amount}</td>
        <td>${goal.date}</td>
        <td>${goal.progress}</td>
        <td style="color:${goal.status === 'Completed' ? 'green' : 'orange'};">${goal.status}</td>
    `;
    goalsTableBody.appendChild(row);
});
if (userData) {
    document.getElementById('name').value = userData.name;
    document.getElementById('image-preview').src = userData.photo;
}

try {
    document.getElementById('profile-image').addEventListener('change', previewImage);
} catch (error) {
    
}

document.querySelector('button[type="submit"]').addEventListener('click', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const photo = document.getElementById('image-preview').src;

    const updatedUser = { name, nick:currentUser.nick, photo };
    const updatedUserData = {name, nick:currentUser.nick, photo, password: currentUser.password};

    try {
        await editUser(updatedUser);
        await updateUser(updatedUserData);
        // localStorage.setItem('userData', JSON.stringify(updatedUser));
        document.querySelector('.avatar-nav-app').src = photo;
        document.querySelector('.profile-photo').src = photo;
        alert('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    }
});
            
            // Ocultar el loader y mostrar el contenido
            loader.style.display = "none";
            content.style.display = "block";
            content.textContent = data;
            
        } catch (error) {
            loader.textContent = "❌ error loading data";
        }
      }
      loadData();

}