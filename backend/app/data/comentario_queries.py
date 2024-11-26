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

# Código SQL para extraer datos (GET)
# ============================== Comentarios =================================== #
# Obtener todos los ID de comentarios
get_comentario_all = "SELECT Id FROM Comentarios;"

# Obtener información de un comentario
get_comentario_info = "SELECT * FROM Comentarios WHERE Id={comentario_id};"

# Obtener el estado de un comentario
get_comentario_nombre_estado = "SELECT * FROM EstadoComentarios WHERE Id={estado_comentario_id};"


# Código SQL para insertar registros (POST)
# ============================= Comentarios ==================================== #
# Añade un nuevo comentario
post_comentario_crear = "INSERT INTO Comentarios (Articulo, Usuario, Estado, Contenido) VALUES (%s, %s, %s, %s)"



# Código SQL para modificar registros existentes (PUT)
# ============================= Comentarios ==================================== #
# Cambia el estado de un comentario
put_comentario_cambiar_estado = "UPDATE Comentarios SET Estado=%s WHERE Id=%s"



# Código SQL para eliminar registros (DELETE)
# ============================= Comentarios ==================================== #
# Eliminar un comentario
delete_comentario_eliminar = "DELETE FROM Comentarios WHERE Id={comentario_id};"
