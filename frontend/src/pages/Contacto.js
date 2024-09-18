// src/pages/Contacto.js

import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Contacto() {
  return (
    <section className="contacto-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <Container>
        <h1 className="text-center mb-5" style={{ fontWeight: 'bold' }}>Contáctanos</h1>
        <Row>
          {/* Formulario de contacto */}
          <Col md={6} className="mb-4">
            <h2 className="mb-4">Escríbenos</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu nombre" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo electrónico" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Escribe tu mensaje aquí" required />
              </Form.Group>

              <Button variant="primary" type="submit">
                Enviar Mensaje
              </Button>
            </Form>
          </Col>

          {/* Información de contacto */}
          <Col md={6} className="mb-4">
            <h2 className="mb-4">Información de Contacto</h2>
            <p><strong>Dirección:</strong> Cl. 12 #4-60, Santiago de Cali</p>
            <p><strong>Teléfono:</strong> +57 315 272 8882</p>
            <p><strong>Email:</strong> info@casinolafortuna.com</p>
            <p><strong>Horario de atención:</strong> Lun - Dom: 12:00 PM - 3:00 AM</p>

            {/* Mapa embebido */}
            <div className="map-container my-4" style={{ border: '1px solid #fff' }}>
            <iframe 
              title="Ubicación del Casino La Fortuna"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15914.081487660663!2d-76.5330951!3d3.4521506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a665d888f715%3A0xa51e56c3783d8c41!2sPlaza%20de%20Cayzedo!5e0!3m2!1ses!2sco!4v1685668817075!5m2!1ses!2sco" 
              width="100%" 
              height="250" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contacto;