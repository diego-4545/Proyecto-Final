let currentPage = 1;
const rowsPerPage = 5;

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
