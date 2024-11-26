import { verificarAdmin } from "./auth_ajax.js";

var global_url = "http://127.0.0.1:8000";

// Conseguir información del usuario
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

// Variables para almacenar las acciones pendientes
let accionesPendientes = [];

// Función para obtener los comentarios de la página especificada
async function obtenerComentariosDePagina(pagina) {
  try {
      // Suponemos que tienes una API para obtener los comentarios de una página específica
      const response = await $.ajax({
          url: `${global_url}/api/comentarios?page=${pagina}`,  // Cambia esta URL según tu API
          method: "GET",
          contentType: "application/json",
      });

      // Limpiamos el contenedor de comentarios
      $("#comentarios-container").empty();

      // Añadimos los nuevos comentarios a la página
      response.comentarios.forEach(comentario => {
          const comentarioHtml = `
              <div class="comentario" data-id="${comentario.id}">
                  <img src="${comentario.foto_perfil}" alt="Foto de Perfil" class="foto-perfil">
                  <div class="contenido-comentario">
                      <a href="/frontend/usuario/perfil.html" class="nombre-usuario">${comentario.nombre_usuario}</a>
                      <p>${comentario.texto}</p>
                      <div class="botones-moderacion">
                          <button class="btn aceptar" onclick="pendienteAceptarComentario(this)">Aceptar</button>
                          <button class="btn eliminar" onclick="pendienteEliminarComentario(this)">Eliminar</button>
                          <button class="btn suspender" onclick="pendienteSuspenderComentario(this, '${comentario.nombre_usuario}')">Suspender</button>
                      </div>
                  </div>
              </div>
          `;
          $("#comentarios-container").append(comentarioHtml);
      });

      // Si no hay más comentarios, deshabilitamos el botón de siguiente
      if (!response.hasMoreComments) {
          $("#btn-siguiente").prop("disabled", true);
      } else {
          $("#btn-siguiente").prop("disabled", false);
      }

  } catch (error) {
      console.error("Error al obtener los comentarios:", error);
  }
}

// Función para almacenar la acción pendiente de aceptar comentario
function pendienteAceptarComentario(button) {
  const comentario = $(button).closest('.comentario');
  const comentarioId = comentario.data('id');

  // Almacenamos la acción pendiente para ejecutarla más tarde
  accionesPendientes.push({ accion: 'aceptar', comentarioId: comentarioId, button: button });
}

// Función para almacenar la acción pendiente de eliminar comentario
function pendienteEliminarComentario(button) {
  const comentario = $(button).closest('.comentario');
  const comentarioId = comentario.data('id');

  // Almacenamos la acción pendiente para ejecutarla más tarde
  accionesPendientes.push({ accion: 'eliminar', comentarioId: comentarioId, button: button });
}

// Función para almacenar la acción pendiente de suspender comentario
function pendienteSuspenderComentario(button, nombreUsuario) {
  const comentario = $(button).closest('.comentario');
  const comentarioId = comentario.data('id');

  // Almacenamos la acción pendiente para ejecutarla más tarde
  accionesPendientes.push({ accion: 'suspender', comentarioId: comentarioId, button: button, nombreUsuario: nombreUsuario });
}

// Función para ejecutar todas las acciones pendientes cuando se guarda
function guardarCambios() {
  alert("Cambios guardados");

  // Ejecutamos todas las acciones pendientes
  accionesPendientes.forEach(({ accion, comentarioId, button, nombreUsuario }) => {
      switch (accion) {
          case 'aceptar':
              aceptarComentario(button, comentarioId);
              break;
          case 'eliminar':
              eliminarComentario(button, comentarioId);
              break;
          case 'suspender':
              suspenderComentario(button, nombreUsuario, comentarioId);
              break;
      }
  });
  //notificaciones
function mostrarNotificacion(mensaje) {
  const notificacion = $("#notificacion");

  // Establecer el mensaje en el contenedor de notificación
  notificacion.text(mensaje);

  // Mostrar la notificación
  notificacion.fadeIn();

  // Ocultar la notificación después de 3 segundos
  setTimeout(function() {
    notificacion.fadeOut();
  }, 3000);
}

// Función para aceptar comentario
function aceptarComentario(button) {
  $(button).closest('.comentario').css("background-color", "#d4edda");  
  mostrarNotificacion("Comentario aceptado");  // Mostrar notificación
}

// Función para eliminar comentario
function eliminarComentario(button) {
  $(button).closest('.comentario').css("background-color", "#FF0000");
  mostrarNotificacion("Comentario eliminado");  // Mostrar notificación
}

// Función para suspender comentario
function suspenderComentario(button, nombreUsuario) {
  $(button).closest('.comentario').css("background-color", "#f8d7da");  // Marca el comentario como suspendido
  mostrarNotificacion(`Se ha suspendido a ${nombreUsuario}`);  // Mostrar notificación
}

  
  
  // Limpiamos las acciones pendientes después de guardarlas
  accionesPendientes = [];
}

// Función para aceptar comentario
function aceptarComentario(button, comentarioId) {
  alert("Comentario aceptado");
  $(button).closest('.comentario').css("background-color", "#d4edda");  // Marca el comentario como aceptado
}

// Función para eliminar comentario
function eliminarComentario(button, comentarioId) {
  $(button).closest('.comentario').hide();  // Oculta el comentario eliminado
  alert("Comentario eliminado");
}

// Función para suspender comentario
function suspenderComentario(button, nombreUsuario, comentarioId) {
  alert(`Se ha suspendido a ${nombreUsuario}`);
  $(button).closest('.comentario').css("background-color", "#f8d7da");  // Marca el comentario como suspendido
}

// Función para cambiar de página
function cambiarSeccion(direccion) {
  let paginaActual = parseInt(localStorage.getItem("paginaActual") || "1");

  // Cambiar la página actual según la dirección
  if (direccion === "anterior" && paginaActual > 1) {
      paginaActual--;
  } else if (direccion === "siguiente") {
      paginaActual++;
  }

  // Guardamos la página actual en localStorage
  localStorage.setItem("paginaActual", paginaActual);

  // Actualizamos la visualización de los comentarios
  obtenerComentariosDePagina(paginaActual);

  // También puedes mostrar un mensaje de la página actual
  alert(`Cambiando a la página ${paginaActual}`);
}

// Inicialización: al cargar la página, obtenemos los comentarios de la página actual
$(document).ready(function() {
  let paginaActual = parseInt(localStorage.getItem("paginaActual") || "1");
  obtenerComentariosDePagina(paginaActual);

  // Configurar los eventos de los botones de navegación
  $("#btn-anterior").click(function() {
      cambiarSeccion("anterior");
  });

  $("#btn-siguiente").click(function() {
      cambiarSeccion("siguiente");
  });

  // Configurar el botón de guardar cambios
  $("#btn-guardar").click(function() {
      guardarCambios();
  });
});
