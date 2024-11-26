import { verificarAdmin } from "./auth_ajax.js";

var global_url = "http://127.0.0.1:8000"
let etiqueta_id = "";


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


// Mostrar todas las etiquetas
async function mostrar_todas_las_etiquetas() {
    // Obtener IDs de etiquetas
    async function obtener_id_etiquetas() {
        try {    
            const etiquetas_ids = await $.ajax({
                url: global_url + "/api/etiqueta",
                method: "GET",
                contentType: "application/json",
            });
            return etiquetas_ids.etiquetas_ids;
        } catch (error) {
            console.error("Error al obtener los IDs de las etiquetas: " + error);
            return null;
        }
    }

    // Obtener el nombre de una etiqueta específica
    async function obtener_info_etiqueta(etiqueta_id) {
        try {
            const etiqueta_info = await $.ajax({
                url: global_url + "/api/etiqueta/" + etiqueta_id,
                method: "GET",
                contentType: "application/json",
            });
            return etiqueta_info;
        } catch (error) {
            console.error("Error al obtener el nombre de la etiqueta: " + error);
            return null;
        }
    }

    // Limpiamos la lista de etiquetas antes de agregar las nuevas
    $("#tableBody").empty();

    const etiquetas_ids = await obtener_id_etiquetas();
    if (etiquetas_ids) {
        try {
            // Obtenemos los datos de todas las etiquetas en paralelo
            const info_etiquetas = await Promise.all(
                etiquetas_ids.map(id => obtener_info_etiqueta(id))
            );

            // Iteramos sobre los nombres de las etiquetas para agregarlas al DOM
            info_etiquetas.forEach(etiqueta => {
                if (etiqueta) {
                    const fila = `
                        <tr>
                            <td>
                                <button class="btn btn-dark edit-btn" type="button" data-bs-toggle="modal" data-bs-target="#editar-etiqueta-modal" data-id="${etiqueta.etiqueta_id}">Editar</button>
                                <button class="btn btn-danger delete-btn" data-id="${etiqueta.etiqueta_id}">Eliminar</button>
                            </td>
                            <td>${etiqueta.nombre}</td>
                            <td>${new Date(etiqueta.fecha).toLocaleDateString()}</td>
                        </tr>
                    `;
                    // Agregar la fila al cuerpo de la tabla
                    $("#tableBody").append(fila);
                }
            });
        } catch (error) {
            console.error("Error al procesar las etiquetas: ", error);
        }
    }
}


// Editar la etiqueta
async function editar_etiqueta() {
    const nombre = $("#editar-etiqueta-nombre").val();
    try {
        $.ajax({
            url: global_url + "/api/etiqueta",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                etiqueta_id,
                nombre
            }) 
        });
        console.log("Etiqueta modificada exitosamente");
        window.location.href = "/admin/etiquetas"
    } catch (error) {
        console.error("Error al modificar la etiqueta: " + error);
    }
}


// Eliminar etiqueta
async function eliminar_etiqueta(etiqueta_id) {
    try {
        await $.ajax({
            url: global_url + "/api/etiqueta/" + etiqueta_id,
            method: "DELETE",
            contentType: "application/json",
        });
        console.log("Etiqueta eliminada exitosamente");
        window.location.href = "/admin/etiquetas"
    } catch (error) {
        console.error(`Error al eliminar la etiqueta con ID ${etiqueta_id}:`, error);
    }
}


// Función para añadir una nueva etiqueta
async function añadir_etiqueta() {
    const nombre = $("#añadir-etiqueta-nombre").val(); // Obtener el nombre de la etiqueta
    
    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const fecha = `${año}-${mes}-${dia}`;

    if (!nombre) {
        alert("Por favor, ingresa un nombre para la etiqueta.");
        return;
    }

    try {
        await $.ajax({
            url: global_url + "/api/etiqueta",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ 
                nombre,
                fecha
            }),
        });
        console.log("Etiqueta añadida exitosamente");
        window.location.href = "/admin/etiquetas"
    } catch (error) {
        console.error("Error al añadir la etiqueta: " + error);
    }
}


$(document).ready(async () => {
    // Autenticacion
    await verificarAdmin();

    // Obtener infor del usuario
    const usuario_info = await get_usuario_info();

    // Cambiar informacion de la navbar
    cambiar_navbar_con_info_usuario(usuario_info);

    // Mostrar la lista de todas las etiquetas
    mostrar_todas_las_etiquetas();

    // Editar la etiqueta
    $(document).on("click", ".edit-btn", function () {
        etiqueta_id = $(this).data("id"); // Obtiene el ID de la etiqueta desde el atributo data-id
    });
    $(document).on("click", "#boton-guardar-cambios", editar_etiqueta);

    // Añadir una etiqueta
    $(document).on("click", "#boton-guardar-nueva-etiqueta", añadir_etiqueta);

    // Eliminar las etiquetas
    $(document).on("click", ".delete-btn", function () {
        etiqueta_id = $(this).data("id");
        eliminar_etiqueta(etiqueta_id);
    });
});