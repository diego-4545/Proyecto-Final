document.getElementById("btn-reportar").addEventListener("click", function () {
    Swal.fire({
        title: "¿Estás seguro de que quieres reportar este artículo?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#9B9C9E",
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

document.querySelectorAll(".btn-reportar-comentario").forEach((boton) => {
    boton.addEventListener("click", function () {
        const comentario = this.closest(".comentario-item")
            .querySelector(".comentario-contenido").innerText;

        Swal.fire({
            title: "¿Estás seguro de que quieres reportar este comentario?",
            text: `Comentario: "${comentario}"`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#9B9C9E",
            confirmButtonText: "Sí, reportar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    "Reportado",
                    "El reporte del comentario ha sido enviado.",
                    "success"
                );
            }
        });
    });
});
