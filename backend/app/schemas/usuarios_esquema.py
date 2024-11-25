# Librería para estructurar la API
from pydantic import BaseModel

### GET
### ============================= Usuarios ==================================== ###
# Obtener todos los usuarios
class GET_UsuariosAll_Response(BaseModel):
    usuarios_ids: list[int]

# Obtener información de un usuario especifico
class GET_UsuarioInfo_Response(BaseModel):
    # Columnas de la tabla usuarios
    usuario_id: int
    nombre: str 
    usuario: str 
    email: str
    fecha: str
    descripcion: str
    foto_perfil: str # path to the image
    rol_id: int
    contraseña: str

### ============================= Etiquetas ==================================== ###
# Obtener los IDs de las etiquetas de un usuario especifico
class GET_UsuarioEtiquetas_Response(BaseModel):
    usuario_id: int
    etiquetas: list[int]

# !!!
# Obten la fecha y el nombre de una etiqueta LAS ETIQUETAS PUEDEN SER DE UN ARTICULO O USUARIO
class GET_NombreEtiquetas_Response(BaseModel):
    etiqueta_id: int
    nombre: str
    fecha: str

### ============================= Notificación ==================================== ###
# Obtener los IDs de las notificaciones de un usuario especifico
class GET_NotificacionInfo_Response(BaseModel):
    usuario_id: int
    notificacion_id: list[int]

# Obten el contenido de una notificacion
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

### ============================= Rol ==================================== ###
# Obtener El nombre del rol del usuario
class GET_UsuarioRolNombre_Response(BaseModel):
    rol_id: int
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



### POST
### ============================= Usuarios ==================================== ###
# Crear un nuevo usuario
class POST_UsuarioCrear_Request(BaseModel):
    # Columnas de la tabla usuarios
    nombre: str 
    usuario: str 
    email: str
    fecha: str
    descripcion: str
    foto_perfil: str # path to the image
    rol_id: int
    contraseña: str

### ============================= Etiquetas ==================================== ###
# Añadir etiquetas al perfil del usuario
class POST_UsuarioEtiquetasAsignar_Request(BaseModel):
    usuario_id: int
    etiquetas: list[int]

### ============================= Notificación ==================================== ###
# Mandar un nueva notificación a un usuario
class POST_UsuarioNotificacionCrear_Request(BaseModel):
    mensaje: int
    fecha: int
    usuario_id: int
    estado_id: int



### PUT
### ============================= Usuarios ==================================== ###
# cambiar datos de un usuarios 
class PUT_UsuarioCambiar_Request(BaseModel):
    # Columnas de la tabla usuarios
    usuario_id: int
    nombre: str 
    usuario: str 
    email: str
    fecha: str
    descripcion: str
    foto_perfil: str # path to the image
    rol_id: int
    contraseña: str

### ============================= Etiquetas ==================================== ###
# Actualiza las etiquetas al perfil del usuario
class PUT_UsuarioEtiquetasCambiar_Request(BaseModel):
    usuario_id: int
    etiquetas: list[int]

### ============================= Notificación ==================================== ###
# Cambiar el estado de una notificacion
class PUT_UsuarioNotificacionCambiar_Request(BaseModel):
    notificacion_id: int
    estado_id: int



### DELETE
### ============================= Usuarios ==================================== ###
# Elimina un usuario 
class DELETE_UsuarioCambiar_Request(BaseModel):
    usuario_id: int
    