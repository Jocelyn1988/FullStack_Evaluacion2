import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row g-4 pb-4 border-bottom border-secondary">
          <div className="col-12 col-md-4">
            <h3 className="h5 text-success">Huerto Hogar</h3>
            <p className="text-secondary small">
              Productos frescos y naturales directo del campo a tu mesa.
            </p>
          </div>

          <div className="col-12 col-md-4">
            <h4 className="h6 text-uppercase fw-bold mb-3">Navegación</h4>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/productos" className="text-secondary text-decoration-none">Productos</Link></li>
              <li className="mb-2"><Link to="/nosotros" className="text-secondary text-decoration-none">Nosotros</Link></li>
              <li className="mb-2"><Link to="/contacto" className="text-secondary text-decoration-none">Contacto</Link></li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h4 className="h6 text-uppercase fw-bold mb-3">Contacto</h4>
            <p className="text-secondary small mb-1">📍 Santiago, Chile</p>
            <p className="text-secondary small mb-1">📞 +56 9 1234 5678</p>
            <p className="text-secondary small mb-1">✉️ contacto@huertohogar.cl</p>
          </div>
        </div>

        <div className="text-center pt-3">
          <p className="text-secondary small m-0">
            &copy; 2026 Huerto Hogar. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}