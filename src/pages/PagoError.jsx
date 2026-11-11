import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PagoError() {
  return (
    <>
      <Navbar />
      <main className="container my-5 py-5 text-center">
        <div className="card shadow-sm border-0 p-5 mx-auto bg-white rounded-3" style={{ maxWidth: '600px' }}>
          <div className="display-1 text-danger mb-3">❌</div>
          <h1 className="h2 fw-bold text-dark mb-2">PAGO CON ERROR</h1>
          <p className="text-secondary mb-4">
            No se pudo completar la transacción. La entidad bancaria rechazó la operación o los datos ingresados son incorrectos.
          </p>

          <div className="alert alert-danger py-2 small mb-4" role="alert">
            Motivo: Fondos insuficientes o código de seguridad inválido.
          </div>

          <div className="d-flex gap-2 justify-content-center">
            <Link to="/carrito" className="btn btn-outline-secondary fw-semibold">
              Revisar Carrito
            </Link>
            <Link to="/checkout" className="btn btn-danger fw-bold">
              Reintentar Pago
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}