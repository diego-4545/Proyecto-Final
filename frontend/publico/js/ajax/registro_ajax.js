async function registroUsuario() {
    const global_url = "http://127.0.0.1:8000";

    const nombre = $("#form-nombre").val(); // Asegúrate de que los IDs sean correctos
    const email = $("#form-correo").val();
    const usuario = $("#form-usuario").val();
    const contraseña = $("#form-contraseña").val(); // Corrige el ID si es necesario

    // Valores predeterminados
    const fecha = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD
    const descripcion = ""; // String vacío
    const foto_perfil = "/frontend/img_biblioteca/perfiles/default.png"; // Ruta predeterminada
    const rol_id = 1; // Rol predeterminado

    try {
        // Muestra los datos que se enviarán al backend
        console.log({
            nombre,
            usuario, 
            email,
            fecha, 
            descripcion,
            foto_perfil,
            rol_id,
            contraseña,
        });

        // Enviar datos al backend
        const response = await $.ajax({
            url: global_url + "/api/usuario",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                nombre,
                usuario, 
                email,
                fecha, 
                descripcion,
                foto_perfil,
                rol_id,
                contraseña,
            }),
        });

        console.log("Verificación exitosa", response);
        window.location.href = "/";
        return response;
    } catch (error) {
        console.error("Error al crear la cuenta: " + error);
    }
}

$(document).ready(() => {
    $("#boton-ejecutar").on("click", () => registroUsuario());
});
