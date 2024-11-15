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
def mod_articulos_query(query, parametros=None):
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

### ============================= Moderación de articulos ==================================== ###
# Selecciona los IDs de articulos de un usuario especifico
get_ids_articulos = "SELECT Articulo FROM UsuarioArticulos WHERE Usuario={usuario_id};"
# Obten el contenido de un articulo 
get_info_articulo = "SELECT * FROM Articulos;"

### PUT
### ============================= Estado De comentario ==================================== ###
# Cambia el estado del comentario
put_cambiar_estado_comentario = "UPDATE EstadoComentario SET Rol={estadocomentario_id} WHERE Id={comentario_id}"

### ============================= Rol de usuario ==================================== ###
# Cambia el rol de algun usuario
put_cambiar_rol = "UPDATE Usuario SET Rol={rol_id} WHERE Id={usuario_id}"


### DELETE
### ============================= Comentario ==================================== ###
# Borrar comentario
delete_eliminar_articulo = "DELETE FROM Comentarios WHERE Id={comentario_id}"
