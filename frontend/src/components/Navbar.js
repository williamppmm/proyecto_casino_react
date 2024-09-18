// src/components/Navbar.js

// Importaciones de bibliotecas externas
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Logo del sitio (opcional) */}
        <Navbar.Brand as={Link} to="/">
          {/* Aquí puedes añadir el logo */}
          Casino La Fortuna
        </Navbar.Brand>

        {/* Botón de toggle para dispositivos móviles */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Enlaces de navegación */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/quienes-somos">Quiénes somos</Nav.Link>
            <Nav.Link as={Link} to="/juegos">Juegos</Nav.Link>
            <Nav.Link as={Link} to="/promociones">Promociones</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>

          <Nav>
            <NavDropdown title="Cuenta" id="basic-nav-dropdown" align="end">
              {/* Submenú para Clientes */}
              <NavDropdown.Header>Cliente</NavDropdown.Header>
              <NavDropdown.Item as={Link} to="/login-cliente">Iniciar sesión Cliente</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/registro-cliente">Registrarse como Cliente</NavDropdown.Item>

              <NavDropdown.Divider /> {/* Separador entre las secciones */}

              {/* Submenú para Operadores */}
              <NavDropdown.Header>Operador</NavDropdown.Header>
              <NavDropdown.Item as={Link} to="/login-operador">Iniciar sesión Operador</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/registro-operador">Registrarse como Operador</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;