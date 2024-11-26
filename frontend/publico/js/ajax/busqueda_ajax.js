var global_url = "http://127.0.0.1:8000";

$(document).ready(() => {
    // Evento para el botón de búsqueda
    $("#boton-busqueda").on("click", async (event) => {
        event.preventDefault();

        const termino = $(".search-bar input").val().trim();

        if (!termino) {
            alert("Por favor, ingresa un término de búsqueda.");
            return;
        }

        try {
            // Obtener IDs de artículos relacionados
            const responseIds = await $.ajax({
                url: global_url + "/api/articulos", // Endpoint que regresa los IDs
                method: "GET",
            });

            console.log("Respuesta del servidor:", responseIds);

            // Verificar si la propiedad "articulos_ids" existe y es un array
            const ids = responseIds.articulos_ids;

            if (!Array.isArray(ids) || ids.length === 0) {
                $(".news-container").empty().append("<p>No se encontraron resultados.</p>");
                $("#seccion-titulo").show(); // Mostrar las categorías
                return;
            }

            // Ocultar las categorías al mostrar resultados de búsqueda
            $("#seccion-titulo").hide();

            // Limpiar contenedor de noticias
            $(".news-container").empty();

            // Recorrer los IDs y obtener detalles de cada artículo
            for (const id of ids) {
                try {
                    const articulo = await $.ajax({
                        url: global_url + `/api/articulo/${id}`, // Endpoint de detalles
                        method: "GET",
                    });

                    // Renderizar cada artículo en el contenedor
                    $(".news-container").append(`
                        <a href="/noticia/${id}" class="news-box">
                            <h3>Artículo ${id}</h3>
                            <p>${articulo}</p>
                        </a>
                    `);
                } catch (error) {
                    console.error(`No se encontró el artículo con ID ${id}:`, error);
                    continue; // Continuar con los demás artículos
                }
            }
        } catch (error) {
            console.error("Error al realizar la búsqueda:", error);
            alert("Ocurrió un error al realizar la búsqueda.");
        }
    });

    // Restablecer las categorías si el campo de búsqueda queda vacío
    $(".search-bar input").on("input", function () {
        if ($(this).val().trim() === "") {
            $("#seccion-titulo").show(); // Mostrar las categorías
        }
    });
});
