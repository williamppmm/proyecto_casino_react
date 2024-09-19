// backend/index.js

require('dotenv').config(); // Cargar las variables de entorno

const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // 'localhost'
  user: process.env.DB_USER,       // 'root'
  password: process.env.DB_PASSWORD, // ''
  database: process.env.DB_NAME,     // 'casinolafortuna'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Registro de cliente
app.post('/api/clientes/registro', (req, res) => {
  // Log de los datos recibidos en el body
  console.log('Datos recibidos para registro:', req.body);

  const {
    tipo_documento, numero_documento, fecha_expedicion, primer_nombre, segundo_nombre, 
    primer_apellido, segundo_apellido, lugar_expedicion, correo_electronico, telefono_movil, 
    user_pass, fecha_nacimiento, genero, nacionalidad, direccion, municipio, interdicto, 
    pep, consentimiento_datos, comunicaciones_comerciales, terminos_condiciones, captcha
  } = req.body;

  // Verificar si el correo o el número de documento ya existen
  const checkDuplicateQuery = 'SELECT * FROM clientes WHERE correo_electronico = ? OR numero_documento = ?';
  db.query(checkDuplicateQuery, [correo_electronico, numero_documento], (err, results) => {
    if (err) {
      console.error('Error en la verificación de duplicados:', err);
      return res.status(500).send('Error en el servidor durante la verificación.');
    }
    if (results.length > 0) {
      console.log('Intento de registro con correo o documento duplicado');
      return res.status(400).send('El correo electrónico o número de documento ya están registrados.');
    }

    // Proceder con el registro si no hay duplicados
    bcrypt.hash(user_pass, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error('Error al hashear la contraseña:', hashErr);
        return res.status(500).send('Error en el servidor al procesar la contraseña');
      }

      const insertQuery = `
        INSERT INTO clientes (
          tipo_documento, numero_documento, fecha_expedicion, primer_nombre, segundo_nombre, 
          primer_apellido, segundo_apellido, lugar_expedicion, correo_electronico, telefono_movil, 
          user_pass, fecha_nacimiento, genero, nacionalidad, direccion, municipio, interdicto, 
          pep, consentimiento_datos, comunicaciones_comerciales, terminos_condiciones, captcha
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(insertQuery, [
        tipo_documento, numero_documento, fecha_expedicion, primer_nombre, segundo_nombre, 
        primer_apellido, segundo_apellido, lugar_expedicion, correo_electronico, telefono_movil, 
        hashedPassword, fecha_nacimiento, genero, nacionalidad, direccion, municipio, interdicto, 
        pep, consentimiento_datos, comunicaciones_comerciales, terminos_condiciones, captcha
      ], (insertErr, result) => {
        if (insertErr) {
          console.error('Error al registrar cliente:', insertErr);
          return res.status(500).send(`Error en el registro: ${insertErr.message}`);
        }
        console.log('Cliente registrado exitosamente');
        res.status(200).send('Cliente registrado exitosamente');
      });
    });
  });
});

// Login de cliente
app.post('/api/clientes/login', (req, res) => {
  console.log('Intento de login con datos:', req.body);
  
  const { correo_electronico, user_pass } = req.body;

  const sql = 'SELECT * FROM clientes WHERE correo_electronico = ?';
  db.query(sql, [correo_electronico], (err, results) => {
    if (err) {
      console.error('Error en la consulta de login:', err);
      return res.status(500).send('Error en el servidor durante la consulta');
    }

    console.log('Resultados de la consulta:', results);

    if (results.length === 0) {
      console.log('No se encontró el usuario con el correo:', correo_electronico);
      return res.status(401).send('Correo o contraseña incorrectos');
    }

    const cliente = results[0];
    console.log('Cliente encontrado:', cliente.id_cliente);

    bcrypt.compare(user_pass, cliente.user_pass, (bcryptErr, isMatch) => {
      if (bcryptErr) {
        console.error('Error al comparar contraseñas:', bcryptErr);
        return res.status(500).send('Error en el servidor al verificar la contraseña');
      }

      console.log('¿Contraseña coincide?', isMatch);

      if (!isMatch) {
        return res.status(401).send('Correo o contraseña incorrectos');
      }

      res.status(200).json({
        message: 'Login exitoso',
        clienteId: cliente.id_cliente
      });
    });
  });
});

// Ruta de ejemplo para obtener operadores
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

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
