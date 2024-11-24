import jwt
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException
from backend.app.services.auth.auth_esquemas import POST_Verificar_Request

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
def login(usuario, password):
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
def crear_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token

# Verificar el token JWT
def verificar_token(token: str):
    print("Verifying this token: ", token)
    try:
        payload: dict = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("usuario_id", None):
            return {
                "autenticado": True, 
                "usuario_id": payload.get("usuario_id"), 
                "rol_id": payload.get("rol_id")
            }
        return {"autenticado": False}
    except jwt.ExpiredSignatureError:
        return {"Verificacion fallida - Token expirado"}
    except jwt.InvalidTokenError:
        return {"Verificacion fallida - Token invalido"}


# Verificar que el token provenga de una cuenta administrador
def verificar_admin(token: str):
    payload = verificar_token(token)
    if not payload["autenticado"]:
        raise HTTPException(status_code=401, detail="Hubo un problema con el token, inicia sesión nuevamente")
    if payload["rol_id"] != 2:
        raise HTTPException(status_code=403, detail="El usuario no es administrador")
    return payload

# Verificar que el token provenga de una cuenta logeada
def verificar_usuario(token: str):
    payload = verificar_token(token)
    if not payload["autenticado"]:
        raise HTTPException(status_code=401, detail="Hubo un problema con el token, inicia sesión nuevamente")
    if (payload["rol_id"] != 1 and payload["rol_id"] != 2):
        raise HTTPException(status_code=403, detail="Inicia sesión")
    return payload
