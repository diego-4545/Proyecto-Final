document.getElementById("guardar-etiquetas").addEventListener("click", function () {
    // Obtener todas las etiquetas seleccionadas
    const checkboxes = document.querySelectorAll("#form-etiquetas .form-check-input");
    const etiquetasSeleccionadas = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            etiquetasSeleccionadas.push(checkbox.value);
        }
    });

    // Mostrar las etiquetas seleccionadas en el perfil
    const listaEtiquetas = document.getElementById("lista");
    listaEtiquetas.innerHTML = ""; // Limpiar la lista actual

    etiquetasSeleccionadas.forEach((etiqueta) => {
        const li = document.createElement("li");
        li.className = "etiquetas";
        li.innerHTML = `<span>${etiqueta}</span>`;
        listaEtiquetas.appendChild(li);
    });

    // Cerrar el modal
    const etiquetasModal = bootstrap.Modal.getInstance(document.getElementById("etiquetas-modal"));
    etiquetasModal.hide();
});
