from fastapi import APIRouter
from backend.app.api.endpoints import articulos_endpoints, comentario_endpoints, dudas_endpoints

router = APIRouter()
router.include_router(articulos_endpoints.router, tags=["Endpoints de Articulos"])
router.include_router(comentario_endpoints.router, tags=["Endpoints de Comentarios"])
router.include_router(dudas_endpoints.router, tags=["Endpoints de Dudas"])
