from pydantic import BaseModel

### GET
### ============================= Comentarios ==================================== ###
# Obten la información de un comentario especifico
class GET_ComentarioInfo_Response(BaseModel):
    comentario_id: int
    usuario_id: int
    articulo_id: int
    estado_id: int
    contenido: str

# Obten el estado de un comentario especifico
class GET_ComentarioNombreEstado_Response(BaseModel):
    comentario_id: int
    nombre: str



### POST
### ============================= Comentarios ==================================== ###
# Publica un comentario
class POST_ComentarioCrear_Request(BaseModel):
    usuario_id: int
    articulo_id: int
    estado_id: int
    contenido: str



### PUT
### ============================= Estado Comentario ==================================== ###
# Cambia el estado de un comentario
class PUT_ComentarioCambiarEstado_Request(BaseModel):
    comentario_id: int
    estado_id: int


### DELETE
### ============================= Comentarios ==================================== ###
class DELETE_ComentarioBorrar_Request(BaseModel):
    comentario_id: int
