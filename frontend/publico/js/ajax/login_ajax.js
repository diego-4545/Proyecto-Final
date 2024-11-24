var global_url = "http://127.0.0.1:8000";

$(document).ready(() => {
    $("#login-form").on("submit", (event) => {
        event.preventDefault();

        const usuario = $("#login-form-usuario").val();
        const password = $("#login-form-password").val();

        $.ajax({
            url: global_url + "/auth/login",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                usuario, 
                password,
            }),
            success: (response) => {
                const token = response.access_token;
                const usuario_id = response.usuario_id;
                const rol_id = response.rol_id;

                // Guardar datos en localStorage
                localStorage.setItem("access_token", token);
                localStorage.setItem("usuario_id", usuario_id);
                localStorage.setItem("rol_id", rol_id);
                
                // Redireccion a la página de inicio
                window.location.href = "/";
            },
            error: (response) => {
                alert("Usuario o contraseña incorrectos");
            },
        });
    });
});
