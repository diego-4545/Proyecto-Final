# Librería para estructurar la API
from pydantic import BaseModel

### GET
### ============================= Etiqueta ==================================== ###
# Obtener información de una etiqueta especifico
class GET_EtiquetaInfo_Response(BaseModel):
    # Columnas de la tabla etiquetas
    etiqueta_id: int
    nombre: str
    fecha: str

### POST
### ============================= Etiqueta ==================================== ###
# Crear una nueva etiqueta
class POST_EtiquetaCrear_Request(BaseModel):
    # Columnas de la tabla etiquetas
    etiqueta_id: int
    nombre: str
    fecha: str

### PUT
### ============================= Etiqueta ==================================== ###
# cambiar datos de una etiqueta 
class PUT_EtiquetaCambiar_Request(BaseModel):
    # Columnas de la tabla etiquetas
    etiqueta_id: int
    nombre: str
    fecha: str

### DELETE
### ============================= Etiqueta ==================================== ###
# Elimina una etiqueta 
class DELETE_etiqueta_Request(BaseModel):
    etiqueta_id: int
    
    