import { verificarAdmin } from "./auth_ajax.js";

var global_url = "http://127.0.0.1:8000"
let usuario_id = "";


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


async function mostrar_todos_los_usuarios() {
    // Obtener IDs de usuarios
    async function obtener_id_usuario() {
        try {    
            const usuarios_ids = await $.ajax({
                url: global_url + "/api/usuario",
                method: "GET",
                contentType: "application/json",
            });
            return usuarios_ids.usuarios_ids;
        } catch (error) {
            console.error("Error al obtener los IDs de los usuarios: " + error);
            return null;
        }
    }

    // Obtener la información de un usuario específico
    async function obtener_info_usuario(usuarios_ids) {
        try {
            const usuario_info = await $.ajax({
                url: global_url + "/api/usuario/" + usuarios_ids,
                method: "GET",
                contentType: "application/json",
            });
            return usuario_info;
        } catch (error) {
            console.error("Error al obtener el nombre del usuario: " + error);
            return null;
        }
    }

    // Limpiar la lista de usuarios antes de agregar las nuevas filas
    $("#tableBody").empty();

    const usuarios_ids = await obtener_id_usuario();
    if (usuarios_ids) {
        try {
            // Obtener la información de los usuarios en paralelo
            const info_usuarios = await Promise.all(
                usuarios_ids.map(id => obtener_info_usuario(id))
            );

            // Iterar sobre los usuarios y agregar las filas a la tabla
            for (const usuario of info_usuarios) {
                if (usuario) {
                    // Obtener el nombre del rol
                    const rol_nombre = await get_rol_nombre(usuario.rol_id);

                    const fila = `
                        <tr>
                            <td>
                                <button class="btn btn-dark edit-btn" type="button" data-bs-toggle="modal" data-bs-target="#editar-usuario-modal" data-id="${usuario.usuario_id}">Editar</button>
                                <button class="btn btn-danger delete-btn" data-id="${usuario.usuario_id}">Eliminar</button>
                            </td>
                            <td>${rol_nombre || 'Desconocido'}</td>
                            <td>${new Date(usuario.fecha).toLocaleDateString()}</td>
                            <td>${usuario.usuario}</td>
                            <td>${usuario.contraseña}</td>
                            <td>${usuario.email}</td>
                        </tr>
                    `;
                    // Agregar la fila al cuerpo de la tabla
                    $("#tableBody").append(fila);
                }
            }
        } catch (error) {
            console.error("Error al procesar los usuarios: ", error);
        }
    }
}


async function editar_usuario() {
    try {
        // Obtener la información del usuario
        const usuario = await $.ajax({
            url: global_url + "/api/usuario/" + usuario_id,
            method: "GET",
            contentType: "application/json",
        });

        // Llenar el formulario con los datos del usuario
        $("#editUser").val(usuario.usuario);
        $("#editEmail").val(usuario.email);
        $("#editDate").val(usuario.fecha);
        $("#editPasword").val(usuario.contraseña);
        
        // Obtener el nombre del rol para mostrarlo en el select o en otro campo
        const rol_nombre = await get_rol_nombre(usuario.rol_id);

        // Asignar el nombre del rol al campo correspondiente (por ejemplo, un `select`)
        $("#editRol").val(rol_nombre); // O si es un `select`, usa el valor del rol

    } catch (error) {
        console.error("Error al obtener los datos del usuario para editar: ", error);
    }
}


// Eliminar usuario
async function eliminar_usuario(usuario_id) {
    try {
        await $.ajax({
            url: global_url + "/api/usuario/" + usuario_id,
            method: "DELETE",
            contentType: "application/json",
        });
        console.log("Usuario eliminado exitosamente");
        window.location.href = "/admin/usuario"
    } catch (error) {
        console.error(`Error al eliminar el usuario con ID ${usuario_id}:`, error);
    }
}


// Función para añadir un usuario
async function añadir_usuario() {
    const nombre = $("#añadir-usuario-nombre").val(); // Obtener el nombre de usuario
    const rol_nombre = $("#añadir-rol-nombre").val(); // Obtener el nombre del rol (usando el valor del select)
    
    // Mapear el nombre del rol al rol_id
    const rol_id = await mapear_rol_a_id(rol_nombre); // Función para mapear el nombre del rol a su ID

    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const fecha = `${año}-${mes}-${dia}`;

    if (!nombre || !rol_id) {
        alert("Por favor, ingresa un nombre para el usuario y selecciona un rol.");
        return;
    }

    try {
        await $.ajax({
            url: global_url + "/api/usuario",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                nombre,
                rol_id, // Enviar el ID del rol en lugar del nombre
                fecha
            }),
        });
        console.log("Usuario añadido exitosamente");
        window.location.href = "/admin/usuarios";
    } catch (error) {
        console.error("Error al añadir el usuario: " + error);
    }
}

// Función para mapear el nombre del rol a su ID
async function mapear_rol_a_id(rol_nombre) {
    const roles = {
        "Administrador": 1,
        "Usuario": 2,
        "Suspendido": 3
    };
    return roles[rol_nombre] || null; // Devuelve el rol_id correspondiente
}



$(document).ready(async () => {
    // Autenticacion
    await verificarAdmin();

    // Obtener infor del usuario
    const usuario_info = await get_usuario_info();

    // Cambiar informacion de la navbar
    cambiar_navbar_con_info_usuario(usuario_info);

    // Mostrar la lista de todas las etiquetas
    mostrar_todos_los_usuarios();

    // Editar el usuario
    $(document).on("click", ".edit-btn", function () {
        usuario_id = $(this).data("id"); // Obtiene el ID de la etiqueta desde el atributo data-id
    });
    $(document).on("click", "#boton-guardar-cambios", editar_usuario);

    // Añadir una etiqueta
    $(document).on("click", "#boton-guardar-nuev-usuario", añadir_usuario);

    // Eliminar los usuarios
    $(document).on("click", ".delete-btn", function () {
        usuario_id = $(this).data("id");
        eliminar_usuario(usuario_id);
    });

    // Para la barra de busqueda
    $(document).on("click", "#searchBar", searchTag);

});

async function get_rol_nombre(rol_id) {
    try {
        const response = await $.ajax({
            url: global_url + "/api/usuario-rol/" + rol_id,
            method: "GET",
            contentType: "application/json",
        });
        return response.nombre; // Devuelve el nombre del rol
    } catch (error) {
        console.error("Error al obtener el rol: " + error.responseText);
        return null;
    }
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