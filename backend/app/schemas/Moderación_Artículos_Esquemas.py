# Librería para estructurar la API
from pydantic import BaseModel

### ============================= Moderación de articulos ==================================== ###

# Obtener los IDs de articulos de un usuario especifico
class GET_EtiquetasUsuario_Request(BaseModel):
    usuario_id: int

class GET_EtiquetasUsuario_Response(BaseModel):
    usuario_id: int
    articulos: list[int]


# Obten el contenido de un articulo
class GET_NombreArticulo_Request(BaseModel):
    articulo_id: int

class GET_NombreArticulo_Response(BaseModel):
    articulo_id: int
    usuario: str
    titulo: str
    etiquetas: str
    contenido: str
    fotos: str


### PUT
### ============================= Estado De Articulo ==================================== ###
# Cambia el estado del articulo
class PUT_CambiarEstadoArticulo_Request(BaseModel):
    articulo_id: int
    EstadoArticulo_id: int

### ============================= Rol de usuario ==================================== ###
# Cambia el rol de algun usuario
class PUT_CambiarRolUsuario_Request(BaseModel):
    usuario_id: int
    rol_id: int

### DELETE
### ============================= Articulo ==================================== ###
# Borrar articulo
class DELETE_Borrararticulo(BaseModel):
    articulo_id: int

