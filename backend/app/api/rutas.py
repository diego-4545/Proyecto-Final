from fastapi import APIRouter
from backend.app.api.endpoints import usuarios_endpoints, articulos_endpoints, comentario_endpoints, dudas_endpoints
from backend.app.api.endpoints import auth_endpoints

router = APIRouter()
router.include_router(usuarios_endpoints.router, tags=["Endpoints de Usuarios"])
router.include_router(articulos_endpoints.router, tags=["Endpoints de Articulos"])
router.include_router(comentario_endpoints.router, tags=["Endpoints de Comentarios"])
router.include_router(dudas_endpoints.router, tags=["Endpoints de Dudas"])

router.include_router(auth_endpoints.router, tags=["Endpoint de autenticación"])
