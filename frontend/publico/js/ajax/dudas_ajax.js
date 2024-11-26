async function registroDuda() {
    const global_url = "http://127.0.0.1:8000";

    const nombre = $("#duda-nombre").val(); 
    const correo = $("#duda-correo").val();
    const descripcion = $("#duda-descripcion").val();

    // Valores predeterminados
    const fecha = new Date().toISOString().split("T")[0];

    try {
        // Muestra los datos que se enviarán al backend
        console.log({
            nombre,
            correo, 
            descripcion,
            fecha,
        });

        // Enviar datos al backend
        const response = await $.ajax({
            url: global_url + "/api/duda",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                nombre,
                correo, 
                descripcion,
                fecha,
            }),
        });

        console.log("Duda enviada exitosamente", response);
        return response;
    } catch (error) {
        console.error("Error al enviar la duda: " + error);
    }
}

$(document).ready(() => {
    $("#boton-enviar").on("click", () => registroDuda());
});