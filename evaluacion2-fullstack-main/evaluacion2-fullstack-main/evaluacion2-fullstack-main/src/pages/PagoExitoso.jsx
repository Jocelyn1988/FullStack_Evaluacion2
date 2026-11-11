import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PagoExitoso() {
  const location = useLocation();
  const ordenId = location.state?.ordenId || 'HH-749201';
  const total = location.state?.total || 0;

  return (
    <>
      <Navbar />
      <main className="container my-5 py-5 text-center">
        <div className="card shadow-sm border-0 p-5 mx-auto bg-white rounded-3" style={{ maxWidth: '600px' }}>
          <div className="display-1 text-success mb-3">✅</div>
          <h1 className="h2 fw-bold text-dark mb-2">¡PAGO CORRECTO!</h1>
          <p className="text-secondary mb-4">
            Tu compra ha sido procesada exitosamente en Huerto Hogar.
          </p>

          <div className="bg-light p-3 rounded-3 mb-4 text-start small">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">N° de Orden:</span>
              <strong className="text-dark">{ordenId}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Total pagado:</span>
              <strong className="text-success">${total.toLocaleString('es-CL')}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">Estado del pedido:</span>
              <span className="badge bg-success-subtle text-success">En proceso</span>
            </div>
          </div>

          <div className="d-flex gap-2 justify-content-center">
            <Link to="/" className="btn btn-outline-secondary fw-semibold">
              Volver al Inicio
            </Link>
            <Link to="/productos" className="btn btn-success fw-bold">
              Seguir Comprando
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}