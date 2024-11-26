from pydantic import BaseModel

### GET
### ============================= Estiquetas ==================================== ###
# Obten todos los ID de las etiquetas
class GET_EtiquetaAll_Response(BaseModel):
    etiquetas_ids: list[int]

# Obten la información de una etiqueta en especifico
class GET_EtiquetaInfo_Response(BaseModel):
    etiqueta_id: int
    nombre: str
    fecha: str

### POST
### ============================= Estiquetas ==================================== ###
# Publica una etiqueta
class POST_EtiquetaCrear_Request(BaseModel):
    nombre: str
    fecha: str


### PUT
### ============================= Estiquetas ==================================== ###
# Cambia los datos de una etiqueta
class PUT_EtiquetaCambiar_Request(BaseModel):
    etiqueta_id: int
    nombre: str


### DELETE
### ============================= Estiquetas ==================================== ###
class DELETE_EtiquetaBorrar_Request(BaseModel):
    etiqueta_id: int
