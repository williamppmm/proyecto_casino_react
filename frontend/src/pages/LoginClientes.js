// src/pages/LoginClientes.js

// Importaciones necesarias
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

// Componente principal para el Login de Clientes
function LoginClientes() {
  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    correo_electronico: '',
    user_pass: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Manejador para actualizar los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejador para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/clientes/login', formData) // Enviar credenciales al backend
      .then((response) => {
        setShowModal(true); // Mostrar modal si el login es exitoso
      })
      .catch((error) => {
        console.error('Error en el login:', error);
        setErrorMessage('Correo o contraseña incorrectos'); // Mostrar mensaje de error si falló
      });
  };

  // Manejador para cerrar el modal y redirigir al home
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/'); // Redirigir a la página de inicio
  };

  // Renderizado del formulario de login y modal de éxito
  return (
    <section className="login-clientes-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <Container>
        <h1 className="text-center mb-5" style={{ color: '#fff', fontWeight: 'bold' }}>Login de Clientes</h1>
        
        <Form onSubmit={handleSubmit} className="bg-dark p-4 rounded">
          {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Mostrar mensaje de error si lo hay */}
          
          <Row>
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

            <Col md={6}>
              <Form.Group controlId="user_pass">
                <Form.Label>Contraseña</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'} // Cambiar el tipo entre texto y password
                    name="user_pass"
                    value={formData.user_pass}
                    onChange={handleChange}
                    required
                    className="bg-dark text-white"
                  />
                  {/* Botón para mostrar/ocultar contraseña */}
                  <Button 
                    variant="outline-light"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />} {/* Icono de ojo */}
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="w-100 mt-4">
            Iniciar Sesión
          </Button>
        </Form>
      </Container>

      {/* Modal para indicar que el login fue exitoso */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Has iniciado sesión correctamente.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

// Exportación del componente
export default LoginClientes;