document.getElementById("btn-reportar").addEventListener("click", function () {
    Swal.fire({
        title: "¿Estás seguro de que quieres reportar?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, reportar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                "Reportado",
                "El reporte ha sido enviado.",
                "success"
            );
        }
    });
});