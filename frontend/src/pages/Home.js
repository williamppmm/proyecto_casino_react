// Importaciones necesarias
import React from 'react';
// Importación de componentes de react-bootstrap para el diseño
import { Container, Row, Col, Button } from 'react-bootstrap';
// Importación del logo del casino
import Logo from '../assets/icons/Logo.svg';

// Definición del componente funcional Home
function Home() {
  return (
    // Sección principal con clases para centrar el texto y añadir margen
    <section className="text-center my-5">
      {/* Contenedor Bootstrap para un diseño responsive */}
      <Container>
        {/* Logo del casino */}
        <img 
          src={Logo} 
          alt="Casino La Fortuna" 
          className="mb-4" // Clase para añadir margen inferior
          style={{ maxWidth: '200px' }} // Estilo en línea para limitar el tamaño máximo
        />
        
        {/* Título principal de bienvenida */}
        <h1>Bienvenido a Casino La Fortuna</h1>
        
        {/* Breve descripción o eslogan */}
        <p>Descubre un mundo de emoción y entretenimiento.</p>
        
        {/* Botón de llamada a la acción para registro */}
        <Button 
          variant="danger" // Variante de color rojo para el botón
          href="/registro-cliente" // Enlace a la página de registro
        >
          ¡Regístrate ahora!
        </Button>
      </Container>
    </section>
  );
}

// Exportación del componente para su uso en otras partes de la aplicación
export default Home;