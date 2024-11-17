from fastapi import APIRouter

from backend.app.data import articulos_queries as artq
from backend.app.schemas import articulos_esquema as arts


router = APIRouter()

### Solicitudes GET
# Obtener TODOS los articulos de un usuario
@router.get("/api/articulos-usuario/{id}")
async def todos_los_articulos(id):
    # Funcion con código SQL para extraer todos los IDs de articulos de un usuario especifico
    data: list[tuple] = artq.articulos_query(artq.get_articulos.format(usuario_id=id))
    return arts.GET_Articulos_Response(
        usuario_id=data[0][0] ,
        articulo_ids=data[0][1] ,
    )

# Obtener info de un articulo
@router.get("/api/articulo/{id}")
async def articulo_info(id):
    # Funcion que obtiene la info de un articulo por su ID
    data: list[tuple] = artq.articulos_query(artq.get_articulo_info.format(articulo_id=id))
    return arts.GET_ArticuloInfo_Response(
        usuario_id=data[0][0],
        articulo_id=data[0][1],
        nombre=data[0][2],
        fecha=data[0][3],
        visitas=data[0][4],
        estado=data[0][5],
        contenido=data[0][6],
        imagen=data[0][7],
    )

# Obtener estado de un articulo
@router.get("/api/articulo-estado/{id}")
async def articulo_estado(id):
    # Funcion que obtiene el nombre del estado de un articulo
    data: list[tuple] = artq.articulos_query(artq.get_articulo_estado.format(articulo_id=id))
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

# Obtener el nombre de la etiqueta
@router.get("/api/etiqueta-nombre/{id}")
async def etiqueta_info(id):
    # Funcion para obtener informacion de una etiqueta en especifico
    data: list[tuple] = artq.articulos_query(artq.get_etiqueta_nombre.format(etiqueta_id=id))
    return arts.GET_NombreEtiquetas_Response(
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
    usuario_id = input.usuario_id
    articulo_id = input.articulo_id
    nombre = input.nombre
    fecha = input.fecha
    visitas = input.visitas
    estado = input.estado
    contenido = input.contenido
    imagen = input.imagen

    # Realizamos la inserción de los datos en la BD
    valores = f'VALUES ({usuario_id}, {articulo_id}, {nombre}, {fecha}, {visitas}, {estado}, {contenido}, {imagen});'
    artq.articulos_query(artq.post_articulo_crear, valores)
    return None

# Añadimos un like a un articulo
@router.post("/api/articulo-likes")
async def articulo_añadir_like(input: arts.POST_ArticuloLike_Request):
    # Accedemos a los valores de la solicitud
    usuario_id = input.usuario_id
    articulo_id = input.articulo_id

    # Realizamos la inserción de los datos de la BD
    valores = f'VALUES ({usuario_id}, {articulo_id});'
    artq.articulos_query(artq.post_articulo_like, valores)
    return None

# Añadimos etiquetas a un articulo
@router.post("/api/articulo-etiquetas")
async def articulo_añadir_etiquetas(input: arts.POST_EtiquetasAsignar_Request):
    articulo_id = input.articulo_id
    etiquetas_id = input.etiquetas_id
    
    for etiqueta in etiquetas_id:
        valores = f'VALUES ({articulo_id}, {etiqueta})'
        artq.articulos_query(artq.post_etiquetas_asignar, valores)
    return None



### PUT
# Cambiamos el estado de un articulo
@router.put("/api/articulo-estado")
async def articulo_cambiar_estado(input: arts.PUT_ArticuloCambiarEstado_Request):
    # Accedemos a los valores de la solicitud
    articulo_id = input.articulo_id
    estado_id = input.estado_id

    # Realizamos los cambios en la BD
    artq.articulos_query(artq.put_articulo_cambiar_estado(estado_id=estado_id, articulo_id=articulo_id))
    return None



### DELETE
# Borramos un articulo
@router.delete("/api/articulo/{id}")
async def articulo_borrar(id):
    artq.articulos_query(artq.delete_articulo_eliminar(articulo_id=id))
    return None
