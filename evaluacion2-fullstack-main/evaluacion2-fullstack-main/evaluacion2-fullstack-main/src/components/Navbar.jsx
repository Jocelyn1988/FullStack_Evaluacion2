import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

export default function Navbar() {
  const [totalProductos, setTotalProductos] = useState(0);

  const calcularTotal = () => {
    const guardados = localStorage.getItem('carrito');
    if (guardados) {
      try {
        const carrito = JSON.parse(guardados);
        const count = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        setTotalProductos(count);
      } catch (e) {
        setTotalProductos(0);
      }
    } else {
      setTotalProductos(0);
    }
  };

  useEffect(() => {
    calcularTotal();

    // Escucha cambios locales para actualizar el contador inmediatamente
    window.addEventListener('carritoActualizado', calcularTotal);
    window.addEventListener('storage', calcularTotal);

    return () => {
      window.removeEventListener('carritoActualizado', calcularTotal);
      window.removeEventListener('storage', calcularTotal);
    };
  }, []);

  return (
    <>
      <div className="bg-light border-bottom py-1">
        <div className="container d-flex justify-content-end gap-2 small">
          <Link to="/iniciar_sesion" className="top-bar-link">Iniciar sesión</Link>
          <span className="text-secondary">|</span>
          <Link to="/registrar_usuario" className="top-bar-link">Registrar usuario</Link>
        </div>
      </div>

      <header className="bg-white border-bottom shadow-sm">
        <nav className="navbar navbar-expand-md navbar-light py-3">
          <div className="container">
            <Link to="/" className="navbar-brand d-flex align-items-center m-0 text-decoration-none">
              <h1 className="logo-titulo m-0">Huerto Hogar</h1>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menuPrincipal"
              aria-controls="menuPrincipal"
              aria-expanded="false"
              aria-label="Abrir navegación"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between" id="menuPrincipal">
              <ul className="navbar-nav mx-auto my-3 my-md-0 gap-md-2 text-center align-items-center">
                <li className="nav-item">
                  <Link to="/" className="nav-link-custom">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/categorias" className="nav-link-custom">Categorías</Link>
                </li>
                <li className="nav-item">
                  <Link to="/productos" className="nav-link-custom">Productos</Link>
                </li>
                <li className="nav-item">
                  <Link to="/ofertas" className="nav-link-custom text-danger fw-bold">
                    🔥 Ofertas
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/nosotros" className="nav-link-custom">Nosotros</Link>
                </li>
                <li className="nav-item">
                  <Link to="/blogs" className="nav-link-custom">Blogs</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contacto" className="nav-link-custom">Contacto</Link>
                </li>
              </ul>

              <div className="text-center">
                <Link to="/carrito" className="btn-carrito-custom shadow-sm text-decoration-none">
                  🛒 Carrito ({totalProductos})
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}