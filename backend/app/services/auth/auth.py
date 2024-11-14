import mysql.connector

def verificar_usuario(usuario, contrasena):

    conexion = mysql.connector.connect(
        host="tu_host",
        user="tu_usuario",
        password="tu_password",
        database="tu_base_de_datos"
    )
    cursor = conexion.cursor()

    consulta = "SELECT 1 FROM usuarios WHERE usuario = %s AND contrasena = %s"
    
    cursor.execute(consulta, (usuario, contrasena))
    
    existe = cursor.fetchone() is not None

    cursor.close()
    conexion.close()
    
    return existe
