import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/carrito.css';

export default function Carrito() {
  // 1. Lee los productos que guardaron Productos.jsx o DetalleProducto.jsx
  const [items, setItems] = useState(() => {
    const guardados = localStorage.getItem('carrito');
    return guardados ? JSON.parse(guardados) : [];
  });

  // 2. Guarda automáticamente en localStorage cada vez que la lista cambia
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(items));
    // Dispara evento para que el Navbar actualice su contador
    window.dispatchEvent(new Event('carritoActualizado'));
  }, [items]);

  // Modificar cantidades (+ o -)
  const cambiarCantidad = (id, delta) => {
    setItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const nuevaCantidad = item.cantidad + delta;
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : item;
          }
          return item;
        })
    );
  };

  // Eliminar producto de la cesta
  const eliminarItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Cálculos dinámicos
  const subtotal = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const costoEnvio = items.length > 0 ? 3000 : 0;
  const total = subtotal + costoEnvio;

  return (
    <>
      <Navbar />

      <main className="container my-5 pagina-interior">
        <h1 className="h2 fw-bold mb-4 titulo-carrito-verde">Carrito de Compras</h1>

        {items.length === 0 ? (
          <div className="card shadow-sm border p-5 text-center bg-white rounded-3">
            <div className="display-4 mb-3">🛒</div>
            <h3 className="h5 text-muted mb-3">Tu carrito está vacío</h3>
            <p className="text-secondary small mb-4">
              Aún no has agregado productos frescos a tu cesta.
            </p>
            <div>
              <Link to="/productos" className="btn btn-success px-4 py-2 fw-semibold">
                Ver catálogo de productos
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-4 align-items-start">
            
            {/* Lista de productos guardados */}
            <div className="col-12 col-lg-8">
              <div className="card shadow-sm border-0 rounded-3 overflow-hidden bg-white">
                <div className="list-group list-group-flush">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="list-group-item p-3 d-flex align-items-center justify-content-between flex-wrap gap-3"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="img-thumbnail rounded-3 img-carrito-item"
                        />
                        <div>
                          <h5 className="h6 fw-bold m-0 text-dark">{item.nombre}</h5>
                          <small className="text-muted">${item.precio.toLocaleString('es-CL')} c/u</small>
                        </div>
                      </div>

                      {/* Controles de Cantidad */}
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm px-2 py-0 fw-bold"
                          onClick={() => cambiarCantidad(item.id, -1)}
                          disabled={item.cantidad <= 1}
                        >
                          -
                        </button>
                        <span className="fw-semibold px-2">{item.cantidad}</span>
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm px-2 py-0 fw-bold"
                          onClick={() => cambiarCantidad(item.id, 1)}
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal del producto */}
                      <div className="text-end">
                        <span className="d-block fw-bold text-success fs-5">
                          ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                        </span>
                      </div>

                      {/* Botón eliminar */}
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm border-0 fs-5"
                        title="Eliminar producto"
                        onClick={() => eliminarItem(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="col-12 col-lg-4">
              <div className="card shadow-sm border-0 p-4 bg-white rounded-3">
                <h2 className="h5 fw-bold mb-4 text-dark">Resumen del pedido</h2>

                <div className="d-flex justify-content-between mb-2 text-secondary">
                  <span>Subtotal:</span>
                  <span>${subtotal.toLocaleString('es-CL')}</span>
                </div>

                <div className="d-flex justify-content-between mb-3 text-secondary">
                  <span>Envío estimado:</span>
                  <span>${costoEnvio.toLocaleString('es-CL')}</span>
                </div>

                <hr className="my-3 text-muted" />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="h6 fw-bold m-0">Total:</span>
                  <span className="h4 fw-bold text-success m-0">
                    ${total.toLocaleString('es-CL')}
                  </span>
                </div>

                {/* Enlace directo al formulario de pago (/checkout) */}
                <Link
                  to="/checkout"
                  className="btn btn-success btn-lg w-100 fw-bold shadow-sm text-decoration-none text-center"
                >
                  Finalizar compra
                </Link>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </>
  );
}