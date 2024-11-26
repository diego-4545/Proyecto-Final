import { get_usuario_info } from "./basic_ajax.js";
import { cambiar_navbar_con_info_usuario } from "./basic_ajax.js";

var global_url = "http://127.0.0.1:8000"

async function obtener_info_articulo(id) {
    try {
        const articulo_info = await $.ajax({
            url: global_url + "/api/articulo/" + id,
            method: "GET",
            contentType: "application/json",
        });

        $("#info-articulo-titulo").text(articulo_info.nombre);
        $("#info-articulo-descripcion").text(articulo_info.descripcion);
        $("#info-articulo-foto").attr('src', articulo_info.imagen);
        $("#info-articulo-contenido").text(articulo_info.contenido);

        return articulo_info; // Retorna la información para usarla en otras funciones
    } catch (error) {
        console.error("Error al obtener información del artículo: ", error);
    }
}

async function obtener_likes_articulo(id) {
    try {
        const articulo_likes = await $.ajax({
            url: global_url + "/api/articulo-likes/" + id,
            method: "GET",
            contentType: "application/json",
        });
        return articulo_likes;
    } catch (error) {
        console.error("Error al obtener likes del artículo: " + error);
    }
}

async function obtener_info_usuario_articulo(id) {
    const articulo_info = await obtener_info_articulo(id);
    try {
        const usuario_info = await $.ajax({
            url: global_url + "/api/usuario/" + articulo_info.usuario_id,
            method: "GET",
            contentType: "application/json",
        });

        $("#foto-perfil-escritor").attr('src', usuario_info.foto_perfil);
        $("#info-escritor-nombre").text(usuario_info.usuario);
    } catch (error) {
        console.error("Error al obtener la información del usuario: ", error);
    }
}

async function obtener_etiquetas_articulo(id) {
    async function obtener_ids_etiquetas(id) {
        try {
            const etiquetas_ids = await $.ajax({
                url: global_url + "/api/articulo-etiqueta/" + id,
                method: "GET",
                contentType: "application/json",
            });
            return etiquetas_ids;
        } catch (error) {
            console.error("Error al obtener los id de las etiquetas del artículo: " + error);
        }
    }

    async function obtener_nombre_etiqueta(id) {
        try {
            const etiqueta_info = await $.ajax({
                url: global_url + "/api/etiqueta/" + id,
                method: "GET",
                contentType: "application/json",
            });
            return etiqueta_info;
        } catch (error) {
            console.error("Error al obtener información de la etiqueta: " + error);
        }
    }

    const etiquetas_ids = await obtener_ids_etiquetas(id);
    if (etiquetas_ids) {
        try {
            const ids = await Promise.all(
                etiquetas_ids.map(id => obtener_nombre_etiqueta(id))
            );
            ids.forEach(etiqueta => {
                if (etiqueta) {
                    const etiqueta_bloque = `
                        <div class="etiqueta">
                            <span id="info-etiqueta-nombre-${etiqueta.etiqueta_id}">${etiqueta.nombre}</span>
                        </div>
                    `;
                    $('#info-etiquetas').append(etiqueta_bloque);
                }
            });
        } catch (error) {
            console.error("Error al procesar las etiquetas: ", error);
        }
    }
}

async function obtener_comentarios_articulo(id) {
    // Si la función necesita hacer algo relacionado con comentarios, debes añadirla aquí.
}

$(document).ready(async () => {
    const articulo_id = localStorage.getItem("articulo_id");

    const usuario_info = await get_usuario_info();
    cambiar_navbar_con_info_usuario(usuario_info);

    await obtener_info_articulo(articulo_id); // Esperar la información del artículo
    await obtener_likes_articulo(articulo_id); // Esperar los likes
    await obtener_info_usuario_articulo(articulo_id); // Esperar la información del usuario
    await obtener_etiquetas_articulo(articulo_id); // Esperar las etiquetas
    await obtener_comentarios_articulo(articulo_id); // Si es necesario, agregar `await` aquí también si la función es asíncrona
});
