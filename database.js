{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // js/database.js\
\
// Importamos el cliente de Supabase desde el m\'f3dulo de autenticaci\'f3n.\
import \{ supabase \} from './auth.js';\
\
/**\
 * Carga los datos y el progreso de un estudiante desde la tabla 'students'.\
 * @param \{string\} userId - El ID de usuario \'fanico de Supabase Auth.\
 * @returns \{object | null\} - Un objeto con los datos del estudiante o null si no se encuentra.\
 */\
async function loadStudentData(userId) \{\
    if (!userId) \{\
        console.error("No se proporcion\'f3 userId para cargar datos.");\
        return null;\
    \}\
    \
    try \{\
        // Seleccionamos el registro del estudiante que coincida con el user_id de autenticaci\'f3n.\
        const \{ data, error \} = await supabase\
            .from('students')\
            .select('*')\
            .eq('user_id', userId)\
            .single(); // .single() espera un solo resultado, lo que es ideal aqu\'ed.\
\
        if (error) \{\
            // Si el error es 'PGRST116', significa que no se encontr\'f3 la fila. Es normal la primera vez.\
            if (error.code === 'PGRST116') \{\
                console.log('No se encontr\'f3 un perfil para este usuario. Se crear\'e1 uno nuevo.');\
                return null;\
            \}\
            throw error;\
        \}\
\
        return data;\
\
    \} catch (error) \{\
        console.error("Error al cargar los datos del estudiante:", error.message);\
        return null;\
    \}\
\}\
\
/**\
 * Guarda (o actualiza) el progreso de un estudiante en la tabla 'students'.\
 * @param \{object\} studentProfile - El objeto completo del perfil del estudiante a guardar.\
 * Esto incluye id, user_id, full_name, course y el objeto de progreso.\
 */\
async function saveStudentProgress(studentProfile) \{\
    if (!studentProfile || !studentProfile.id) \{\
        console.error("Datos del estudiante inv\'e1lidos para guardar.");\
        return;\
    \}\
\
    try \{\
        // Usamos 'upsert' para actualizar el registro si ya existe (basado en el 'id' primario)\
        // o insertarlo si es nuevo.\
        const \{ data, error \} = await supabase\
            .from('students')\
            .upsert(studentProfile)\
            .select()\
            .single();\
\
        if (error) throw error;\
        \
        console.log("Progreso guardado con \'e9xito:", data);\
\
    \} catch (error) \{\
        console.error("Error al guardar el progreso:", error.message);\
    \}\
\}\
\
/**\
 * Registra una actividad espec\'edfica en la tabla 'activities'.\
 * @param \{string\} student_id - El ID del perfil del estudiante (de la tabla 'students').\
 * @param \{string\} description - La descripci\'f3n de la actividad.\
 */\
async function logActivity(student_id, description) \{\
    if (!student_id || !description) \{\
        console.error("Falta el ID del estudiante o la descripci\'f3n para registrar la actividad.");\
        return;\
    \}\
    \
    try \{\
        const newActivity = \{\
            student_id,\
            description,\
        \};\
\
        const \{ error \} = await supabase.from('activities').insert(newActivity);\
\
        if (error) throw error;\
\
        console.log(`Actividad registrada: $\{description\}`);\
\
    \} catch(error) \{\
        console.error("Error al registrar actividad:", error.message);\
    \}\
\}\
\
\
// Exportamos las funciones para que app.js pueda usarlas.\
export \{ loadStudentData, saveStudentProgress, logActivity \};\
}