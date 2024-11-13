import mysql.connector

conexion = mysql.connector.connect(user= 'root',password='etPDs_rNR44', host='localhost', database='metropolitan', port='3306')

print(conexion)