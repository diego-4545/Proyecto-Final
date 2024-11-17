# Librería para estructurar la API
from pydantic import BaseModel

### ============================= Dudas ==================================== ###
# Obtener todos los IDs de dudas 
class GET_TodasDudas_Response(BaseModel):
    duda_ids: list[int]


# Obtener información de una duda especidica
class GET_InfoDudas_Response(BaseModel):
    # Columnas de la tabla dudas
    duda_id: int
    nombre: str 
    correo: str
    descripcion: str
    fecha: str



### POST (Añadir datos)
### ============================= Dudas ==================================== ###
# Crea una nueva duda
class POST_CrearDuda_Request(BaseModel):
    nombre: str 
    correo: str 
    descripcion: str
    fecha: str



### DELETE
### ============================= Dudas ==================================== ###
# Borrar duda
class DELETE_BorrarDuda_Request(BaseModel):
    duda_id: int

