var global_url = "http://127.0.0.1:8000";

// Verificar autenticación
function verifyAuth() {
    const token = localStorage.getItem("access_token");
    if (!token) {
        alert("No has iniciado sesión");
        window.location.href = "/";
        return;
    }

    $.ajax({
        url: global_url + "/auth/verificacion",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ token }),
        success: (response) => {
            if (response.autenticado) {
                if (response.rol_id == 2) {
                    window.location.href = "/admin"
                } else {
                    alert("Tu usuario no es administrador o hubo un problema con el token");
                    window.location.href = "/";
                }
            } else {
                alert("Error con el token");
                window.location.href = "/";
            }
        },
        error: (response) => {
            console.log(response);
        },
    });
}

// Validar sesión al cargar
$(document).ready(() => {
    verifyAuth();
});
