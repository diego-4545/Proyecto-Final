import { verificarUsuario } from "./auth_ajax.js";

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

        cambiar_navbar_con_info_usuario(usuario_info);
        cambiar_perfil_con_info_usuario(usuario_info);
        cambiar_perfil_etiquetas_usuario();
        cambiar_perfil_articulos_usuario();

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


// Cambiar info de la página en general
function cambiar_perfil_con_info_usuario(usuario_info) {
    // Cambiando la imagen de perfil
    $("#main-info-usuario-foto").attr("src", usuario_info.foto_perfil);

    // Cambiando los datos del perfil
    $("#info-usuario-nombre").text(usuario_info.nombre);
    $("#info-usuario-correo").text(usuario_info.email);
    $("#info-usuario-descripcion").text(usuario_info.descripcion);
}


// Obtenemos una lista de etiquetas
async function cambiar_perfil_etiquetas_usuario() {
    const usuario_id = localStorage.getItem("usuario_id")
    
    // Obtener IDs de etiquetas de un usuario especifico
    async function obtener_id_etiquetas(usuario_id) {
        try {    
            const etiquetas = await $.ajax({
                url: global_url + "/api/usuario-etiqueta/" + usuario_id,
                method: "GET",
                contentType: "application/json",
            });
            return etiquetas.etiquetas
        } catch (error) {
            console.error("Error al obtener las etiquetas del usuario: " + error);
            return null;
        }
    }

    // Obtener el nombre de una etiqueta específica
    async function obtener_nombre_etiqueta(etiqueta_id) {
        try {
            const etiqueta_info = await $.ajax({
                url: global_url + "/api/etiqueta-nombre/" + etiqueta_id,
                method: "GET",
                contentType: "application/json",
            });
            return etiqueta_info.nombre;
        } catch (error) {
            console.error("Error al obtener el nombre de la etiqueta: " + error);
            return null;
        }
    }

    const etiquetas_ids = await obtener_id_etiquetas(usuario_id);
    if (etiquetas_ids) {
        // Obtenemos cada nombre de cada etiqueta y las añadimos a la lista del perfil del usuario
        for (const id of etiquetas_ids) {
            const etiqueta = await obtener_nombre_etiqueta(id); // Esperar el nombre de la etiqueta
            if (etiqueta) {
                // Crear el elemento <li> y el <span>
                const li = $('<li>', { class: 'etiquetas' });
                const span = $('<span>', { id: 'info-etiqueta-nombre', text: etiqueta });
                
                // Añadir el <span> dentro del <li>
                li.append(span);
                
                // Añadir el <li> al <ul>
                $('#lista').append(li);
            }
        }
    }
}


// Cambiar articulos
function cambiar_perfil_articulos_usuario() {

}



// Funcion para cambiar la imagen de perfil
function cambiar_foto_de_perfil(usuario_info) {
    // Obtener el ID del usuario desde localStorage
    const usuario_id = localStorage.getItem("usuario_id");

    // Obtener la imagen seleccionada
    const imagenSeleccionada = document.getElementById("foto-perfil-seleccionada").value;

    // Realizar la solicitud AJAX para actualizar la imagen de perfil
    $.ajax({
        url: global_url + "/api/usuario",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({ 
            "usuario_id": usuario_id,
            "nombre": usuario_info.nombre,
            "usuario": usuario_info.usuario,
            "email": usuario_info.email,
            "fecha": usuario_info.fecha,
            "descripcion": usuario_info.descripcion,
            "foto_perfil": imagenSeleccionada,
            "rol_id": usuario_info.rol_id,
            "contraseña": usuario_info.contraseña, 
        }),
        success: (response) => {
            // Actualizar la imagen en la interfaz de usuario
            $("#navbar-info-usuario-foto").attr("src", imagenSeleccionada);
            $("#main-info-usuario-foto").attr("src", imagenSeleccionada);
        },
        error: (response) => {
            console.error("Error al actualizar la imagen de perfil: " + response.responseText);
        },
    });
}
// Función para guardar la imagen seleccionada y llamar a cambiar_foto_de_perfil
function guardarImagen(usuario_info) {
    // Obtener el botón activo
    const selectedButton = document.querySelector("#form-foto-perfil .toggle-btn.active");
    if (!selectedButton) {
        alert("Por favor, selecciona una imagen antes de guardar.");
        return;
    }
    // Establecer el valor en el campo oculto
    $("#foto-perfil-seleccionada").val(selectedButton.getAttribute("value"));
    // Llamar a la función para cambiar la foto de perfil
    cambiar_foto_de_perfil(usuario_info);
    // Cerrar el modal
    $("#cambiar-imagen-modal").modal("hide");
}


// Funcion para modificar los datos del perfil
function cambiar_datos_usuario(usuario_info) {
    let nombre = $("#form-usuario-nombre").value;
    if (!nombre) {nombre = usuario_info.nombre;}

    let correo = $("#form-usuario-email").value;
    if (!correo) {correo = usuario_info.correo;}

    let username = $("#form-usuario-username").value;
    if (!username) {username = usuario_info.usuario;}

    let constraseña = $("#form-usuario-constraseña").value;
    if (!constraseña) {constraseña = usuario_info.constraseña;}

    let descripcion = $("#form-usuario-descripcion").value;
    if (!descripcion) {descripcion = usuario_info.descripcion;}

    $.ajax({
        url: global_url + "/api/usuario",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({ 
            "usuario_id": usuario_id,
            "nombre": nombre,
            "usuario": username,
            "email": correo,
            "fecha": usuario_info.fecha,
            "descripcion": descripcion,
            "foto_perfil": usuario_info.foto_perfil,
            "rol_id": usuario_info.rol_id,
            "contraseña": constraseña, 
        }),
        success: (response) => {
            // Cambios de pantalla dinamico con la info de la BD
            get_usuario_info();
        },
        error: (response) => {
            console.error("Error al actualizar la imagen de perfil: " + response);
        }, 
    });
}


// Funcion para cambiar las etiquetas del usuario
function cambiar_etiquetas() {

}



// Función del boton de cerrar sesión
function cerrar_sesion() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("usuario_id");
    localStorage.removeItem("rol_id");

    window.location.href = "/";
}

// Funcion del boton de eliminar la cuenta
function eliminar_cuenta() {
    
}

// Cargar todo al cargar la página
$(document).ready(async () => {
    // Autenticación
    await verificarUsuario();

    // Cambios de pantalla dinamico con la info de la BD
    const usuario_info = await get_usuario_info();
    console.log(usuario_info);

    // Cambiar imagen de perfil
    $("#guardar-imagen-btn").on("click", () => guardarImagen(usuario_info));
    //Cambiar datos del usuario
    $("#boton-cambiar-datos-usuario").on("click", () => cambiar_datos_usuario(usuario_info));

    // Funcion para cerrar la sesion con el boton
    $("#boton-cerrar-cuenta").on("click", () => cerrar_sesion());
    // Funcion para eliminar la cuenta con el boton
    $("#boton-modal-eliminar-cuenta").on("click", () => eliminar_cuenta());
});
