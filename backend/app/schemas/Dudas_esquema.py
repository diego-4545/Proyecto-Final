# Librería para estructurar la API
from pydantic import BaseModel

### ============================= Dudas ==================================== ###
# Obtener todos los IDs de dudas 
class GET_TodasDudas_Request(BaseModel):
    ...

class GET_TodasDudas_Response(BaseModel):
    duda_ids: list[int]


# Obtener información de una duda especidica
class GET_InfoDudas_Request(BaseModel):
    duda_id: int

class GET_InfoDudas_Response(BaseModel):
    # Columnas de la tabla dudas
    duda_id: int
    nombre: str 
    email: str
    descripcion: int
    Imagen_del_problema: str # path to the image
    fecha: int

### POST (Añadir datos)
### ============================= Dudas ==================================== ###
# Crea una nueva duda
class POST_Crearduda_Request(BaseModel):
    # Columnas de la tabla dudas
    duda_id: int
    nombre: str 
    correo: str 
    descripción: str
    fecha: str
    ImagenDeAyudaAlProblema: str # path to the image
    FechaDeReporte: int

### DELETE
### ============================= Dudas ==================================== ###
# Borrar duda
class DELETE_Borrarduda(BaseModel):
    duda_id: int

