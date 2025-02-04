import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Reemplaza con tus datos de Supabase
const supabaseUrl = 'https://xmrwfczwshpybodmwikf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtcndmY3p3c2hweWJvZG13aWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2MjU2NzcsImV4cCI6MjA1NDIwMTY3N30.aSyxmrTGyHuUQhMAO-C7SlkkSw8yV-gP7NkLuD_VDRw';
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function registerUser(name, email, password, photo) {
    console.log("Registrando usuario:", name, email);

    // Primero, crea la cuenta en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (authError) {
        console.error("Error en Auth:", authError);
        alert("Error: " + authError.message);
        return;
    }

    console.log("Auth Data:", authData);

    if (!authData || !authData.user) {
        alert("Error al registrar usuario. Intenta con otro email.");
        return;
    }

    // Luego, guarda los datos en la tabla "users"
    const { error: dbError } = await supabase
        .from("users")
        .insert([{ id: authData.user.id, name, email, password, photo }]);

    if (dbError) {
        console.error("Error al guardar en la BD:", dbError);
        // alert("Error al guardar los datos.");
        return;
    }

    // Guardar datos en sessionStorage
    sessionStorage.setItem('userSession', JSON.stringify({ id: authData.user.id, name, email, photo }));
    sessionStorage.setItem('isLoggedIn', 'true');
}


// Función para iniciar sesión
export async function loginUser(email, password) {
    console.log("Iniciando sesión:", email);

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error("Error en login:", error);
        alert("Credenciales incorrectas.");
        return;
    }

    // Obtener datos del usuario desde la tabla "users"
    const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (userError) {
        console.error("Error al obtener usuario:", userError);
        alert("Error al cargar datos del usuario.");
        return;
    }



    // Guardar datos en sessionStorage
    sessionStorage.setItem('userSession', JSON.stringify(userData));
    sessionStorage.setItem('isLoggedIn', 'true');

    window.location.reload();
}

// Función para cerrar sesión
export function logoutUser() {
    window.logout = async function () {
        await supabase.auth.signOut();
        sessionStorage.clear();
        window.location.reload();
    };
}


export async function updateUser(userId, newName, newEmail, newPhoto) {
    const { data, error } = await supabase
        .from('users')
        .update({ name: newName, email: newEmail, photo: newPhoto })  // Los campos a actualizar
        .eq('id', userId);  // Condición para seleccionar al usuario correcto

    if (error) {
        console.error("Error al actualizar los datos:", error);
        alert("Error al actualizar los datos.");
        return;
    }

    console.log("Datos actualizados exitosamente:", data);
    window.location.reload();
}