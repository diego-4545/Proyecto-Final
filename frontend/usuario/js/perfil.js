// Cambia el estado de los botones al hacer clic
function toggleButton(event, button) {
    event.preventDefault(); // Evita cualquier comportamiento predeterminado
    button.classList.toggle("active"); // Cambia la clase para mostrar que está seleccionado
}


function selectImage(selectedButton) {
    // Encuentra todos los botones dentro del contenedor
    const buttons = document.querySelectorAll('#form-foto-perfil .toggle-btn');

    // Elimina la clase "active" de todos los botones
    buttons.forEach((button) => button.classList.remove('active'));

    // Agrega la clase "active" al botón que se seleccionó
    selectedButton.classList.add('active');
}