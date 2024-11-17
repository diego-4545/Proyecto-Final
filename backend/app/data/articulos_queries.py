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
def articulos_query(query, parametros=None):
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
# ============================= Articulos ==================================== #
# Seleccionar todos los ID de articulos de un usuario
get_articulos = "SELECT * FROM UsuarioArticulos WHERE Usuario={usuario_id};"

# Seleccionar la info de un articulo específico
get_articulo_info = "SELECT * FROM Articulos WHERE Id={articulo_id};"

# ============================= Estados ==================================== #
# Obtener el estado de un artículo
get_articulo_estado = "SELECT * FROM EstadoArticulo WHERE Id={articulo_id};"

# ============================= Likes ==================================== #
# Obtener la cantidad de likes de un artículo
get_articulo_likes = "SELECT COUNT(*) AS likes FROM Likes WHERE Articulo={articulo_id};"

# ============================= Etiquetas ==================================== #
# Obtener los ID de las etiquetas de un artículo
get_articulo_etiquetas = "SELECT * FROM EtiquetasDeArticulo WHERE Articulo={articulo_id};"

# Obtener el nombre de la etiqueta
get_etiqueta_nombre = "SELECT * FROM Etiqueta WHERE Id={etiqueta_id};"

# ============================== Comentarios =================================== #
# Obtener los ID de los comentarios
get_articulo_comentarios = "SELECT Id FROM Comentarios WHERE Articulo={articulo_id};"



# Código SQL para insertar registros (POST)
# ============================= Articulos ==================================== #
# Publica un nuevo articulo
post_articulo_crear = "INSERT INTO Articulos (Nombre, FechaDeCreacion, Visitas, Usuario, Estado, Contenido, Imagen) VALUES (%s, %s, %s, %s, %s, %s, %s)"

# ============================= Likes ==================================== #
# Añade el like de un usuario a un articulo
post_articulo_like = "INSERT INTO Likes (Usuario, Articulo) VALUES (%s, %s)"

# ============================= Etiquetas ==================================== #
# Añade una etiqueta a un articulo
post_etiquetas_asignar = "INSERT INTO EtiquetasDeArticulo (Articulo, Etiqueta) VALUES (%s, %s)"



# Código SQL para modificar registros existentes (PUT)
# ============================= Articulo ==================================== #
# Cambia el estado de un artículo
put_articulo_cambiar_estado = "UPDATE Articulos SET Nombre=%s, FechaDeCreacion=%s, Visitas=%s, Usuario=%s, Estado=%s, Contenido=%s, Imagen=%s WHERE Id=%s"



# Código SQL para eliminar registros (DELETE)
# ============================= Articulo ==================================== #
# Eliminar un articulo
delete_articulo_eliminar = "DELETE FROM Articulos WHERE Id={articulo_id};"
