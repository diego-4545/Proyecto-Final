import { verificarAdmin } from "./auth_ajax.js";

var global_url = "http://127.0.0.1:8000"

// Conseguir informacion del usuarios
async function get_usuario_info() {
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
async function cambiar_navbar_con_info_usuario(usuario_info) {
    // Cambiamos el nombre de usuario de la barra de navegación
    $("#navbar-info-usuario-nombre").text(usuario_info.usuario);
    
    // Cambiamos la imagen de perfil de la barra de navegación
    $("#navbar-info-usuario-foto").attr("src", usuario_info.foto_perfil);
}


$(document).ready(async () => {
    // Autenticacion
    await verificarAdmin();

    // Obtener infor del usuario
    const usuario_info = await get_usuario_info();

    // Cambiar informacion de la navbar
    cambiar_navbar_con_info_usuario(usuario_info);

    
});

async function get_dudas_info() {
    const usuario_id = localStorage.getItem("usuario_id");

    try {
        const response = await $.ajax({
            url: global_url + "/apiduda/" + usuario_id,
            method: "GET",
            contentType: "application/json",
        });

        const duda_info = {
            "email": response.email,
            "contenido": response.contenido,
        };
        return usuario_info; // Retorna los datos del usuario
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        throw error; // Lanza el error para manejarlo en el código que llama a esta función
    }
}