from fastapi import APIRouter
from backend.app.data import articulos_queries as artq
from backend.app.schemas import articulo_esquema


router = APIRouter()

# Obtener TODOS los articulos de un usuario
@router.get("/articulos-usuario/{id}")
async def todos_los_articulos(id):
    # Funcion con código SQL para extraer todos los IDs de articulos de un usuario especifico
    data = artq.articulos_query(artq.get_ids_articulos.format(usuario_id=id))
    return articulo_esquema.GET_TodosArticulos_Response(
        usuario_id=... ,
        articulo_ids=... ,
    )

# Obtener info de un articulo
@router.get("/articulo/{id}")
async def articulo_info(id):
    # Funcion que obtiene la info de un articulo por su ID
    data = artq.articulos_query(artq.get_info_articulo.format(articulo_id=id))
    return articulo_esquema.GET_InfoArticulo_Response(
        usuario_id=... ,
        articulo_id=... ,
        nombre=... ,
        fecha=... ,
        visitas=... ,
        estado=... ,
        contenido=... ,
        imagen=... ,
    )

# Obtener estado de un articulo
@router.get("/articulo-estado/{id}")
async def articulo_estado(id):
    # Funcion que obtiene el nombre del estado de un articulo
    data = artq.articulos_query(artq.get_estado_articulo.format(articulo_id=id))
    return articulo_esquema.GET_NombreEstadoArticulo_Response(
        estado_id=... ,
        nombre=... ,
    )

# Obtener cantidad de likes de un articulo
@router.get("/articulo-likes/{id}")
async def articulo_likes(id):
    # Funcion para obtener la cantidad de likes de un articulo
    data = artq.articulos_query(artq.get_likes_articulo.format(articulo_id=id))
    return articulo_esquema.GET_LikesArticulo_Response(
        articulo_id=... ,
        likes=... ,
    )
