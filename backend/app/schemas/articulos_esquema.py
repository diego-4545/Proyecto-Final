# Librería para estructurar la API
from pydantic import BaseModel

### GET
### ============================= Articulos ==================================== ###
# Obtener todos los usuarios
class GET_ArticulosAll_Response(BaseModel):
    articulos_ids: list[int]

# Obtener todos los IDs de articulos de cierto usuario
class GET_Articulos_Response(BaseModel):
    usuario_id: int
    articulo_ids: list[int]


# Obtener información de un artículo especifico
class GET_ArticuloInfo_Response(BaseModel):
    # Columnas de la tabla articulos
    articulo_id: int
    nombre: str # titulo
    fecha: str
    visitas: int
    usuario_id: int
    estado: int
    contenido: str
    imagen: str # path to the image

### ============================= Estados ==================================== ###
# Obten el nombre del estado de un articulo
class GET_ArticuloNombreEstado_Response(BaseModel):
    estado_id: int
    nombre: str

### ============================= Likes ==================================== ###
# Obtener cantidad de likes de un artículo especifico
class GET_ArticuloLikes_Response(BaseModel):
    articulo_id: int
    likes: int

### ============================= Etiquetas ==================================== ###
# Obtener los IDs de las etiquetas de un artículo especifico
class GET_ArticuloEtiquetas_Response(BaseModel):
    articulo_id: int
    etiquetas: list[int]


# !!!
# Obten la fecha y el nombre de una etiqueta LAS ETIQUETAS PUEDEN SER DE UN ARTICULO O USUARIO
class GET_NombreEtiquetas_Response(BaseModel):
    etiqueta_id: int
    nombre: str
    fecha: str
    
### ============================== Comentarios =================================== ###
# Obtener los IDs de los comentarios de un artículo especifico
class GET_ArticuloComentarios_Response(BaseModel):
    articulo_id: int
    comentarios: list[int]



### POST (Añadir datos)
### ============================= Articulos ==================================== ###
# Crea un nuevo articulo
class POST_ArticuloCrear_Request(BaseModel):
    # Columnas de la tabla articulos
    usuario_id: int
    nombre: str # titulo
    fecha: str
    visitas: int
    estado: int
    contenido: str
    imagen: str # path to the image

class POST_ArticuloAUsuario(BaseModel):
    usuario_id: int
    articulo_id: int
### ============================= Likes ==================================== ###
# Añade un like a un articulo
class POST_ArticuloLike_Request(BaseModel):
    usuario_id: int
    articulo_id: int

### ============================= Etiquetas ==================================== ###
# Asigna etiquetas a un articulo
class POST_EtiquetasAsignar_Request(BaseModel):
    articulo_id: int
    etiquetas_id: list[int]



### PUT
### ============================= Estado Articulo ==================================== ###
# Cambia el estado del articulo
class PUT_ArticuloCambiarEstado_Request(BaseModel):
    articulo_id: int
    nombre: str
    fecha: str
    visitas: int
    usuario_id: int
    estado_id: int
    contenido: str
    imagen: str



### DELETE
### ============================= Articulos ==================================== ###
class DELETE_ArticuloBorrar_Request(BaseModel):
    articulo_id: int
