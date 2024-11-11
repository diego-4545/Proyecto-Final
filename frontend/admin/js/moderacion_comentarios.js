function aceptarComentario(button) {
    alert("Comentario aceptado");
    button.parentElement.parentElement.style.backgroundColor = "#d4edda";  // Marca el comentario como aceptado
  }
  
  function eliminarComentario(button) {
    button.parentElement.parentElement.style.display = "none";  // Oculta el comentario eliminado
    alert("Comentario eliminado");
  }
  
  function suspenderComentario(button, nombreUsuario) {
    alert(`Se ha suspendido a ${nombreUsuario}`);
    button.parentElement.parentElement.style.backgroundColor = "#f8d7da";  // Marca el comentario como suspendido
  }
  
  function cambiarSeccion(direccion) {
    alert(`Cambiando a la sección ${direccion === 'anterior' ? 'anterior' : 'siguiente'}`);
    // Implementa la lógica para cambiar de sección de comentarios aquí
  }
  
  function guardarCambios() {
    alert("Cambios guardados");
    // Implementa la lógica para guardar cambios aquí
  }
  