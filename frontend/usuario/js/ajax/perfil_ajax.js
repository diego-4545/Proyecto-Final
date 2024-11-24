import { verificarUsuario } from "./auth_ajax.js";

var global_url = "http://127.0.0.1:8000"


// Conseguir informacion del usuarios
function get_usuario_info() {
    const usuario_id = localStorage.getItem("usuario_id")

    $.ajax({
        url: global_url + "/api/usuario/" + usuario_id,
        method: "GET",
        contentType: "application/json",
        success: (response) => {
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
            }
            cambiar_navbar_con_info_usuario(usuario_info);
            cambiar_perfil_con_info_usuario(usuario_info);
        },
        error: (response) => {
            console.log("Respuesta: " + response);
        },
    });
}

// Cambiar info de la barra de navegación
async function cambiar_navbar_con_info_usuario(usuario_info) {
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
            console.log("Error al obtener el rol: " + error.responseText);
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

// Cambiar info de la página en general
function cambiar_perfil_con_info_usuario(usuario_info) {
    // Cambiando la imagen de perfil
    $("#main-info-usuario-foto").attr("src", usuario_info.foto_perfil);

    // Cambiando los datos del perfil
    $("#info-usuario-nombre").text(usuario_info.nombre);
    $("#info-usuario-correo").text(usuario_info.email);
    $("#info-usuario-descripcion").text(usuario_info.descripcion);
}

// Cambiar etiquetas
function cambiar_perfil_etiquetas_usuario() {

}


// Cambiar articulos
function cambiar_perfil_articulos_usuario() {
    
}


// Función del boton de cerrar sesión
function cerrar_sesion() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("usuario_id");
    localStorage.removeItem("rol_id");

    window.location.href = "/";
}


// Cargar todo al cargar la página
$(document).ready(async () => {
    // Autenticación
    await verificarUsuario();

    // Cambios de pantalla dinamico con la info de la BD
    get_usuario_info();

    // Funcion para cerrar la sesion con el boton
    $("#boton-cerrar-cuenta").on("click", () => cerrar_sesion());
});
