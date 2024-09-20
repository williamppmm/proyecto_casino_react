// src/components/Footer.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Importación de los iconos de redes sociales
import FacebookIcon from '../assets/icons/Facebook.svg';
import InstagramIcon from '../assets/icons/Instagram.svg';
import LinkedInIcon from '../assets/icons/LinkedIn.svg';
import TwitterIcon from '../assets/icons/Twitter.svg';

function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <Row>
          {/* Columna izquierda con la información del Casino */}
          <Col md={4}>
            <h5>Casino la Fortuna</h5>
            <p>© 2024 Derechos reservados</p>
            <p>Diseñado por CaliByte</p>
            <p><a href="mailto:info@calibyte.com.co" className="text-light">info@calibyte.com.co</a></p>
          </Col>

          {/* Columna central con los apartados legales */}
          <Col md={4}>
            <h5>Apartados Legales</h5>
            <ul className="list-unstyled">
              <li><a href="/politicas" className="text-light">Políticas</a></li>
              <li><a href="/terminos" className="text-light">Términos y Condiciones</a></li>
              <li><a href="/privacidad" className="text-light">Aviso de Privacidad</a></li>
              <li><a href="/juego-responsable" className="text-light">Juego Responsable</a></li>
            </ul>
          </Col>

          {/* Columna derecha con las redes sociales y promoción */}
          <Col md={4}>
            <h5>Síguenos</h5>
            <p>Participa en grandes sorteos y entérate de promociones y novedades.</p>
            <div className="social-icons mb-3">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="me-2">
                <img src={FacebookIcon} alt="Facebook" style={{ width: '30px' }} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="me-2">
                <img src={InstagramIcon} alt="Instagram" style={{ width: '30px' }} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="me-2">
                <img src={LinkedInIcon} alt="LinkedIn" style={{ width: '30px' }} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={TwitterIcon} alt="Twitter" style={{ width: '30px' }} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;