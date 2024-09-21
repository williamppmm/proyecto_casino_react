// src/pages/PerfilClientes.js

import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LayoutClientes from '../components/LayoutClientes';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

function PerfilClientes() {
  const [cliente, setCliente] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEditConfirmModal, setShowEditConfirmModal] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    passwordActual: false,
    nuevaPassword: false,
    confirmarPassword: false,
    editConfirmPassword: false
  });
  const [passwordData, setPasswordData] = useState({
    passwordActual: '',
    nuevaPassword: '',
    confirmarPassword: '',
    editConfirmPassword: ''
  });
  const [editableFields, setEditableFields] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const clienteId = localStorage.getItem('clienteId');
    if (!clienteId) {
      navigate('/login-cliente');
    } else {
      obtenerPerfilCliente(clienteId);
    }
  }, [navigate]);

  const obtenerPerfilCliente = async (clienteId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/clientes/perfil/${clienteId}`);
      setCliente(response.data);
      // Asignar valores a los campos editables que se esperan en el backend
      setEditableFields({
        telefono_movil: response.data.telefono_movil,
        direccion: response.data.direccion,
        municipio: response.data.municipio
      });
    } catch (error) {
      console.error('Error al obtener el perfil del cliente:', error);
      setMessage({ type: 'danger', text: 'Error al cargar el perfil. Por favor, intenta de nuevo más tarde.' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableFields({ ...editableFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/clientes/actualizar-perfil/${cliente.id_cliente}`,
        editableFields
      );
      setMessage({ type: 'success', text: 'Perfil actualizado exitosamente.' });
      setEditMode(false);
      obtenerPerfilCliente(cliente.id_cliente);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      if (error.response) {
        setMessage({ type: 'danger', text: error.response.data.error || 'Error al actualizar el perfil. Por favor, intenta de nuevo.' });
      } else if (error.request) {
        setMessage({ type: 'danger', text: 'No se recibió respuesta del servidor. Por favor, verifica tu conexión e intenta de nuevo.' });
      } else {
        setMessage({ type: 'danger', text: 'Error al procesar la solicitud. Por favor, intenta de nuevo.' });
      }
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [field]: !passwordVisibility[field]
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.nuevaPassword !== passwordData.confirmarPassword) {
      setMessage({ type: 'danger', text: 'Las contraseñas nuevas no coinciden.' });
      return;
    }
    if (!isPasswordValid(passwordData.nuevaPassword)) {
      setMessage({ type: 'danger', text: 'La nueva contraseña no cumple con los requisitos de seguridad.' });
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/clientes/actualizar-password/${cliente.id_cliente}`, {
        passwordActual: passwordData.passwordActual,
        nuevaPassword: passwordData.nuevaPassword
      });
      setMessage({ type: 'success', text: 'Contraseña actualizada exitosamente.' });
      setShowPasswordModal(false);
      resetPasswordFields(); // Limpiar los campos de la contraseña después de actualizar
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      setMessage({ type: 'danger', text: error.response?.data?.error || 'Error al actualizar la contraseña. Por favor, intenta de nuevo.' });
    }
  };

  const handleEditConfirm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/clientes/verificar-password/${cliente.id_cliente}`, {
        password: passwordData.editConfirmPassword
      });
      if (response.data.isValid) {
        setEditMode(true);
        setShowEditConfirmModal(false);
      } else {
        setMessage({ type: 'danger', text: 'Contraseña incorrecta. No se puede editar el perfil.' });
      }
    } catch (error) {
      console.error('Error al verificar la contraseña:', error);
      setMessage({ type: 'danger', text: 'Error al verificar la contraseña. Por favor, intenta de nuevo.' });
    }
  };

  const resetPasswordFields = () => {
    setPasswordData({
      passwordActual: '',
      nuevaPassword: '',
      confirmarPassword: '',
      editConfirmPassword: ''
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formatIdToHex = (id) => {
    return Number(id).toString(16).toUpperCase().padStart(8, '0');
  };

  const getDocumentType = (type) => {
    switch (type) {
      case 'CC':
        return 'Cédula';
      case 'PA':
        return 'Pasaporte';
      default:
        return type;
    }
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  if (!cliente) {
    return <div>Cargando...</div>;
  }

  return (
    <LayoutClientes>
      <section className="perfil-clientes-section py-5" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
        <Container>
          <h1 className="text-center mb-5" style={{ fontWeight: 'bold' }}>Perfil del Cliente</h1>

          {message && (
            <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
              {message.text}
            </Alert>
          )}

          {/* Datos modificables */}
          <Card bg="dark" text="white" className="mb-4">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono Móvil</Form.Label>
                    <Form.Control
                      type="tel"
                      name="telefono_movil"
                      value={editableFields.telefono_movil}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="bg-dark text-white"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                      type="text"
                      name="direccion"
                      value={editableFields.direccion}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="bg-dark text-white"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Municipio</Form.Label>
                    <Form.Control
                      type="text"
                      name="municipio"
                      value={editableFields.municipio}
                      onChange={handleChange}
                      disabled={!editMode}
                      className="bg-dark text-white"
                    />
                  </Form.Group>
                </Col>
                
                {editMode ? (
                  <Button variant="primary" type="submit" className="me-2">
                    Guardar Cambios
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => setShowEditConfirmModal(true)} className="me-2">
                    Editar Información
                  </Button>
                )}
                {editMode && (
                  <Button variant="secondary" onClick={() => setEditMode(false)}>
                    Cancelar
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>

          {/* Datos visibles pero no modificables */}
          <Card bg="dark" text="white" className="mb-4">
            <Card.Body>
              <Card.Title>Información Personal</Card.Title>
              <Row>
                <Col md={6}>
                  <p><strong>Cliente:</strong> {formatIdToHex(cliente.id_cliente)}</p>
                  <p><strong>{getDocumentType(cliente.tipo_documento)}:</strong> {cliente.numero_documento}</p>
                  <p><strong>Fecha de Expedición:</strong> {formatDate(cliente.fecha_expedicion)}</p>
                  <p><strong>Lugar de Expedición:</strong> {cliente.lugar_expedicion}</p>
                  <p><strong>Fecha de Registro:</strong> {formatDate(cliente.fecha_registro)}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Nombre Completo:</strong> {cliente.primer_nombre} {cliente.segundo_nombre} {cliente.primer_apellido} {cliente.segundo_apellido}</p>
                  <p><strong>Correo Electrónico:</strong> {cliente.correo_electronico}</p>
                  <p><strong>Fecha de Nacimiento:</strong> {formatDate(cliente.fecha_nacimiento)}</p>
                  <p><strong>Género:</strong> {cliente.genero === 'F' ? 'Femenino' : 'Masculino'}</p>
                  <p><strong>Nacionalidad:</strong> {cliente.nacionalidad}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Botón para cambiar la contraseña */}
          <Card bg="dark" text="white" className="mb-4">
            <Card.Body>
              <Card.Title>Cambiar Contraseña</Card.Title>
              <Button variant="warning" onClick={() => setShowPasswordModal(true)} className="me-2">
                Cambiar Contraseña
              </Button>
            </Card.Body>
          </Card>

          {/* Modal para cambiar contraseña */}
          <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Cambiar Contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handlePasswordSubmit}>
                {['passwordActual', 'nuevaPassword', 'confirmarPassword'].map((field) => (
                  <Form.Group className="mb-3" key={field}>
                    <Form.Label>{field === 'passwordActual' ? 'Contraseña Actual' : field === 'nuevaPassword' ? 'Nueva Contraseña' : 'Confirmar Nueva Contraseña'}</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={passwordVisibility[field] ? 'text' : 'password'}
                        name={field}
                        value={passwordData[field]}
                        onChange={handlePasswordChange}
                        required
                      />
                      <Button variant="outline-secondary" onClick={() => togglePasswordVisibility(field)}>
                        {passwordVisibility[field] ? <BsEyeSlash /> : <BsEye />}
                      </Button>
                    </div>
                  </Form.Group>
                ))}
                <p>La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número.</p>
                <Button variant="primary" type="submit">
                  Cambiar Contraseña
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          {/* Modal para confirmar edición de perfil */}
          <Modal show={showEditConfirmModal} onHide={() => setShowEditConfirmModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar Edición de Información</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleEditConfirm}>
                <Form.Group className="mb-3">
                  <Form.Label>Ingrese su contraseña para confirmar la edición</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={passwordVisibility.editConfirmPassword ? 'text' : 'password'}
                      name="editConfirmPassword"
                      value={passwordData.editConfirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <Button variant="outline-secondary" onClick={() => togglePasswordVisibility('editConfirmPassword')}>
                      {passwordVisibility.editConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                    </Button>
                  </div>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Confirmar Edición
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          {/* Botón para volver al dashboard */}
          <Button variant="primary" onClick={() => navigate('/dashboard-cliente')} className="mt-3">
            Volver al Dashboard
          </Button>
        </Container>
      </section>
    </LayoutClientes>
  );
}

export default PerfilClientes;