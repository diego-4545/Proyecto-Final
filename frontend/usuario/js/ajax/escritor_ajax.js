import { verificarUsuario } from "./auth_ajax.js";

import { get_usuario_info } from "./basic_ajax.js";
import { cambiar_navbar_con_info_usuario } from "./basic_ajax.js";


var global_url = "http://127.0.0.1:8000"


// Cargar todo al cargar la página
$(document).ready(async () => {
    // Autenticación
    await verificarUsuario();

    // Cambios de pantalla dinamico con la info de la BD
    const usuario_info = await get_usuario_info();
    console.log(usuario_info);

    // Modificar navbar
    cambiar_navbar_con_info_usuario(usuario_info);
});
