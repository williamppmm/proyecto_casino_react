// src/pages/LoginClientes.js

// Importaciones necesarias
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

// Componente principal para el Login de Clientes
function LoginClientes() {
  // Estado inicial del formulario con los campos de correo electrónico y contraseña
  const [formData, setFormData] = useState({
    correo_electronico: '',
    user_pass: '',
  });

  // Estado para almacenar el mensaje de error en caso de fallo
  const [errorMessage, setErrorMessage] = useState('');

  // Estado para mostrar/ocultar la contraseña en el input
  const [showPassword, setShowPassword] = useState(false);

  // Hook de navegación para redirigir a otras rutas
  const navigate = useNavigate();

  // Manejador para actualizar los campos del formulario cuando el usuario escribe
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejador para el envío del formulario de login
  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar la petición POST al backend para el login
    axios
      .post('http://localhost:5000/api/clientes/login', formData)
      .then((response) => {
        // Extraer el ID del cliente desde la respuesta
        const { clienteId } = response.data;

        // Almacenar el ID del cliente en localStorage para utilizarlo más tarde
        localStorage.setItem('clienteId', clienteId);

        // Redirigir al DashboardClientes después del inicio de sesión exitoso
        navigate('/dashboard-cliente');
      })
      .catch((error) => {
        // Si el login falla, mostrar un mensaje de error
        console.error('Error en el login:', error);
        setErrorMessage('Correo o contraseña incorrectos');
      });
  };

  // Renderizado del formulario de login
  return (
    <section
      className="login-cliente-section py-5"
      style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}
    >
      <Container>
        {/* Título del formulario */}
        <h1 className="text-center mb-5" style={{ color: '#fff', fontWeight: 'bold' }}>
          Login de Clientes
        </h1>

        {/* Formulario de inicio de sesión */}
        <Form onSubmit={handleSubmit} className="bg-dark p-4 rounded">
          {/* Mostrar mensaje de error en caso de fallo */}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <Row>
            {/* Input del correo electrónico */}
            <Col md={6}>
              <Form.Group controlId="correo_electronico">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="correo_electronico"
                  value={formData.correo_electronico}
                  onChange={handleChange}
                  required
                  className="bg-dark text-white"
                />
              </Form.Group>
            </Col>

            {/* Input de la contraseña con la opción de mostrar/ocultar */}
            <Col md={6}>
              <Form.Group controlId="user_pass">
                <Form.Label>Contraseña</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'} // Cambiar entre texto y password
                    name="user_pass"
                    value={formData.user_pass}
                    onChange={handleChange}
                    required
                    className="bg-dark text-white"
                  />
                  <Button
                    variant="outline-light"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {/* Mostrar el icono de ojo dependiendo del estado */}
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Botón para iniciar sesión */}
          <Button variant="primary" type="submit" className="w-100 mt-4">
            Iniciar Sesión
          </Button>
        </Form>
      </Container>
    </section>
  );
}

// Exportación del componente para su uso en otras partes de la aplicación
export default LoginClientes;