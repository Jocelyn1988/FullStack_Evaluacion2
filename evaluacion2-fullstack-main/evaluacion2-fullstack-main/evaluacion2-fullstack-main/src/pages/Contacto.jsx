import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/contacto.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mensaje enviado:', formData);
    setEnviado(true);

    // Limpia el formulario
    setFormData({
      nombre: '',
      correo: '',
      telefono: '',
      mensaje: ''
    });

    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <>
      <Navbar />

      <main className="container my-5">
        <div className="row g-5 align-items-start">
          
          {/* Columna Izquierda: Información de Contacto */}
          <section className="col-12 col-md-6">
            <span className="badge bg-success-subtle text-success text-uppercase fw-bold px-3 py-2 mb-2">
              Hablemos
            </span>
            <h2 className="display-6 fw-bold mb-3 titulo-contacto">Ponte en contacto</h2>
            <p className="text-secondary mb-4">
              ¿Tienes dudas sobre nuestros productos orgánicos o necesitas asistencia con tu pedido? Escríbenos o visítanos directamente en nuestra tienda.
            </p>

            <div className="d-flex flex-column gap-3 mb-4">
              <div className="d-flex align-items-start">
                <span className="fs-5 me-2">📍</span>
                <div>
                  <strong className="d-block text-dark">Dirección:</strong>
                  <p className="text-muted m-0 small">Av. Principal Huerto Hogar 1234, Santiago, Chile</p>
                </div>
              </div>

              <div className="d-flex align-items-start">
                <span className="fs-5 me-2">📞</span>
                <div>
                  <strong className="d-block text-dark">Teléfono:</strong>
                  <p className="text-muted m-0 small">+56 9 1234 5678</p>
                </div>
              </div>

              <div className="d-flex align-items-start">
                <span className="fs-5 me-2">✉️</span>
                <div>
                  <strong className="d-block text-dark">Correo electrónico:</strong>
                  <p className="text-muted m-0 small">contacto@huertohogar.cl</p>
                </div>
              </div>

              <div className="d-flex align-items-start">
                <span className="fs-5 me-2">⏰</span>
                <div>
                  <strong className="d-block text-dark">Horario de Atención:</strong>
                  <p className="text-muted m-0 small">
                    Lunes a Viernes: 09:00 - 18:00 hrs<br />
                    Sábados: 10:00 - 14:00 hrs
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-md-start">
              <img
                src="/imagenes/logo.jpg"
                alt="Huerto Hogar Tienda"
                className="img-fluid rounded-3 shadow-sm img-contacto-logo"
              />
            </div>
          </section>

          {/* Columna Derecha: Formulario */}
          <section className="col-12 col-md-6">
            <div className="card shadow-sm border-0 p-4 p-md-5 rounded-3 bg-white">
              <h3 className="h4 fw-bold mb-4 titulo-form">Enviarnos un mensaje</h3>

              {enviado && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  ¡Gracias por escribirnos! Te responderemos a la brevedad.
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
                    placeholder="Ej: María González"
                    required
                  />
                </div>

                <div className="mb-3">
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

                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label fw-semibold text-secondary small">
                    Teléfono (opcional)
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+56 9 ..."
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="mensaje" className="form-label fw-semibold text-secondary small">
                    Mensaje
                  </label>
                  <textarea
                    className="form-control"
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-success btn-lg w-100 fw-bold shadow-sm">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}