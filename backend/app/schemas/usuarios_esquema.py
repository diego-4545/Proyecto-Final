# Librería para estructurar la API
from pydantic import BaseModel

### ============================= Usuarios ==================================== ###
# Obtener información de un usuario especifico
class GET_UsuarioInfo_Response(BaseModel):
    # Columnas de la tabla usuarios
    usuario_id: int
    nombre: str 
    usuario: str 
    email: str
    fecha: str
    descripcion: int
    fotoperfil: str # path to the image
    estado: int
    contenido: str
    rol_id: int
    contraseña: str

### ============================= Etiquetas ==================================== ###
# Obtener los IDs de las etiquetas de un usuario especifico
class GET_UsuarioEtiquetas_Response(BaseModel):
    usuario_id: int
    etiquetas: list[int]

### ============================= Notificación ==================================== ###
# Obtener los IDs de las notificaciones de un usuario especifico
class GET_NotificacionInfo_Response(BaseModel):
    notificacion_id: int
    mensaje: int
    fecha: int
    usuario_id: int
    estado_id: int

# Obten el estado de una notificacion especifica
class GET_NotificacionNombreEstado_Response(BaseModel):
    estado_id: int
    nombre: str

### ============================= Comentarios ==================================== ###
# Obtener los IDs de los comentarios de un usuario especifico
class GET_ComentariosUsuario_Response(BaseModel):
    usuario_id: int
    comentarios: list[int]

### ============================= Likes ==================================== ###
# Obtener cantidad de likes de un usuario especifico
class GET_UsuarioLikes_Response(BaseModel):
    usuario_id: int
    likes: int
