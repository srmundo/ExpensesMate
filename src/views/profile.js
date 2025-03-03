import { editUser } from "../auth/auth.js";
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

export async function initializeProfile() {
const userData = JSON.parse(localStorage.getItem('userData'));

if (userData) {
    document.getElementById('name').value = userData.name;
    document.getElementById('image-preview').src = userData.photo;
}

document.getElementById('profile-image').addEventListener('change', previewImage);

document.querySelector('button[type="submit"]').addEventListener('click', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const photo = document.getElementById('image-preview').src;

    const updatedUser = { name, photo };

    try {
        await editUser(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        alert('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    }
});

}