//  src/pages/HistorialJuegos.js

import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LayoutClientes from '../components/LayoutClientes';

function HistorialJuegos() {
  const [historial, setHistorial] = useState([]);
  const [filtroJuego, setFiltroJuego] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const clienteId = localStorage.getItem('clienteId');
    if (!clienteId) {
      navigate('/login-cliente');
    } else {
      obtenerHistorialJuegos(clienteId);
    }
  }, [navigate]);

  const obtenerHistorialJuegos = async (clienteId) => {
    try {
      // Simular una llamada a la API
      // En una implementación real, esto sería una llamada a su backend
      const response = await axios.get(`http://localhost:5000/api/clientes/historial-juegos/${clienteId}`);
      setHistorial(response.data);
    } catch (error) {
      console.error('Error al obtener el historial de juegos:', error);
    }
  };

  const filtrarHistorial = () => {
    return historial.filter(juego => {
      return (filtroJuego === '' || juego.nombre.toLowerCase().includes(filtroJuego.toLowerCase())) &&
             (filtroFecha === '' || juego.fecha.includes(filtroFecha));
    });
  };

  const calcularEstadisticas = () => {
    const totalJuegos = historial.length;
    const totalGanado = historial.reduce((sum, juego) => sum + juego.ganancia, 0);
    const totalApostado = historial.reduce((sum, juego) => sum + juego.apuesta, 0);
    const tasaGanancia = totalApostado !== 0 ? (totalGanado / totalApostado) * 100 : 0;

    return { totalJuegos, totalGanado, totalApostado, tasaGanancia };
  };

  const estadisticas = calcularEstadisticas();

  return (
    <LayoutClientes>
      <section className="historial-juegos-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
        <Container>
          <h1 className="text-center mb-5" style={{ fontWeight: 'bold' }}>Historial de Juegos</h1>
          
          <Row className="mb-4">
            <Col md={3}>
              <Card bg="dark" text="white">
                <Card.Body>
                  <Card.Title>Total de Juegos</Card.Title>
                  <Card.Text>{estadisticas.totalJuegos}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card bg="dark" text="white">
                <Card.Body>
                  <Card.Title>Total Ganado</Card.Title>
                  <Card.Text>${estadisticas.totalGanado.toFixed(2)}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card bg="dark" text="white">
                <Card.Body>
                  <Card.Title>Total Apostado</Card.Title>
                  <Card.Text>${estadisticas.totalApostado.toFixed(2)}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card bg="dark" text="white">
                <Card.Body>
                  <Card.Title>Tasa de Ganancia</Card.Title>
                  <Card.Text>{estadisticas.tasaGanancia.toFixed(2)}%</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Form className="mb-4">
            <Row>
              <Col md={6}>
                <Form.Group controlId="filtroJuego">
                  <Form.Label>Filtrar por juego</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Nombre del juego"
                    value={filtroJuego} 
                    onChange={(e) => setFiltroJuego(e.target.value)}
                    className="bg-dark text-white"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="filtroFecha">
                  <Form.Label>Filtrar por fecha</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={filtroFecha} 
                    onChange={(e) => setFiltroFecha(e.target.value)}
                    className="bg-dark text-white"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Juego</th>
                <th>Apuesta</th>
                <th>Ganancia</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {filtrarHistorial().map((juego, index) => (
                <tr key={index}>
                  <td>{juego.fecha}</td>
                  <td>{juego.nombre}</td>
                  <td>${juego.apuesta.toFixed(2)}</td>
                  <td>${juego.ganancia.toFixed(2)}</td>
                  <td>{juego.ganancia > juego.apuesta ? 'Ganado' : 'Perdido'}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="primary" onClick={() => navigate('/dashboard-cliente')} className="mt-3">
            Volver al Dashboard
          </Button>
        </Container>
      </section>
    </LayoutClientes>
  );
}

export default HistorialJuegos;