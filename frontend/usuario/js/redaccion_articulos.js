document.addEventListener('DOMContentLoaded', () => {
    const contenedorEtiquetas = document.getElementById('contenedorEtiquetas');
    const entradaEtiqueta = document.getElementById('entradaEtiqueta');
    const agregarEtiquetaBtn = document.getElementById('agregarEtiquetaBtn');
    const contenedorImagenes = document.getElementById('contenedorImagenes');
    const agregarImagenBtn = document.getElementById('agregarImagenBtn');
    const guardarCambiosBtn = document.getElementById('guardarCambiosBtn');
    const publicarArticuloBtn = document.getElementById('publicarArticuloBtn');
    const eliminarArticuloBtn = document.getElementById('eliminarArticuloBtn');
    const modalEliminar = document.getElementById('modalEliminar');
    const confirmarEliminarBtn = document.getElementById('confirmarEliminarBtn');
    const cancelarEliminarBtn = document.getElementById('cancelarEliminarBtn');

    // Función para añadir etiquetas
    agregarEtiquetaBtn.addEventListener('click', () => {
        if (entradaEtiqueta.value) {
            const etiqueta = document.createElement('span');
            etiqueta.classList.add('etiqueta');
            etiqueta.textContent = entradaEtiqueta.value;
            etiqueta.addEventListener('click', () => etiqueta.remove());
            contenedorEtiquetas.appendChild(etiqueta);
            entradaEtiqueta.value = '';
        }
    });

    // Función para añadir imágenes
    agregarImagenBtn.addEventListener('click', () => {
        const marcadorImagen = document.createElement('div');
        marcadorImagen.classList.add('marcador-imagen');
        marcadorImagen.textContent = "Imagen";
        marcadorImagen.addEventListener('click', () => marcadorImagen.remove());
        contenedorImagenes.appendChild(marcadorImagen);
    });

    // Función para el botón de guardar
    guardarCambiosBtn.addEventListener('click', () => {
        alert('Los cambios han sido guardados.');
    });

    // Función para el botón de publicar
    publicarArticuloBtn.addEventListener('click', () => {
        window.location.href = 'publicar.html';
    });

    // Función para mostrar el modal de eliminación
    eliminarArticuloBtn.addEventListener('click', () => {
        modalEliminar.style.display = 'flex';
    });

    // Confirmar eliminación
    confirmarEliminarBtn.addEventListener('click', () => {
        modalEliminar.style.display = 'none';
        alert('El artículo ha sido eliminado.');
        window.location.href = 'inicio_editor.html'; 
    });

    // Cancelar eliminación
    cancelarEliminarBtn.addEventListener('click', () => {
        modalEliminar.style.display = 'none';
    });
});
