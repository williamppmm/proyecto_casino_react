// src/pages/Home.js

// 1. Importaciones de bibliotecas externas
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// 2. Importaciones de assets
import Logo from '../assets/icons/Logo.svg';

// Definición del componente funcional Home
function Home() {
  return (
    <section className="home-section d-flex flex-column justify-content-center align-items-center" 
      style={{ backgroundColor: '#000', color: '#fff', height: '100vh' }}>
      <Container className="text-center">
        {/* Logo del casino */}
        <img
          src={Logo}
          alt="Casino La Fortuna"
          style={{ maxWidth: '250px', marginBottom: '20px' }} // Ajuste del tamaño del logo
        />

        {/* Texto principal de bienvenida */}
        <h1 className="mb-4" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Bienvenido a Casino La Fortuna</h1>
        
        {/* Texto descriptivo */}
        <p style={{ fontSize: '1.2rem' }}>Descubre un mundo de emoción y entretenimiento.</p>
        
        {/* Botón de llamada a la acción */}
        <Button variant="primary" as={Link} to="/registro-cliente" size="lg">
          ¡Regístrate ahora!
        </Button>
      </Container>
    </section>
  );
}

// Exportación del componente para su uso en otras partes de la aplicación
export default Home;