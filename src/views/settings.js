export function settings() {
  return `
          <div class="container-settings">
              <span class="title-settings"><h4>Settings</h4></span>
        <div class="settings-section">
            <h2>Cuenta</h2>
            <ul>
                <li><a href="#change-password">Cambio de contraseña</a></li>
                <li><a href="#update-email">Actualización de email</a></li>
                <li><a href="#delete-account">Eliminar cuenta</a></li>
            </ul>
        </div>
        <div class="settings-section">
            <h2>Preferencias</h2>
            <ul>
                <li><a href="#currency-settings">Configuración de moneda</a></li>
                <li><a href="#language-settings">Idioma</a></li>
                <li><a href="#notification-preferences">Preferencias de notificación</a></li>
            </ul>
        </div>
        <div class="settings-section">
            <h2>Integraciones</h2>
            <ul>
                <li><a href="#server-database-settings">Configuración de servidor y base de datos</a></li>
                <li><a href="#bank-integration">Integración con bancos</a></li>
                <li><a href="#third-party-apps">Apps de terceros</a></li>
            </ul>
        </div>
        <div class="settings-section">
            <h2>Seguridad</h2>
            <ul>
                <li><a href="#two-factor-auth">Autenticación de dos factores</a></li>
                <li><a href="#login-history">Historial de inicio de sesión</a></li>
            </ul>
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
        'change-password': '<h3>Cambio de contraseña</h3><p>Aquí puedes cambiar tu contraseña.</p>',
        'update-email': '<h3>Actualización de email</h3><p>Aquí puedes actualizar tu email.</p>',
        'delete-account': '<h3>Eliminar cuenta</h3><p>Aquí puedes eliminar tu cuenta.</p>',
        'currency-settings': '<h3>Configuración de moneda</h3><p>Aquí puedes configurar la moneda.</p>',
        'language-settings': '<h3>Idioma</h3><p>Aquí puedes cambiar el idioma.</p>',
        'notification-preferences': '<h3>Preferencias de notificación</h3><p>Aquí puedes configurar las notificaciones.</p>',
        'bank-integration': '<h3>Integración con bancos</h3><p>Aquí puedes integrar con bancos.</p>',
        'third-party-apps': '<h3>Apps de terceros</h3><p>Aquí puedes gestionar apps de terceros.</p>',
        'two-factor-auth': '<h3>Autenticación de dos factores</h3><p>Aquí puedes configurar la autenticación de dos factores.</p>',
        'login-history': '<h3>Historial de inicio de sesión</h3><p>Aquí puedes ver el historial de inicio de sesión.</p>',
        'server-database-settings': `
            <h3>Configuración de servidor y base de datos</h3>
            <p>Aquí puedes configurar el servidor y la base de datos para tu aplicación de presupuesto personal.</p>
            <form id="server-db-form">
                <label for="db-type">Tipo de base de datos:</label>
                <select id="db-type" name="db-type">
                    <option value="localStorage">LocalStorage</option>
                    <option value="indexedDB">IndexedDB</option>
                    <option value="firebase">Firebase</option>
                    <option value="mysql">MySQL</option>
                    <option value="postgresql">PostgreSQL</option>
                    <option value="email">Guardar en correo electrónico</option>
                </select>
                <div id="db-config"></div>
                <button type="submit">Guardar configuración</button>
            </form>
            <script>
                document.getElementById('db-type').addEventListener('change', function() {
                    const dbConfig = document.getElementById('db-config');
                    dbConfig.innerHTML = '';
                    switch (this.value) {
                        case 'localStorage':
                            dbConfig.innerHTML = '<p>Usando LocalStorage del navegador.</p>';
                            break;
                        case 'indexedDB':
                            dbConfig.innerHTML = '<p>Configuración para IndexedDB.</p>';
                            break;
                        case 'firebase':
                            dbConfig.innerHTML = '<label for="firebase-config">Configuración de Firebase:</label><textarea id="firebase-config" name="firebase-config"></textarea>';
                            break;
                        case 'mysql':
                            dbConfig.innerHTML = '<label for="mysql-config">Configuración de MySQL:</label><textarea id="mysql-config" name="mysql-config"></textarea>';
                            break;
                        case 'postgresql':
                            dbConfig.innerHTML = '<label for="postgresql-config">Configuración de PostgreSQL:</label><textarea id="postgresql-config" name="postgresql-config"></textarea>';
                            break;
                        case 'email':
                            dbConfig.innerHTML = '<label for="email-config">Configuración para guardar en correo electrónico:</label><input type="email" id="email-config" name="email-config" placeholder="Ingresa tu correo electrónico">';
                            break;
                    }
                });

                document.getElementById('server-db-form').addEventListener('submit', function(event) {
                    event.preventDefault();
                    const dbType = document.getElementById('db-type').value;
                    let config = '';

                    switch (dbType) {
                        case 'localStorage':
                            config = 'LocalStorage configurado.';
                            break;
                        case 'indexedDB':
                            config = 'IndexedDB configurado.';
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
                            config = \`Datos guardados en el correo electrónico: \${email}\`;
                            break;
                    }

                    alert(\`Configuración guardada: \${config}\`);
                });
            </script>
        `,
    };

    const content = sections[sectionId] || '<h3>Sección no encontrada</h3><p>La sección solicitada no existe.</p>';
    document.querySelector('.container-settings').innerHTML = content + '<button id="back-to-settings">Volver a Configuración</button>';

    document.getElementById('back-to-settings').addEventListener('click', () => {
        document.querySelector('.container-settings').innerHTML = settings();
        initializeSettings();
    });
}