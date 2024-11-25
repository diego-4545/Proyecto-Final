import { verificarUsuario } from "./auth_ajax.js";

import { get_usuario_info } from "./basic_ajax.js";
import { cambiar_navbar_con_info_usuario } from "./basic_ajax.js";


var global_url = "http://127.0.0.1:8000"


// Mostrar info de la página en general
function mostrar_perfil_con_info_usuario(usuario_info) {
    // Cambiando la imagen de perfil
    $("#main-info-usuario-foto").attr("src", usuario_info.foto_perfil);

    // Cambiando los datos del perfil
    $("#info-usuario-nombre").text(usuario_info.nombre);
    $("#info-usuario-username").text(usuario_info.usuario);
    $("#info-usuario-correo").text(usuario_info.email);
    $("#info-usuario-descripcion").text(usuario_info.descripcion);
}

// Mostrar lista de etiquetas
async function mostrar_perfil_etiquetas_usuario() {
    const usuario_id = localStorage.getItem("usuario_id");

    // Obtener IDs de etiquetas de un usuario especifico
    async function obtener_id_etiquetas(usuario_id) {
        try {    
            const etiquetas = await $.ajax({
                url: global_url + "/api/usuario-etiqueta/" + usuario_id,
                method: "GET",
                contentType: "application/json",
            });
            return etiquetas.etiquetas;
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

    // Limpiamos la lista de etiquetas antes de agregar las nuevas
    $("#lista").find("li").remove();

    const etiquetas_ids = await obtener_id_etiquetas(usuario_id);
    if (etiquetas_ids) {
        try {
            // Obtenemos los nombres de todas las etiquetas en paralelo
            const nombresEtiquetas = await Promise.all(
                etiquetas_ids.map(id => obtener_nombre_etiqueta(id))
            );

            // Iteramos sobre los nombres de las etiquetas para agregarlas al DOM
            nombresEtiquetas.forEach(etiqueta => {
                if (etiqueta) {
                    // Crear el elemento <li> y el <span>
                    const li = $('<li>', { class: 'etiquetas' });
                    const span = $('<span>', { id: 'info-etiqueta-nombre', text: etiqueta });

                    // Añadir el <span> dentro del <li>
                    li.append(span);

                    // Añadir el <li> al <ul>
                    $('#lista').append(li);
                }
            });
        } catch (error) {
            console.error("Error al procesar las etiquetas: ", error);
        }
    }
}

// Mostrar articulos
async function mostrar_perfil_articulos_usuario() {
    const usuario_id = localStorage.getItem("usuario_id");

    // Obtener IDs de articulos de un usuario especifico
    async function obtener_id_articulos(usuario_id) {
        try {
            const articulos = await $.ajax({
                url: global_url + "/api/articulos-usuario/" + usuario_id,
                method: "GET",
                contentType: "application/json",
            });
            return articulos.articulo_ids;
        } catch (error) {
            console.error("Error al obtener los articulos del usuario: " + error);
            return null;
        }
    }

    // Obtener la informacion de cada articulo
    async function obtener_nombre_articulo(articulo_id) {
        try {
            const articulo_info = await $.ajax({
                url: global_url + "/api/articulo/" + articulo_id,
                method: "GET",
                contentType: "application/json",
            });
            return articulo_info;
        } catch (error) {
            console.error("Error al obtener la informacion del articulo: " + error);
            return null;
        }
    }

    $("#galeria-articulos").find(".col-md-4").remove();

    const articulos_ids = await obtener_id_articulos(usuario_id);
    if (articulos_ids) {
        // Limitamos la cantidad de artículos a solo 3 en el perfil
        const limite = 3;
        const articulos_limited_ids = articulos_ids.slice(0, limite);

        try {
            // Obtenemos la información de los artículos en paralelo
            const articulos = await Promise.all(
                articulos_limited_ids.map(id => obtener_nombre_articulo(id))
            );

            // Iteramos sobre los artículos y los añadimos a la galería
            articulos.forEach(articulo => {
                if (articulo) {
                    const articulo_bloque = `
                        <div class="col-md-4">
                            <div class="card articulo">
                                <a href="/articulo">
                                    <img id="info-articulo-imagen-${articulo.id}" src="${articulo.imagen}" class="card-img-top" alt="${articulo.nombre}">
                                </a>
                                <div class="card-body">
                                    <h5 id="info-articulo-titulo-${articulo.id}" class="card-title text-center">${articulo.nombre}</h5>
                                </div>
                            </div>
                        </div>
                    `;
                    $('#galeria-articulos').append(articulo_bloque);
                }
            });
        } catch (error) {
            console.error("Error al procesar los artículos: ", error);
        }
    }
}


// Cambiar la imagen de perfil
function cambiar_foto_de_perfil(usuario_info) {
    // Obtener el ID del usuario desde localStorage
    const usuario_id = localStorage.getItem("usuario_id");

    // Obtener la imagen seleccionada
    const imagenSeleccionada = $("#foto-perfil-seleccionada").val();

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
    window.location.href = "/perfil";
}

// Cambiar los datos del perfil
function cambiar_datos_usuario(usuario_info) {
    let nombre = $("#form-usuario-nombre").val();
    if (!nombre) {nombre = usuario_info.nombre;}

    let correo = $("#form-usuario-email").val();
    if (!correo) {correo = usuario_info.email;}

    let username = $("#form-usuario-username").val();
    if (!username) {username = usuario_info.usuario;}

    let contraseña = $("#form-usuario-contraseña").val();
    if (!contraseña) {contraseña = usuario_info.contraseña;}

    let descripcion = $("#form-usuario-descripcion").val();
    if (!descripcion) {descripcion = usuario_info.descripcion;}

    const usuario_id = localStorage.getItem("usuario_id");

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
            "contraseña": contraseña, 
        }),
        success: (response) => {
            // Cambios de pantalla dinamico con la info de la BD
            get_usuario_info();
        },
        error: (response) => {
            console.error("Error al actualizar la imagen de perfil: " + response);
        }, 
    });
    // Cerrar el modal
    $("#modificar-datos-modal").modal("hide");
    // Recargar página
    window.location.href = "/perfil";
}

