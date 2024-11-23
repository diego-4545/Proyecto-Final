from fastapi import APIRouter
from fastapi import HTTPException

from backend.app.services.auth.auth import verificar_usuario, crear_token, verificar_token
from backend.app.services.auth.auth_esquemas import POST_Login_Request, POST_Verificar_Admin_Request


router = APIRouter()

@router.post("/auth/login")
async def login(input: POST_Login_Request):
    existe, usuario_id, rol_id = verificar_usuario(input.usuario, input.password)
    if not existe:
        raise HTTPException(status_code=401, detail="Usuario o contraseña invalidos")

    # Crea el token usando el rol del usuario
    token = crear_token({"sub": usuario_id, "rol_id": rol_id})
    return {"access_token": token, "token_type": "bearer", "usuario_id": usuario_id, "rol_id": rol_id}


@router.post("/auth/verificacion")
async def verificar_admin(input: POST_Verificar_Admin_Request):
    payload = verificar_token(input.token)
    if payload:
        return {"autenticado": True, "rol_id": payload.get("rol_id", 0)}
    return {"autenticado": False}
    