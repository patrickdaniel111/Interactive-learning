{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // js/auth.js\
\
// --- 1. CONFIGURACI\'d3N DE SUPABASE ---\
// \'a1IMPORTANTE! NO pongas tus llaves aqu\'ed en el c\'f3digo final.\
// Config\'faralas como Variables de Entorno en Netlify.\
// Para desarrollo local, puedes ponerlas aqu\'ed temporalmente.\
const SUPABASE_URL = ''; // PEGA AQU\'cd TU URL DE SUPABASE\
const SUPABASE_KEY = ''; // PEGA AQU\'cd TU LLAVE P\'daBLICA (ANON KEY)\
\
// Si las variables de entorno est\'e1n configuradas en Netlify, \'fasalas.\
const _supabase_url = typeof process !== 'undefined' ? process.env.SUPABASE_URL : SUPABASE_URL;\
const _supabase_key = typeof process !== 'undefined' ? process.env.SUPABASE_KEY : SUPABASE_KEY;\
\
const supabase = supabase.createClient(_supabase_url, _supabase_key);\
\
// --- 2. REFERENCIAS A ELEMENTOS DEL DOM ---\
const loginForm = document.getElementById('login-form');\
const logoutButton = document.getElementById('logout-button');\
const loginStatus = document.getElementById('login-status');\
const allScreens = document.querySelectorAll('.screen');\
const loginScreen = document.getElementById('login-screen');\
const modeSelectionScreen = document.getElementById('mode-selection-screen');\
const userInfo = document.getElementById('user-info');\
const userWelcome = document.getElementById('user-welcome');\
\
// --- 3. FUNCIONES DE AUTENTICACI\'d3N ---\
\
/**\
 * Maneja el evento de inicio de sesi\'f3n del formulario.\
 * @param \{Event\} e - El evento de submit del formulario.\
 */\
async function handleLogin(e) \{\
    e.preventDefault();\
    loginStatus.textContent = "Iniciando sesi\'f3n...";\
    const email = loginForm.email.value;\
    const password = loginForm.password.value;\
\
    try \{\
        const \{ data, error \} = await supabase.auth.signInWithPassword(\{\
            email: email,\
            password: password,\
        \});\
\
        if (error) throw error;\
        \
        // El resto de la l\'f3gica (cambio de pantalla, carga de datos) se maneja\
        // en el listener onAuthStateChange.\
        loginStatus.textContent = "";\
\
    \} catch (error) \{\
        console.error("Error en el inicio de sesi\'f3n:", error.message);\
        loginStatus.textContent = "Email o contrase\'f1a incorrectos. Int\'e9ntalo de nuevo.";\
    \}\
\}\
\
/**\
 * Cierra la sesi\'f3n del usuario actual.\
 */\
async function handleLogout() \{\
    try \{\
        const \{ error \} = await supabase.auth.signOut();\
        if (error) throw error;\
        // El listener onAuthStateChange se encargar\'e1 de volver a la pantalla de login.\
    \} catch (error) \{\
        console.error("Error al cerrar sesi\'f3n:", error.message);\
        loginStatus.textContent = "Error al cerrar sesi\'f3n.";\
    \}\
\}\
\
/**\
 * Actualiza la interfaz de usuario seg\'fan el estado de autenticaci\'f3n.\
 * @param \{User | null\} user - El objeto de usuario de Supabase, o null.\
 */\
function updateUserUI(user) \{\
    // Esconder todas las pantallas primero\
    allScreens.forEach(screen => screen.classList.remove('active'));\
    \
    if (user) \{\
        // Si hay un usuario, mostramos la pantalla de selecci\'f3n de modo\
        modeSelectionScreen.classList.add('active');\
        userInfo.classList.remove('hidden');\
        userWelcome.textContent = `Sesi\'f3n iniciada como $\{user.email\}`;\
    \} else \{\
        // Si no hay usuario, mostramos la pantalla de login\
        loginScreen.classList.add('active');\
        userInfo.classList.add('hidden');\
    \}\
\}\
\
// --- 4. EVENT LISTENERS ---\
\
// Listener para el formulario de login\
loginForm.addEventListener('submit', handleLogin);\
\
// Listener para el bot\'f3n de logout\
logoutButton.addEventListener('click', handleLogout);\
\
// Exportamos el cliente de Supabase y la funci\'f3n para actualizar UI\
// para que otros m\'f3dulos (como app.js) puedan usarlos.\
export \{ supabase, onAuthStateChanged, updateUserUI \};\
}