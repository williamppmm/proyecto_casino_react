//  src/pages/TransaccionesClientes.js

import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LayoutClientes from '../components/LayoutClientes';

function TransaccionesClientes() {
  // Estado para almacenar las transacciones
  const [transacciones, setTransacciones] = useState([]);
  // Estado para los filtros
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const navigate = useNavigate();

  // Hook para obtener transacciones al cargar el componente
  useEffect(() => {
    const clienteId = localStorage.getItem('clienteId');
    // Si no hay clienteId, redirigir al login
    if (!clienteId) {
      navigate('/login-cliente');
    } else {
      obtenerTransacciones(clienteId); // Obtener las transacciones si el cliente está autenticado
    }
  }, [navigate]);

  // Función para obtener las transacciones desde la API
  const obtenerTransacciones = async (clienteId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/clientes/transacciones/${clienteId}`);
      setTransacciones(response.data); // Guardar las transacciones en el estado
    } catch (error) {
      console.error('Error al obtener las transacciones:', error);
    }
  };

  // Función para filtrar transacciones por fecha y tipo
  const filtrarTransacciones = () => {
    return transacciones.filter(transaccion => {
      return (filtroFecha === '' || transaccion.fecha.includes(filtroFecha)) &&
             (filtroTipo === '' || transaccion.tipo === filtroTipo);
    });
  };

  return (
    <LayoutClientes>
      <section className="transacciones-clientes-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
        <Container>
          <h1 className="text-center mb-5">Mis Transacciones</h1>
          
          {/* Filtros por fecha y tipo de transacción */}
          <Form className="mb-4">
            <Row>
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
              <Col md={6}>
                <Form.Group controlId="filtroTipo">
                  <Form.Label>Filtrar por tipo</Form.Label>
                  <Form.Control 
                    as="select" 
                    value={filtroTipo} 
                    onChange={(e) => setFiltroTipo(e.target.value)}
                    className="bg-dark text-white"
                  >
                    <option value="">Todos</option>
                    <option value="deposito">Depósito</option>
                    <option value="retiro">Retiro</option>
                    <option value="apuesta">Apuesta</option>
                    <option value="ganancia">Ganancia</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>

          {/* Mostrar transacciones o mensaje si no hay */}
          {transacciones.length === 0 ? (
            <p className="text-light text-center">No se encontraron transacciones.</p>
          ) : (
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Monto</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {filtrarTransacciones().map((transaccion, index) => (
                  <tr key={index}>
                    <td>{transaccion.fecha}</td>
                    <td>{transaccion.tipo}</td>
                    <td>${transaccion.monto.toFixed(2)}</td>
                    <td>{transaccion.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* Botón para volver al dashboard */}
          <Button variant="primary" onClick={() => navigate('/dashboard-cliente')} className="mt-3">
            Volver al Dashboard
          </Button>
        </Container>
      </section>
    </LayoutClientes>
  );
}

export default TransaccionesClientes;