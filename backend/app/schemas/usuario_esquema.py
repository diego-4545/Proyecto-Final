# Librería para estructurar la API
from pydantic import BaseModel

### ============================= Usuarios ==================================== ###
# Obtener el rol de cierto usuario

class GET_UsuarioRol_Request(BaseModel):
    articulo_id: int

class GET_UsuarioRol_Response(BaseModel):
    usuario_id: int
    rol_id: int

# Obtener información de un usuario especifico
class GET_InfoUsuario_Request(BaseModel):
    usuario_id: int
    rol_id: int


class GET_InfoUsuario_Response(BaseModel):
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
class GET_EtiquetasUsuario_Request(BaseModel):
    usuario_id: int

class GET_EtiquetasUsuario_Response(BaseModel):
    usuario_id: int
    etiquetas: list[int]


# !!!
# Obten la fecha y el nombre de una etiqueta LAS ETIQUETAS PUEDEN SER DE UN ARTICULO O USUARIO
class GET_NombreEtiquetas_Request(BaseModel):
    etiqueta_id: int

class GET_NombreEtiquetas_Response(BaseModel):
    etiqueta_id: int
    nombre: str
    fecha: str
    
### ============================= Notificación ==================================== ###
# Obtener los IDs de las notificaciones de un usuario especifico
class GET_NotificacionUsuarios_Request(BaseModel):
    usuario_id: int

class GET_NotificacionUsuarios_Response(BaseModel):
    usuario_id: int
    notificacion: list[int]


# Obten la información de una notificacion especifica
class GET_InfoNotificacion_Request(BaseModel):
    notificacion_id: int

class GET_InfoNotificacion_Response(BaseModel):
    notificacion_id: int
    mensaje: int
    fecha: int
    usuario_id: int
    estado_id: int


# Obten el estado de una notificacion especifica
class GET_NombreEstadoNotificacion_Request(BaseModel):
    comentario_id: int

class GET_NombreEstadoNotificacion_Response(BaseModel):
    comentario_id: int
    nombre: str

### ============================= Roles ==================================== ###
# Obten el nombre del rol de un articulo
class GET_NombreRolUsuario_Request(BaseModel):
    rol_id: int

class GET_NombreRolUsuario_Response(BaseModel):
    rol_id: int
    nombre: str

### ============================= Comentarios ==================================== ###
# Obtener los IDs de los comentarios de un usuario especifico
class GET_ComentariosUsuario_Request(BaseModel):
    usuario_id: int

class GET_ComentariosUsuario_Response(BaseModel):
    usuario_id: int
    comentarios: list[int]

# Obten la información de un comentario especifico
class GET_InfoComentario_Request(BaseModel):
    comentario_id: int

class GET_InfoComentario_Response(BaseModel):
    comentario_id: int
    usuario_id: int
    articulo_id: int
    estado_id: int
    contenido: str


# Obten el estado de un comentario especifico
class GET_NombreEstadoComentario_Request(BaseModel):
    comentario_id: int

class GET_NombreEstadoComentario_Response(BaseModel):
    comentario_id: int
    nombre: str

### ============================= Likes ==================================== ###

# Obtener cantidad de likes de un usuario especifico
class GET_LikesArticulo_Request(BaseModel):
    usuario_id: int

class GET_LikesArticulo_Response(BaseModel):
    usuario_id: int
    likes: int

### ================================================================= ###