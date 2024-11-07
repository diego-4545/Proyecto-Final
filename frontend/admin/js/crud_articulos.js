let currentPage = 1;
const rowsPerPage = 5;


let currentEditRow = null;

// Función para editar artículo
function editTag(button) {
    currentEditRow = $(button).closest('tr');
    
    // Obtener los valores de las celdas de la fila
    const article = currentEditRow.find('td:eq(1)').text();
    const image = currentEditRow.find('td:eq(2)').text();
    const date = currentEditRow.find('td:eq(3)').text();
    const status = currentEditRow.find('td:eq(4)').text();
    const creator = currentEditRow.find('td:eq(5)').text();
    const tags = currentEditRow.find('td:eq(6)').text();
    
    // Asignar los valores a los campos del formulario en el modal
    $('#editArticleName').val(article);
    $('#editImage').val(image);
    $('#editDate').val(date);
    $('#editStatus').val(status);
    $('#editCreator').val(creator);
    $('#editTagName').val(tags);
    
    $('#editTagModal').modal('show');
}

$('#updateTagBtn').on('click', function() {
    const updatedArticle = $('#editArticleName').val().trim();
    const updatedImage = $('#editImage').val().trim();
    const updatedDate = $('#editDate').val();
    const updatedStatus = $('#editStatus').val();
    const updatedCreator = $('#editCreator').val().trim();
    const updatedTags = $('#editTagName').val().trim();
    
    if (updatedArticle === "" || updatedImage === "" || updatedDate === "" || updatedCreator === "" || updatedTags === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }
    
    // Actualizar la fila con los nuevos valores
    currentEditRow.find('td:eq(1)').text(updatedArticle);
    currentEditRow.find('td:eq(2)').text(updatedImage);
    currentEditRow.find('td:eq(3)').text(updatedDate);
    currentEditRow.find('td:eq(4)').text(updatedStatus);
    currentEditRow.find('td:eq(5)').text(updatedCreator);
    currentEditRow.find('td:eq(6)').text(updatedTags);
    
    $('#editTagModal').modal('hide');
});


// Función para eliminar una etiqueta con confirmación
function deleteTag(button) {
    const confirmation = confirm("¿Estás seguro de que deseas eliminar esta etiqueta?");
    if (confirmation) {
        const row = button.parentNode.parentNode;
        row.remove();
    }
    updateTable();
}

// Paginación
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

// Ir a la página anterior
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
}

// Ir a la siguiente página
function nextPage() {
    const totalRows = $('#tableBody tr').length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        updateTable();
    }
}

// Ir a la primera página
function goToFirstPage() {
    currentPage = 1;
    updateTable();
}

// Ir a la última página
function goToLastPage() {
    const totalRows = $('#tableBody tr').length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    currentPage = totalPages;
    updateTable();
}

// Función para buscar etiquetas
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

// Guardar cambios
function saveChanges() {
    alert("Cambios guardados.");
}

// Inicializar la tabla con la paginación
$(document).ready(function() {
    updateTable();
});

// Evitar envío con Enter en el formulario de agregar etiqueta
$('#addTagForm').on('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

// Evitar envío con Enter en el formulario de editar etiqueta
$('#editTagForm').on('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});
// Función para abrir el modal de agregar artículo
function addTag() {
    $('#addTagModal').modal('show');
}

// Función para abrir el modal de agregar artículo
function addTag() {
    $('#addTagModal').modal('show');
}

