from pydantic import BaseModel

import mysql.connector

import os
from dotenv import load_dotenv


load_dotenv() # Esta función carga las variables de entorno localizadas en el archivo .env
# Variables de la BD
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")


# Esquema de la solicitud a la API para autenticar
class POST_Login_Request(BaseModel):
    usuario: str
    password: str

# Esquema de la respuesta a la API para autenticar
class POST_Login_Response(BaseModel):
    usuario_id: int
    rol_id: int

# Query para acceder al usuario y contraseña
def verificar_usuario(usuario, password):
    conexion = mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
    )
    cursor = conexion.cursor()

    consulta = "SELECT Id, Rol FROM usuarios WHERE Usuario=%s AND Contraseña=%s"
    cursor.execute(consulta, (usuario, password))
    
    resultado = cursor.fetchone()
    cursor.close()
    conexion.close()  

    if resultado:
        # Si existe, retornar True junto con Id y Rol
        return (True, resultado[0], resultado[1])
    else:
        # Si no existe, retornar False y None para ambos valores
        return (False, None, None)