// Cambiar las etiquetas del usuario
function cambiar_etiquetas() {
    window.location.href = "/perfil";
}


// Cerrar sesión
function cerrar_sesion() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("usuario_id");
    localStorage.removeItem("rol_id");

    window.location.href = "/";
}

// Eliminar la cuenta
function eliminar_cuenta() {
    const usuario_id = localStorage.getItem("usuario_id");

    $.ajax({
        url: global_url + "/api/usuario/" + usuario_id,
        method: "DELETE",
        contentType: "application/json",
        success: (response) => {
            console.log("Usuario eliminado exitosamente");
            
            localStorage.removeItem("access_token");
            localStorage.removeItem("usuario_id");
            localStorage.removeItem("rol_id");

            window.location.href = "/";
        },
        error: (response) => {
            console.error("Error al eliminar al usuario: " + response);
        }, 
    });
}



// Cargar todo al cargar la página
$(document).ready(async () => {
    // Autenticación
    await verificarUsuario();

    // Cambios de pantalla dinamico con la info de la BD
    const usuario_info = await get_usuario_info();
    console.log(usuario_info);

    // Modificar navbar
    cambiar_navbar_con_info_usuario(usuario_info);

    // Mostrar info en el perfil
    mostrar_perfil_con_info_usuario(usuario_info);
    // Mostrar etiquetas
    mostrar_perfil_etiquetas_usuario();
    // Mostrar articulos
    mostrar_perfil_articulos_usuario();

    // Cambiar imagen de perfil
    $("#guardar-imagen-btn").on("click", () => guardarImagen(usuario_info));
    //Cambiar datos del usuario
    $("#boton-cambiar-datos-usuario").on("click", () => cambiar_datos_usuario(usuario_info));

    // Funcion para cerrar la sesion con el boton
    $("#boton-modal-cerrar-cuenta").on("click", () => cerrar_sesion());
    // Funcion para eliminar la cuenta con el boton
    $("#boton-modal-eliminar-cuenta").on("click", () => eliminar_cuenta());
});
