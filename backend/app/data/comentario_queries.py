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
def comentarios_query(query, parametros=None):
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

<<<<<<< HEAD:backend/app/data/mod_articulos_queries.py
### ============================= Moderación de articulos ==================================== ###
# Selecciona los IDs de articulos de un usuario especifico
get_ids_articulos = "SELECT Articulo FROM UsuarioArticulos WHERE Usuario={usuario_id};"
# Obten el contenido de un articulo 
get_info_articulo = "SELECT * FROM Articulos;"

### PUT
### ============================= Estado De Articulo ==================================== ###
# Cambia el estado del articulo
put_cambiar_estado_articulo = "UPDATE EstadoArticulos SET Rol={estadoarticulo_id} WHERE Id={articulo_id}"

### ============================= Rol de usuario ==================================== ###
# Cambia el rol de algun usuario
put_cambiar_rol = "UPDATE Usuario SET Rol={rol_id} WHERE Id={usuario_id}"


### DELETE
### ============================= Articulo ==================================== ###
# Borrar articulo
delete_eliminar_articulo = "DELETE FROM Articulos WHERE Id={articulo_id}"
=======

# Código SQL para extraer datos (GET)
# ============================== Comentarios =================================== #
# Obtener información de un comentario
get_comentario_info = "SELECT * FROM Comentarios WHERE Id={comentario_id};"

# Obtener el estado de un comentario
get_comentario_nombre_estado = "SELECT * FROM EstadoComentarios WHERE Id={estado_comentario_id};"


# Código SQL para insertar registros (POST)
# ============================= Comentarios ==================================== #
# Añade un nuevo comentario
post_comentario_crear = "INSERT INTO Comentarios (Id, Articulo, Usuario, Estado, Contenido)"



# Código SQL para modificar registros existentes (PUT)
# ============================= Comentarios ==================================== #
# Cambia el estado de un comentario
put_comentario_cambiar_estado = "UPDATE Comentarios SET Estado={estado_id} WHERE Id={comentario_id}"



# Código SQL para eliminar registros (DELETE)
# ============================= Comentarios ==================================== #
# Eliminar un comentario
delete_comentario_eliminar = "DELETE FROM Comentarios WHERE Id={comentario_id};"
>>>>>>> 34f24c219e7f8e881e192a6944352e560cd90d59:backend/app/data/comentario_queries.py
