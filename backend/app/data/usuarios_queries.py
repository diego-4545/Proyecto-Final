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


### GET
# ============================= Usuarios ==================================== #
# Seleccionar todos los Id de todos los usuarios
get_usuarios_all = "SELECT Id FROM Usuarios;"

# Seleccionar la info de un usuario específico
get_usuario = "SELECT * FROM Usuarios WHERE Id={usuario_id}"
# ============================= Etiquetas ==================================== #
# Obtener los ID de las etiquetas de un usuario
get_usuario_etiquetas = "SELECT * FROM EtiquetasDeUsuario WHERE Usuario={usuario_id}"

# Obtener el nombre de la etiqueta
get_etiqueta_nombre = "SELECT * FROM Etiqueta WHERE Id={etiqueta_id}"

# ============================== Notificación =================================== #
# Obtener los ID de las notificaciones
get_notificaciones_ids = "SELECT Id FROM Notificación WHERE Usuario={usuario_id}"

# Obtener información de un comentario
get_notificacion = "SELECT * FROM Notificación WHERE Id={notificación_id}"

# Obtener el estado de un comentario
get_notificacion_estado_nombre = "SELECT * FROM EstadoNotificaciones WHERE Id={estado_notificaciones_id}"

# ============================= Roles ==================================== #
# Obtener el rol de un artículo
get_usuario_rol_nombre = "SELECT * FROM Roles WHERE Id={rol_id}"

# ============================== Comentarios =================================== #
# Obtener los ID de los comentarios
get_comentarios_ids = "SELECT Id FROM Comentarios WHERE Usuario={usuario_id}"

# ============================== Likes =================================== #
# Obtener la cantidad de likes de un usuario
get_usuario_likes = "SELECT COUNT(*) AS likes FROM Likes WHERE Usuario={usuario_id}"



### POST
# ============================= Usuarios ==================================== #
# Crea un nuevo usuario
post_usuario_crear = "INSERT INTO Usuarios (Nombre, Usuario, Email, FechaRegistro, Descripción, FotoPerfil, Rol, Contraseña) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"

# ============================= Etiquetas ==================================== #
# Asigna una nueva etiqueta
post_usuario_etiqueta_asignar = "INSERT INTO EtiquetasDeUsuario (Usuario, Etiqueta) VALUES (%s, %s)"

# ============================= Notificacion ==================================== #
# Crea una nueva notificacion
post_notificacion_crear = "INSERT INTO Notificación (Mensaje, FechaDeEnvio, Usuario, Estado) VALUES (%s, %s)"



### PUT
# ============================= Usuarios ==================================== #
# Actualiza info de un ususario
put_usuario_info_cambiar = "UPDATE Usuarios SET Nombre=%s, Usuario=%s, Email=%s, FechaRegistro=%s, Descripción=%s, FotoPerfil=%s, Rol=%s, Contraseña=%s WHERE Id=%s"

# ============================= Notificacion ==================================== #
# Crea una nueva notificacion
put_notificacion_estado_cambiar = "UPDATE Notificación SET Estado=%s, WHERE Id=%s"



### DELETE
# ============================= Elimina ==================================== #
# Elimina un usuario
delete_usuario_eliminar = "DELETE FROM Usuarios WHERE Id={usuario_id}"

# Elimina las etiqueta del perfil de un usuario
delete_usuario_etiqueta = "DELETE FROM EtiquetasDeUsuario Where Usuario={usuario_id}"
