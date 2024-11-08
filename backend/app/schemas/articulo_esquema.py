# Librería para estructurar la API
from pydantic import BaseModel


# Obtener todos los IDs de articulos de cierto usuario
# Endpoint: user-article/ 
class GET_TodosArticulos_Request(BaseModel):
    usuario_id: int

class GET_TodosArticulos_Response(BaseModel):
    usuario_id: int
    articulo_ids: list[int]


# Obtener información de un artículo especifico
# Endpoint: user-article/{article_id}
class GET_InfoArticulo_Request(BaseModel):
    usuario_id: int
    articulo_id: int

class GET_InfoArticulo_Response(BaseModel):
    # Columnas de la tabla articulos
    usuario_id: int
    articulo_id: int
    nombre: str # titulo
    fecha: str
    vistas: int
    estado: int
    contenido: str
    imagen: str # path to the image


# TODO: Añadir estructura de 'requests' y 'reponse' para obtener:
## LIKES
## ETIQUETAS
## ESTADO
## COMENTARIOS
