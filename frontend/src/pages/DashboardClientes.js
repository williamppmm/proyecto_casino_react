// src/pages/DashboardClientes.js

// Importaciones necesarias
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Componente principal del Dashboard de Clientes
function DashboardClientes() {
  const navigate = useNavigate();

  // Manejador para cerrar sesión
  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión (como eliminar tokens o datos del cliente)
    navigate('/login-cliente'); // Redirigir al login
  };

  return (
    <section className="dashboard-clientes-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <Container>
        <h1 className="text-center mb-5" style={{ color: '#fff', fontWeight: 'bold' }}>Bienvenido al Dashboard de Clientes</h1>

        <Row className="mb-4">
          <Col md={4}>
            <Card className="bg-dark text-white">
              <Card.Body>
                <Card.Title>Perfil</Card.Title>
                <Card.Text>
                  Ver y actualizar información personal
                </Card.Text>
                <Button variant="primary" className="w-100">Acceder</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="bg-dark text-white">
              <Card.Body>
                <Card.Title>Historial de Juegos</Card.Title>
                <Card.Text>
                  Consultar el historial de juegos y apuestas
                </Card.Text>
                <Button variant="primary" className="w-100">Acceder</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="bg-dark text-white">
              <Card.Body>
                <Card.Title>Promociones</Card.Title>
                <Card.Text>
                  Ver promociones y bonos disponibles
                </Card.Text>
                <Button variant="primary" className="w-100">Acceder</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Card className="bg-dark text-white">
              <Card.Body>
                <Card.Title>Mis Transacciones</Card.Title>
                <Card.Text>
                  Ver el historial de transacciones y pagos
                </Card.Text>
                <Button variant="primary" className="w-100">Acceder</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="bg-dark text-white">
              <Card.Body>
                <Card.Title>Soporte</Card.Title>
                <Card.Text>
                  Contactar al soporte técnico o atención al cliente
                </Card.Text>
                <Button variant="primary" className="w-100">Acceder</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="bg-dark text-white">
              <Card.Body>
                <Card.Title>Cerrar Sesión</Card.Title>
                <Card.Text>
                  Cerrar tu sesión actual
                </Card.Text>
                <Button variant="danger" className="w-100" onClick={handleLogout}>Cerrar Sesión</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

// Exportación del componente
export default DashboardClientes;