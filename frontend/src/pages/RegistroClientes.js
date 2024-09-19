// src/pages/RegistroClientes.js

import React, { useState, useRef } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

// Función auxiliar para eliminar acentos
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function RegistroClientes() {
  const initialFormData = {
    tipo_documento: '',
    numero_documento: '',
    fecha_expedicion: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    lugar_expedicion: '',
    correo_electronico: '',
    telefono_movil: '',
    user_pass: '',
    confirm_password: '',
    fecha_nacimiento: '',
    genero: '',
    nacionalidad: '',
    direccion: '',
    municipio: '',
    interdicto: 'no',
    pep: 'no',
    consentimiento_datos: false,
    comunicaciones_comerciales: false,
    terminos_condiciones: false,
    captcha: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const successMessageRef = useRef(null);

  const normalizeFormData = (data) => {
    const upperCaseFields = ['primer_nombre', 'segundo_nombre', 'primer_apellido', 'segundo_apellido', 'lugar_expedicion', 'direccion', 'municipio', 'nacionalidad'];
    
    return Object.keys(data).reduce((acc, key) => {
      if (typeof data[key] === 'string') {
        if (upperCaseFields.includes(key)) {
          acc[key] = removeAccents(data[key].toUpperCase());
        } else if (key === 'correo_electronico') {
          acc[key] = removeAccents(data[key].toLowerCase()).replace(/ñ/g, 'n');
        } else {
          acc[key] = removeAccents(data[key]);
        }
      } else {
        acc[key] = data[key];
      }
      return acc;
    }, {});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setShowSuccess(false);

    if (formData.user_pass !== formData.confirm_password) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    const normalizedData = normalizeFormData(formData);

    axios.post('http://localhost:5000/api/clientes/registro', normalizedData)
      .then((response) => {
        setShowSuccess(true);
        if (successMessageRef.current) {
          successMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/login-cliente');
        }, 3000);
      })
      .catch((error) => {
        console.error('Error al registrar cliente:', error);
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Error en el registro. Por favor, intenta de nuevo.');
        }
      });
  };

  return (
    <section className="registro-clientes-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <Container>
        <h1 className="text-center mb-5" style={{ color: '#fff', fontWeight: 'bold' }}>Registro de Clientes</h1>

        <Card className="bg-dark text-white">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="tipoDocumento" className="mb-3">
                    <Form.Label>Tipo de Documento</Form.Label>
                    <Form.Select name="tipo_documento" value={formData.tipo_documento} onChange={handleChange} required className="bg-dark text-white">
                      <option value="">Selecciona...</option>
                      <option value="CC">Cédula</option>
                      <option value="TI">Tarjeta de Identidad</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="numeroDocumento" className="mb-3">
                    <Form.Label>Número de Documento</Form.Label>
                    <Form.Control type="text" name="numero_documento" value={formData.numero_documento} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="fechaExpedicion" className="mb-3">
                    <Form.Label>Fecha de Expedición</Form.Label>
                    <Form.Control type="date" name="fecha_expedicion" value={formData.fecha_expedicion} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="lugarExpedicion" className="mb-3">
                    <Form.Label>Lugar de Expedición</Form.Label>
                    <Form.Control type="text" name="lugar_expedicion" value={formData.lugar_expedicion} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="primerNombre" className="mb-3">
                    <Form.Label>Primer Nombre</Form.Label>
                    <Form.Control type="text" name="primer_nombre" value={formData.primer_nombre} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="segundoNombre" className="mb-3">
                    <Form.Label>Segundo Nombre</Form.Label>
                    <Form.Control type="text" name="segundo_nombre" value={formData.segundo_nombre} onChange={handleChange} className="bg-dark text-white" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="primerApellido" className="mb-3">
                    <Form.Label>Primer Apellido</Form.Label>
                    <Form.Control type="text" name="primer_apellido" value={formData.primer_apellido} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="segundoApellido" className="mb-3">
                    <Form.Label>Segundo Apellido</Form.Label>
                    <Form.Control type="text" name="segundo_apellido" value={formData.segundo_apellido} onChange={handleChange} className="bg-dark text-white" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="correoElectronico" className="mb-3">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" name="correo_electronico" value={formData.correo_electronico} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="telefonoMovil" className="mb-3">
                    <Form.Label>Teléfono Móvil</Form.Label>
                    <Form.Control type="tel" name="telefono_movil" value={formData.telefono_movil} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="user_pass" className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="user_pass"
                        value={formData.user_pass}
                        onChange={handleChange}
                        required
                        className="bg-dark text-white"
                      />
                      <Button variant="outline-light" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="confirm_password" className="mb-3">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        required
                        className="bg-dark text-white"
                      />
                      <Button variant="outline-light" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="fechaNacimiento" className="mb-3">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="genero" className="mb-3">
                    <Form.Label>Género</Form.Label>
                    <Form.Select name="genero" value={formData.genero} onChange={handleChange} required className="bg-dark text-white">
                      <option value="">Selecciona...</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                      <option value="O">Otro</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="nacionalidad" className="mb-3">
                    <Form.Label>Nacionalidad</Form.Label>
                    <Form.Control type="text" name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="direccion" className="mb-3">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" name="direccion" value={formData.direccion} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="municipio" className="mb-3">
                    <Form.Label>Municipio</Form.Label>
                    <Form.Control type="text" name="municipio" value={formData.municipio} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="interdicto" className="mb-3">
                    <Form.Label>Interdicto</Form.Label>
                    <Form.Select name="interdicto" value={formData.interdicto} onChange={handleChange} required className="bg-dark text-white">
                      <option value="no">No</option>
                      <option value="yes">Sí</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="pep" className="mb-3">
                    <Form.Label>PEP (Persona Expuesta Políticamente)</Form.Label>
                    <Form.Select name="pep" value={formData.pep} onChange={handleChange} required className="bg-dark text-white">
                      <option value="no">No</option>
                      <option value="yes">Sí</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="consentimiento_datos" className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="consentimiento_datos"
                  label="Consentimiento para el tratamiento de datos"
                  checked={formData.consentimiento_datos}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="comunicaciones_comerciales" className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="comunicaciones_comerciales"
                  label="Recibir comunicaciones comerciales"
                  checked={formData.comunicaciones_comerciales}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="terminos_condiciones" className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="terminos_condiciones"
                  label="Aceptar términos y condiciones"
                  checked={formData.terminos_condiciones}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {errorMessage && (
                <Alert variant="danger" className="mt-3">
                  {errorMessage}
                </Alert>
              )}

              <Button variant="primary" type="submit" className="w-100 mt-4">
                Registrarse
              </Button>
              
              {/* Mostrar mensaje de éxito cuando el registro es exitoso */}
              {showSuccess && (
                <Alert variant="success" className="mb-4">
                  Registro exitoso. Redirigiendo al login...
                </Alert>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

// Exportación del componente
export default RegistroClientes;