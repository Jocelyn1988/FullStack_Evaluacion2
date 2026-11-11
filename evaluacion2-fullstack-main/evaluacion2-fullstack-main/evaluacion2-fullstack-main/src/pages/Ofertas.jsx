import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productos as productosIniciales } from '../data/productos';
import '../css/productos.css';

export default function Ofertas() {
  const [listaProductos, setListaProductos] = useState([]);
  const [productoAgregado, setProductoAgregado] = useState(null);

  // Cargar lista dinámica de productos desde localStorage
  useEffect(() => {
    const guardados = localStorage.getItem('productos_registrados');
    if (guardados) {
      try {
        setListaProductos(JSON.parse(guardados));
      } catch (e) {
        console.error("Error al cargar productos en Ofertas", e);
        setListaProductos(productosIniciales);
      }
    } else {
      setListaProductos(productosIniciales);
    }
  }, []);

  // Filtrar solo los productos dinámicos marcados en oferta
  const productosEnOferta = listaProductos.filter((p) => p.enOferta);

  const handleAgregar = (prod) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');
    const item = carritoActual.find((i) => String(i.id) === String(prod.id));

    if (item) {
      item.cantidad += 1;
    } else {
      carritoActual.push({
        id: prod.id,
        nombre: prod.nombre,
        precio: prod.precioNumero || 0,
        cantidad: 1,
        imagen: prod.imagen
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carritoActual));

    // Notificar actualización al Navbar
    window.dispatchEvent(new Event('carritoActualizado'));

    setProductoAgregado(prod.nombre);
    setTimeout(() => {
      setProductoAgregado(null);
    }, 2500);
  };

  return (
    <>
      <Navbar />

      <main className="container my-5">
        {/* Banner de Ofertas */}
        <div className="bg-success text-white p-4 p-md-5 rounded-3 mb-5 text-center shadow-sm">
          <span className="badge bg-warning text-dark fw-bold px-3 py-2 text-uppercase mb-2">
            Promociones de Temporada
          </span>
          <h1 className="display-5 fw-bold mb-2">OFERTAS IMPERDIBLES</h1>
          <p className="lead m-0 text-white-50">
            Aprovecha los mejores descuentos en productos frescos y orgánicos directamente del campo a tu hogar.
          </p>
        </div>

        {/* Grilla de productos en oferta */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {productosEnOferta.map((prod) => (
            <div className="col" key={prod.id}>
              <div className="card h-100 shadow-sm border tarjeta-producto-catalogo p-3 text-center position-relative">
                {/* Insignia de descuento */}
                <span className="position-absolute top-0 end-0 m-3 badge bg-danger fw-bold fs-6 shadow-sm">
                  {prod.descuento || 'OFERTA'}
                </span>

                <Link to={`/detalle_producto?id=${prod.id}`}>
                  <img 
                    src={prod.imagen} 
                    alt={prod.nombre} 
                    className="card-img-top img-catalogo mb-3" 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/180'; }}
                  />
                </Link>

                <div className="card-body d-flex flex-column justify-content-between p-0">
                  <span className="badge bg-light text-secondary border w-auto mx-auto mb-2 small">
                    {prod.categoria}
                  </span>
                  
                  <Link to={`/detalle_producto?id=${prod.id}`} className="text-decoration-none titulo-producto-link mb-2">
                    {prod.nombre}
                  </Link>

                  {/* Precios: Original tachado y precio con descuento */}
                  <div className="mb-3">
                    {prod.precioOriginal && (
                      <span className="text-muted text-decoration-line-through small d-block">
                        {prod.precioOriginal}
                      </span>
                    )}
                    <span className="precio-producto-texto fw-bold text-danger fs-5">
                      {prod.precio}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn btn-success btn-sm w-100 fw-bold shadow-sm"
                    onClick={() => handleAgregar(prod)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}

          {productosEnOferta.length === 0 && (
            <div className="col-12 text-center py-5">
              <p className="text-muted">Por el momento no hay productos con descuento activo.</p>
              <Link to="/productos" className="btn btn-outline-success">
                Ver todos los productos
              </Link>
            </div>
          )}
        </div>

        {/* Notificación flotante al agregar */}
        {productoAgregado && (
          <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
            <div className="toast show align-items-center text-bg-success border-0 shadow-lg" role="alert">
              <div className="d-flex">
                <div className="toast-body fw-semibold">
                  🏷️ ¡Se agregó <strong>{productoAgregado}</strong> en oferta al carrito!
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  aria-label="Cerrar"
                  onClick={() => setProductoAgregado(null)}
                ></button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}