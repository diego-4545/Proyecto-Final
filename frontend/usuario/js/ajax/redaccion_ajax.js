import { verificarUsuario } from "./auth_ajax.js";

import { get_usuario_info } from "./basic_ajax.js";
import { cambiar_navbar_con_info_usuario } from "./basic_ajax.js";

var global_url = "http://127.0.0.1:8000"

// Crear el articulo
async function crear_articulo(usuario_id) {
    const nombre = $("#titulo").val();
    
    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const fecha = `${año}-${mes}-${dia}`;

    const visitas = 0;
    const estado = 1;
    const contenido = $("#contenido").val();
    const imagen = "/frontend/img_biblioteca/articulos/bosque.png"

    try {
        const articulo = await $.ajax({
            url: global_url + "/api/articulo",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                usuario_id,
                nombre,
                fecha,
                visitas,
                estado,
                contenido,
                imagen
            })
        });
        console.log(articulo);
        const articulo_id = articulo.id;

        await $.ajax({
            url: global_url + "/api/articulo-usuario",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                usuario_id,
                articulo_id,
            })
        });
        console.log("Articulo creado exitosamente");
    } catch (error) {
        console.error("Error al crear el nuevo articulo: " + error);
        return null;
    }
}


$(document).ready(async () => {
    // Autenticación
    await verificarUsuario();

    // Cambios de pantalla dinamico con la info de la BD
    const usuario_info = await get_usuario_info();
    console.log(usuario_info);

    // Modificar navbar
    cambiar_navbar_con_info_usuario(usuario_info);

    const usuario_id = localStorage.getItem("usuario_id");
    $("#guardarCambiosBtn").on("click", () => crear_articulo(usuario_id));
});