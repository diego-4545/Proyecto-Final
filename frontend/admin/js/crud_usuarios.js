import { verificarUsuario } from "./auth_ajax.js";

var global_url = "http://127.0.0.1:8000"


let currentPage = 1;
const rowsPerPage = 6;


let currentEditRow = null;

let users = [];  
let isEditing = false;  
let currentUserId = null;  

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
    isEditing = false; 
    currentUserId = null

    $('#editTagForm')[0].reset();
    $('#Date').val(new Date().toISOString().split('T')[0]);  
    $('#editTagModalLabel').text("Agregar Usuario");  
    $('#addTagModal').modal('show');
}

function saveUser() {
    let role = $('#Rol').val();
    let date = $('#Date').val();
    let username = $('#User').val();
    let password = $('#Creator').val();
    let email = $('#Email').val();
    let articles = $('#Articles').val();

    if (!role || !date || !username || !password || !email || !articles) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    if (!email.includes('@')) {
        alert("El correo debe contener '@'.");
        return;
    }

    if (isEditing && currentUserId !== null) {
        let user = users.find(u => u.id === currentUserId);
        user.role = role;
        user.date = date;
        user.username = username;
        user.password = password;
        user.email = email;
        user.articles = articles;

    } else {
        let newUser = {
            id: Date.now(),  
            role: role,
            date: date,
            username: username,
            password: password,
            email: email,
            articles: articles
        };

        users.push(newUser); 
    }

    $('#addTagModal').modal('hide');
    displayUsers();  
    updateTable();
}

function displayUsers() {
    let tableBody = $('#tableBody');
    tableBody.empty(); 


    users.forEach(user => {
        let row = `<tr>
            <td>
                <button onclick="editUser(${user.id})" class="btn color">Editar</button>
                <button onclick="deleteUser(${user.id})" class="btn color">Eliminar</button>
            </td>
            <td>${user.role}</td>
            <td>${user.date}</td>
            <td>${user.username}</td>
            <td>${user.password}</td>
            <td>${user.email}</td>
            <td>${user.articles}</td>
        </tr>`;
        tableBody.append(row);
        updateTable();
    });
}

function editUser(userId) {
    isEditing = true;  
    currentUserId = userId;

    let user = users.find(u => u.id === userId);
    
    $('#Rol').val(user.role);
    $('#Date').val(user.date);
    $('#User').val(user.username);
    $('#Creator').val(user.password);
    $('#Email').val(user.email);
    $('#Articles').val(user.articles);

    $('#addTagModal').modal('show');
    $('#editTagModalLabel').text("Editar Usuario"); 
}

function deleteUser(userId) {
    users = users.filter(u => u.id !== userId);  
    displayUsers();  
    updateTable();
}

$(document).ready(function() {
    displayUsers();  

    $('#saveTagBtn').click(saveUser);
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
function saveChanges() {
    alert("Cambios guardados.");
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
$(document).ready(function() {
    updateTable();
});