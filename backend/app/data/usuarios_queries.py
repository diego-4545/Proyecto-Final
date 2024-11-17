import os
from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error


# Variables para la conexion de la BD
#! Si no tienes el archivo .env y necesitas trabajar con la BD solicitar el archivo a algun miembro del equipo
load_dotenv() # Esta función carga las variables de entorno localizadas en el archivo .env
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")


# Funcion para conectarse a la BD y ejecutar las queries
def usuarios_query(query, parametros=None):
    try:
        # Conectar a la base de datos
        conexion = mysql.connector.connect(
            host=DB_HOST,        
            user=DB_USER,       
            password=DB_PASSWORD,
            database=DB_NAME,
        )

        if conexion.is_connected():
            cursor = conexion.cursor()
            
            # Ejecutar la consulta
            if parametros:
                cursor.execute(query, parametros)
            else:
                cursor.execute(query)

            # Si es una consulta SELECT, obtener los resultados
            if query.strip().upper().startswith("SELECT"):
                resultados = cursor.fetchall()
                return resultados
            else:
                # Para INSERT, UPDATE y DELETE. Solo ocupamos que se guarden los cambios
                conexion.commit()
                print("Consulta ejecutada exitosamente")
        
    except Error as e:
        print("Error al ejecutar la consulta:", e)
    finally:
        # Cerramos la conexión
        if conexion.is_connected():
            cursor.close()
            conexion.close()
    return None


# Código SQL para extraer datos (SQL Queries)
# ============================= Usuarios ==================================== #
# Seleccionar la info de un usuario específico
get_info_usuario = "SELECT * FROM Usuarios WHERE Id={usuario_id};"
# ============================= Etiquetas ==================================== #
# Obtener los ID de las etiquetas de un usuario
get_etiquetas_usuario = "SELECT * FROM EtiquetasDeUsuario WHERE Usuario={usuario_id};"

# Obtener el nombre de la etiqueta
get_nombre_etiqueta = "SELECT * FROM Etiqueta WHERE Id={etiqueta_id};"

# ============================== Notificación =================================== #
# Obtener los ID de las notificaciones
get_ids_notificacions = "SELECT Id FROM Notificación WHERE Usuario={usuario_id};"

# Obtener información de un comentario
get_info_notificacion = "SELECT * FROM Notificación WHERE Id={notificación_id};"

# Obtener el estado de un comentario
get_estado_notificacion = "SELECT * FROM EstadoNotificaciones WHERE Id={estado_notificaciones_id};"

# ============================= Roles ==================================== #
# Obtener el rol de un artículo
get_rol_usuario = "SELECT * FROM Roles WHERE Id={usuario_id};"

# ============================== Comentarios =================================== #
# Obtener los ID de los comentarios
get_ids_comentarios = "SELECT Id FROM Comentarios WHERE Articulo={usuario_id};"

# Obtener información de un comentario
get_info_comentario = "SELECT * FROM Comentarios WHERE Id={comentario_id};"

# Obtener el estado de un comentario
get_estado_comentario = "SELECT * FROM EstadoComentarios WHERE Id={estado_comentario_id};"

# ============================== Likes =================================== #
# Obtener la cantidad de likes de un usuario
get_likes_usuario = "SELECT COUNT(*) AS likes FROM Likes WHERE Usuario={usuario_id};"


# Código SQL para insertar datos (POST)

### POST (Añadir datos)
### ============================= Usuarios ==================================== ###
# Crea un nuevo usuario
post_nuevo_usuario = "INSERT INTO Usuarios (Id, Nombre, Usuario, Email, Fecha, Descripcion, Fotoperfil, Estado, Contenido, Rol, Contraseña)"

### ============================= Likes ==================================== ###
# Añade un like a un usuario
post_dar_like = "INSERT INTO Likes (Usuario, Articulo)"

### ============================= Etiquetas ==================================== ###
# Asigna etiquetas a un usuario
post_asignar_etiquetas = "INSERT INTO EtiquetasDeUsuario (Usuario, Etiqueta)"

### ============================= Comentarios ==================================== ###
# Publica un comentario
post_publicar_comentario = "INSERT INTO Comentarios (Usuario, Comentario)"

### ============================= Notificaciones ==================================== ###
# Asigna notificaciones a un usuario
post_asignar_notificacion = "INSERT INTO Notificación (Usuario, Notificación)"


### PUT
### ============================= Rol ==================================== ###
# Cambia el rol del usuario
put_cambiar_rol = "UPDATE Usuario SET Rol={rol_id} WHERE Id={usuario_id}"

### DELETE
### ============================= Usuario ==================================== ###
# Borrar el usuario
delete_eliminar_usuario = "DELETE FROM Usuarios WHERE Id={usuarios_id}"
