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
                <div class="settings-section">
                        <h2>Integrations</h2>
                        <ul>
                                <li><a href="#server-database-settings">Server and Database Settings</a></li>
                                <li><a href="#bank-integration">Bank Integration</a></li>
                                <li><a href="#third-party-apps">Third-Party Apps</a></li>
                        </ul>
                </div>
                <div class="settings-section">
                        <h2>Security</h2>
                        <ul>
                                <li><a href="#two-factor-auth">Two-Factor Authentication</a></li>
                                <li><a href="#login-history">Login History</a></li>
                        </ul>
                </div>
                                </div>
                    </div>
            `;
}

export const initializeSettings = () => {
        document.querySelectorAll('.settings-section a').forEach(link => {
                link.addEventListener('click', event => {
                        event.preventDefault();
                        const sectionId = link.getAttribute('href').substring(1);
                        showSection(sectionId);
                });
        });
};

function showSection(sectionId) {
        const sections = {
                'change-password': '<h3>Change Password</h3><p>Here you can change your password.</p>',
                'update-email': '<h3>Update Email</h3><p>Here you can update your email.</p>',
                'delete-account': '<h3>Delete Account</h3><p>Here you can delete your account.</p>',
                'currency-settings': '<h3>Currency Settings</h3><p>Here you can configure the currency.</p>',
                'language-settings': '<h3>Language</h3><p>Here you can change the language.</p>',
                'notification-preferences': '<h3>Notification Preferences</h3><p>Here you can configure notifications.</p>',
                'bank-integration': '<h3>Bank Integration</h3><p>Here you can integrate with banks.</p>',
                'third-party-apps': '<h3>Third-Party Apps</h3><p>Here you can manage third-party apps.</p>',
                'two-factor-auth': '<h3>Two-Factor Authentication</h3><p>Here you can configure two-factor authentication.</p>',
                'login-history': '<h3>Login History</h3><p>Here you can view the login history.</p>',
                'server-database-settings': `
                        <h3>Server and Database Settings</h3>
                        <p>Here you can configure the server and database for your personal budget application.</p>
                        <form id="server-db-form">
                                <label for="db-type">Database Type:</label>
                                <select id="db-type" name="db-type">
                                        <option value="localStorage">LocalStorage</option>
                                        <option value="indexedDB">IndexedDB</option>
                                        <option value="firebase">Firebase</option>
                                        <option value="mysql">MySQL</option>
                                        <option value="postgresql">PostgreSQL</option>
                                        <option value="email">Save to Email</option>
                                </select>
                                <div id="db-config"></div>
                                <button type="submit">Save Configuration</button>
                        </form>
                        <script>
                                document.getElementById('db-type').addEventListener('change', function() {
                                        const dbConfig = document.getElementById('db-config');
                                        dbConfig.innerHTML = '';
                                        switch (this.value) {
                                                case 'localStorage':
                                                        dbConfig.innerHTML = '<p>Using browser LocalStorage.</p>';
                                                        break;
                                                case 'indexedDB':
                                                        dbConfig.innerHTML = '<p>Configuration for IndexedDB.</p>';
                                                        break;
                                                case 'firebase':
                                                        dbConfig.innerHTML = '<label for="firebase-config">Firebase Configuration:</label><textarea id="firebase-config" name="firebase-config"></textarea>';
                                                        break;
                                                case 'mysql':
                                                        dbConfig.innerHTML = '<label for="mysql-config">MySQL Configuration:</label><textarea id="mysql-config" name="mysql-config"></textarea>';
                                                        break;
                                                case 'postgresql':
                                                        dbConfig.innerHTML = '<label for="postgresql-config">PostgreSQL Configuration:</label><textarea id="postgresql-config" name="postgresql-config"></textarea>';
                                                        break;
                                                case 'email':
                                                        dbConfig.innerHTML = '<label for="email-config">Configuration to save to email:</label><input type="email" id="email-config" name="email-config" placeholder="Enter your email">';
                                                        break;
                                        }
                                });

                                document.getElementById('server-db-form').addEventListener('submit', function(event) {
                                        event.preventDefault();
                                        const dbType = document.getElementById('db-type').value;
                                        let config = '';

                                        switch (dbType) {
                                                case 'localStorage':
                                                        config = 'LocalStorage configured.';
                                                        break;
                                                case 'indexedDB':
                                                        config = 'IndexedDB configured.';
                                                        break;
                                                case 'firebase':
                                                        config = document.getElementById('firebase-config').value;
                                                        break;
                                                case 'mysql':
                                                        config = document.getElementById('mysql-config').value;
                                                        break;
                                                case 'postgresql':
                                                        config = document.getElementById('postgresql-config').value;
                                                        break;
                                                case 'email':
                                                        const email = document.getElementById('email-config').value;
                                                        config = \`Data saved to email: \${email}\`;
                                                        break;
                                        }

                                        alert(\`Configuration saved: \${config}\`);
                                });
                        </script>
                `,
        };

        const content = sections[sectionId] || '<h3>Section not found</h3><p>The requested section does not exist.</p>';
        document.querySelector('.container-settings').innerHTML = content + '<button id="back-to-settings">Back to Settings</button>';

        document.getElementById('back-to-settings').addEventListener('click', () => {
                document.querySelector('.container-settings').innerHTML = settings();
                initializeSettings();
        });
}