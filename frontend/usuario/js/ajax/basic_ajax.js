var global_url = "http://127.0.0.1:8000"


// Conseguir informacion del usuarios
export async function get_usuario_info() {
    const usuario_id = localStorage.getItem("usuario_id");

    try {
        const response = await $.ajax({
            url: global_url + "/api/usuario/" + usuario_id,
            method: "GET",
            contentType: "application/json",
        });

        const usuario_info = {
            "usuario_id": usuario_id,
            "nombre": response.nombre,
            "usuario": response.usuario,
            "email": response.email,
            "fecha": response.fecha,
            "descripcion": response.descripcion,
            "foto_perfil": response.foto_perfil,
            "rol_id": response.rol_id,
            "contraseña": response.contraseña,
        };
        return usuario_info; // Retorna los datos del usuario
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        throw error; // Lanza el error para manejarlo en el código que llama a esta función
    }
}


// Cambiar info de la barra de navegación
export async function cambiar_navbar_con_info_usuario(usuario_info) {
    // Cambiamos el nombre de usuario de la barra de navegación
    $("#navbar-info-usuario-nombre").text(usuario_info.usuario);

    // Función para obtener el nombre del rol
    async function get_rol_nombre(rol_id) {
        try {
            const response = await $.ajax({
                url: global_url + "/api/usuario-rol/" + rol_id,
                method: "GET",
                contentType: "application/json",
            });
            return response.nombre; // Devuelve el nombre del rol
        } catch (error) {
            console.error("Error al obtener el rol: " + error.responseText);
            return null;
        }
    }
    // Esperamos el resultado de get_rol_nombre y actualizamos la navbar
    const rol_nombre = await get_rol_nombre(usuario_info.rol_id);
    if (rol_nombre) {
        // Cambiamos el nombre del rol de la barra de navegación
        $("#navbar-info-usuario-rol").text(rol_nombre);
    }

    // Cambiamos la imagen de perfil de la barra de navegación
    $("#navbar-info-usuario-foto").attr("src", usuario_info.foto_perfil);
}