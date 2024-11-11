# Librería para estructurar la API
from pydantic import BaseModel

### ============================= Articulos ==================================== ###

# Obtener todos los IDs de articulos de cierto usuario
class GET_TodosArticulos_Request(BaseModel):
    usuario_id: int

class GET_TodosArticulos_Response(BaseModel):
    usuario_id: int
    articulo_ids: list[int]


# Obtener información de un artículo especifico
class GET_InfoArticulo_Request(BaseModel):
    usuario_id: int
    articulo_id: int

class GET_InfoArticulo_Response(BaseModel):
    # Columnas de la tabla articulos
    usuario_id: int
    articulo_id: int
    nombre: str # titulo
    fecha: str
    visitas: int
    estado: int
    contenido: str
    imagen: str # path to the image

### ============================= Estados ==================================== ###

# Obten el nombre del estado de un articulo
class GET_NombreEstadoArticulo_Request(BaseModel):
    estado_id: int

class GET_NombreEstadoArticulo_Response(BaseModel):
    estado_id: int
    nombre: str

### ============================= Likes ==================================== ###

# Obtener cantidad de likes de un artículo especifico
class GET_LikesArticulo_Request(BaseModel):
    articulo_id: int

class GET_LikesArticulo_Response(BaseModel):
    articulo_id: int
    likes: int

### ============================= Etiquetas ==================================== ###

# Obtener los IDs de las etiquetas de un artículo especifico
class GET_EtiquetasArticulo_Request(BaseModel):
    articulo_id: int

class GET_EtiquetasArticulo_Response(BaseModel):
    articulo_id: int
    etiquetas: list[int]


# !!!
# Obten la fecha y el nombre de una etiqueta LAS ETIQUETAS PUEDEN SER DE UN ARTICULO O USUARIO
class GET_NombreEtiquetas_Request(BaseModel):
    etiqueta_id: int

class GET_NombreEtiquetas_Response(BaseModel):
    etiqueta_id: int
    nombre: str
    fecha: str
    
### ============================== Comentarios =================================== ###

# Obtener los IDs de los comentarios de un artículo especifico
class GET_ComentariosArticulo_Request(BaseModel):
    articulo_id: int

class GET_ComentariosArticulo_Response(BaseModel):
    articulo_id: int
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

### ================================================================= ###
