import { verificarAdmin } from "./auth_ajax.js";

var global_url = "http://127.0.0.1:8000"
let articulo_id = "";

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

// Obtener las etiquetas de un artículo
async function obtener_etiquetas_articulo(articulo_id) {
    try {
        const response = await $.ajax({
            url: global_url + "/api/articulo-etiqueta/" + articulo_id,
            method: "GET",
            contentType: "application/json",
        });
        return response.etiquetas || []; // Retorna las etiquetas, o una lista vacía si no hay
    } catch (error) {
        console.error("Error al obtener las etiquetas del artículo:", error);
        return [];
    }
}

// Obtener la información de cada etiqueta
async function obtener_info_etiqueta(etiqueta_id) {
    try {
        const response = await $.ajax({
            url: global_url + "/api/etiqueta/" + etiqueta_id,
            method: "GET",
            contentType: "application/json",
        });
        return response ? response.nombre : "Etiqueta desconocida"; // Retorna el nombre de la etiqueta
    } catch (error) {
        console.error("Error al obtener la información de la etiqueta:", error);
        return "Etiqueta desconocida";
    }
}

async function mostrar_todos_los_articulos() {
    // Obtener IDs de articulos
    async function obtener_id_articulo() {
        try {    
            const articulos_ids = await $.ajax({
                url: global_url + "/api/articulo",
                method: "GET",
                contentType: "application/json",
            });
            return articulos_ids.articulos_ids;
        } catch (error) {
            console.error("Error al obtener los IDs de los articulos: " + error);
            return null;
        }
    }

    // Obtener la información de un articulo especifico
    async function obtener_info_articulo(articulos_ids) {
        try {
            const articulo_info = await $.ajax({
                url: global_url + "/api/articulo/" + articulos_ids,
                method: "GET",
                contentType: "application/json",
            });
            return articulo_info;
        } catch (error) {
            console.error("Error al obtener el nombre del articulo: " + error);
            return null;
        }
    }

    // Limpiar la lista de articulos antes de agregar las nuevas filas
    $("#tableBody").empty();

    const articulos_ids = await obtener_id_articulo();
    if (articulos_ids) {
        try {
            // Obtener la información de los articulos en paralelo
            const info_articulos = await Promise.all(
                articulos_ids.map(id => obtener_info_articulo(id))
            );

            // Iterar sobre los articulos y agregar las filas a la tabla
            for (const articulo of info_articulos) {
                if (articulo) {
                    // Obtener las etiquetas del artículo
                    const etiquetas = await obtener_etiquetas_articulo(articulo.articulo_id);
                    const etiquetas_info = await Promise.all(etiquetas.map(id => obtener_info_etiqueta(id)));

                    // Crear una cadena de texto con las etiquetas
                    const etiquetasTexto = etiquetas_info.join(", ");

                    const fila = `
                        <tr>
                            <td>
                                <button class="btn btn-danger delete-btn" data-id="${articulo.articulo_id}">Eliminar</button>
                            </td>
                            <td>${articulo.nombre}</td>
                            <td><img src="${articulo.imagen.startsWith('http') ? articulo.imagen : global_url + articulo.imagen}" alt="${articulo.nombre}" style="width: 100px; height: auto;"></td>
                            <td>${new Date(articulo.fecha).toLocaleDateString()}</td>
                            <td>${articulo.estado}</td>
                            <td>${articulo.creador}</td>
                            <td>${etiquetasTexto}</td> <!-- Mostrar las etiquetas aquí -->
                        </tr>
                    `;
                    // Agregar la fila al cuerpo de la tabla
                    $("#tableBody").append(fila);
                }
            }
        } catch (error) {
            console.error("Error al procesar los articulos: ", error);
        }
    }
}

// Eliminar articulo
async function eliminar_articulo(articulo_id) {
    try {
        await $.ajax({
            url: global_url + "/api/articulo/" + articulo_id,
            method: "DELETE",
            contentType: "application/json",
        });
        console.log("Articulo eliminado exitosamente");
        window.location.href = "/admin/articulo"
    } catch (error) {
        console.error(`Error al eliminar el articulo con ID ${articulo_id}:`, error);
    }
}


$(document).ready(async () => {
    // Autenticacion
    await verificarAdmin();

    // Obtener infor del usuario
    const usuario_info = await get_usuario_info();

    // Cambiar informacion de la navbar
    cambiar_navbar_con_info_usuario(usuario_info);

    // Mostrar la lista de todos los usuarios
    mostrar_todos_los_articulos();

    // Eliminar los articulos
    $(document).on("click", ".delete-btn", function () {
        articulo_id = $(this).data("id");
        eliminar_articulo(articulo_id);
    });

    // Para la barra de busqueda
    $(document).on("click", "#searchBar", searchTag);

});

function searchTag() {
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();
    const rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {
        const labelCell = row.cells[1];
        if (labelCell && labelCell.textContent.toLowerCase().includes(searchTerm)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}