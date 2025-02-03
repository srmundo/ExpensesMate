# Aplicación de Presupuesto Personal

Este proyecto es una aplicación web para la gestión de presupuesto personal. La aplicación permite a los usuarios registrar y analizar sus ingresos y gastos, generar informes financieros, y configurar alertas y notificaciones.

## Estructura del Proyecto

### Frontend (Angular)

- **Componentes**
  - `HomeComponent`: Página principal de la aplicación.
  - `DashboardComponent`: Vista general del presupuesto, gráficos, y análisis.
  - `TransactionsComponent`: Listado y gestión de ingresos y gastos.
  - `ReportsComponent`: Generación y visualización de informes financieros.
  - `SettingsComponent`: Configuración de la cuenta y preferencias.
  - `LoginComponent`: Página de inicio de sesión.
  - `SignupComponent`: Página de registro de usuario.
  - `ProfileComponent`: Gestión del perfil de usuario.

- **Servicios**
  - `AuthService`: Manejo de autenticación de usuarios.
  - `BudgetService`: Gestión del presupuesto y transacciones.
  - `ReportService`: Generación de informes y análisis.
  - `NotificationService`: Manejo de notificaciones (email, SMS, push).

- **Rutas**
  - `/`: Redirige a `/dashboard` si el usuario está autenticado, de lo contrario, a `/login`.
  - `/login`: Página de inicio de sesión.
  - `/signup`: Página de registro.
  - `/dashboard`: Vista principal del presupuesto.
  - `/transactions`: Gestión de ingresos y gastos.
  - `/reports`: Visualización de informes.
  - `/settings`: Configuración de la aplicación.

### Backend (Django/Flask)

- **Modelos**
  - `User`: Información del usuario (nombre, email, contraseña, preferencias).
  - `Transaction`: Detalles de las transacciones (monto, tipo, categoría, fecha).
  - `Category`: Categorías para las transacciones (Alimentos, Transporte, etc.).
  - `Budget`: Información del presupuesto mensual/anual (ingresos, gastos, balance).
  - `Report`: Informes generados por el usuario (mensuales, anuales, personalizados).

- **APIs**
  - `auth/`: Endpoints para autenticación (login, signup, logout).
  - `transactions/`: CRUD de transacciones (crear, leer, actualizar, eliminar).
  - `categories/`: Gestión de categorías.
  - `budget/`: Manejo del presupuesto.
  - `reports/`: Generación y consulta de informes.

- **Base de Datos**
  - PostgreSQL o MySQL, con las tablas correspondientes a los modelos.

- **Middleware**
  - Autenticación y autorización.
  - Validación de datos.
  - Gestión de errores.

## Secciones de la Aplicación

1. **Dashboard (Panel Principal)**
   - **Descripción:** Muestra un resumen del presupuesto actual, incluyendo el total de ingresos, gastos, y el balance disponible. También incluye gráficos como:
     - **Gráfico de barras**: Gastos vs. Ingresos por mes.
     - **Gráfico de pastel**: Distribución de gastos por categoría.
     - **Gráfico de línea**: Evolución del balance mensual.

2. **Transactions (Transacciones)**
   - **Descripción:** Permite a los usuarios agregar, ver, editar, y eliminar transacciones. Se incluyen filtros por fecha, categoría y tipo de transacción (ingreso/gasto).
   - **Campos a Incluir:**
     - Monto.
     - Fecha.
     - Categoría.
     - Tipo (Ingreso/Gasto).
     - Notas opcionales.

3. **Reports (Informes)**
   - **Descripción:** Sección donde el usuario puede generar informes financieros detallados. Los informes pueden ser mensuales, trimestrales, anuales, o personalizados.
   - **Funcionalidades:**
     - Generación de PDF o Excel de los informes.
     - Comparación entre diferentes periodos.
     - Análisis de tendencias de gastos e ingresos.

4. **Settings (Configuración)**
   - **Descripción:** Configuración de la aplicación y la cuenta del usuario.
   - **Subsecciones:**
     - **Cuenta:** Cambio de contraseña, actualización de email, eliminar cuenta.
     - **Preferencias:** Configuración de moneda, idioma, y preferencias de notificación.
     - **Integraciones:** Integración con otras plataformas (bancos, apps de terceros).
     - **Seguridad:** Autenticación de dos factores, historial de inicio de sesión.

5. **Profile (Perfil)**
   - **Descripción:** Muestra y permite editar la información personal del usuario.
   - **Campos a Incluir:**
     - Nombre.
     - Correo electrónico.
     - Imagen de perfil.

## Configuración de la Aplicación

- **Autenticación y Seguridad**
  - Implementación de autenticación JWT para proteger las rutas y recursos.
  - Soporte para autenticación social (Google, Facebook) si es necesario.
  - Autenticación de dos factores como una opción en la configuración de seguridad.

- **Notificaciones**
  - Notificaciones por email para eventos importantes (transacción cercana al límite presupuestario, recordatorio de pago).
  - Soporte para notificaciones push en dispositivos móviles.

- **Preferencias de Usuario**
  - Personalización del intervalo de presupuesto (mensual, bimensual, anual).
  - Posibilidad de elegir el formato de moneda y el idioma de la aplicación.
  - Configuración de alertas y recordatorios automáticos.

## Opciones Avanzadas

- **Sincronización con Bancos**
  - Implementar integración con APIs de bancos para importar automáticamente transacciones.
  - Asignación automática de categorías basadas en la descripción de la transacción.

- **Análisis y Predicciones**
  - Implementar análisis predictivos para estimar gastos futuros basados en patrones anteriores.
  - Sugerencias automáticas para mejorar la salud financiera del usuario.

- **Modo Offline**
  - Permitir que la aplicación funcione en modo offline, sincronizando los datos una vez se recupere la conexión.
