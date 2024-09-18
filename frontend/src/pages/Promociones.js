// src/pages/Promociones.js

import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Promociones() {
  const promociones = [
    { id: 1, titulo: 'Bono de Bienvenida', descripcion: '¡Duplicamos tu primer depósito hasta $500.000 COP!' },
    { id: 2, titulo: 'Martes de Tragamonedas', descripcion: '50% extra en todas tus recargas los martes.' },
    { id: 3, titulo: 'Torneo de Póker Semanal', descripcion: 'Participa todos los jueves por un premio de $5.000.000 COP.' },
  ];

  return (
    <section className="promociones-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <Container>
        <h1 className="text-center mb-5" style={{ fontWeight: 'bold' }}>Promociones Actuales</h1>
        <Row>
          {promociones.map((promo) => (
            <Col md={4} key={promo.id} className="mb-4">
              <Card className="bg-dark text-white h-100 shadow-lg border-0">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="mb-3">{promo.titulo}</Card.Title>
                    <Card.Text>{promo.descripcion}</Card.Text>
                  </div>
                  <Button variant="primary" className="mt-auto">Aprovechar Promoción</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Promociones;