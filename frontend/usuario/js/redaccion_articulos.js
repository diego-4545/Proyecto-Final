document.addEventListener('DOMContentLoaded', () => {
    const contenedorEtiquetas = document.getElementById('contenedorEtiquetas');
    const entradaEtiqueta = document.getElementById('entradaEtiqueta');
    const agregarEtiquetaBtn = document.getElementById('agregarEtiquetaBtn');
    const contenedorImagenes = document.getElementById('contenedorImagenes');
    const publicarArticuloBtn = document.getElementById('publicarArticuloBtn');
    const eliminarArticuloBtn = document.getElementById('eliminarArticuloBtn');
    const modalEliminar = document.getElementById('modalEliminar');
    const cancelarEliminarBtn = document.getElementById('cancelarEliminarBtn');
    const guardarCambiosBtn = document.getElementById('guardarCambiosBtn');

    // Función para añadir etiquetas
    agregarEtiquetaBtn.addEventListener('click', () => {
        if (entradaEtiqueta.value) {
            const etiqueta = document.createElement('span');
            etiqueta.classList.add('etiqueta');
            etiqueta.textContent = entradaEtiqueta.value;

            // Añadir botón para eliminar etiqueta
            const eliminarBtn = document.createElement('button');
            eliminarBtn.classList.add('eliminarEtiquetaBtn');
            eliminarBtn.textContent = 'X';
            eliminarBtn.addEventListener('click', () => etiqueta.remove());

            etiqueta.appendChild(eliminarBtn);
            contenedorEtiquetas.appendChild(etiqueta);
            entradaEtiqueta.value = ''; // Limpiar campo de entrada
        }
    });

    // Función para cargar imágenes, incluyendo bolas.jpg
    function cargarImagenesEstaticas() {
        const cantidadImagenes = 10; // Número de imágenes en la carpeta

        // Añadir bolas.jpg como la primera imagen
        const imgBolas = document.createElement('div');
        imgBolas.innerHTML = `<img src="imagenes/bolas.jpg" class="preview-imagen" alt="Bolas">`;
        $('#contenedorImagenes').slick('slickAdd', imgBolas);

        // Cargar las imágenes restantes
        for (let i = 1; i <= cantidadImagenes; i++) {
            const imgContainer = document.createElement('div');
            imgContainer.innerHTML = `<img src="imagenes/imagen${i}.jpg" class="preview-imagen" alt="Imagen ${i}">`;
            $('#contenedorImagenes').slick('slickAdd', imgContainer);
        }
    }

    // Llamar a la función para cargar las imágenes
    cargarImagenesEstaticas();

    // Función para el botón de guardar cambios
    guardarCambiosBtn.addEventListener('click', () => {
        Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'Los cambios se han guardado correctamente.'
        }).then(() => {
            window.location.href = 'inicio_editor.html'; // Redirigir después de guardar
        });
    });

    // Función para el botón de publicar
    publicarArticuloBtn.addEventListener('click', () => {
        Swal.fire({
            icon: 'success',
            title: 'Publicado',
            text: 'El artículo se ha publicado correctamente.'
        }).then(() => {
            window.location.href = 'pagina_publicada.html'; // Cambia a la página de destino
        });
    });

    // Función para mostrar el modal de eliminación
    eliminarArticuloBtn.addEventListener('click', () => {
        modalEliminar.style.display = 'flex';
    });

    // Cancelar eliminación
    cancelarEliminarBtn.addEventListener('click', () => {
        modalEliminar.style.display = 'none';
    });

    // Confirmar eliminación con redirección y notificación
    document.getElementById('confirmarEliminarBtn').addEventListener('click', () => {
        // Ocultar el modal de eliminación
        modalEliminar.style.display = 'none';

        // Mostrar notificación de eliminación utilizando Swal
        Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El artículo ha sido eliminado correctamente.'
        }).then(() => {
            // Vaciar campos y contenedores como parte del proceso de eliminación
            document.getElementById('titulo').value = ''; // Vaciar el campo de título
            document.getElementById('contenido').value = ''; // Vaciar el contenido del artículo

            // Eliminar etiquetas existentes
            const etiquetas = document.querySelectorAll('#contenedorEtiquetas .etiqueta');
            etiquetas.forEach(etiqueta => etiqueta.remove());

            // Eliminar imágenes cargadas
            const imagenes = document.querySelectorAll('#contenedorImagenes .preview-imagen');
            imagenes.forEach(imagen => imagen.parentElement.remove()); // Eliminar contenedor de imagen

            // Redirigir después de eliminar
            window.location.href = 'inicio_editor.html'; // Cambiar a la página de inicio del editor
        });
    });

    // Hacer las etiquetas arrastrables
    $('#contenedorEtiquetas').sortable({
        items: '.etiqueta',
        containment: 'parent',
        tolerance: 'pointer'
    });

    // Contador de caracteres para título y contenido
    $(document).ready(function() {
        $('#titulo').on('input', function() {
            const maxLength = 100;
            const length = $(this).val().length;
            $(this).next('.contador').text(`${length}/${maxLength}`);
        });

        $('#contenido').on('input', function() {
            const maxLength = 1000;
            const length = $(this).val().length;
            $(this).next('.contador').text(`${length}/${maxLength}`);
        });
    });
});
