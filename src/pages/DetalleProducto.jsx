import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productos as productosIniciales } from '../data/productos';
import '../css/detalle.css';

export default function DetalleProducto() {
  const [searchParams] = useSearchParams();
  const idProducto = searchParams.get('id') || "FR001";
  const [cantidad, setCantidad] = useState(1);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [producto, setProducto] = useState(null);

  // Carga dinámica del catálogo desde localStorage
  useEffect(() => {
    const guardados = localStorage.getItem('productos_registrados');
    let lista = productosIniciales;
    
    if (guardados) {
      try {
        lista = JSON.parse(guardados);
      } catch (e) {
        console.error("Error al cargar productos en DetalleProducto", e);
      }
    }

    const encontrado = lista.find((p) => String(p.id) === String(idProducto)) || lista[0];
    setProducto(encontrado);
  }, [idProducto]);

  const handleAgregar = () => {
    if (!producto) return;

    const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');
    const existe = carritoActual.find((item) => String(item.id) === String(producto.id));

    if (existe) {
      existe.cantidad += cantidad;
    } else {
      carritoActual.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precioNumero || 0,
        cantidad: cantidad,
        imagen: producto.imagen
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carritoActual));

    // Notificar actualización al Navbar
    window.dispatchEvent(new Event('carritoActualizado'));

    setMensajeExito(true);
    setTimeout(() => {
      setMensajeExito(false);
    }, 3500);
  };

  if (!producto) {
    return (
      <>
        <Navbar />
        <main className="container my-5 text-center py-5">
          <p className="text-muted">Cargando producto...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container my-4">
        {/* Breadcrumbs dinámicos */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-success text-decoration-none">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/productos?cat=${encodeURIComponent(producto.categoria)}`} className="text-success text-decoration-none">
                {producto.categoria}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
          </ol>
        </nav>

        <div className="row g-5 align-items-start mb-5">
          <div className="col-12 col-md-6">
            <div className="card border shadow-sm p-2 bg-white rounded-3">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fluid rounded-2 imagen-detalle-principal"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="h2 fw-bold m-0 text-dark">{producto.nombre}</h1>
              <span className="fs-3 fw-bold text-success">{producto.precio}</span>
            </div>

            <p className="fw-semibold text-success mb-3">
              Stock disponible: {producto.stock}
            </p>

            <p className="text-secondary lh-base mb-4">
              {producto.descripcion}
            </p>

            <hr className="my-4 text-muted" />

            <div className="d-flex align-items-center justify-content-between mb-4">
              <label htmlFor="inputCantidad" className="fw-semibold text-secondary">Cantidad:</label>
              <input
                id="inputCantidad"
                type="number"
                className="form-control text-center w-25"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>

            {/* Aviso de confirmación de Bootstrap */}
            {mensajeExito && (
              <div className="alert alert-success alert-dismissible fade show mb-3 shadow-sm" role="alert">
                ✅ Se agregaron <strong>{cantidad}</strong> unidad(es) de <strong>{producto.nombre}</strong> al carrito.
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Cerrar"
                  onClick={() => setMensajeExito(false)}
                ></button>
              </div>
            )}

            <button
              type="button"
              className="btn btn-success btn-lg w-100 fw-bold shadow-sm"
              onClick={handleAgregar}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}