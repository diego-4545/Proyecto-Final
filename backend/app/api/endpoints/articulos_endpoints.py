from fastapi import APIRouter

from backend.app.data import articulos_queries as artq
from backend.app.schemas import articulos_esquema as arts


router = APIRouter()

### Solicitudes GET
# Obtener todos los ID de los usuarios
@router.get("/api/articulos")
async def usuarios_ids():
    # Funcion para obtener los IDs
    data: list[tuple] = artq.articulos_query(artq.get_articulos_all)
    # Si no hay usuarios retornar nada
    if not data:
        return None
    ids = list()
    for i in range(len(data)):
        ids.append(data[i][0])
    return arts.GET_ArticulosAll_Response(
        articulos_ids=ids
    )

# Obtener TODOS los articulos de un usuario
@router.get("/api/articulos-usuario/{id}")
async def todos_los_articulos(id):
    # Funcion con código SQL para extraer todos los IDs de articulos de un usuario especifico
    data: list[tuple] = artq.articulos_query(artq.get_articulos.format(usuario_id=id))
    # Si no hay etiquetas asignadas a ese usuario no regresar una lista vacias
    if not data:
        return arts.GET_Articulos_Response(
            usuario_id=id,
            articulo_ids=[],
        )
    articulos_id = list()
    # Convertirlo a una lista (1 => [1])
    for i in range(len(data)):
        articulos_id.append(data[i][1])
    return arts.GET_Articulos_Response(
        usuario_id=data[0][0],
        articulo_ids=articulos_id,
    )

# Obtener info de un articulo
@router.get("/api/articulo/{id}")
async def articulo_info(id):
    # Funcion que obtiene la info de un articulo por su ID
    data: list[tuple] = artq.articulos_query(artq.get_articulo_info.format(articulo_id=id))
    # Regresar nada si no hay articulos de ese usuario
    if not data:
        return None
    return arts.GET_ArticuloInfo_Response(
        articulo_id=data[0][0],
        nombre=data[0][1],
        fecha=data[0][2].isoformat(),
        visitas=data[0][3],
        usuario_id=data[0][4],
        estado=data[0][5],
        contenido=data[0][6],
        imagen=data[0][7],
    )

# Obtener estado de un articulo
@router.get("/api/articulo-estado/{id}")
async def articulo_estado(id):
    # Funcion que obtiene el nombre del estado de un articulo
    data: list[tuple] = artq.articulos_query(artq.get_articulo_estado.format(estado_id=id))
    print(data)
    return arts.GET_ArticuloNombreEstado_Response(
        estado_id=data[0][0],
        nombre=data[0][1],
    )

# Obtener cantidad de likes de un articulo
@router.get("/api/articulo-likes/{id}")
async def articulo_likes(id):
    # Funcion para obtener la cantidad de likes de un articulo
    data: list[tuple] = artq.articulos_query(artq.get_articulo_likes.format(articulo_id=id))
    return arts.GET_ArticuloLikes_Response(
        articulo_id=data[0][0],
        likes=data[0][1],
    )

# Obtener ID de las etiquetas de un artículo 
@router.get("/api/articulo-etiqueta/{id}")
async def articulo_etiquetas(id):
    # Funcion para obtener las etiqueta de un articulo
    data: list[tuple] = artq.articulos_query(artq.get_articulo_etiquetas.format(articulo_id=id))
    return arts.GET_ArticuloEtiquetas_Response(
        articulo_id=data[0][0],
        etiquetas=data[0][1],
    )

# Obtener ID de comentarios de un articulo
@router.get("/api/articulo-comentarios/{id}")
async def articulo_comentario(id):
    # Funcion para obtener todos los ID de los comentarios de un articulo
    data: list[tuple] = artq.articulos_query(artq.get_articulo_comentarios.format(articulo_id=id))
    return arts.GET_ArticuloComentarios_Response(
        articulo_id=data[0][0],
        comentarios=data[0][1],
    )



### Solicitudes POST
# Creamos un nuevo articulo
@router.post("/api/articulo")
async def articulo_añadir(input: arts.POST_ArticuloCrear_Request):
    # Accedemos a los valores de la solicitud
    params = (
        input.usuario_id,
        input.nombre,
        input.fecha,
        0,
        1,
        input.contenido,
        input.imagen,
    )

    # Realizamos la inserción de los datos en la BD
    artq.articulos_query(artq.post_articulo_crear, params)
    return {"message": "Articulo creado exitosamente"}

# Añadimos un like a un articulo
@router.post("/api/articulo-likes")
async def articulo_añadir_like(input: arts.POST_ArticuloLike_Request):
    # Accedemos a los valores de la solicitud
    params = (
        input.usuario_id,
        input.articulo_id,
    )

    # Realizamos la inserción de los datos de la BD
    artq.articulos_query(artq.post_articulo_like, params)
    return {"message": "Se ha dado like al articulo exitosamente"}

# Añadimos etiquetas a un articulo
@router.post("/api/articulo-etiquetas")
async def articulo_añadir_etiquetas(input: arts.POST_EtiquetasAsignar_Request):
    # Accedemos a las etiquetas
    etiquetas_id = input.etiquetas_id

    for etiqueta in etiquetas_id:
        params = (
            input.articulo_id,
            etiqueta,
        )
        artq.articulos_query(artq.post_etiquetas_asignar, params)
    return {"meesage": "Etiquetas asignadas exitosamente"}



### PUT
# Cambiamos todos los datos de un articulo
@router.put("/api/articulo-estado")
async def articulo_cambiar_estado(input: arts.PUT_ArticuloCambiarEstado_Request):
    # Accedemos a los valores de la solicitud
    params = (
        input.nombre,
        input.fecha,
        input.visitas,
        input.usuario_id,
        input.estado_id,
        input.contenido,
        input.imagen,
    )
    # Realizamos los cambios en la BD
    artq.articulos_query(artq.put_articulo_cambiar_estado, params)
    return {"message": "Se cambio el estado del articulo exitosamente"}



### DELETE
# Borramos un articulo
@router.delete("/api/articulo/{id}")
async def articulo_borrar(id):
    artq.articulos_query(artq.delete_articulo_eliminar(articulo_id=id))
    return {"message": "Se borro el articulo exitosamente"}
