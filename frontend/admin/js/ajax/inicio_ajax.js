import { verificarAdmin } from "./auth_ajax.js";


$(document).ready(async () => {
    // Autenticación
    try {
        const admin = await verificarAdmin();
        console.log("Admin autenticado:", admin);
        // Lógica adicional para cargar datos si es necesario
    } catch (error) {
        window.location.href = "/login";
    }
});
