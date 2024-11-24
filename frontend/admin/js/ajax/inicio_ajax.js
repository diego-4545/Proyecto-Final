import { verificarAdmin } from "./auth_ajax.js";


$(document).ready(async () => {
    // Autenticación
    await verificarAdmin();
});
