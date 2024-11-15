# Proyecto-Final
Este es nuestro proyecto final de el Laboratorio de Programación Web

## Estructura:
```
.
├── backend             <- Código backend y BD
│   ├── api             <- Junta todas las rutas  
│   │   └── endpoints   <- Se establecen las rutas de la API    
│   ├── data            <- Queries y Base de Datos  
│   ├── services        <- Funciones CRUD y demas
│   │   └── auth        <- Funciones de autenticación
│   └── schemas         <- Esquemas de la API  
├── frontend            <- Pantallas, estilos y código js  
│   ├── admin           <- Pantallas de administrador    
│   ├── publico         <- Pantallas publicas  
│   └── usuario         <- Pantallas para usuarios registrados y logeados
└── README.md 
```

## Ejecución del Backend
Para ejecutar el backend installa ``Python`` y su administrador de librerías ``PIP``.  
Una vez intalado, ve a tu terminal y escribe los siguientes comandos.
```sh
git clone https://github.com/diego-4545/Proyecto-Final
cd Proyecto-Final
pip install -r requirements.txt
uvicorn backend.app.main:app --reload --log-level debug
```
Con esto el backend estara incializado.  


## To-do
Esta primera semana nos tomamos de mañana a el 9 para hacer todo frontend

Desde el 10 a el 16 hacemos todo backend

Del 17 al 18 hacemos los documentos
