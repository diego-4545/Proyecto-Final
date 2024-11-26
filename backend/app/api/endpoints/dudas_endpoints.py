from fastapi import APIRouter

from backend.app.data import dudas_queries as dudq
from backend.app.schemas import dudas_esquema as duds


router = APIRouter()

### GET
# Obtener todos los IDs de dudas
@router.get("/api/duda")
async def dudas_ids():
    # Funcion para obtener los IDs
    data: list[tuple] = dudq.dudas_query(dudq.get_ids_dudas)
    # Si no hay dudas no retornar nada
    if not data:
        return []
    ids = list()
    for i in range(len(data)):
        ids.append(data[i][0])
    return duds.GET_TodasDudas_Response(
        duda_ids=ids
    )

# Obtener informacion de una duda
@router.get("/api/duda/{id}")
async def duda_info(id):
    data = dudq.dudas_query(dudq.get_info_duda.format(duda_id=id))
    return duds.GET_InfoDudas_Response(
        duda_id=data[0][0],
        nombre=data[0][1],
        correo=data[0][2],
        descripcion=data[0][3],
        fecha=data[0][4].isoformat(),
    )



### POST
# Añadir una lista
@router.post("/api/duda")
async def duda_crear(input: duds.POST_CrearDuda_Request):
    params = (
        input.nombre,
        input.correo,
        input.descripcion,
        input.fecha,
    )
    dudq.dudas_query(dudq.post_nueva_duda, params)
    return {"message": "Duda creada exitosamente"}


### DELETE
# Eliminar una duda
@router.delete("/api/duda/{id}")
async def duda_borrar(id):
    dudq.dudas_query(dudq.delete_eliminar_duda.format(duda_id=id))
    return {"message": "Duda eliminada exitosamente"}
