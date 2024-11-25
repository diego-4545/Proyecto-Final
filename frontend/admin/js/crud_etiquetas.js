let currentPage = 1;
const rowsPerPage = 5;
const apiBaseUrl = "/api/etiqueta-nombre";

// Función para cargar etiquetas desde el servidor
async function loadTags() {
    try {
        const response = await fetch(`${apiBaseUrl}/all`);
        if (!response.ok) {
            throw new Error("Error al cargar etiquetas.");
        }
        const data = await response.json();
        populateTable(data);
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudieron cargar las etiquetas.");
    }
}

// Llena la tabla con etiquetas obtenidas
function populateTable(tags) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    tags.forEach(tag => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <button class="btn-action edit" onclick="editTag(${tag.etiqueta_id})">Editar</button>
                <button class="btn-action delete" onclick="deleteTag(${tag.etiqueta_id})">Eliminar</button>
            </td>
            <td>${tag.nombre}</td>
            <td>${new Date(tag.fecha).toLocaleDateString()}</td>
        `;
        tableBody.appendChild(row);
    });

    updateTable();
}

// Añadir nueva etiqueta
async function addTag() {
    const tagName = document.getElementById("tagName").value.trim();
    if (!tagName) {
        alert("Por favor, ingrese un nombre para la etiqueta.");
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/new`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: tagName })
        });

        if (!response.ok) {
            throw new Error("Error al añadir la etiqueta.");
        }

        alert("Etiqueta añadida exitosamente.");
        $('#addTagModal').modal('hide');
        document.getElementById("addTagForm").reset();
        await loadTags();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo añadir la etiqueta.");
    }
}

// Editar etiqueta existente
let currentEditId = null;
async function editTag(tagId) {
    currentEditId = tagId;

    try {
        const response = await fetch(`${apiBaseUrl}/${tagId}`);
        if (!response.ok) {
            throw new Error("Error al obtener la etiqueta.");
        }

        const tag = await response.json();
        document.getElementById("editTagName").value = tag.nombre;
        $('#editTagModal').modal('show');
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo cargar la información de la etiqueta.");
    }
}

document.getElementById("updateTagBtn").addEventListener("click", async function () {
    const updatedTagName = document.getElementById("editTagName").value.trim();
    if (!updatedTagName) {
        alert("Por favor, ingrese un nombre para la etiqueta.");
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/update/${currentEditId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: updatedTagName })
        });

        if (!response.ok) {
            throw new Error("Error al actualizar la etiqueta.");
        }

        alert("Etiqueta actualizada exitosamente.");
        $('#editTagModal').modal('hide');
        await loadTags();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo actualizar la etiqueta.");
    }
});

// Eliminar etiqueta
async function deleteTag(tagId) {
    const confirmation = confirm("¿Estás seguro de que deseas eliminar esta etiqueta?");
    if (!confirmation) return;

    try {
        const response = await fetch(`${apiBaseUrl}/delete/${tagId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Error al eliminar la etiqueta.");
        }

        alert("Etiqueta eliminada exitosamente.");
        await loadTags();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo eliminar la etiqueta.");
    }
}

// Actualizar la tabla para manejar la paginación
function updateTable() {
    const rows = document.querySelectorAll("#tableBody tr");
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    rows.forEach((row, index) => {
        row.style.display = index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage ? "" : "none";
    });

    document.getElementById("pageInfo").textContent = `Página ${currentPage} de ${totalPages}`;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
}

function nextPage() {
    const totalRows = document.querySelectorAll("#tableBody tr").length;
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
    const totalRows = document.querySelectorAll("#tableBody tr").length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    currentPage = totalPages;
    updateTable();
}

// Buscar etiquetas en la tabla
function searchTag() {
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();
    const rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {
        const labelCell = row.cells[1];
        row.style.display = labelCell && labelCell.textContent.toLowerCase().includes(searchTerm) ? "" : "none";
    });
}

// Inicializar
document.addEventListener("DOMContentLoaded", loadTags);
