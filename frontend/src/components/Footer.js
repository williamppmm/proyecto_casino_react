// src/components/Footer.js

import React from 'react';
import { Container } from 'react-bootstrap';

// Importación de los iconos de redes sociales
import FacebookIcon from '../assets/icons/Facebook.svg';
import InstagramIcon from '../assets/icons/Instagram.svg';
import LinkedlnIcon from '../assets/icons/LinkedIn.svg';
import TwitterIcon from '../assets/icons/Twitter.svg';

function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container className="text-center">
        <div className="social-icons mb-3">
          {/* Enlaces a redes sociales */}
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={FacebookIcon} alt="Facebook" className="mx-2" style={{ width: '30px' }} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={InstagramIcon} alt="Instagram" className="mx-2" style={{ width: '30px' }} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src={LinkedlnIcon} alt="LinkedIn" className="mx-2" style={{ width: '30px' }} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={TwitterIcon} alt="Twitter" className="mx-2" style={{ width: '30px' }} />
          </a>
        </div>
        <p>© 2024 Casino La Fortuna. Todos los derechos reservados - Diseñado por CaliByte. </p> 
          <a href="mailto:info@calibyte.com.co">info@calibyte.com.co </a>
      </Container>
    </footer>
  );
}

export default Footer;