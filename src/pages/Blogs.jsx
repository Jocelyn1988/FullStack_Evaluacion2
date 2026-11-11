import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/blogs.css';

export default function Blogs() {
  return (
    <>
      <Navbar />

      <main className="container my-5 py-5 d-flex justify-content-center align-items-center">
        <div className="card shadow-sm border p-4 p-md-5 text-center tarjeta-proximamente">
          <div className="display-3 mb-3">📝</div>
          
          <h2 className="fw-bold mb-2 titulo-proximamente">Sección de Blogs</h2>
          
          <div className="mb-3">
            <span className="badge rounded-pill px-3 py-2 fs-6 badge-proximamente">
              ¡Próximamente!
            </span>
          </div>

          <p className="text-secondary lead fs-6 mb-4 px-md-3">
            Estamos preparando artículos especiales con consejos sobre cultivo orgánico, recetas saludables y guías para el cuidado del hogar.
          </p>

          <div>
            <a href="/" className="btn btn-success px-4 py-2 fw-semibold shadow-sm">
              Volver al inicio
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}