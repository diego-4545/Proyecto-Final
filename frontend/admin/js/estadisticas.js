
import { verificarAdmin } from "./auth_ajax.js";

var global_url = "http://127.0.0.1:8000"

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

$(document).ready(function () {
    const chartData = {
        usuarios: {
            labels: ['Registrados', 'Sin cuenta'],
            datasets: [{
                label: 'Usuarios',
                data: [50, 30],
                backgroundColor: ['#007bff', '#ffc107']
            }]
        },
        roles: {
            labels: ['Admin', 'Usuario', 'Usuario Suspendido'],
            datasets: [{
                label: 'Roles',
                data: [10, 50, 5],
                backgroundColor: ['#007bff', '#28a745', '#dc3545']
            }]
        },
        etiquetas: {
            labels: ['Animales', 'Comida', 'Carros', 'Educación', 'Finanzas', 'Videojuegos', 'Naturaleza', 'Tecnología', 'Moda'],
            datasets: [{
                label: 'Etiquetas',
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                backgroundColor: ['#007bff', '#ffc107', '#535153', '#28a745', '#dc3545', '#8a0cd2', '#692d18', '#283c77']
            }]
        },
        popularidad: {
            labels: ['Artículo1', 'Artículo2', 'Artículo3', 'Artículo4'],
            datasets: [{
                label: 'Vistas',
                data: [50, 30, 20, 40],
                backgroundColor: ['#007bff', '#ffc107', '#28a745', '#dc3545']
            }]
        }
    };

    const charts = {};

    function createChart(sectionId) {
        const ctx = document.getElementById(`${sectionId}-chart`).getContext('2d');
        charts[sectionId] = new Chart(ctx, {
            type: 'bar',
            data: chartData[sectionId],
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            align: 'center', // Centra los textos del eje X
                        },
                        grid: {
                            display: false // Oculta las líneas de la cuadrícula del eje X
                        },
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
                layout: {
                    padding: {
                        left: 50, // Añade un margen izquierdo
                        right: 50, // Añade un margen derecho
                    }
                },
                barPercentage: 0.5, // Ajusta el ancho de las barras (0.5 = 50% del espacio disponible)
                categoryPercentage: 0.6 // Ajusta la distribución de las barras en las categorías
            }
        });
    }
    

    function showSection(sectionId) {
        $('.content-section').hide();
        $(`#${sectionId}`).show();

        if (!charts[sectionId]) {
            createChart(sectionId);
        }
    }

    $('.btn-group button').on('click', function () {
        const sectionId = $(this).data('section');
        showSection(sectionId);
    });

    showSection('usuarios');
});
