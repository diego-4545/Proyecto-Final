
import { verificarAdmin } from "./auth_ajax.js";

var global_url = "http://127.0.0.1:8000"


let currentPage = 1;
const rowsPerPage = 5;

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


    // Cambiamos la imagen de perfil de la barra de navegación
    $("#navbar-info-usuario-foto").attr("src", usuario_info.foto_perfil);
}


function addTag() {
    $('#addTagModal').modal('show');
}

$('#saveTagBtn').on('click', function() {
    const tagName = $('#tagName').val().trim();
    if (tagName === "") {
        alert("Por favor, ingrese un nombre para la etiqueta.");
        return;
    }
    const currentDate = new Date().toISOString().split('T')[0];
    const newRow = `<tr>
            <td>
                <button class="btn-action edit" onclick="editTag(this)">Editar</button>
                <button class="btn-action delete" onclick="deleteTag(this)">Eliminar</button>
            </td>
            <td>${tagName}</td>
            <td>${currentDate}</td>
        </tr>`;
    $('#tableBody').append(newRow);
    updateTable();
    $('#addTagModal').modal('hide');
    $('#addTagForm')[0].reset();
});

let currentEditRow = null;
function editTag(button) {
    currentEditRow = $(button).closest('tr');
    const currentTagName = currentEditRow.find('td:eq(1)').text();
    $('#editTagName').val(currentTagName);
    $('#editTagModal').modal('show');
}

$('#updateTagBtn').on('click', function() {
    const updatedTagName = $('#editTagName').val().trim();
    if (updatedTagName === "") {
        alert("Por favor, ingrese un nombre para la etiqueta.");
        return;
    }
    currentEditRow.find('td:eq(1)').text(updatedTagName);
    $('#editTagModal').modal('hide');
});

function deleteTag(button) {
    const confirmation = confirm("¿Estás seguro de que deseas eliminar esta etiqueta?");
    if (confirmation) {
        const row = button.parentNode.parentNode;
        row.remove();
    }
    updateTable();
}

function updateTable() {
    const rows = $('#tableBody tr');
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    rows.each((index, row) => {
        $(row).hide();
        if (index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage) {
            $(row).show();
        }
    });

    $('#pageInfo').text(`Página ${currentPage} de ${totalPages}`);
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
}

function nextPage() {
    const totalRows = $('#tableBody tr').length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        updateTable();
    }
}

function goToFirstPage() {
    currentPage = 1;
    updateTable();
}

function goToLastPage() {
    const totalRows = $('#tableBody tr').length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    currentPage = totalPages;
    updateTable();
}

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

function saveChanges() {
    alert("Cambios guardados.");
}

$(document).ready(function() {
    updateTable();
});

$('#addTagForm').on('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

$('#editTagForm').on('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

// Función para obtener e imprimir todas las etiquetas y sus datos
async function imprimir_todas_las_etiquetas() {
    try {
        // Paso 1: Obtener todos los IDs de las etiquetas
        const etiquetas_ids = await $.ajax({
            url: global_url + "/api/etiqueta",
            method: "GET",
            contentType: "application/json",
        });

        if (!etiquetas_ids || etiquetas_ids.etiquetas_ids.length === 0) {
            console.log("No hay etiquetas disponibles.");
            return;
        }

        // Paso 2: Iterar sobre los IDs y obtener los datos de cada etiqueta
        for (const etiqueta_id of etiquetas_ids.etiquetas_ids) {
            const etiqueta_info = await $.ajax({
                url: global_url + "/api/etiqueta/" + etiqueta_id,
                method: "GET",
                contentType: "application/json",
            });

            if (etiqueta_info) {
                // Imprimir los datos de cada etiqueta
                console.log(`Etiqueta ID: ${etiqueta_info.etiqueta_id}`);
                console.log(`Nombre: ${etiqueta_info.nombre}`);
                console.log(`Fecha: ${etiqueta_info.fecha}`);
                console.log("----------------------");
            } else {
                console.log(`No se pudo obtener información para la etiqueta con ID ${etiqueta_id}.`);
            }
        }
    } catch (error) {
        console.error("Error al obtener las etiquetas: " + error);
    }
}

// Llamada a la función
imprimir_todas_las_etiquetas();
