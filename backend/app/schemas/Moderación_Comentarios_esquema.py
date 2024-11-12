# Librería para estructurar la API
from pydantic import BaseModel

### ============================= Moderación de comentarios ==================================== ###

# Obtener los IDs de comentarios de un usuario especifico
class GET_EtiquetasUsuario_Request(BaseModel):
    usuario_id: int

class GET_EtiquetasUsuario_Response(BaseModel):
    usuario_id: int
    comentarios: list[int]


# Obten la fecha y el contenido de un comentario 
class GET_NombreEtiquetas_Request(BaseModel):
    comentario_id: int

class GET_NombreEtiquetas_Response(BaseModel):
    comentario_id: int
    contenido: str
    fecha: str
    