import { verificarUsuario } from "../../../usuario/js/ajax/auth_ajax";

var global_url = "http://127.0.0.1:8000";

// Conseguir información del usuario
function get_usuario_info() {
    const usuario_id = localStorage.getItem("usuario_id");

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
                "foto_perfil": response.foto_perfil,
                "rol_id": response.rol_id,
            };
            cambiar_navbar_con_info_usuario(usuario_info);
        },
        error: (response) => {
            console.log("Error al obtener información del usuario: " + response.responseText);
            mostrar_inicia_sesion(); // Mostrar "Inicia sesión" si no hay información
        },
    });
}

// Cambiar la barra de navegación con información del usuario
async function cambiar_navbar_con_info_usuario(usuario_info) {
    // Mostrar el ícono de perfil y ocultar "Inicia sesión"
    $("#perfil-icono").css("display", "flex");
    $("#inicia-sesion").css("display", "none");

    // Actualizar la información de la barra de navegación
    $("#navbar-info-usuario-nombre").text(usuario_info.usuario);
    $("#navbar-info-usuario-foto").attr("src", usuario_info.foto_perfil);

    // Obtener y mostrar el rol del usuario
    const rol_nombre = await get_rol_nombre(usuario_info.rol_id);
    if (rol_nombre) {
        $("#navbar-info-usuario-rol").text(rol_nombre);
    }
}

// Obtener el nombre del rol del usuario
async function get_rol_nombre(rol_id) {
    try {
        const response = await $.ajax({
            url: global_url + "/api/usuario-rol/" + rol_id,
            method: "GET",
            contentType: "application/json",
        });
        return response.nombre; // Retorna el nombre del rol
    } catch (error) {
        console.log("Error al obtener el rol: " + error.responseText);
        return null;
    }
}

// Mostrar "Inicia sesión" si no hay usuario logueado
function mostrar_inicia_sesion() {
    $("#perfil-icono").css("display", "none");
    $("#inicia-sesion").css("display", "block");
}

// Cerrar sesión
function cerrar_sesion() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("usuario_id");
    localStorage.removeItem("rol_id");

    window.location.href = "/";
}

// Cargar todo al cargar la página
$(document).ready(async () => {
    // Verificar si el usuario está autenticado
    await verificarUsuario();

    // Obtener la información del usuario y actualizar la interfaz
    get_usuario_info();

    // Configurar el botón para cerrar sesión
    $("#boton-cerrar-cuenta").on("click", () => cerrar_sesion());
});
