// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RegistroClientes from './pages/RegistroClientes';
import LoginClientes from './pages/LoginClientes';
import DashboardClientes from './pages/DashboardClientes';
import QuienesSomos from './pages/QuienesSomos';
import Juegos from './pages/Juegos';
import Promociones from './pages/Promociones';
import Contacto from './pages/Contacto';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-cliente" element={<LoginClientes />} />
        <Route path="/registro-cliente" element={<RegistroClientes />} />
        <Route path="/dashboard-cliente" element={<DashboardClientes />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/promociones" element={<Promociones />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <WhatsAppButton />
      <Footer />
    </Router>
  );
}

export default App;