# Establecer las queries para obtener la información que se requiere en una solicitud de la API
# Checa el código en '../schemas/articulos_esquemas.py' para ver que solicitudes existen


# Seleccionar todos los ID de articulos de un usuario
"""
SELECT * FROM UsuarioArticulo WHERE Usuario={usuario_id};
"""

# Seleccionar la info de un articulo especifico
"""
SELECT * FROM Articulos WHERE Id={articulo_id};
"""
