// src/components/WhatsAppButton.js

import React from 'react';
import { ReactComponent as WhatsAppIcon } from '../assets/icons/WhatsApp.svg';

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/573152728882"
      className="btn btn-success btn-lg position-fixed d-flex align-items-center justify-content-center"
      target="_blank"
      rel="noopener noreferrer"
      title="¿Necesitas ayuda? Chatea con nosotros en WhatsApp"
      style={{ bottom: '40px', right: '40px', width: '60px', height: '60px', borderRadius: '50%', zIndex: 100 }}
    >
      <WhatsAppIcon style={{ width: '30px', height: '30px' }} />
    </a>
  );
}

export default WhatsAppButton;