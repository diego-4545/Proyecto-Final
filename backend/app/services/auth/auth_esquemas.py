from pydantic import BaseModel


# Esquema de la solicitud a la API para autenticar
class POST_Login_Request(BaseModel):
    usuario: str
    password: str

# Esquema para verificar si un usuario es admin
class POST_Verificar_Admin_Request(BaseModel):
    token: str
