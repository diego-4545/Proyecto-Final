var global_url = "http://127.0.0.1:8000"

// Mostrar articulos tendencias
async function mostrar_perfil_articulos_usuario_tendencias() {
    // Obtener IDs de articulos de un usuario especifico
    async function obtener_id_articulos() {
        try {
            const articulos = await $.ajax({
                url: global_url + "/api/articulos",
                method: "GET",
                contentType: "application/json",
            });
            console.log(articulos.articulo_ids)
            return articulos.articulos_ids;
        } catch (error) {
            console.error("Error al obtener los articulos: " + error);
            return null;
        }
    }

    // Obtener la informacion de cada articulo
    async function obtener_info_articulo(articulo_id) {
        try {
            const articulo_info = await $.ajax({
                url: global_url + "/api/articulo/" + articulo_id,
                method: "GET",
                contentType: "application/json",
            });
            return articulo_info;
        } catch (error) {
            console.error("Error al obtener la informacion del articulo: " + error);
            return null;
        }
    }

    $(".galeria-noticias").empty();
    const articulos_ids = await obtener_id_articulos();
    console.log(articulos_ids);
    if (articulos_ids) {
        // Limitamos la cantidad de artículos a solo 4 en el inicio
        const limite = 4;
        const articulos_limited_ids = articulos_ids.slice(0, limite);

        try {
            // Obtenemos la información de los artículos en paralelo
            const articulos = await Promise.all(
                articulos_limited_ids.map(id => obtener_info_articulo(id))
            );
        
            // Iteramos sobre los artículos y los añadimos a la galería
            for (const articulo of articulos) {
                if (articulo) {
                    const articulo_bloque = `
                            <a href="/noticia/${articulo.articulo_id}" class="news-box" data-id="${articulo.articulo_id}" onclick="añadir_articulo_id_localstorage(event, ${articulo.articulo_id})">
                                <h3>${articulo.nombre}</h3>
                                <p>${articulo.contenido}</p>
                            </a>
                    `;
                    $('.galeria-noticias').append(articulo_bloque);
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
            console.error("Error al procesar los artículos: ", error);
        }        
    }
}


// Cargar todo al cargar la página
$(document).ready(async () => {
    await mostrar_perfil_articulos_usuario_tendencias();
});
