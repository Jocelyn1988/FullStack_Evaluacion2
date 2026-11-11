import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productos as productosIniciales } from '../data/productos';
import '../css/productos.css';

export default function Productos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaURL = searchParams.get('cat') || 'Todas';

  const [listaProductos, setListaProductos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState(categoriaURL);
  const [productoAgregado, setProductoAgregado] = useState(null);

  // 🔄 CARGA DINÁMICA DESDE LOCALSTORAGE
  useEffect(() => {
    const guardados = localStorage.getItem('productos_registrados');
    if (guardados) {
      try {
        setListaProductos(JSON.parse(guardados));
      } catch (e) {
        console.error("Error al leer productos de localStorage:", e);
        setListaProductos(productosIniciales);
      }
    } else {
      localStorage.setItem('productos_registrados', JSON.stringify(productosIniciales));
      setListaProductos(productosIniciales);
    }
  }, []);

  useEffect(() => {
    setCategoriaActiva(searchParams.get('cat') || 'Todas');
  }, [searchParams]);

  // Obtener categorías únicas según los productos reales guardados
  const categorias = ['Todas', ...new Set(listaProductos.map((p) => p.categoria || 'General'))];

  // Filtrar productos guardados
  const productosFiltrados = categoriaActiva === 'Todas'
    ? listaProductos
    : listaProductos.filter((p) => p.categoria === categoriaActiva);

  const handleSeleccionarCategoria = (cat) => {
    setCategoriaActiva(cat);
    if (cat === 'Todas') {
      setSearchParams({});
    } else {
      setSearchParams({ cat });
    }
  };

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
    window.dispatchEvent(new Event('carritoActualizado'));

    setProductoAgregado(prod.nombre);
    setTimeout(() => {
      setProductoAgregado(null);
    }, 3000);
  };

  return (
    <>
      <Navbar />

      <main className="container my-5">
        <h2 className="text-center mb-4 fw-bold seccion-titulo-catalogo">CATÁLOGO DE PRODUCTOS</h2>

        {/* Botones de Categorías */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn px-3 py-2 fw-semibold rounded-pill shadow-sm ${
                categoriaActiva === cat
                  ? 'btn-success text-white'
                  : 'btn-outline-success bg-white text-success'
              }`}
              onClick={() => handleSeleccionarCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Contador */}
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
          <h3 className="h5 text-secondary fw-semibold m-0">
            Mostrando: <span className="text-success fw-bold">{categoriaActiva}</span>
          </h3>
          <span className="badge bg-secondary">
            {productosFiltrados.length} producto(s)
          </span>
        </div>

        {/* Grilla de productos */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {productosFiltrados.map((prod) => (
            <div className="col" key={prod.id}>
              <div className="card h-100 shadow-sm border tarjeta-producto-catalogo p-3 text-center d-flex flex-column justify-content-between">
                <div>
                  <Link to={`/detalle_producto?id=${prod.id}`}>
                    <img 
                      src={prod.imagen} 
                      alt={prod.nombre} 
                      className="card-img-top img-catalogo mb-3"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/180'; }} 
                    />
                  </Link>

                  <div className="card-body p-0">
                    <span className="badge bg-light text-secondary border w-auto mx-auto mb-2 small">
                      {prod.categoria}
                    </span>
                    <h4 className="h6 m-0 mb-2">
                      <Link to={`/detalle_producto?id=${prod.id}`} className="text-decoration-none titulo-producto-link">
                        {prod.nombre}
                      </Link>
                    </h4>
                    <div className="precio-producto-texto mb-3 fw-bold text-success">
                      {prod.precio}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-outline-success btn-sm w-100 fw-semibold mt-2"
                  onClick={() => handleAgregar(prod)}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}

          {productosFiltrados.length === 0 && (
            <div className="col-12 text-center py-5">
              <p className="text-muted">No se encontraron productos en esta categoría.</p>
            </div>
          )}
        </div>

        {/* Notificación flotante de confirmación (Toast) */}
        {productoAgregado && (
          <div
            className="position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 1100 }}
          >
            <div className="toast show align-items-center text-bg-success border-0 shadow-lg" role="alert">
              <div className="d-flex">
                <div className="toast-body fw-semibold">
                  🛒 ¡Se agregó <strong>{productoAgregado}</strong> al carrito!
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