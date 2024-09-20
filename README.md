# Proyecto React: Casino La Fortuna - Guía de Implementación

## Introducción

Este documento describe el proceso de implementación del proyecto "Casino La Fortuna" utilizando React para el frontend y Node.js con Express para el backend. El proyecto incluye la configuración del entorno de desarrollo, la creación de la estructura del proyecto, la configuración del backend y frontend, y la implementación de funcionalidades clave como el registro y login de clientes.

## Índice

1. [Configuración del entorno de desarrollo](#1-configuración-del-entorno-de-desarrollo)
2. [Creación de la estructura del proyecto](#2-creación-de-la-estructura-del-proyecto)
3. [Configuración del backend](#3-configuración-del-backend)
4. [Configuración de la base de datos](#4-configuración-de-la-base-de-datos)
5. [Configuración del frontend](#5-configuración-del-frontend)
6. [Integración del frontend con el backend](#6-integración-del-frontend-con-el-backend)
7. [Ejecución y pruebas](#7-ejecución-y-pruebas)
8. [Implementación de registro y login de clientes](#8-implementación-de-registro-y-login-de-clientes)

## 1. Configuración del entorno de desarrollo

### 1.1. Instalar herramientas necesarias:

- Node.js (versión LTS): [Descargar Node.js](https://nodejs.org/)
- Visual Studio Code: [Descargar VS Code](https://code.visualstudio.com/)
- XAMPP (para ejecutar MySQL y Apache): [Descargar XAMPP](https://www.apachefriends.org/index.html)
- MySQL Workbench (para gestionar la base de datos): [Descargar MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
- Postman (para probar las APIs): [Descargar Postman](https://www.postman.com/)
- Git (opcional, para control de versiones): [Descargar Git](https://git-scm.com/)

### 1.2. Verificar las instalaciones:

Abrir una terminal y ejecutar:

```bash
node --version
npm --version
```

Esto mostrará las versiones instaladas de Node.js y npm.

## 2. Creación de la estructura del proyecto

### 2.1. Crear el directorio principal del proyecto:

```bash
mkdir proyecto_casino_react
cd proyecto_casino_react
```

### 2.2. Crear las carpetas para frontend y backend:

```bash
mkdir frontend backend
```

## 3. Configuración del backend

### 3.1. Inicializar el proyecto Node.js:

```bash
cd backend
npm init -y
```

### 3.2. Instalar dependencias del backend:

```bash
npm install express mysql cors dotenv
npm install nodemon --save-dev
```

### 3.3. Crear el archivo .env en la carpeta backend:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=casinolafortuna
```

### 3.4. Crear el archivo index.js en la carpeta backend:

```javascript
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

app.get('/api/operadores', (req, res) => {
  const sql = 'SELECT * FROM operadores';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener operadores');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
```

### 3.5. Modificar el package.json en la carpeta backend:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "mysql": "^2.18.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

## 4. Configuración de la base de datos

4.1. Iniciar XAMPP y MySQL.

4.2. Abrir MySQL Workbench y ejecutar el script SQL proporcionado para crear la base de datos y las tablas.

## 5. Configuración del frontend

### 5.1. Crear la aplicación React:

```bash
cd ..
npx create-react-app frontend
```

### 5.2. Instalar dependencias adicionales:

```bash
cd frontend
npm install bootstrap react-bootstrap react-router-dom axios
```

### 5.3. Modificar src/index.js para importar Bootstrap:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 5.4. Crear la estructura de carpetas en src:

```bash
mkdir src/components src/pages src/assets src/assets/icons src/assets/images
```

### 5.5. Crear el componente Navbar.js en src/components:

```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Casino La Fortuna</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/quienes-somos">Quiénes somos</Nav.Link>
            <Nav.Link as={Link} to="/juegos">Juegos</Nav.Link>
            <Nav.Link as={Link} to="/promociones">Promociones</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
```

### 5.6. Crear páginas básicas en src/pages:

Ejemplo de Home.js:

```javascript
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Logo from '../assets/icons/Logo.svg';

function Home() {
  return (
    <section className="text-center my-5">
      <Container>
        <img
          src={Logo}
          alt="Casino La Fortuna"
          className="mb-4"
          style={{ maxWidth: '200px' }}
        />
        <h1>Bienvenido a Casino La Fortuna</h1>
        <p>Descubre un mundo de emoción y entretenimiento.</p>
        <Button variant="danger" href="/registro-cliente">
          ¡Regístrate ahora!
        </Button>
      </Container>
    </section>
  );
}

export default Home;
```

### 5.7. Modificar App.js:

```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import Juegos from './pages/Juegos';
import Promociones from './pages/Promociones';
import Contacto from './pages/Contacto';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/promociones" element={<Promociones />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## 6. Integración del frontend con el backend

### 6.1. Crear el componente Operadores.js en src/components:

```javascript
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup } from 'react-bootstrap';

function Operadores() {
  const [operadores, setOperadores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/operadores')
      .then((response) => {
        setOperadores(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener operadores:', error);
      });
  }, []);

  return (
    <Container className="my-5">
      <h2>Lista de Operadores</h2>
      <ListGroup>
        {operadores.map((operador) => (
          <ListGroup.Item key={operador.id_operador}>
            {operador.primer_nombre} {operador.primer_apellido}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Operadores;
```

### 6.2. Añadir la ruta de Operadores en App.js:

```javascript
// ... otras importaciones
import Operadores from './components/Operadores';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        {/* ... otras rutas */}
        <Route path="/operadores" element={<Operadores />} />
      </Routes>
    </Router>
  );
}
```

## 7. Ejecución y pruebas

### 7.1. Iniciar el servidor backend:

```bash
cd backend
npm run dev
```

### 7.2. Iniciar la aplicación React:

```bash
cd frontend
npm start
```

### 7.3. Abrir el navegador y visitar http://localhost:3000 para ver la aplicación.

### 7.4. Usar Postman para probar el endpoint del backend: GET http://localhost:5000/api/operadores.

## 8. Implementación de registro y login de clientes

### 8.1. Registro de Clientes

Añadir al archivo index.js del backend:

```javascript
// Registro de cliente
app.post('/api/clientes/registro', (req, res) => {
  const {
    tipo_documento, numero_documento, fecha_expedicion, primer_nombre, segundo_nombre,
    primer_apellido, segundo_apellido, lugar_expedicion, correo_electronico, telefono_movil,
    user_pass, fecha_nacimiento, genero, nacionalidad, direccion, municipio, interdicto,
    pep, consentimiento_datos, comunicaciones_comerciales, terminos_condiciones, captcha
  } = req.body;

  const sql = `
    INSERT INTO clientes (
      tipo_documento, numero_documento, fecha_expedicion, primer_nombre, segundo_nombre,
      primer_apellido, segundo_apellido, lugar_expedicion, correo_electronico, telefono_movil,
      user_pass, fecha_nacimiento, genero, nacionalidad, direccion, municipio, interdicto,
      pep, consentimiento_datos, comunicaciones_comerciales, terminos_condiciones, captcha
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    tipo_documento, numero_documento, fecha_expedicion, primer_nombre, segundo_nombre,
    primer_apellido, segundo_apellido, lugar_expedicion, correo_electronico, telefono_movil,
    user_pass, fecha_nacimiento, genero, nacionalidad, direccion, municipio, interdicto,
    pep, consentimiento_datos, comunicaciones_comerciales, terminos_condiciones, captcha
  ], (err, result) => {
    if (err) {
      console.error('Error al registrar cliente:', err);
      res.status(500).send(`Error en el registro: ${err.message}`);
    } else {
      res.status(200).send('Cliente registrado exitosamente');
    }
  });
});
```

### 8.2. Login de Clientes

Añadir al archivo index.js del backend:

```javascript
// Login de cliente
app.post('/api/clientes/login', (req, res) => {
  const { correo_electronico, user_pass } = req.body;

  const sql = `SELECT * FROM clientes WHERE correo_electronico = ? AND user_pass = ?`;

  db.query(sql, [correo_electronico, user_pass], (err, results) => {
    if (err) {
      console.error('Error al verificar cliente:', err);
      res.status(500).send('Error al iniciar sesión');
    } else if (results.length > 0) {
      res.status(200).send('Login exitoso');
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  });
});
```

### 8.3. Probar las nuevas funcionalidades

Una vez implementadas las funcionalidades de registro y login, es crucial probarlas para asegurar su correcto funcionamiento. Utilizaremos Postman para realizar estas pruebas, ya que nos permite enviar solicitudes HTTP personalizadas a nuestro servidor.

#### 8.3.1. Probar el registro de clientes

Utiliza Postman para enviar una solicitud POST a:

```
http://localhost:5000/api/clientes/registro
```

Ejemplo de JSON para el cuerpo de la solicitud:

```json
{
  "tipo_documento": "CC",
  "numero_documento": "343434344",
  "fecha_expedicion": "2005-08-20",
  "primer_nombre": "Juan",
  "segundo_nombre": "Marino",
  "primer_apellido": "Gómez",
  "segundo_apellido": "Muñoz",
  "lugar_expedicion": "Medellín",
  "correo_electronico": "juan.marinogomez@gmail.com",
  "telefono_movil": "324545632",
  "user_pass": "hashed_password",
  "fecha_nacimiento": "1995-04-13",
  "genero": "M",
  "nacionalidad": "CO",
  "direccion": "Carrera 3434",
  "municipio": "Medellín",
  "interdicto": "no",
  "pep": "no",
  "consentimiento_datos": true,
  "comunicaciones_comerciales": true,
  "terminos_condiciones": true,
  "captcha": true
}
```

Asegúrate de configurar el header `Content-Type` como `application/json`.

Si el registro es exitoso, deberías recibir una respuesta con estado 200 y un mensaje indicando que el cliente se registró correctamente.

#### 8.3.2. Probar el login de clientes

Para probar el login, envía una solicitud POST a:

```
http://localhost:5000/api/clientes/login
```

Ejemplo de JSON para el cuerpo de la solicitud:

```json
{
  "correo_electronico": "juan.marinogomez@gmail.com",
  "user_pass": "hashed_password"
}
```

Si las credenciales son correctas, deberías recibir una respuesta con estado 200 y un mensaje de "Login exitoso".

### 8.4. Creación del formulario de registro de clientes en React

Después de configurar la parte del backend para el registro de clientes, es necesario crear el formulario de registro en el frontend.

1. Crea un nuevo archivo `RegistroClientes.js` en la carpeta `src/pages`.

2. Implementa el componente de registro:

```javascript
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function RegistroClientes() {
  const initialFormData = {
    tipo_documento: '',
    numero_documento: '',
    fecha_expedicion: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    lugar_expedicion: '',
    correo_electronico: '',
    telefono_movil: '',
    user_pass: '',
    confirm_password: '',
    fecha_nacimiento: '',
    genero: '',
    nacionalidad: '',
    direccion: '',
    municipio: '',
    interdicto: 'no',
    pep: 'no',
    consentimiento_datos: false,
    comunicaciones_comerciales: false,
    terminos_condiciones: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.user_pass !== formData.confirm_password) {
      alert('Las contraseñas no coinciden');
      return;
    }

    axios
      .post('http://localhost:5000/api/clientes/registro', formData)
      .then(() => {
        setShowModal(true);
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error('Error al registrar cliente:', error);
        alert('Error en el registro');
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/login-cliente');
  };

  return (
    <section style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <Container>
        <h1 className="text-center mb-5">Registro de Clientes</h1>
        <Form onSubmit={handleSubmit} className="bg-dark p-4 rounded">
          {/* Agrega aquí los campos del formulario */}
          <Button variant="primary" type="submit" className="w-100 mt-4">
            Registrarse
          </Button>
        </Form>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registro Exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tu registro se ha completado con éxito.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Iniciar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default RegistroClientes;
```

3. Modifica `App.js` para incluir la ruta de registro de clientes:

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistroClientes from './pages/RegistroClientes'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Otras rutas */}
        <Route path="/registro-cliente" element={<RegistroClientes />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### 8.5. Creación del formulario de login de clientes

1. Crea un nuevo archivo `LoginClientes.js` en la carpeta `src/pages`.

2. Implementa el componente de login:

```javascript
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

function LoginClientes() {
  const [formData, setFormData] = useState({ correo_electronico: '', user_pass: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/clientes/login', formData)
      .then(() => {
        navigate('/dashboard-clientes');
      })
      .catch((error) => {
        console.error('Error en el login:', error);
        setErrorMessage('Correo o contraseña incorrectos');
      });
  };

  return (
    <section className="login-clientes-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <Container>
        <h1 className="text-center mb-5">Login de Clientes</h1>
        <Form onSubmit={handleSubmit} className="bg-dark p-4 rounded">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <Form.Group controlId="correo_electronico">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control type="email" name="correo_electronico" value={formData.correo_electronico} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="user_pass">
            <Form.Label>Contraseña</Form.Label>
            <div className="input-group">
              <Form.Control type={showPassword ? 'text' : 'password'} name="user_pass" value={formData.user_pass} onChange={handleChange} required />
              <Button variant="outline-light" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </Button>
            </div>
          </Form.Group>
          <Button type="submit" className="w-100 mt-4">Iniciar Sesión</Button>
        </Form>
      </Container>
    </section>
  );
}

export default LoginClientes;
```

3. Modifica `App.js` para incluir la ruta de login de clientes:

```javascript
import LoginClientes from './pages/LoginClientes';

function App() {
  return (
    <Router>
      <Routes>
        {/* Otras rutas */}
        <Route path="/login-cliente" element={<LoginClientes />} />
      </Routes>
    </Router>
  );
}
```

### 8.6. Consulta del perfil del cliente desde el backend

Se creó una consulta en el backend que permite obtener la información del cliente registrado, como nombre, apellido, correo electrónico y teléfono, para mostrarla en el dashboard.

```javascript
// Perfil de cliente
app.get('/api/clientes/perfil/:id', (req, res) => {
  const clienteId = req.params.id;

  const query = 'SELECT primer_nombre, primer_apellido, correo_electronico, telefono_movil FROM clientes WHERE id_cliente = ?';
  
  db.query(query, [clienteId], (err, results) => {
    if (err) {
      console.error('Error al obtener perfil del cliente:', err);
      return res.status(500).json({ error: 'Error al obtener perfil del cliente' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const cliente = results[0];
    res.json({
      nombre: cliente.primer_nombre,
      apellido: cliente.primer_apellido,
      email: cliente.correo_electronico,
      telefono: cliente.telefono_movil
    });
  });
});
```

### 8.7. Implementación del contador de sesión en la barra de navegación

Se implementó un contador de sesión que se muestra en la barra de navegación y sigue contando el tiempo en que el cliente está conectado. El contador usa el formato hh:mm:ss y se reinicia al cerrar sesión.

```javascript
//  src/components/NavbarClientes.js
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

// Función para formatear el tiempo en hh:mm:ss
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

function NavbarClientes() {
  const [sessionTime, setSessionTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSessionTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('clienteId');
    navigate('/login-cliente');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavDropdown title="Mi Cuenta" id="basic-nav-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/perfil-cliente">Mi Perfil</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
            <Navbar.Text className="ms-3">
              Sesión: {formatTime(sessionTime)}
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarClientes;
```

### 8.8. Uso de LayoutClientes para estructurar las páginas

Se implementó LayoutClientes como un componente estructural que contiene la barra de navegación y el botón de WhatsApp. Esto permite mantener una estructura consistente a través de todas las páginas de clientes.

```javascript
//  src/components/LayoutClientes.js
import React from 'react';
import NavbarClientes from './NavbarClientes'; 
import WhatsAppButton from './WhatsAppButton';

function LayoutClientes({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarClientes />
      <div className="flex-grow-1">
        {children}
      </div>
      <WhatsAppButton />
    </div>
  );
}

export default LayoutClientes;
```

### 8.9. Dashboard de Clientes

El dashboard muestra los datos del cliente y proporciona accesos directos a varias secciones, como el perfil, el historial de juegos, promociones y soporte. Además, se corrigió el cierre de sesión y se mejoró la navegación dentro del dashboard.

```javascript
//  src/pages/DashboardClientes.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LayoutClientes from '../components/LayoutClientes';
import axios from 'axios';

function DashboardClientes() {
  const [cliente, setCliente] = useState(null);
  const navigate = useNavigate();

  // Función para obtener los datos del cliente
  const obtenerPerfilCliente = async () => {
    const clienteId = localStorage.getItem('clienteId');
    if (clienteId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/clientes/perfil/${clienteId}`);
        setCliente(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del cliente:', error);
      }
    }
  };

  useEffect(() => {
    const clienteId = localStorage.getItem('clienteId');
    if (!clienteId) {
      // Redirigir al login si no hay clienteId en localStorage
      navigate('/login-cliente');
    } else {
      obtenerPerfilCliente();
    }
  }, [navigate]);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('clienteId');
    navigate('/login-cliente');
  };

  return (
    <LayoutClientes>
      <section className="dashboard-clientes-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
        <Container>
          <h1 className="text-center mb-5" style={{ color: '#fff', fontWeight: 'bold' }}>
            Bienvenido al Dashboard de Clientes
          </h1>

          {/* Mostrar datos del cliente si están disponibles */}
          {cliente ? (
            <div className="mb-4 text-center" style={{ color: '#fff' }}>
              <p><strong>Nombre:</strong> {cliente.nombre} {cliente.apellido}</p>
              <p><strong>Correo:</strong> {cliente.email}</p>
              <p><strong>Teléfono:</strong> {cliente.telefono}</p>
            </div>
          ) : (
            <p className="text-center text-light">Cargando datos del cliente...</p>
          )}

          <Row className="mb-4">
            {/* Tarjetas de acceso rápido */}
            <Col md={4}>
              <Card className="bg-dark text-white">
                <Card.Body>
                  <Card.Title>Perfil</Card.Title>
                  <Card.Text>
                    Ver y actualizar información personal
                  </Card.Text>
                  <Button variant="primary" className="w-100" onClick={() => navigate('/perfil-cliente')}>
                    Acceder
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="bg-dark text-white">
                <Card.Body>
                  <Card.Title>Historial de Juegos</Card.Title>
                  <Card.Text>
                    Consultar el historial de juegos y apuestas
                  </Card.Text>
                  <Button variant="primary" className="w-100" onClick={() => navigate('/historial-juegos')}>
                    Acceder
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="bg-dark text-white">
                <Card.Body>
                  <Card.Title>Promociones</Card.Title>
                  <Card.Text>
                    Ver promociones y bonos disponibles
                  </Card.Text>
                  <Button variant="primary" className="w-100" onClick={() => navigate('/promociones')}>
                    Acceder
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Card className="bg-dark text-white">
                <Card.Body>
                  <Card.Title>Mis Transacciones</Card.Title>
                  <Card.Text>
                    Ver el historial de transacciones y pagos
                  </Card.Text>
                  <Button variant="primary" className="w-100" onClick={() => navigate('/transacciones-clientes')}>
                    Acceder
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="bg-dark text-white">
                <Card.Body>
                  <Card.Title>Soporte</Card.Title>
                  <Card.Text>
                    Contactar al soporte técnico o atención al cliente
                  </Card.Text>
                  <Button variant="primary" className="w-100" onClick={() => navigate('/soporte')}>
                    Acceder
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="bg-dark text-white">
                <Card.Body>
                  <Card.Title>Cerrar Sesión</Card.Title>
                  <Card.Text>
                    Cerrar tu sesión actual
                  </Card.Text>
                  <Button variant="danger" className="w-100" onClick={handleLogout}>
                    Cerrar Sesión
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </LayoutClientes>
  );
}

export default DashboardClientes;
```
## 9. Consideraciones de seguridad

Al implementar funcionalidades de registro y login, es crucial tener en cuenta las siguientes consideraciones de seguridad:

1. **Hashing de contraseñas**: Nunca almacenes contraseñas en texto plano. Utiliza una biblioteca como bcrypt para hacer hash de las contraseñas antes de almacenarlas en la base de datos.

2. **Validación de datos**: Implementa una validación robusta tanto en el frontend como en el backend para asegurar que los datos ingresados sean correctos y seguros.

3. **Protección contra inyección SQL**: Utiliza consultas parametrizadas o un ORM para prevenir ataques de inyección SQL.

4. **HTTPS**: En producción, asegúrate de que todas las comunicaciones entre el cliente y el servidor se realicen a través de HTTPS para proteger los datos sensibles.

5. **Manejo de sesiones**: Implementa un sistema de manejo de sesiones seguro, posiblemente utilizando tokens JWT (JSON Web Tokens) para mantener el estado de autenticación del usuario.

## 10. Próximos pasos

Después de implementar y probar exitosamente el registro y login de clientes, algunos próximos pasos podrían incluir:

1. Implementar la recuperación de contraseñas.
2. Añadir autenticación de dos factores para mayor seguridad.
3. Crear un panel de control para que los usuarios puedan ver y editar su información.
4. Implementar la lógica de juegos y apuestas en el backend.
5. Desarrollar la interfaz de usuario para los juegos en el frontend.
6. Implementar un sistema de notificaciones para los usuarios.
7. Crear un panel de administración para los operadores del casino.

Recuerda siempre priorizar la seguridad y la experiencia del usuario al continuar desarrollando la aplicación Casino La Fortuna.

# Anexo: Visualización del Proyecto React utilizando ngrok

Este anexo proporciona instrucciones paso a paso para visualizar tu proyecto React en otro dispositivo utilizando ngrok.

## Paso 1: Iniciar la aplicación React en tu máquina local

1. Abre un terminal en la carpeta frontend de tu proyecto React:
   - Ve a la ubicación `D:\proyecto_casino_react\frontend`.
   - Abre un terminal o consola en esa ubicación.

2. Ejecuta tu proyecto React:
   - En el terminal, ejecuta el siguiente comando:
     ```
     npm start
     ```
   - Esto iniciará tu aplicación React en `http://localhost:3000`.
   - Mantén este terminal abierto mientras trabajas, ya que tu servidor de desarrollo de React debe seguir corriendo.

## Paso 2: Configurar y ejecutar ngrok

1. Abre otro terminal para ngrok:
   - Abre un nuevo terminal y navega a la carpeta donde descargaste ngrok (`C:\Users\willi\Desktop\ngrok-v3-stable-windows-amd64`).

2. Ejecuta ngrok para exponer tu aplicación React:
   - Ejecuta el siguiente comando en el terminal:
     ```
     .\ngrok.exe http 3000
     ```
   - Esto generará una URL pública que te permitirá acceder a tu aplicación desde cualquier dispositivo conectado a internet.
   - La URL se verá algo así:
     ```
     Forwarding  https://a1a9-2803-9810-51b8-e310-b8f5-a56c-9c02-804e.ngrok-free.app -> http://localhost:3000
     ```

## Paso 3: Acceder al proyecto desde otros dispositivos

1. Copia la URL pública:
   - Copia la URL que generó ngrok (por ejemplo: `https://a1a9-2803-9810-51b8-e310-b8f5-a56c-9c02-804e.ngrok-free.app`).

2. Abre la URL en tu dispositivo móvil:
   - En tu celular, abre un navegador y pega la URL en la barra de direcciones.
   - Verás una advertencia inicial de ngrok con un botón que dice "Visit Site". Haz clic en ese botón para continuar y acceder a tu aplicación.

3. Visualiza tu aplicación React:
   - Ahora deberías poder ver tu aplicación React ejecutándose en tu celular.

## Consideraciones adicionales

- Limitaciones al usar ngrok: Es posible que algunas funciones, no funcionen correctamente al usar la versión gratuita de ngrok. Esto puede deberse a limitaciones de seguridad o de conexiones establecidas por ngrok.

- Cada vez que reinicies ngrok, obtendrás una nueva URL pública. Si deseas mantener una URL constante, necesitarías una cuenta ngrok de pago.

- Si necesitas hacer pruebas avanzadas, podrías considerar usar la cuenta de pago de ngrok o probar directamente en una red local sin ngrok.

Con este proceso, ya deberías poder visualizar tu proyecto desde cualquier dispositivo, aunque algunas funcionalidades específicas podrían estar limitadas cuando se accede a través de ngrok.
