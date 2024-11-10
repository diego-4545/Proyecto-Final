let currentPage = 1;
const rowsPerPage = 5;


let currentEditRow = null;

function editTag(button) {
    currentEditRow = $(button).closest('tr');
    
    const article = currentEditRow.find('td:eq(1)').text();
    const image = currentEditRow.find('td:eq(2)').text();
    const date = currentEditRow.find('td:eq(3)').text();
    const status = currentEditRow.find('td:eq(4)').text();
    const creator = currentEditRow.find('td:eq(5)').text();
    const tags = currentEditRow.find('td:eq(6)').text();
    
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
    
    currentEditRow.find('td:eq(1)').text(updatedArticle);
    currentEditRow.find('td:eq(2)').text(updatedImage);
    currentEditRow.find('td:eq(3)').text(updatedDate);
    currentEditRow.find('td:eq(4)').text(updatedStatus);
    currentEditRow.find('td:eq(5)').text(updatedCreator);
    currentEditRow.find('td:eq(6)').text(updatedTags);
    
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
function addTag() {
    $('#addTagModal').modal('show');
}

function addTag() {
    $('#addTagModal').modal('show');
}

