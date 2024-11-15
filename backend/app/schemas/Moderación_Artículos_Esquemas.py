# Librería para estructurar la API
from pydantic import BaseModel

### ============================= Moderación de articulos ==================================== ###

# Obtener los IDs de articulos de un usuario especifico
class GET_EtiquetasUsuario_Request(BaseModel):
    usuario_id: int

class GET_EtiquetasUsuario_Response(BaseModel):
    usuario_id: int
    articulos: list[int]


# Obten el contenido de un comentario 
class GET_NombreEtiquetas_Request(BaseModel):
    articulo_id: int

class GET_NombreEtiquetas_Response(BaseModel):
    articulo_id: int
    usuario: str
    titulo: str
    etiquetas: str
    contenido: str
    fotos: str

