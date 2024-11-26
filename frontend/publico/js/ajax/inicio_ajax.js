var global_url = "http://127.0.0.1:8000"

// Mostrar articulos tendencias
async function mostrar_perfil_articulos_usuario_tendencias() {
    // Obtener IDs de articulos de un usuario especifico
    async function obtener_id_articulos() {
        try {
            const articulos = await $.ajax({
                url: global_url + "/api/articulos-usuario",
                method: "GET",
                contentType: "application/json",
            });
            return articulos.articulo_ids;
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

    $("#").empty();
    const articulos_ids = await obtener_id_articulos();
    if (articulos_ids) {
        // Limitamos la cantidad de artículos a solo 4 en el inicio
        const limite = 4;
        const articulos_limited_ids = articulos_ids.slice(0, limite);

        try {
            // Obtenemos la información de los artículos en paralelo
            const articulos = await Promise.all(
                articulos_limited_ids.map(id => obtener_nombre_articulo(id))
            );

            // Iteramos sobre los artículos y los añadimos a la galería
            articulos.forEach(articulo => {
                if (articulo) {
                    const articulo_bloque = `
                        // Añadir aqui articulos HTML
                    `;
                    $('#').append(articulo_bloque);
                }
            });
        } catch (error) {
            console.error("Error al procesar los artículos: ", error);
        }
    }
}


// Mostrar articulos recientes
async function mostrar_perfil_articulos_usuario_tendencias() {
    // Obtener IDs de articulos de un usuario especifico
    async function obtener_id_articulos() {
        try {
            const articulos = await $.ajax({
                url: global_url + "/api/articulos-usuario",
                method: "GET",
                contentType: "application/json",
            });
            return articulos.articulo_ids;
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

    $("#").empty();
    const articulos_ids = await obtener_id_articulos();
    if (articulos_ids) {
        // Limitamos la cantidad de artículos a solo 4 en el inicio
        const limite = 4;
        const articulos_limited_ids = articulos_ids.slice(0, limite);

        try {
            // Obtenemos la información de los artículos en paralelo
            const articulos = await Promise.all(
                articulos_limited_ids.map(id => obtener_nombre_articulo(id))
            );

            // Iteramos sobre los artículos y los añadimos a la galería
            articulos.forEach(articulo => {
                if (articulo) {
                    const articulo_bloque = `
                        // Añadir aqui articulos HTML
                    `;
                    $('#').append(articulo_bloque);
                }
            });
        } catch (error) {
            console.error("Error al procesar los artículos: ", error);
        }
    }
}


// Cargar todo al cargar la página
$(document).ready(async () => {
    mostrar_perfil_articulos_usuario_tendencias();
    mostrar_perfil_articulos_usuario_recientes();
});
