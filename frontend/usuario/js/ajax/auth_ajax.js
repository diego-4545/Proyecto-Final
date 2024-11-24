export async function verificarUsuario() {
    const global_url = "http://127.0.0.1:8000";

    const token = localStorage.getItem("access_token");
    const usuario_id = localStorage.getItem("usuario_id");
    const rol_id = localStorage.getItem("rol_id");

    // Revisar si hay token
    if (!token) {
        console.error("El usuario no ha iniciado sesión")
        window.location.href = "/error/403";
        return;
    }

    try {
        // Verificación del token
        const response = await $.ajax({
            url: global_url + "/auth/verificar-usuario",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                token,
                usuario_id,
                rol_id,
            }),
        });

        console.log("Verificación exitosa", response);
        return response;
    } catch (error) {
        // Capturar el código de estado
        if (error.status === 403) {
            console.error("Acceso denegado (403)");
            window.location.href = "/error/403";
        } else {
            console.error("No autorizado (401)");
            window.location.href = "/error/401";
            throw error;
        }
    }
}
