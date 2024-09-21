//  src/pages/DashboardClientes.js

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LayoutClientes from '../components/LayoutClientes';
import axios from 'axios';

function DashboardClientes() {
  const [cliente, setCliente] = useState(null);
  const navigate = useNavigate();

  // Función para obtener los datos del cliente
  const obtenerPerfilCliente = async () => {
    const clienteId = localStorage.getItem('clienteId');
    if (clienteId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/clientes/perfil/${clienteId}`);
        setCliente(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del cliente:', error);
      }
    }
  };

  useEffect(() => {
    const clienteId = localStorage.getItem('clienteId');
    if (!clienteId) {
      // Redirigir al login si no hay clienteId en localStorage
      navigate('/login-cliente');
    } else {
      obtenerPerfilCliente();
    }
  }, [navigate]);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('clienteId');
    navigate('/login-cliente');
  };

  return (
    <LayoutClientes>
      <section className="dashboard-clientes-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
        <Container>
          <h1 className="text-center mb-5" style={{ color: '#fff', fontWeight: 'bold' }}>
            Bienvenido al Dashboard de Clientes
          </h1>

          {/* Mostrar mensaje de bienvenida con el nombre del cliente */}
          {cliente ? (
            <div className="mb-4 text-center" style={{ color: '#fff' }}>
              <h2>{cliente.primer_nombre} {cliente.primer_apellido}, prepárate para vivir momentos inolvidables!</h2>
            </div>
          ) : (
            <p className="text-center text-light">Cargando datos del cliente...</p>
          )}
          
          <Row className="mb-4">
            <Col md={4}>
              <Card className="bg-dark text-white">
                <Card.Body>
                  <Card.Title>Perfil</Card.Title>
                  <Card.Text>
                    Ver y actualizar información personal
                  </Card.Text>
                  <Button variant="primary" className="w-100" onClick={() => navigate('/perfil-cliente')}>
                    Acceder
                  </Button>
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
                  <Button variant="primary" className="w-100" onClick={() => navigate('/historial-juegos')}>
                    Acceder
                  </Button>
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
                  <Button variant="primary" className="w-100" onClick={() => navigate('/promociones')}>
                    Acceder
                  </Button>
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
                  <Button variant="primary" className="w-100" onClick={() => navigate('/transacciones-clientes')}>
                    Acceder
                  </Button>
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
                  <Button variant="primary" className="w-100" onClick={() => navigate('/soporte')}>
                    Acceder
                  </Button>
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
                  <Button variant="danger" className="w-100" onClick={handleLogout}>
                    Cerrar Sesión
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </LayoutClientes>
  );
}

export default DashboardClientes;