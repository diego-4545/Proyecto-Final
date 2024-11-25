import { verificarUsuario } from "./auth_ajax.js";

import { get_usuario_info } from "./basic_ajax.js";
import { cambiar_navbar_con_info_usuario } from "./basic_ajax.js";


var global_url = "http://127.0.0.1:8000"

async function mostrar_articulos() {
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

    // Obtener el nombre de un estatus ID
    async function obtener_estado_articulo_nombre(estatus_id) {
        try {
            const nombre_estado = await $.ajax({
                url: global_url + "/api/articulo-estado/" + estatus_id,
                method: "GET",
                contentType: "application/json",
            });
            return nombre_estado;
        } catch (error) {
            console.error("Error al obtener el nombre del estado del articulo: " + error);
            return null;
        }
    }

    $("#lista-articulos").find(".articulo").remove();

    const articulos_ids = await obtener_id_articulos(usuario_id);
    if (articulos_ids) {
        try {
            // Obtenemos la información de los artículos en paralelo
            const articulos = await Promise.all(
                articulos_ids.map(id => obtener_nombre_articulo(id))
            );

            // Iteramos sobre los artículos y los añadimos a la galería
            articulos.forEach(async articulo => {
                if (articulo) {
                    const estatus = await obtener_estado_articulo_nombre(articulo.estado);
                    const articulo_bloque = `
                        <li class="articulo">
                            <a id="enlace-articulo-${articulo.id}" href="/articulo">
                                <span id="info-articulo-titulo-${articulo.id}">${articulo.nombre}</span>
                            </a>
                            <span id="info-articulo-fecha-${articulo.id}">${articulo.fecha}</span>
                            <div id="info-articulo-estatus-${articulo.id}">
                                <span id="info-articulo-estatus-nombre-${articulo.id}">${estatus.nombre}</span>
                            </div>
                        </li>
                    `;
                    $('#lista-articulos').append(articulo_bloque);
                }
            });
        } catch (error) {
            console.error("Error al procesar los artículos: ", error);
        }
    }
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

    // Mostrar articulos del usuario
    mostrar_articulos();
});
