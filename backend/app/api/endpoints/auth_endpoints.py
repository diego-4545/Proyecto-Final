from fastapi import APIRouter
from fastapi import HTTPException

from backend.app.services.auth.auth import verificar_usuario
from backend.app.services.auth.auth import POST_Login_Request, POST_Login_Response


router = APIRouter()

@router.post("/auth/login")
async def login(input: POST_Login_Request):
    existe, usuario_id, rol_id = verificar_usuario(input.usuario, input.password)
    if not existe:
        raise HTTPException(status_code=401, detail="Usuario o contraseña invalidos")
    
    return POST_Login_Response(
        usuario_id=usuario_id,
        rol_id=rol_id,
    )
