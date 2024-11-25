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

@app.get("/conocenos")
def serve_conocenos():
    return FileResponse("frontend/publico/información_estatica.html")

@app.get("/articulo")
def serve_articulo():
    return FileResponse("frontend/usuario/articulos.html")



# Autenticación
@app.get("/login")
def serve_login():
    return FileResponse("frontend/publico/autenticacion/login.html")

@app.get("/registro")
def serve_registro():
    return FileResponse("frontend/publico/autenticacion/registro.html")

# Errores
@app.get("/error/401")
def serve_error_401():
    return FileResponse("frontend/error/401.html")

@app.get("/error/403")
def serve_error_403():
    return FileResponse("frontend/error/403.html")


# Solo usuarios autenticados
@app.get("/perfil")
def serve_perfil():
    return FileResponse("frontend/usuario/perfil.html")

@app.get("/escritor")
def serve_perfil():
    return FileResponse("frontend/usuario/inicio_editor.html")

@app.get("/redaccion")
def serve_usuario_redaccion_atrticulos():
    return FileResponse("frontend/usuario/redaccion_articulos.html")



# Páginas de administrador
@app.get("/admin")
def serve_admin_inicio():
    return FileResponse("frontend/admin/inicio.html")

@app.get("/admin/articulos")
def serve_admin_crud_articulos():
    return FileResponse("frontend/admin/crud_articulos.html")

@app.get("/admin/usuarios")
def serve_admin_crud_usuarios():
    return FileResponse("frontend/admin/crud_usuarios.html")

@app.get("/admin/etiquetas")
def serve_admin_crud_etiquetas():
    return FileResponse("frontend/admin/crud_etiquetas.html")

@app.get("/admin/dudas")
def serve_admin_dudas():
    return FileResponse("frontend/admin/dudas.html")

@app.get("/admin/estadisticas")
def serve_admin_estadisticas():
    return FileResponse("frontend/admin/estadísticas.html")

@app.get("/admin/mod-articulos")
def serve_admin_moderación_articulos():
    return FileResponse("frontend/admin/moderación_artículos.html")

@app.get("/admin/mod-comentarios")
def serve_admin_moderación_comentarios():
    return FileResponse("frontend/admin/moderacion_comentarios.html")

