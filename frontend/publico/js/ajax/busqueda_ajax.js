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

                    // Ver la respuesta completa del artículo en la consola para entender su estructura
                    console.log(`Artículo con ID ${id}:`, articulo);

                    // Verificar si el artículo tiene los campos necesarios
                    if (articulo && articulo.nombre && articulo.contenido) {
                        // Renderizar cada artículo en el contenedor
                        $(".news-container").append(`
                            <a href="/noticia/${id}" class="news-box" data-id="${articulo.articulo_id}" onclick="añadir_articulo_id_localstorage(event, ${articulo.articulo_id})">
                                <h3>${articulo.nombre}</h3>
                                <p>${articulo.contenido}</p>
                            </a>
                        `);
                    } else {
                        console.warn(`El artículo con ID ${id} tiene datos incompletos.`);
                    }
                } catch (error) {
                    console.error(`No se encontró el artículo con ID ${id}:`, error);
                    continue; // Continuar con los demás artículos
                }
            }
            const script_bloque = `
                <script>
                    function añadir_articulo_id_localstorage(event, id) {
                        // Evitar la redirección predeterminada
                        event.preventDefault();
                        // Guardar el ID en el localStorage
                        localStorage.setItem('articulo_id', id);
                        // Redirigir después de guardar el ID
                        window.location.href = "/articulo";
                    }
                </script>
            `;
            $("body").append(script_bloque);
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
