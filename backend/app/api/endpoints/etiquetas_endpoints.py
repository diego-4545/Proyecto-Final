from fastapi import APIRouter

from backend.app.data import etiquetas_queries as etiq
from backend.app.schemas import etiquetas_esquema as etis


router = APIRouter()

### Solicitudes GET
# Obtener todos los ID de las etiquetas
@router.get("/api/etiqueta")
async def etiqueta_ids():
    # Funcion para obtener los IDs
    data: list[tuple] = etiq.etiquetas_query(etiq.get_etiqueta_all)
    # Si no hay etiquetas retornar nada
    if not data:
        return None
    ids = list()
    for i in range(len(data)):
        ids.append(data[i][0])
    return etis.GET_EtiquetaAll_Response(
        etiquetas_ids=ids
    )

# Obtener informacion de una etiqueta
@router.get("/api/etiqueta/{id}")
async def etiqueta_info(id):
    # Funcion para obtener la info de una etiqueta
    data: list[tuple] = etiq.etiquetas_query(etiq.get_etiqueta_info.format(etiqueta_id=id))
    if not data:
        return None
    return etis.GET_EtiquetaInfo_Response(
        etiqueta_id=data[0][0],
        nombre=data[0][1],
        fecha=data[0][2].isoformat(),
    )



### Solicitudes POST
# Añadimos una nueva etiqueta
@router.post("/api/etiqueta")
async def articulo_añadir_etiqueta(input: etis.POST_EtiquetaCrear_Request):
    # Accedemos a los valores de la solicitud
    params = (
        input.nombre,
        input.fecha,
    )
    # Insertamos los valores en la BD
    etiq.etiquetas_query(etiq.post_etiqueta_crear, params)
    return {"message": "Se creo un comentario exitosamente"}



### PUT
# Cambiamos los datos de una etiqueta
@router.put("/api/etiqueta")
async def etiqueta_cambiar(input: etis.PUT_EtiquetaCambiar_Request):
    # Accedemos a los valores de la solicitud
    params = (
        input.etiqueta_id,
        input.nombre,
        input.fecha,
    )
    # Realizamos los cambios en la BD
    etiq.etiquetas_query(etiq.put_etiqueta_estado, params)
    return {"message": "Se cambio el estado de un comentario exitosamente"}



### DELETE
# Borramos una etiqueta
@router.delete("/api/etiqueta/{id}")
async def etiqueta_borrar(id):
    etiq.etiquetas_query(etiq.delete_etiqueta_eliminar.format(etiqueta_id=id))
    return {"message": "Se elimino el comentario exitosamente"}
