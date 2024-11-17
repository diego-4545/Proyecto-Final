from fastapi import APIRouter

from backend.app.data import comentario_queries as comq
from backend.app.schemas import comentario_esquema as coms


router = APIRouter()

### Solicitudes GET
# Obtener informacion de un comentario
@router.get("/api/comentario/{id}")
async def comentario_info(id):
    # Funcion para obtener la info de un comentario
    data: list[tuple] = comq.comentarios_query(comq.get_comentario_info.format(comentario_id=id))
    return coms.GET_ComentarioInfo_Response(
        comentario_id=data[0][0],
        usuario_id=data[0][1],
        articulo_id=data[0][2],
        estado_id=data[0][3],
        contenido=data[0][4],
    )

# Obtener el nombre de un estado de un comentario
@router.get("/api/comentario-estado/{id}")
async def comentario_estado(id):
    # Funcion para obtener el estado de un comentario
    data: list[tuple] = comq.comentarios_query(comq.get_comentario_nombre_estado.format(estado_comentario_id=id))
    return coms.GET_ComentarioNombreEstado_Response(
        comentario_id=data[0][0],
        nombre=data[0][1],
    )



### Solicitudes POST
# Añadimos un nuevo comentario al articulo
@router.post("/api/comentario")
async def articulo_añadir_comentario(input: coms.POST_ComentarioCrear_Request):
    # Accedemos a los valores de la solicitud
    params = (
        input.usuario_id,
        input.articulo_id,
        input.estado_id,
        input.contenido,
    )
    # Insertamos los valores en la BD
    comq.comentarios_query(comq.post_comentario_crear, params)
    return {"message": "Se creo un comentario exitosamente"}



### PUT
# Cambiamos el estado de un comentario
@router.put("/api/comentario-estado")
async def comentario_cambiar_estado(input: coms.PUT_ComentarioCambiarEstado_Request):
    # Accedemos a los valores de la solicitud
    comentario_id = input.comentario_id
    estado_id = input.estado_id

    # Realizamos los cambios en la BD
    comq.comentarios_query(comq.put_comentario_cambiar_estado.format(estado_id=estado_id, comentario_id=comentario_id))
    return {"message": "Se cambio el estado de un comentario exitosamente"}



### DELETE
# Borramos un comentario
@router.delete("/api/comentario/{id}")
async def comentario_borrar(id):
    comq.comentarios_query(comq.delete_comentario_eliminar.format(comentario_id=id))
    return {"message": "Se elimino el comentario exitosamente"}
