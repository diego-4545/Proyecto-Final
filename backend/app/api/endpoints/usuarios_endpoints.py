from fastapi import APIRouter

from backend.app.data import usuarios_queries as usrq
from backend.app.schemas import usuarios_esquema as usrs


router = APIRouter()

### Solicitudes GET
# Obtener info de un usuario
@router.get("/api/usuario/{id}")
async def usuario_info(id):
    # Funcion que obtiene la info de un usuario por su ID
    data: list[tuple] = usrq.usuarios_query(usrq.get_usuario.format(usuario_id=id))
    # Si no hay usuario con ese ID no regresar nada
    if not data:
        return None
    return usrs.GET_UsuarioInfo_Response(
        usuario_id=data[0][0],
        nombre=data[0][1],
        usuario=data[0][2],
        email=data[0][3],
        fecha=data[0][4].isoformat(),
        descripcion=data[0][5],
        foto_perfil=data[0][6],
        rol_id=data[0][7],
        contraseña=data[0][8],
    )

# Obtener ID de las etiquetas de un artículo 
@router.get("/api/usuario-etiqueta/{id}")
async def usuario_etiquetas(id):
    # Funcion para obtener las etiqueta de un usuario
    data: list[tuple] = usrq.usuarios_query(usrq.get_usuario_etiquetas.format(usuario_id=id))
    # Si no hay etiquetas asignadas a ese usuario no regresar una lista vacias
    if not data:
        return usrs.GET_UsuarioEtiquetas_Response(
            usuario_id=id,
            etiquetas=[],
        )
    
    etiquetas_id = list()
    # Convertirlo a una lista (1 => [1])
    for i in range(len(data)):
        etiquetas_id.append(data[i][1])

    return usrs.GET_UsuarioEtiquetas_Response(
        usuario_id=data[0][0],
        etiquetas=etiquetas_id,
    )

# Obtener el nombre de la etiqueta
@router.get("/api/etiqueta-nombre/{id}")
async def etiqueta_info(id):
    # Funcion para obtener informacion de una etiqueta en especifico
    data: list[tuple] = usrq.usuarios_query(usrq.get_etiqueta_nombre.format(etiqueta_id=id))
    return usrs.GET_NombreEtiquetas_Response(
        etiqueta_id=data[0][0],
        nombre=data[0][1],
        fecha=data[0][2].isoformat(),
    )

# Obtener ID de comentarios de un usuario
@router.get("/api/usuario-comentarios/{id}")
async def usuario_comentario(id):
    # Funcion para obtener todos los ID de los comentarios de un usuario
    data: list[tuple] = usrq.usuarios_query(usrq.get_comentarios_ids.format(usuario_id=id))
    return usrs.GET_ComentariosUsuario_Response(
        usuario_id=data[0][0],
        comentarios=data[0][1],
    )

# IDS de notificaciones
@router.get("/api/usuario-notificaciones/{id}")
async def obtener_ids_notificaciones(id: int):
    data: list[tuple] = usrq.usuarios_query(usrq.get_notificaciones_ids.format(usuario_id=id))
    notificacion_ids = [row[0] for row in data]
    return usrs.GET_NotificacionInfo_Response(usuario_id=id, notificacion_id=notificacion_ids)

# Info de una notificacion
@router.get("/api/notificacion/{id}")
async def obtener_informacion_notificacion(id: int):
    data: list[tuple] = usrq.usuarios_query(usrq.get_notificacion.format(notificación_id=id))
    if not data:
        return {"error": "Notificación no encontrada"}
    return usrs.GET_NotificacionInfo_Response(
        notificacion_id=data[0][0],
        mensaje=data[0][1],
        fecha=data[0][2].isoformat(),
        usuario_id=data[0][3],
        estado_id=data[0][4],
    )

# Estado de una notificacion
@router.get("/api/notificacion-estado/{id}")
async def obtener_estado_notificacion(id: int):
    data: list[tuple] = usrq.usuarios_query(usrq.get_notificacion_estado_nombre.format(estado_notificaciones_id=id))
    if not data:
        return {"error": "Estado no encontrado"}
    return usrs.GET_NotificacionNombreEstado_Response(
        estado_id=data[0][0],
        nombre=data[0][1],
    )

