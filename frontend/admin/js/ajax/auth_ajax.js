export async function verificarAdmin() {
    const global_url = "http://127.0.0.1:8000";

    const token = localStorage.getItem("access_token");
    const usuario_id = localStorage.getItem("usuario_id");
    const rol_id = localStorage.getItem("rol_id");

    if (!token) {
        alert("Inicia sesión");
        window.location.href = "/login";
        return;
    }

    try {
        // Verificación del token
        const response = await $.ajax({
            url: global_url + "/auth/verificar-admin",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                token,
                usuario_id,
                rol_id,
            }),
        });

        // Validar si el token es incorrecto desde la respuesta
        if (response.message !== "Acceso garantizado exitosamente") {
            throw new Error("Acceso denegado");
        }

        console.log("Verificación exitosa", response);
        return response;
    } catch (error) {
        console.error("Error en la verificación:", error);
        alert("Error de autenticación. Por favor, vuelve a iniciar sesión.");
        window.location.href = "/login";
        throw error;
    }
}