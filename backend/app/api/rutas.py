from fastapi import APIRouter
from backend.app.api.endpoints import articulos_endpoints

router = APIRouter()
router.include_router(articulos_endpoints.router, tags=["Endpoints de Articulos"])
