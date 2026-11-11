import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productos as productosIniciales } from '../data/productos';

export default function Categorias() {
  const [todasLasCategorias, setTodasLasCategorias] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);

  const infoCategorias = {
    "Frutas Frescas": {
      icono: "🍎",
      descripcion: "Frutas seleccionadas de temporada, dulces y cosechadas en su punto óptimo.",
      colorBorde: "border-danger-subtle"
    },
    "Verduras Orgánicas": {
      icono: "🥬",
      descripcion: "Cultivadas de forma limpia y sustentable, libres de pesticidas sintéticos.",
      colorBorde: "border-success-subtle"
    },
    "Productos Orgánicos": {
      icono: "🍯",
      descripcion: "Alimentos naturales, granos integrales y miel pura de productores locales.",
      colorBorde: "border-warning-subtle"
    },
    "Productos Lácteos": {
      icono: "🥛",
      descripcion: "Lácteos frescos pasteurizados y elaborados tradicionalmente en el campo.",
      colorBorde: "border-primary-subtle"
    }
  };

  useEffect(() => {
    // 1. Obtener productos dinámicos de localStorage
    const prodsGuardados = localStorage.getItem('productos_registrados');
    let prods = productosIniciales;
    if (prodsGuardados) {
      try {
        prods = JSON.parse(prodsGuardados);
      } catch (e) {
        console.error("Error al cargar productos", e);
      }
    }
    setListaProductos(prods);

    // 2. Obtener nombres de categoría de productos dinámicos
    const categoriasProductos = [...new Set(prods.map((p) => p.categoria))];

    // 3. Obtener categorías creadas en el Admin
    const guardadasAdmin = localStorage.getItem('categorias_registradas');
    let nombresAdmin = [];
    if (guardadasAdmin) {
      try {
        const parsed = JSON.parse(guardadasAdmin);
        nombresAdmin = parsed
          .filter((c) => c.estado === 'Activa' || !c.estado)
          .map((c) => c.nombre);
      } catch (e) {
        console.error("Error al cargar categorías del Admin", e);
      }
    }

    // 4. Fusionar listas eliminando duplicados
    const unificadas = [...new Set([...categoriasProductos, ...nombresAdmin])];
    setTodasLasCategorias(unificadas);
  }, []);

  return (
    <>
      <Navbar />

      <main className="container my-5 py-2">
        <div className="text-center mb-5">
          <h1 className="h2 fw-bold text-dark">CATEGORÍAS</h1>
          <p className="text-secondary small">
            Selecciona una sección para explorar los productos de nuestro catálogo
          </p>
        </div>

        <div className="row g-4">
          {todasLasCategorias.map((cat) => {
            const info = infoCategorias[cat] || {
              icono: "📦",
              descripcion: "Productos disponibles en nuestra tienda.",
              colorBorde: "border-secondary-subtle"
            };
            
            // Recuento calculado según productos dinámicos en localStorage
            const totalItems = listaProductos.filter((p) => p.categoria === cat).length;

            return (
              <div className="col-12 col-md-6 col-lg-3" key={cat}>
                <div className={`card h-100 shadow-sm border ${info.colorBorde} p-4 text-center rounded-3 bg-white`}>
                  <div className="display-4 mb-3">{info.icono}</div>
                  <h2 className="h5 fw-bold text-dark mb-2">{cat}</h2>
                  <p className="text-muted small mb-4 flex-grow-1">
                    {info.descripcion}
                  </p>
                  <div className="mb-3">
                    <span className="badge bg-light text-dark border">
                      {totalItems} producto(s)
                    </span>
                  </div>
                  <Link
                    to={`/productos?cat=${encodeURIComponent(cat)}`}
                    className="btn btn-outline-success btn-sm w-100 fw-bold"
                  >
                    Ver {cat} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}