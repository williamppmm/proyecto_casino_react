// Importaciones necesarias
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Logo from '../assets/icons/Logo.svg';

// Definición del componente funcional
function NavigationBar() {
  return (
    // Componente Navbar de react-bootstrap
    <Navbar expand="lg" bg="dark" variant="dark">
      {/* Logo y nombre del casino */}
      <Navbar.Brand href="/">
        <img
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Casino La Fortuna"
        />{' '}
        Casino La Fortuna
      </Navbar.Brand>

      {/* Botón de toggle para dispositivos móviles */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      {/* Contenido de la barra de navegación */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {/* Enlaces de navegación */}
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/quienes-somos">Quiénes somos</Nav.Link>
          <Nav.Link href="/juegos">Juegos</Nav.Link>
          <Nav.Link href="/promociones">Promociones</Nav.Link>
          <Nav.Link href="/contacto">Contacto</Nav.Link>

          {/* Menú desplegable para opciones de cuenta */}
          <NavDropdown title="Cuenta" id="basic-nav-dropdown">
            <NavDropdown.Item href="/registro-cliente">Registro Cliente</NavDropdown.Item>
            <NavDropdown.Item href="/login-cliente">Login Cliente</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/registro-operador">Registro Operador</NavDropdown.Item>
            <NavDropdown.Item href="/login-operador">Login Operador</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

// Exportación del componente
export default NavigationBar;