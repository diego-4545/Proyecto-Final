# Establecer las queries para obtener la información que se requiere en una solicitud de la API
# Checa el código en '../schemas/articulos_esquemas.py' para ver que solicitudes existen

### ============================= Articulos ==================================== ###

# Seleccionar todos los ID de articulos de un usuario
"""
SELECT * FROM UsuarioArticulo WHERE Usuario={usuario_id};
"""

# Seleccionar la info de un articulo especifico
"""
SELECT * FROM Articulos WHERE Id={articulo_id};
"""

### ============================= Estados ==================================== ###

# Obtener el estado de un articulo
"""
SELECT * FROM EstadoArticulo WHERE Id={articulo_id};
"""

### ============================= Likes ==================================== ###

# Obtener la cantidad de likes de un articulo
"""
SELECT COUNT(*) AS likes FROM Likes WHERE Articulo={articulo_id};
"""

### ============================= Etiquetas ==================================== ###

# Obtener los ID de las etiquetas de un articulo
"""
SELECT * FROM EtiquetasDeArticulo WHERE Articulo={articulo_id};
"""

# !!! Esta query igual se ocupara en los usuarios porque estos tambien tienen etiquetas en su perfil
# Obtener el nombre de la etiqueta
"""
SELECT * FROM Etiqueta WHERE Id={etiqueta_id};
"""

### ============================== Comentarios =================================== ###

# Obtener los ID de los comentarios
"""
SELECT Id FROM Comentarios WHERE Articulo={articulo_id} 
"""

# Obtener informacion de un comentario
"""
SELECT * FROM Comentarios WHERE Id={comentario_id}
"""

# Obtener el estado de un comentario
"""
SELECT * FROM EstadoComentarios WHERE Id={estado_comentario_id}
"""
