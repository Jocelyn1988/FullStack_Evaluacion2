import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { datosChile } from '../data/chile';
import '../css/login.css';

export default function RegistrarUsuario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    confirmar_correo: '',
    contrasena: '',
    confirmar_contrasena: '',
    telefono: '',
    region: '',
    comuna: ''
  });

  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === 'region') {
      const comunas = datosChile[value] || [];
      setComunasDisponibles(comunas);
      setFormData((prev) => ({
        ...prev,
        region: value,
        comuna: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const nombre = formData.nombre.trim();
    const correo = formData.correo.trim();
    const confirmarCorreo = formData.confirmar_correo.trim();
    const contrasena = formData.contrasena;
    const confirmarContrasena = formData.confirmar_contrasena;
    const telefono = formData.telefono.trim();
    const { region, comuna } = formData;

    // Validación 1: Coincidencia de correos
    if (correo !== confirmarCorreo) {
      setErrorMsg('Error: Los correos electrónicos no coinciden.');
      return;
    }

    // Validación 2: Coincidencia de contraseñas
    if (contrasena !== confirmarContrasena) {
      setErrorMsg('Error: Las contraseñas no coinciden.');
      return;
    }

    // Validación 3: Largo mínimo de contraseña (6 caracteres)
    if (contrasena.length < 6) {
      setErrorMsg('Error: La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Validación 4: Formato de teléfono chileno (+56 9 XXXX XXXX o 9XXXXXXXX)
    const regexTelefono = /^(\+?56)?(\s?)(9\d{8})$/;
    if (!regexTelefono.test(telefono.replace(/\s+/g, ''))) {
      setErrorMsg('Error: Ingrese un número de teléfono chileno válido (Ej: +56 9 1234 5678 o 912345678).');
      return;
    }

    // Validación 5: Selección de Región y Comuna
    if (!region || !comuna) {
      setErrorMsg('Error: Debes seleccionar una región y una comuna.');
      return;
    }

    // Guardado en localStorage para actualizar la tabla de AdminUsuarios
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios_registrados') || '[]');
    const fechaHoy = new Date().toISOString().split('T')[0];
    const nuevoId = Date.now();
    const nuevoNumeroOrden = `SO${1000 + usuariosGuardados.length + 1}`;

    const nuevoRegistro = {
      id: nuevoId,
      date: fechaHoy,
      order: nuevoNumeroOrden,
      customer: nombre,
      email: correo,
      region: region,
      comuna: comuna,
      telefono: telefono,
      status: "Pendiente",
      amount: "$0"
    };

    usuariosGuardados.unshift(nuevoRegistro);
    localStorage.setItem('usuarios_registrados', JSON.stringify(usuariosGuardados));

    alert('¡Usuario registrado con éxito!');
    navigate('/admin/usuarios');
  };

  return (
    <>
      <Navbar />

      <main className="container my-5 py-4 d-flex justify-content-center align-items-center">
        <div className="card shadow-sm border-0 p-4 p-md-5 rounded-3 bg-white tarjeta-auth-registro" style={{ width: '100%', maxWidth: '600px' }}>
          
          <h2 className="h4 fw-bold text-center mb-4 titulo-auth-verde">NUEVO USUARIO</h2>

          {errorMsg && (
            <div className="alert alert-danger py-2 small mb-4" role="alert">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label fw-semibold text-secondary small">
                Nombre completo
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-12 col-md-6">
                <label htmlFor="correo" className="form-label fw-semibold text-secondary small">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="confirmar_correo" className="form-label fw-semibold text-secondary small">
                  Confirme correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="confirmar_correo"
                  name="confirmar_correo"
                  value={formData.confirmar_correo}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-12 col-md-6">
                <label htmlFor="contrasena" className="form-label fw-semibold text-secondary small">
                  Ingrese la contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="contrasena"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  placeholder="Crea una contraseña"
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="confirmar_contrasena" className="form-label fw-semibold text-secondary small">
                  Confirme la contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmar_contrasena"
                  name="confirmar_contrasena"
                  value={formData.confirmar_contrasena}
                  onChange={handleChange}
                  placeholder="Repite la contraseña"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="telefono" className="form-label fw-semibold text-secondary small">
                Teléfono
              </label>
              <input
                type="tel"
                className="form-control"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+56 9 1234 5678"
                required
              />
            </div>

            <div className="row g-3 mb-4">
              <div className="col-12 col-md-6">
                <label htmlFor="region" className="form-label fw-semibold text-secondary small">
                  Selecciona la región
                </label>
                <select
                  className="form-select"
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una región</option>
                  {Object.keys(datosChile).map((reg) => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label htmlFor="comuna" className="form-label fw-semibold text-secondary small">
                  Selecciona la comuna
                </label>
                <select
                  className="form-select"
                  id="comuna"
                  name="comuna"
                  value={formData.comuna}
                  onChange={handleChange}
                  disabled={!formData.region}
                  required
                >
                  <option value="">
                    {formData.region ? 'Selecciona una comuna' : 'Primero selecciona una región'}
                  </option>
                  {comunasDisponibles.map((com) => (
                    <option key={com} value={com}>{com}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex gap-3">
              <button
                type="button"
                className="btn btn-outline-secondary w-50 fw-semibold"
                onClick={() => navigate('/admin/usuarios')}
              >
                Volver
              </button>
              <button type="submit" className="btn btn-success w-50 fw-bold shadow-sm">
                REGISTRAR
              </button>
            </div>
          </form>

        </div>
      </main>

      <Footer />
    </>
  );
}