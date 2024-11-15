from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.rutas import router as rutas


def inicializar_applicacion():
    app = FastAPI(
        title="Metropolitan",
        description="Una página para subir y leer artículos",
        version="1.0.0"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],  # Permitir todos los métodos
        allow_headers=["*"],  # Permitir todos los encabezados
    )

    app.include_router(rutas)
    return app

app = inicializar_applicacion()

# Imprime todas las rutas de la API
for routes in app.routes:
    print(routes.path)
    