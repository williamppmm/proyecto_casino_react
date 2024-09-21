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
      ], (insertErr) => {
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
  const { correo_electronico, user_pass } = req.body;
  const sql = 'SELECT * FROM clientes WHERE correo_electronico = ?';

  db.query(sql, [correo_electronico], (err, results) => {
    if (err) {
      console.error('Error en la consulta de login:', err);
      return res.status(500).send('Error en el servidor durante la consulta');
    }

    if (results.length === 0) {
      return res.status(401).send('Correo o contraseña incorrectos');
    }

    const cliente = results[0];

    bcrypt.compare(user_pass, cliente.user_pass, (bcryptErr, isMatch) => {
      if (bcryptErr) {
        console.error('Error al comparar contraseñas:', bcryptErr);
        return res.status(500).send('Error en el servidor al verificar la contraseña');
      }

      if (!isMatch) {
        return res.status(401).send('Correo o contraseña incorrectos');
      }

      res.status(200).json({ message: 'Login exitoso', clienteId: cliente.id_cliente });
    });
  });
});

// Perfil de cliente
app.get('/api/clientes/perfil/:id', (req, res) => {
  const clienteId = req.params.id;
  const query = `
    SELECT 
      id_cliente, fecha_registro, tipo_documento, numero_documento, fecha_expedicion, 
      primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, lugar_expedicion, 
      correo_electronico, telefono_movil, fecha_nacimiento, genero, nacionalidad, direccion, 
      municipio, interdicto, pep, consentimiento_datos, comunicaciones_comerciales, 
      terminos_condiciones
    FROM clientes 
    WHERE id_cliente = ?
  `;
  
  db.query(query, [clienteId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener perfil del cliente' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(results[0]);
  });
});

// Ruta actualizar perfil cliente (datos basicos)

app.put('/api/clientes/actualizar-perfil/:id', (req, res) => {
  const clienteId = req.params.id;
  const { telefono_movil, direccion, municipio } = req.body;

  // Validaciones básicas (ejemplo: validar teléfono)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(telefono_movil)) {
    return res.status(400).json({ error: 'El teléfono debe ser un número de 10 dígitos' });
  }

  // Proceder con la actualización
  const updateQuery = `
    UPDATE clientes 
    SET telefono_movil = ?, direccion = ?, municipio = ?
    WHERE id_cliente = ?
  `;

  db.query(updateQuery, [telefono_movil, direccion, municipio, clienteId], (updateErr, result) => {
    if (updateErr) {
      console.error('Error al actualizar el perfil del cliente:', updateErr);
      return res.status(500).json({ error: 'Error al actualizar el perfil del cliente' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json({ message: 'Perfil actualizado exitosamente' });
  });
});

// Verificación de contraseña del cliente
app.post('/api/clientes/verificar-password/:id', async (req, res) => {
  const clienteId = req.params.id;
  const { password } = req.body;

  const query = 'SELECT user_pass FROM clientes WHERE id_cliente = ?';
  db.query(query, [clienteId], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor al verificar la contraseña' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const isValid = await bcrypt.compare(password, results[0].user_pass);
    res.json({ isValid });
  });
});

// Actualización de contraseña del cliente
app.put('/api/clientes/actualizar-password/:id', async (req, res) => {
  const clienteId = req.params.id;
  const { passwordActual, nuevaPassword } = req.body;

  // Verificar la contraseña actual
  const checkPasswordQuery = 'SELECT user_pass FROM clientes WHERE id_cliente = ?';
  db.query(checkPasswordQuery, [clienteId], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al verificar la contraseña' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Comparar la contraseña actual
    const passwordCorrecta = await bcrypt.compare(passwordActual, results[0].user_pass);
    if (!passwordCorrecta) {
      return res.status(400).json({ error: 'Contraseña actual incorrecta' });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);

    // Actualizar la contraseña
    const updatePasswordQuery = 'UPDATE clientes SET user_pass = ? WHERE id_cliente = ?';
    db.query(updatePasswordQuery, [hashedPassword, clienteId], (updateErr) => {
      if (updateErr) {
        return res.status(500).json({ error: 'Error al actualizar la contraseña' });
      }
      res.json({ message: 'Contraseña actualizada exitosamente' });
    });
  });
});

// Obtener operadores (ejemplo)
app.get('/api/operadores', (req, res) => {
  const sql = 'SELECT * FROM operadores';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener operadores');
    }
    res.json(results);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});