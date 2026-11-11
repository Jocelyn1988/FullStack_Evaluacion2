import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { productos as productosIniciales } from '../data/productos';
import '../css/admin.css';

export default function AdminProductos() {
  const navigate = useNavigate();

  // 1. Cargar productos dinámicos desde localStorage
  const [productos, setProductos] = useState(() => {
    try {
      const guardados = localStorage.getItem('productos_registrados');
      if (guardados) return JSON.parse(guardados);
    } catch (e) {
      console.error("Error al cargar productos", e);
    }
    localStorage.setItem('productos_registrados', JSON.stringify(productosIniciales));
    return productosIniciales;
  });

  // Estados para Modales y Filtros
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [productoEditando, setProductoEditando] = useState(null);
  const [filtroCriticos, setFiltroCriticos] = useState(false);

  // Formulario para Crear Producto
  const [nuevoProd, setNuevoProd] = useState({
    id: '',
    nombre: '',
    precioNumero: 0,
    precio: '',
    stock: '',
    categoria: 'Frutas Frescas',
    descripcion: '',
    imagen: '/imagenes/Manzanas Fuji.jpg'
  });

  // Guardar lista en localStorage
  const guardarCambios = (nuevaLista) => {
    setProductos(nuevaLista);
    try {
      localStorage.setItem('productos_registrados', JSON.stringify(nuevaLista));
    } catch (e) {
      console.error("Error al guardar en localStorage", e);
    }
  };

  // Evaluar stock crítico (< 100 unidades/kilos/frascos)
  const esStockCritico = (stockStr) => {
    const num = parseInt(stockStr, 10);
    return isNaN(num) ? false : num < 100;
  };

  // Convertir imagen subida a Base64 (Nuevo Producto)
  const handleImagenNuevo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNuevoProd({ ...nuevoProd, imagen: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // Convertir imagen subida a Base64 (Editar Producto)
  const handleImagenEditando = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProductoEditando({ ...productoEditando, imagen: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // ACCIÓN 1: CREAR NUEVO PRODUCTO
  const handleCrearProducto = (e) => {
    e.preventDefault();
    if (!nuevoProd.nombre.trim()) return;

    const idGenerado = nuevoProd.id.trim() || `PR${Date.now().toString().slice(-4)}`;
    const nuevo = {
      ...nuevoProd,
      id: idGenerado,
      precioNumero: Number(nuevoProd.precioNumero),
      precio: `$${Number(nuevoProd.precioNumero).toLocaleString('es-CL')} CLP`
    };

    guardarCambios([nuevo, ...productos]);
    setMostrarModalNuevo(false);
    setNuevoProd({
      id: '',
      nombre: '',
      precioNumero: 0,
      precio: '',
      stock: '',
      categoria: 'Frutas Frescas',
      descripcion: '',
      imagen: '/imagenes/Manzanas Fuji.jpg'
    });
  };

  // ACCIÓN 2: GUARDAR EDICIÓN
  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    const actualizados = productos.map((p) =>
      p.id === productoEditando.id
        ? {
            ...productoEditando,
            precioNumero: Number(productoEditando.precioNumero),
            precio: `$${Number(productoEditando.precioNumero).toLocaleString('es-CL')} CLP`
          }
        : p
    );
    guardarCambios(actualizados);
    setProductoEditando(null);
  };

  // ACCIÓN 3: ELIMINAR PRODUCTO
  const handleEliminar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto "${nombre}"?`)) {
      const filtrados = productos.filter((p) => p.id !== id);
      guardarCambios(filtrados);
    }
  };

  // Filtrado de la tabla
  const productosMostrar = filtroCriticos
    ? productos.filter((p) => esStockCritico(p.stock))
    : productos;

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <header className="bg-dark text-white px-3 py-2 d-flex align-items-center">
        <span className="fw-semibold small">Huerto Hogar | Panel Admin</span>
      </header>

      <div className="d-flex flex-grow-1 overflow-hidden">
        <AdminSidebar />

        <main className="flex-grow-1 p-4 overflow-auto">
          <div className="card shadow-sm border rounded-0 bg-white p-4">
            
            {/* Header y Acciones principales */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <div>
                <h1 className="h2 fw-bold text-dark m-0">Gestión de Productos</h1>
                <p className="text-secondary small m-0">
                  {filtroCriticos ? 'Mostrando únicamente productos con stock crítico' : 'Catálogo general de inventario'}
                </p>
              </div>

              <div className="d-flex gap-2 flex-wrap">
                <button
                  type="button"
                  className={`btn btn-sm fw-bold ${filtroCriticos ? 'btn-warning text-dark' : 'btn-outline-warning text-dark'}`}
                  onClick={() => setFiltroCriticos(!filtroCriticos)}
                >
                  ⚠️ {filtroCriticos ? 'Ver Todos los Productos' : 'Productos Críticos'}
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary fw-semibold"
                  onClick={() => navigate('/admin/reportes')}
                >
                  📈 Reportes
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-dark text-uppercase fw-semibold"
                  onClick={() => setMostrarModalNuevo(true)}
                >
                  ➕ NUEVO PRODUCTO
                </button>
              </div>
            </div>

            {/* TABLA DE PRODUCTOS CON TODAS LAS ACCIONES */}
            <div className="table-responsive">
              <table className="table table-sm table-striped align-middle m-0">
                <thead>
                  <tr className="table-light">
                    <th className="fw-semibold py-2">Código ID</th>
                    <th className="fw-semibold py-2">Producto</th>
                    <th className="fw-semibold py-2">Categoría</th>
                    <th className="fw-semibold py-2">Stock</th>
                    <th className="fw-semibold py-2 text-end">Precio</th>
                    <th className="fw-semibold py-2 text-center" style={{ width: '140px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosMostrar.map((prod) => {
                    const critico = esStockCritico(prod.stock);
                    return (
                      <tr key={prod.id} className={critico ? 'table-warning-subtle' : ''}>
                        <td className="py-2 text-secondary small fw-bold">#{prod.id}</td>
                        <td className="py-2 text-dark small fw-bold">
                          <div className="d-flex align-items-center gap-2">
                            <img 
                              src={prod.imagen} 
                              alt={prod.nombre} 
                              style={{ width: '32px', height: '32px', objectFit: 'cover' }} 
                              className="rounded border"
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/32'; }}
                            />
                            <span>{prod.nombre}</span>
                          </div>
                        </td>
                        <td className="py-2 text-secondary small">{prod.categoria}</td>
                        <td className="py-2 small">
                          <span className={`badge ${critico ? 'bg-danger text-white' : 'bg-success-subtle text-success'}`}>
                            {prod.stock} {critico && '⚠️ (Bajo)'}
                          </span>
                        </td>
                        <td className="py-2 text-end fw-bold small text-dark">{prod.precio}</td>
                        <td className="py-2 text-center">
                          <div className="d-flex justify-content-center gap-1">
                            {/* MOSTRAR DETALLE */}
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-info px-2 py-0"
                              title="Ver detalle del producto"
                              onClick={() => setProductoDetalle(prod)}
                            >
                              👁️
                            </button>
                            {/* EDITAR PRODUCTO */}
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary px-2 py-0"
                              title="Editar producto"
                              onClick={() => setProductoEditando({ ...prod })}
                            >
                              ✏️
                            </button>
                            {/* ELIMINAR PRODUCTO */}
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger px-2 py-0"
                              title="Eliminar producto"
                              onClick={() => handleEliminar(prod.id, prod.nombre)}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {productosMostrar.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No se encontraron productos en esta sección.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>

      {/* 1. MODAL: NUEVO PRODUCTO */}
      {mostrarModalNuevo && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">NUEVO PRODUCTO</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarModalNuevo(false)}></button>
              </div>
              <form onSubmit={handleCrearProducto}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Código ID</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Ej: FR004"
                        value={nuevoProd.id}
                        onChange={(e) => setNuevoProd({ ...nuevoProd, id: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Categoría</label>
                      <select
                        className="form-select form-select-sm"
                        value={nuevoProd.categoria}
                        onChange={(e) => setNuevoProd({ ...nuevoProd, categoria: e.target.value })}
                      >
                        <option value="Frutas Frescas">Frutas Frescas</option>
                        <option value="Verduras Orgánicas">Verduras Orgánicas</option>
                        <option value="Productos Orgánicos">Productos Orgánicos</option>
                        <option value="Productos Lácteos">Productos Lácteos</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">Nombre del Producto</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={nuevoProd.nombre}
                        onChange={(e) => setNuevoProd({ ...nuevoProd, nombre: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Precio ($ CLP)</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={nuevoProd.precioNumero}
                        onChange={(e) => setNuevoProd({ ...nuevoProd, precioNumero: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Stock (Ej: 150 kilos)</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={nuevoProd.stock}
                        onChange={(e) => setNuevoProd({ ...nuevoProd, stock: e.target.value })}
                        required
                      />
                    </div>
                    
                    {/* FOTO: Cargar Archivo o Ruta URL */}
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Subir Foto (Equipo)</label>
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        accept="image/*"
                        onChange={handleImagenNuevo}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Ruta / URL Imagen</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="/imagenes/foto.jpg"
                        value={nuevoProd.imagen}
                        onChange={(e) => setNuevoProd({ ...nuevoProd, imagen: e.target.value })}
                      />
                    </div>

                    <div className="col-12 text-center">
                      <img
                        src={nuevoProd.imagen}
                        alt="Vista previa"
                        style={{ height: '70px', objectFit: 'contain' }}
                        className="rounded border p-1"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/70'; }}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Descripción</label>
                      <textarea
                        className="form-control form-control-sm"
                        rows="2"
                        value={nuevoProd.descripcion}
                        onChange={(e) => setNuevoProd({ ...nuevoProd, descripcion: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setMostrarModalNuevo(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success btn-sm fw-bold">
                    Guardar Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 2. MODAL: DETALLE DEL PRODUCTO (👁️) */}
      {productoDetalle && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">DETALLE DEL PRODUCTO #{productoDetalle.id}</h5>
                <button type="button" className="btn-close" onClick={() => setProductoDetalle(null)}></button>
              </div>
              <div className="modal-body text-center">
                <img 
                  src={productoDetalle.imagen} 
                  alt={productoDetalle.nombre} 
                  style={{ maxHeight: '140px', objectFit: 'contain' }}
                  className="rounded border p-1 mb-3"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/140'; }}
                />
                <h4 className="fw-bold text-dark">{productoDetalle.nombre}</h4>
                <span className="badge bg-secondary mb-3">{productoDetalle.categoria}</span>
                <p className="text-start"><strong>Precio:</strong> {productoDetalle.precio}</p>
                <p className="text-start"><strong>Stock:</strong> {productoDetalle.stock}</p>
                <p className="text-start"><strong>Descripción:</strong> {productoDetalle.descripcion || 'Sin descripción.'}</p>
              </div>
              <div className="modal-footer justify-content-between">
                <button 
                  type="button" 
                  className="btn btn-primary btn-sm fw-semibold"
                  onClick={() => {
                    setProductoEditando(productoDetalle);
                    setProductoDetalle(null);
                  }}
                >
                  ✏️ EDITAR PRODUCTO
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setProductoDetalle(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MODAL: EDITAR PRODUCTO (✏️) */}
      {productoEditando && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">EDITAR PRODUCTO #{productoEditando.id}</h5>
                <button type="button" className="btn-close" onClick={() => setProductoEditando(null)}></button>
              </div>
              <form onSubmit={handleGuardarEdicion}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label small fw-semibold">Nombre del Producto</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={productoEditando.nombre}
                        onChange={(e) => setProductoEditando({ ...productoEditando, nombre: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Precio ($ CLP)</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={productoEditando.precioNumero || 0}
                        onChange={(e) => setProductoEditando({ ...productoEditando, precioNumero: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Stock</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={productoEditando.stock}
                        onChange={(e) => setProductoEditando({ ...productoEditando, stock: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">Categoría</label>
                      <select
                        className="form-select form-select-sm"
                        value={productoEditando.categoria}
                        onChange={(e) => setProductoEditando({ ...productoEditando, categoria: e.target.value })}
                      >
                        <option value="Frutas Frescas">Frutas Frescas</option>
                        <option value="Verduras Orgánicas">Verduras Orgánicas</option>
                        <option value="Productos Orgánicos">Productos Orgánicos</option>
                        <option value="Productos Lácteos">Productos Lácteos</option>
                      </select>
                    </div>

                    {/* Cambiar Foto al Editar */}
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Cambiar Foto (Equipo)</label>
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        accept="image/*"
                        onChange={handleImagenEditando}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">Ruta / URL Foto</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={productoEditando.imagen}
                        onChange={(e) => setProductoEditando({ ...productoEditando, imagen: e.target.value })}
                      />
                    </div>

                    <div className="col-12 text-center">
                      <img
                        src={productoEditando.imagen}
                        alt="Previsualización"
                        style={{ height: '70px', objectFit: 'contain' }}
                        className="rounded border p-1"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/70'; }}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">Descripción</label>
                      <textarea
                        className="form-control form-control-sm"
                        rows="3"
                        value={productoEditando.descripcion}
                        onChange={(e) => setProductoEditando({ ...productoEditando, descripcion: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setProductoEditando(null)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success btn-sm fw-bold">
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}