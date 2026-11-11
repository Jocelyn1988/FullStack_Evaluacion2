import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Checkout() {
  const navigate = useNavigate();

  const [items] = useState(() => {
    const guardados = localStorage.getItem('carrito');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [formData, setFormData] = useState({
    nombreTitular: '',
    numeroTarjeta: '',
    mesExpiracion: '',
    anioExpiracion: '',
    cvv: '',
    simularFallo: false
  });

  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const costoEnvio = items.length > 0 ? 3000 : 0;
  const total = subtotal + costoEnvio;

  // Manejo con filtros estrictos de entrada
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrorMsg('');

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    // 1. Solo texto (letras, espacios y tildes)
    if (name === 'nombreTitular') {
      const soloTexto = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
      setFormData((prev) => ({ ...prev, [name]: soloTexto }));
      return;
    }

    // 2. Número de tarjeta: solo dígitos, máx 16, formateado con espacios cada 4 dígitos
    if (name === 'numeroTarjeta') {
      const soloDigitos = value.replace(/\D/g, '').slice(0, 16);
      const formateado = soloDigitos.replace(/(\d{4})(?=\d)/g, '$1 ');
      setFormData((prev) => ({ ...prev, [name]: formateado }));
      return;
    }

    // 3. Mes: solo 2 dígitos (entre 01 y 12)
    if (name === 'mesExpiracion') {
      const soloDigitos = value.replace(/\D/g, '').slice(0, 2);
      if (soloDigitos === '' || (Number(soloDigitos) <= 12 && Number(soloDigitos) >= 0)) {
        setFormData((prev) => ({ ...prev, [name]: soloDigitos }));
      }
      return;
    }

    // 4. Año: solo 2 dígitos
    if (name === 'anioExpiracion') {
      const soloDigitos = value.replace(/\D/g, '').slice(0, 2);
      setFormData((prev) => ({ ...prev, [name]: soloDigitos }));
      return;
    }

    // 5. CVV: solo dígitos (máximo 4 caracteres)
    if (name === 'cvv') {
      const soloDigitos = value.replace(/\D/g, '').slice(0, 4);
      setFormData((prev) => ({ ...prev, [name]: soloDigitos }));
      return;
    }
  };

  const handleProcesarPago = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const tarjetaLimpia = formData.numeroTarjeta.replace(/\s/g, '');
    if (tarjetaLimpia.length < 16) {
      setErrorMsg('El número de tarjeta debe tener 16 dígitos.');
      return;
    }

    if (formData.mesExpiracion.length < 2 || Number(formData.mesExpiracion) < 1 || Number(formData.mesExpiracion) > 12) {
      setErrorMsg('Ingrese un mes de expiración válido (01 a 12).');
      return;
    }

    if (formData.anioExpiracion.length < 2) {
      setErrorMsg('Ingrese los 2 dígitos del año de vencimiento.');
      return;
    }

    if (formData.cvv.length < 3) {
      setErrorMsg('El código CVV debe tener al menos 3 dígitos.');
      return;
    }

    // Simulación del flujo de pago
    if (formData.simularFallo) {
      navigate('/pago_error');
    } else {
      const ordenId = `HH-${Math.floor(100000 + Math.random() * 900000)}`;
      
      localStorage.removeItem('carrito');
      window.dispatchEvent(new Event('carritoActualizado'));

      navigate('/pago_exitoso', { state: { ordenId, total } });
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="container my-5 text-center py-5">
          <h2 className="h4 text-muted mb-3">No hay productos por pagar</h2>
          <Link to="/productos" className="btn btn-success fw-semibold">
            Ir al catálogo
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container my-5">
        <h1 className="h2 fw-bold text-dark mb-4">Finalizar Compra</h1>

        {errorMsg && (
          <div className="alert alert-danger py-2 small mb-4" role="alert">
            ⚠️ {errorMsg}
          </div>
        )}

        <div className="row g-4">
          {/* Formulario de Pago */}
          <div className="col-12 col-lg-7">
            <div className="card shadow-sm border-0 p-4 bg-white rounded-3">
              <h2 className="h5 fw-bold mb-3 text-success">Datos de la Tarjeta</h2>

              <form onSubmit={handleProcesarPago}>
                {/* Nombre: Solo Texto */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">
                    Nombre del titular
                  </label>
                  <input
                    type="text"
                    name="nombreTitular"
                    className="form-control"
                    placeholder="Como aparece en la tarjeta"
                    value={formData.nombreTitular}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                    Solo letras y espacios.
                  </small>
                </div>

                {/* Número: Solo Números */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">
                    Número de tarjeta
                  </label>
                  <input
                    type="text"
                    name="numeroTarjeta"
                    className="form-control"
                    placeholder="1234 5678 9012 3456"
                    value={formData.numeroTarjeta}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                    16 dígitos numéricos.
                  </small>
                </div>

                {/* Vencimiento y CVV: Solo Números */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Vencimiento (MM/AA)
                    </label>
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        name="mesExpiracion"
                        className="form-control text-center"
                        placeholder="MM"
                        value={formData.mesExpiracion}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="text"
                        name="anioExpiracion"
                        className="form-control text-center"
                        placeholder="AA"
                        value={formData.anioExpiracion}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <label className="form-label small fw-semibold text-secondary">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      name="cvv"
                      className="form-control text-center"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Switch de prueba para Error */}
                <div className="form-check form-switch mb-4 p-3 bg-light rounded border">
                  <input
                    className="form-check-input ms-0 me-2"
                    type="checkbox"
                    id="simularFallo"
                    name="simularFallo"
                    checked={formData.simularFallo}
                    onChange={handleChange}
                  />
                  <label className="form-check-label small fw-semibold text-dark" htmlFor="simularFallo">
                    Simular rechazo de tarjeta (para probar "PAGO CON ERROR")
                  </label>
                </div>

                <button type="submit" className="btn btn-success btn-lg w-100 fw-bold shadow-sm">
                  Pagar ${total.toLocaleString('es-CL')}
                </button>
              </form>
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="col-12 col-lg-5">
            <div className="card shadow-sm border-0 p-4 bg-white rounded-3">
              <h2 className="h5 fw-bold mb-3 text-dark">Resumen del Pedido</h2>
              <ul className="list-group list-group-flush mb-3">
                {items.map((it) => (
                  <li key={it.id} className="list-group-item d-flex justify-content-between align-items-center px-0 small">
                    <div>
                      <strong>{it.nombre}</strong>
                      <span className="text-muted d-block">{it.cantidad} unidad(es)</span>
                    </div>
                    <span className="fw-semibold">
                      ${(it.precio * it.cantidad).toLocaleString('es-CL')}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between mb-2 text-secondary small">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString('es-CL')}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 text-secondary small">
                <span>Envío:</span>
                <span>${costoEnvio.toLocaleString('es-CL')}</span>
              </div>
              <hr className="my-2" />
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Total:</span>
                <span className="fs-5 fw-bold text-success">${total.toLocaleString('es-CL')}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}