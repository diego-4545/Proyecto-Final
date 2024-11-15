from fastapi import APIRouter
from backend.app.data import articulos_queries as artq
from backend.app.schemas import articulo_esquema as arts


router = APIRouter()

### Solicitudes GET
# Obtener TODOS los articulos de un usuario
@router.get("/api/articulos-usuario/{id}")
async def todos_los_articulos(id):
    # Funcion con código SQL para extraer todos los IDs de articulos de un usuario especifico
    data: list[tuple] = artq.articulos_query(artq.get_ids_articulos.format(usuario_id=id))
    return arts.GET_TodosArticulos_Response(
        usuario_id=data[0][0] ,
        articulo_ids=data[0][1] ,
    )

# Obtener info de un articulo
@router.get("/api/articulo/{id}")
async def articulo_info(id):
    # Funcion que obtiene la info de un articulo por su ID
    data: list[tuple] = artq.articulos_query(artq.get_info_articulo.format(articulo_id=id))
    return arts.GET_InfoArticulo_Response(
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
    data: list[tuple] = artq.articulos_query(artq.get_estado_articulo.format(articulo_id=id))
    return arts.GET_NombreEstadoArticulo_Response(
        estado_id=data[0][0],
        nombre=data[0][1],
    )

# Obtener cantidad de likes de un articulo
@router.get("/api/articulo-likes/{id}")
async def articulo_likes(id):
    # Funcion para obtener la cantidad de likes de un articulo
    data: list[tuple] = artq.articulos_query(artq.get_likes_articulo.format(articulo_id=id))
    return arts.GET_LikesArticulo_Response(
        articulo_id=data[0][0],
        likes=data[0][1],
    )

# Obtener ID de las etiquetas de un artículo 
@router.get("/api/articulo-etiqueta/{id}")
async def articulo_etiquetas(id):
    # Funcion para obtener las etiqueta de un articulo
    data: list[tuple] = artq.articulos_query(artq.get_etiquetas_articulo.format(articulo_id=id))
    return arts.GET_EtiquetasArticulo_Response(
        articulo_id=data[0][0],
        etiquetas=data[0][1],
    )

# Obtener el nombre de la etiqueta
@router.get("/api/etiqueta-nombre/{id}")
async def etiqueta_info(id):
    # Funcion para obtener informacion de una etiqueta en especifico
    data: list[tuple] = artq.articulos_query(artq.get_nombre_etiqueta.format(etiqueta_id=id))
    return arts.GET_NombreEtiquetas_Response(
        articulo_id=data[0][0],
        etiquetas=data[0][1],
    )

# Obtener ID de comentarios de un articulo
@router.get("/api/articulo-comentarios/{id}")
async def articulo_comentario(id):
    # Funcion para obtener todos los ID de los comentarios de un articulo
    data: list[tuple] = artq.articulos_query(artq.get_ids_comentarios.format(articulo_id=id))
    return arts.GET_ComentariosArticulo_Response(
        articulo_id=data[0][0],
        comentarios=data[0][1],
    )

# Obtener informacion de un comentario
@router.get("/api/comentario/{id}")
async def comentario_info(id):
    # Funcion para obtener la info de un comentario
    data: list[tuple] = artq.articulos_query(artq.get_info_comentario.format(comentario_id=id))
    return arts.GET_InfoComentario_Response(
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
    data: list[tuple] = artq.articulos_query(artq.get_estado_comentario.format(estado_comentario_id=id))
    return arts.GET_NombreEstadoComentario_Response(
        comentario_id=data[0][0],
        nombre=data[0][1],
    )



### Solicitudes POST
# Creamos un nuevo articulo
@router.post("/api/articulo")
async def articulo_añadir(input: arts.POST_CrearArticulo_Request):
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
    artq.articulos_query(artq.post_nuevo_articulo, valores)
    return None

# Añadimos un like a un articulo
@router.post("/api/articulo-likes")
async def articulo_añadir_like(input: arts.POST_LikeArticulo_Request):
    # Accedemos a los valores de la solicitud
    usuario_id = input.usuario_id
    articulo_id = input.articulo_id

    # Realizamos la inserción de los datos de la BD
    valores = f'VALUES ({usuario_id}, {articulo_id});'
    artq.articulos_query(artq.post_dar_like, valores)
    return None

# Añadimos etiquetas a un articulo
@router.post("/api/articulo-etiquetas")
async def articulo_añadir_etiquetas(input: arts.POST_AsignarEtiquetas_Request):
    articulo_id = input.articulo_id
    etiquetas_id = input.etiquetas_id
    
    for etiqueta in etiquetas_id:
        valores = f'VALUES ({articulo_id}, {etiqueta})'
        artq.articulos_query(artq.post_asignar_etiquetas, valores)
    return None

# Añadimos un nuevo comentario al articulo
@router.post("/api/comentario")
async def articulo_añadir_comentario(input: arts.POST_PublicarComentario):
    # Accedemos a los valores de la solicitud
    usuario_id = input.usuario_id
    articulo_id = input.articulo_id
    estado_id = input.estado_id
    contenido = input.contenido

    # Insertamos los valores en la BD
    valores = f'VALUES ({usuario_id}, {articulo_id}, {estado_id}, {contenido})'
    artq.articulos_query(artq.post_publicar_comentario, valores)
    return None



### PUT
# Cambiamos el estado de un articulo
@router.put("/api/articulo-estado")
async def articulo_cambiar_estado(input: arts.PUT_CambiarEstadoArticulo_Request):
    # Accedemos a los valores de la solicitud
    articulo_id = input.articulo_id
    estado_id = input.estado_id

    # Realizamos los cambios en la BD
    artq.articulos_query(artq.put_estado_articulo.format(estado_id=estado_id, articulo_id=articulo_id))
    return None

# Cambiamos el estado de un comentario
@router.put("/api/comentario-estado")
async def comentario_cambiar_estado(input: arts.PUT_CambiarEstadoComentario_Request):
    # Accedemos a los valores de la solicitud
    comentario_id = input.comentario_id
    estado_id = input.estado_id

    # Realizamos los cambios en la BD
    artq.articulos_query(artq.put_estado_comentario.format(estado_id=estado_id, comentario_id=comentario_id))
    return None



### DELETE
# Borramos un articulo
@router.delete("/api/articulo/{id}")
async def articulo_borrar(id):
    artq.articulos_query(artq.delete_eliminar_articulo.format(articulo_id=id))
    return None

# Borramos un comentario
@router.delete("/api/comentario/{id}")
async def comentario_borrar(id):
    artq.articulos_query(artq.delete_eliminar_comentario.format(comentario_id=id))
    return None
