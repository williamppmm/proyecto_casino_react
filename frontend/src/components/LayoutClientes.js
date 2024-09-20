//  src/components/LayoutClientes.js

import React from 'react';
import NavbarClientes from './NavbarClientes.js'; 
import WhatsAppButton from './WhatsAppButton';

function LayoutClientes({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarClientes />
      <div className="flex-grow-1">
        {children}
      </div>
      <WhatsAppButton />
    </div>
  );
}

export default LayoutClientes;