# Rol de usuario
@router.get("/api/usuario-rol/{id}")
async def obtener_rol_usuario(id: int):
    data: list[tuple] = usrq.usuarios_query(usrq.get_usuario_rol_nombre.format(rol_id=id))
    if not data:
        return {"error": "Rol no encontrado"}
    return usrs.GET_UsuarioRolNombre_Response(
        rol_id=data[0][0],
        nombre=data[0][1],
    )

# Cantidad de likes
@router.get("/api/usuario-likes/{id}")
async def obtener_likes_usuario(id: int):
    data: list[tuple] = usrq.usuarios_query(usrq.get_usuario_likes.format(usuario_id=id))
    likes = data[0][0] if data else 0
    return usrs.GET_UsuarioLikes_Response(
        usuario_id=id,
        likes=likes,
    )



### POST
# Crear un nuevo usuario
@router.post("/api/usuario/")
async def crear_usuario(input: usrs.POST_UsuarioCrear_Request):
    params =  (
        input.nombre, 
        input.usuario,
        input.email,
        input.fecha,
        input.descripcion,
        None, # La foto de perfil se cambia solamente en la pagina de perfil
        1, # El usuario siempre empezara siendo 'rol: usuario' no admin
        input.contraseña,
    )

    usrq.usuarios_query(usrq.post_usuario_crear, params)
    return {"message": "Usuario creado exitosamente"}

# Asignar etiquetas a un usuario
@router.post("/api/usuario-etiquetas/")
async def asignar_etiquetas(input: usrs.POST_UsuarioEtiquetasAsignar_Request):
    for etiqueta_id in input.etiquetas:
        query = usrq.post_usuario_etiqueta_asignar
        params = (input.usuario_id, etiqueta_id)
        usrq.usuarios_query(query, params)
    return {"message": "Etiquetas asignadas exitosamente"}

# Crear una nueva notificación
@router.post("/api/notificacion/")
async def crear_notificacion(notificacion: usrs.POST_UsuarioNotificacionCrear_Request):
    query = usrq.post_notificacion_crear
    params = (
        notificacion.mensaje,
        notificacion.fecha,
        notificacion.usuario_id,
        notificacion.estado_id,
    )
    usrq.usuarios_query(query, params)
    return {"message": "Notificación creada exitosamente"}



### PUT
# Actualizar la información de un usuario
@router.put("/api/usuario/")
async def actualizar_usuario(usuario: usrs.PUT_UsuarioCambiar_Request):
    query = usrq.put_usuario_info_cambiar
    params = (
        usuario.nombre,
        usuario.usuario,
        usuario.email,
        usuario.fecha,
        usuario.descripcion,
        usuario.foto_perfil,
        usuario.rol_id,
        usuario.contraseña,
        usuario.usuario_id,
    )
    usrq.usuarios_query(query, params)
    return {"message": "Información del usuario actualizada exitosamente"}

# Cambiar el estado de una notificación
@router.put("/api/notificacion/")
async def actualizar_estado_notificacion(notificacion: usrs.PUT_UsuarioNotificacionCambiar_Request):
    query = usrq.put_notificacion_estado_cambiar
    params = (
        notificacion.estado_id, 
        notificacion.notificacion_id
    )
    usrq.usuarios_query(query, params)
    return {"message": "Estado de la notificación actualizado exitosamente"}



### DELETE
# Borramos un usuario
@router.delete("/api/usuario/{id}")
async def usuario_borrar(id):
    usrq.usuarios_query(usrq.delete_usuario_eliminar(usuario_id=id))
    return {"message": "Usuario eliminado exitosamente"}

# Eliminar etiquetas de un usuario
@router.delete("/api/usuario-etiquetas/{id}")
async def eliminar_etiquetas_usuario(id: int):
    query = usrq.delete_usuario_etiqueta
    usrq.usuarios_query(query.format(usuario_id=id))
    return {"message": "Etiquetas del usuario eliminadas exitosamente"}
