
document.querySelector('.submit-button').addEventListener('click', function() {
    location.reload();
});

function refrescarPagina() { 
    location.reload();
    return false;
}
function autoResize(textarea) {
    textarea.style.height = 'auto'; 
    textarea.style.height = (textarea.scrollHeight) + 'px'; 
}
