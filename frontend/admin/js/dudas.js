
document.querySelector('.submit-button').addEventListener('click', function() {
    location.reload();
});

function refrescarPagina() { 
    location.reload();
    return false;
}
function autoResize(textarea) {
    textarea.style.height = 'auto'; // Restablecer la altura para recalcularla
    textarea.style.height = (textarea.scrollHeight) + 'px'; // Ajustar la altura al contenido
}
