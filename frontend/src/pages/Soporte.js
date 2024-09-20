//  src/pages/Soporte.js

import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LayoutClientes from '../components/LayoutClientes';

function Soporte() {
  const [formData, setFormData] = useState({
    asunto: '',
    mensaje: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el mensaje de soporte
    console.log('Mensaje de soporte enviado:', formData);
    // Reiniciar el formulario
    setFormData({ asunto: '', mensaje: '' });
    alert('Mensaje enviado. Nuestro equipo de soporte se pondrá en contacto contigo pronto.');
  };

  return (
    <LayoutClientes>
      <section className="soporte-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
        <Container>
          <h1 className="text-center mb-5" style={{ color: '#fff', fontWeight: 'bold' }}>
            Soporte al Cliente
          </h1>
          
          <Row>
            <Col md={6}>
              <Card bg="dark" text="white" className="mb-4">
                <Card.Header>Contacto Directo</Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="asunto">
                      <Form.Label>Asunto</Form.Label>
                      <Form.Control
                        type="text"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        required
                        className="bg-dark text-white"
                      />
                    </Form.Group>
                    <Form.Group controlId="mensaje">
                      <Form.Label>Mensaje</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        className="bg-dark text-white"
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mt-3">
                      Enviar Mensaje
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card bg="dark" text="white" className="mb-4">
                <Card.Header>Preguntas Frecuentes</Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item action variant="dark">¿Cómo puedo depositar dinero?</ListGroup.Item>
                    <ListGroup.Item action variant="dark">¿Cuál es el tiempo de procesamiento de retiros?</ListGroup.Item>
                    <ListGroup.Item action variant="dark">¿Cómo funciona el programa de lealtad?</ListGroup.Item>
                    <ListGroup.Item action variant="dark">¿Qué hago si olvido mi contraseña?</ListGroup.Item>
                    <ListGroup.Item action variant="dark">¿Cómo puedo establecer límites de juego?</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              
              <Card bg="dark" text="white">
                <Card.Header>Información de Contacto</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <strong>Teléfono:</strong> +1 (888) 123-4567<br />
                    <strong>Email:</strong> soporte@casinolafortuna.com<br />
                    <strong>Chat en vivo:</strong> Disponible 24/7<br />
                    <strong>Horario de atención:</strong> Lunes a Domingo, 24 horas
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Button variant="primary" onClick={() => navigate('/dashboard-cliente')} className="mt-4">
            Volver al Dashboard
          </Button>
        </Container>
      </section>
    </LayoutClientes>
  );
}

export default Soporte;