//  src/pages/PerfilClientes.js

import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LayoutClientes from '../components/LayoutClientes';

function PerfilClientes() {
  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    fechaRegistro: '',
    nivelLealtad: '',
    saldo: 0,  // Inicializar saldo con 0
    puntosLealtad: 0
  });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const clienteId = localStorage.getItem('clienteId');
    if (!clienteId) {
      navigate('/login-cliente');
    } else {
      obtenerPerfilCliente(clienteId);
    }
  }, [navigate]);

  const obtenerPerfilCliente = async (clienteId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/clientes/perfil/${clienteId}`);
      setCliente(response.data);
    } catch (error) {
      console.error('Error al obtener el perfil del cliente:', error);
      setMessage({ type: 'danger', text: 'Error al cargar el perfil. Por favor, intenta de nuevo más tarde.' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/clientes/perfil/${cliente.id}`, cliente);
      setMessage({ type: 'success', text: 'Perfil actualizado exitosamente.' });
      setEditMode(false);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      setMessage({ type: 'danger', text: 'Error al actualizar el perfil. Por favor, intenta de nuevo.' });
    }
  };

  if (!cliente) {
    return <div>Cargando...</div>;
  }

  return (
    <LayoutClientes>
      <section className="perfil-clientes-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
        <Container>
          <h1 className="text-center mb-5" style={{ fontWeight: 'bold' }}>Perfil del Cliente</h1>
          
          {message && (
            <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
              {message.text}
            </Alert>
          )}

          <Card bg="dark" text="white" className="mb-4">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={cliente.nombre}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="bg-dark text-white"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        type="text"
                        name="apellido"
                        value={cliente.apellido}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="bg-dark text-white"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Correo Electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={cliente.email}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="bg-dark text-white"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        type="tel"
                        name="telefono"
                        value={cliente.telefono}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="bg-dark text-white"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fecha de Nacimiento</Form.Label>
                      <Form.Control
                        type="date"
                        name="fechaNacimiento"
                        value={cliente.fechaNacimiento}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="bg-dark text-white"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Dirección</Form.Label>
                      <Form.Control
                        type="text"
                        name="direccion"
                        value={cliente.direccion}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="bg-dark text-white"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {editMode ? (
                  <Button variant="primary" type="submit" className="me-2">
                    Guardar Cambios
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => setEditMode(true)} className="me-2">
                    Editar Perfil
                  </Button>
                )}
                {editMode && (
                  <Button variant="secondary" onClick={() => setEditMode(false)}>
                    Cancelar
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>

          <Card bg="dark" text="white" className="mb-4">
            <Card.Body>
              <Card.Title>Información de la Cuenta</Card.Title>
              <Row>
                <Col md={6}>
                  <p><strong>Fecha de Registro:</strong> {cliente.fechaRegistro}</p>
                  <p><strong>Nivel de Lealtad:</strong> {cliente.nivelLealtad}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Saldo Actual:</strong> ${cliente.saldo ? cliente.saldo.toFixed(2) : '0.00'}</p> {/* Verificar si saldo existe */}
                  <p><strong>Puntos de Lealtad:</strong> {cliente.puntosLealtad}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Button variant="primary" onClick={() => navigate('/dashboard-cliente')} className="mt-3">
            Volver al Dashboard
          </Button>
        </Container>
      </section>
    </LayoutClientes>
  );
}

export default PerfilClientes;