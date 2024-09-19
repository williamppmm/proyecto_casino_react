//  src/pages/RegistroClientes.js

// Importaciones necesarias
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Modal, Card } from 'react-bootstrap';
import axios from 'axios';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

// Componente principal de Registro de Clientes
function RegistroClientes() {
  // Estado inicial del formulario
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

  // Estados del componente
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Manejador de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.user_pass !== formData.confirm_password) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Envío de datos al servidor
    axios
      .post('http://localhost:5000/api/clientes/registro', formData)
      .then((response) => {
        setShowModal(true);
        setFormData(initialFormData); // Limpiar el formulario después de un registro exitoso
      })
      .catch((error) => {
        console.error('Error al registrar cliente:', error);
        alert('Error en el registro');
      });
  };

  // Manejador para cerrar el modal y redirigir al login
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/login-cliente');
  };

  // Renderizado del componente
  return (
    <section className="registro-clientes-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <Container>
        <h1 className="text-center mb-5" style={{ color: '#fff', fontWeight: 'bold' }}>Registro de Clientes</h1>
        
        <Card className="bg-dark text-white">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="tipoDocumento">
                    <Form.Label>Tipo de Documento</Form.Label>
                    <Form.Select name="tipo_documento" value={formData.tipo_documento} onChange={handleChange} required className="bg-dark text-white">
                      <option value="">Selecciona...</option>
                      <option value="CC">Cédula</option>
                      <option value="TI">Tarjeta de Identidad</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="numeroDocumento">
                    <Form.Label>Número de Documento</Form.Label>
                    <Form.Control type="text" name="numero_documento" value={formData.numero_documento} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="fechaExpedicion">
                    <Form.Label>Fecha de Expedición</Form.Label>
                    <Form.Control type="date" name="fecha_expedicion" value={formData.fecha_expedicion} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="lugarExpedicion">
                    <Form.Label>Lugar de Expedición</Form.Label>
                    <Form.Control type="text" name="lugar_expedicion" value={formData.lugar_expedicion} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="primerNombre">
                    <Form.Label>Primer Nombre</Form.Label>
                    <Form.Control type="text" name="primer_nombre" value={formData.primer_nombre} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="segundoNombre">
                    <Form.Label>Segundo Nombre</Form.Label>
                    <Form.Control type="text" name="segundo_nombre" value={formData.segundo_nombre} onChange={handleChange} className="bg-dark text-white" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="primerApellido">
                    <Form.Label>Primer Apellido</Form.Label>
                    <Form.Control type="text" name="primer_apellido" value={formData.primer_apellido} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="segundoApellido">
                    <Form.Label>Segundo Apellido</Form.Label>
                    <Form.Control type="text" name="segundo_apellido" value={formData.segundo_apellido} onChange={handleChange} className="bg-dark text-white" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="correoElectronico">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control type="email" name="correo_electronico" value={formData.correo_electronico} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="telefonoMovil">
                    <Form.Label>Teléfono Móvil</Form.Label>
                    <Form.Control type="tel" name="telefono_movil" value={formData.telefono_movil} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="user_pass">
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
                      <Button 
                        variant="outline-light"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="confirm_password">
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
                      <Button 
                        variant="outline-light"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="fechaNacimiento">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="genero">
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
                  <Form.Group className="mb-3" controlId="nacionalidad">
                    <Form.Label>Nacionalidad</Form.Label>
                    <Form.Control type="text" name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="direccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" name="direccion" value={formData.direccion} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="municipio">
                    <Form.Label>Municipio</Form.Label>
                    <Form.Control type="text" name="municipio" value={formData.municipio} onChange={handleChange} required className="bg-dark text-white" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="interdicto">
                    <Form.Label>Interdicto</Form.Label>
                    <Form.Select name="interdicto" value={formData.interdicto} onChange={handleChange} required className="bg-dark text-white">
                      <option value="no">No</option>
                      <option value="si">Sí</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="pep">
                    <Form.Label>PEP (Persona Expuesta Políticamente)</Form.Label>
                    <Form.Select name="pep" value={formData.pep} onChange={handleChange} required className="bg-dark text-white">
                      <option value="no">No</option>
                      <option value="si">Sí</option>
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

              <Button variant="primary" type="submit" className="w-100 mt-4">
                Registrarse
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registro Exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tu registro se ha completado con éxito.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Iniciar Sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

// Exportación del componente para su uso en otras partes de la aplicación
export default RegistroClientes;