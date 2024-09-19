Casino La Fortuna
Descripción del Proyecto
Casino La Fortuna es un software diseñado para gestionar operaciones y transacciones en un casino, integrando funcionalidades para la administración de máquinas tragamonedas, juegos online, apuestas deportivas y más. El objetivo principal es proporcionar una plataforma completa para el control y registro de la actividad financiera del casino.

Funcionalidades Principales
Registro y Login de Clientes: Permite el registro de clientes con validación de datos y credenciales.
Gestión de Máquinas Tragamonedas: Registro y seguimiento de la actividad de las máquinas.
Juegos Online y Apuestas Deportivas: Gestión de transacciones en línea.
Operadores del Sistema: Registro y administración de operadores del casino.
Tecnologías Utilizadas
Backend: Node.js con Express
Frontend: React y React Bootstrap
Base de Datos: MySQL
Herramientas: MySQL Workbench, Postman, XAMPP

Instalación

Clonar el repositorio:

git clone https://github.com/williamppmm/proyecto_casino_react
Configuración del Backend:

Navegar a la carpeta del backend:

cd backend

Instalar dependencias:

npm install

Crear el archivo .env con la configuración de la base de datos:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=casinolafortuna

Iniciar el servidor backend:

npm run dev


Configuración del Frontend:

Navegar a la carpeta del frontend:

cd frontend

Instalar dependencias:

npm install

Iniciar la aplicación React:

npm start

Uso

Pruebas de Backend con Postman:

Registro de Cliente:

Método: POST
URL: http://localhost:5000/api/clientes/registro
Body (JSON):

{
  "tipo_documento": "CC",
  "numero_documento": "343434344",
  "fecha_expedicion": "2005-08-20",
  "primer_nombre": "Juan",
  ...
}

Login de Cliente:

Método: POST
URL: http://localhost:5000/api/clientes/login
Body (JSON):

{
  "correo_electronico": "juan.marinogomez@gmail.com",
  "user_pass": "hashed_password"
}


Contribuciones

Haz un fork del proyecto.
Crea una rama (git checkout -b nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -m "Descripción del cambio").
Sube tus cambios (git push origin nueva-funcionalidad).
Abre un Pull Request.


Licencia
Este proyecto es parte de un proceso de aprendizaje, desarrollado por William Pérez Muñoz y sus compañeros. Cualquier uso o modificación debe ser previamente autorizado por los autores.