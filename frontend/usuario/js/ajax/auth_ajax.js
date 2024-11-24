export function verificarUsuario() {
    const global_url = "http://127.0.0.1:8000";

    const token = localStorage.getItem("access_token");
    const usuario_id = localStorage.getItem("usuario_id");
    const rol_id = localStorage.getItem("rol_id");

    if (!token) {
        alert("Inicia sesión");
        window.location.href = "/login";
        return;
    }

    // Verificacion del token
    $.ajax({
        url: global_url + "/auth/verificar-usuario",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            token,
            usuario_id,
            rol_id 
        }),
        error: (response) => {
            alert(response);
        },
    });
}
