// src/pages/Juegos.js

import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// Imágenes o íconos de los juegos (puedes reemplazar con las rutas correctas)
import PokerImage from '../assets/images/poker.png'; 
import RuletaImage from '../assets/images/IMG_006.PNG';
import BlackjackImage from '../assets/images/IMG_005.PNG'; 
import TragamonedasImage from '../assets/images/IMG_007.PNG';

function Juegos() {
  const juegos = [
    { id: 1, nombre: 'Póker', descripcion: 'Clásico juego de cartas con múltiples variantes.', img: PokerImage },
    { id: 2, nombre: 'Ruleta', descripcion: 'Prueba tu suerte en la rueda de la fortuna.', img: RuletaImage },
    { id: 3, nombre: 'Blackjack', descripcion: 'Alcanza 21 puntos para ganar al crupier.', img: BlackjackImage },
    { id: 4, nombre: 'Tragamonedas', descripcion: 'Gira los rodillos y gana grandes premios.', img: TragamonedasImage },
  ];

  return (
    <section className="juegos-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <Container>
        <h1 className="text-center mb-5" style={{ fontWeight: 'bold' }}>Nuestros Juegos</h1>
        <Row>
          {juegos.map((juego) => (
            <Col md={3} key={juego.id} className="mb-4">
              <Card className="bg-dark text-white h-100 shadow-lg border-0">
                {/* Imagen del juego */}
                <Card.Img src={juego.img} alt={juego.nombre} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title>{juego.nombre}</Card.Title>
                  <Card.Text>{juego.descripcion}</Card.Text>
                  <Button variant="primary" className="mt-auto">Jugar Ahora</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Juegos;