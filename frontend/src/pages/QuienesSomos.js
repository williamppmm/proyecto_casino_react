// src/pages/QuienesSomos.js

// Importaciones de bibliotecas externas
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Importaciones de assets
import HistoriaImagen from '../assets/images/IMG_007.PNG'; // Imagen para "Nuestra Historia"
import MisionImagen from '../assets/images/IMG_010.png'; // Imagen para "Nuestra Misión"

// Definición del componente funcional QuienesSomos
function QuienesSomos() {
  return (
    <section className="quienes-somos-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <Container>
        {/* Título de la página */}
        <h1 className="text-center mb-5" style={{ color: '#fff', fontWeight: 'bold' }}>Quiénes Somos</h1>

        {/* Contenido dividido en dos columnas con tarjetas */}
        <Row>
          {/* Tarjeta "Nuestra Historia" */}
          <Col xs={12} md={6}>
            <Card className="bg-dark text-white mb-4">
              <Card.Img src={HistoriaImagen} alt="Nuestra Historia" />
              <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', padding: '10px', borderRadius: '5px' }}>
                  <Card.Title className="text-white">Nuestra Historia</Card.Title>
                  <Card.Text>
                    Casino La Fortuna nació en 2010 con la visión de crear un espacio de entretenimiento
                    de primer nivel. Desde entonces, hemos crecido para convertirnos en uno de los destinos
                    de juego más emocionantes del país.
                  </Card.Text>
                  <Button variant="primary" as={Link} to="/registro-cliente" className="me-2">Regístrate</Button>
                </div>
              </Card.ImgOverlay>
            </Card>
          </Col>

          {/* Tarjeta "Nuestra Misión" */}
          <Col xs={12} md={6}>
            <Card className="bg-dark text-white mb-4">
              <Card.Img src={MisionImagen} alt="Nuestra Misión" />
              <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', padding: '10px', borderRadius: '5px' }}>
                  <Card.Title className="text-white">Nuestra Misión</Card.Title>
                  <Card.Text>
                    Nos dedicamos a proporcionar una experiencia de juego inigualable, combinando la
                    emoción del casino tradicional con la comodidad y accesibilidad de la tecnología
                    moderna. Nuestro objetivo es garantizar la diversión y seguridad de todos nuestros
                    clientes.
                  </Card.Text>
                  <Button variant="primary" as={Link} to="/juegos">Conoce nuestros juegos</Button>
                </div>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

// Exportación del componente para su uso en otras partes de la aplicación
export default QuienesSomos;