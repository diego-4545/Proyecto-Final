from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from backend.app.api.rutas import router as rutas


def inicializar_applicacion():
    app = FastAPI(
        title="Metropolitan",
        description="Una página para subir y leer artículos",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], # Permitir acceder por todos lados
        allow_credentials=True,
        allow_methods=["*"],  # Permitir todos los métodos
        allow_headers=["*"],  # Permitir todos los encabezados
    )

    app.include_router(rutas)
    return app


# Inicializar la aplicación
app = inicializar_applicacion()
# Montar los archivos estaticos (CSS, JS e Imagenes)
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

### Páginas
# Páginas publicas
@app.get("/")
def serve_inicio():
    return FileResponse("frontend/publico/inicio.html")



# Autenticación
@app.get("/login")
def serve_login():
    return FileResponse("frontend/publico/autenticacion/login.html")

@app.get("/registro")
def serve_registro():
    return FileResponse("frontend/publico/autenticacion/registro.html")



# Solo usuarios autenticados
@app.get("/perfil")
def serve_perfil():
    return FileResponse("frontend/usuario/perfil.html")



# Páginas de administrador
@app.get("/admin")
def serve_admin_inicio():
    return FileResponse("frontend/admin/inicio.html")
