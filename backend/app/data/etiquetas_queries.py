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
def etiquetas_query(query, parametros=None):
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
### ============================= Etiqueta ==================================== ###
# Seleccionar todos los Id de todos los usuarios
get_etiqueta_all = "SELECT Id FROM Etiqueta;"

# Seleccionar la info de una etiqueta específica
get_etiqueta_info = "SELECT * FROM Etiqueta WHERE Id={etiqueta_id};"


### POST
### ============================= Etiqueta ==================================== ###
# Crea una nueva etiqueta
post_etiqueta_crear = "INSERT INTO Etiqueta (Nombre, FechaDeCreacion) VALUES (%s, %s)"


### PUT
### ============================= Etiqueta ==================================== ###
# Cambia una etiqueta
put_etiqueta_estado = "UPDATE Etiqueta SET Nombre=%s WHERE Id=%s"

### DELETE
### ============================= Etiqueta ==================================== ###
# Eliminar una etiqueta
delete_etiqueta_eliminar = "DELETE FROM Etiqueta WHERE Id={etiqueta_id};"

# Borrar las eitquetas de todos los perfiles y articulos
delete_etiqueta_all_usuarios = "DELETE FROM etiquetasdeusuario WHERE Etiqueta={etiqueta_id};"
delete_etiqueta_all_articulos = "DELETE FROM etiquetasdearticulo WHERE Etiqueta={etiqueta_id};"
