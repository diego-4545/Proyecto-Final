from fastapi import APIRouter
from fastapi import HTTPException
from backend.app.services.auth.auth import login, crear_token
from backend.app.services.auth.auth_esquemas import POST_Login_Request, POST_Verificar_Request


router = APIRouter()

@router.post("/auth/login")
async def verificar_login(input: POST_Login_Request):
    existe, usuario_id, rol_id = login(input.usuario, input.password)
    if not existe:
        raise HTTPException(status_code=401, detail="Usuario o contraseña invalidos")

    # Crea el token usando el rol del usuario
    token = crear_token({"usuario_id": usuario_id, "rol_id": rol_id})
    return {"access_token": token, "token_type": "bearer", "usuario_id": usuario_id, "rol_id": rol_id}


@router.post("/auth/verificar-admin")
async def verificar_admin(input: POST_Verificar_Request):
    token = input.token
    usuario_id = input.usuario_id
    rol_id = input.rol_id

    verificar_admin(token)
    return {
        "message": "Acceso garantizado exitosamente",
        "access_token": token,
        "usuario_id": usuario_id,
        "rol_id": rol_id,
    }


@router.post("/auth/verificar-usuario")
async def verificar_usuario(input: POST_Verificar_Request):
    token = input.token
    usuario_id = input.usuario_id
    rol_id = input.rol_id

    verificar_usuario(token)
    return {
        "message": "Acceso garantizado exitosamente",
        "access_token": token,
        "usuario_id": usuario_id,
        "rol_id": rol_id,
    }
