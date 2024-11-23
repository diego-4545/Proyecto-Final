from fastapi import Depends
from datetime import datetime, timedelta, timezone
from typing import Dict, Optional
import jwt

import mysql.connector

import os
from dotenv import load_dotenv


load_dotenv() # Esta función carga las variables de entorno localizadas en el archivo .env
# Variables de la BD
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")

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



SECRET_KEY = "key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # La sesión solo estara abierta durante 30 min

# Crear un token JWT
def crear_token(data: Dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    print("Created token: ", token)
    return token

# Verificar el token JWT
def verificar_token(token: str) -> Optional[Dict]:
    print("Verifying this token: ", token)
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("Payload: ", payload)
        return payload
    except jwt.ExpiredSignatureError:
        return {"Verificacion fallida - Token expirado"}
    except jwt.InvalidTokenError:
        return {"Verificacion fallida - Token invalido"}
