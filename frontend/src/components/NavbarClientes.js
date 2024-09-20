//  src/components/NavbarClientes

import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

// Función para formatear el tiempo en hh:mm:ss
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

function NavbarClientes() {
  const [sessionTime, setSessionTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSessionTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('clienteId');
    navigate('/login-cliente');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavDropdown title="Mi Cuenta" id="basic-nav-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/perfil-cliente">Mi Perfil</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
            <Navbar.Text className="ms-3">
              Sesión: {formatTime(sessionTime)}
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarClientes;