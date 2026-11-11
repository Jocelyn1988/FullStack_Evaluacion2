import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { productos } from '../data/productos';
import { categoriasIniciales } from '../data/categorias';
import '../css/admin.css';

export default function AdminCategorias() {
  const navigate = useNavigate();

  // Cargar desde localStorage o inicializar con los datos de src/data/categorias.js
  const [categorias, setCategorias] = useState(() => {
    try {
      const guardadas = localStorage.getItem('categorias_registradas');
      if (guardadas) {
        return JSON.parse(guardados);
      }
    } catch (e) {
      console.error("Error leyendo localStorage:", e);
    }
    localStorage.setItem('categorias_registradas', JSON.stringify(categoriasIniciales));
    return categoriasIniciales;
  });

  const [mostrarModalNueva, setMostrarModalNueva] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: '', descripcion: '', estado: 'Activa' });
  const [categoriaEditando, setCategoriaEditando] = useState(null);

  const actualizarCategorias = (nuevaLista) => {
    setCategorias(nuevaLista);
    try {
      localStorage.setItem('categorias_registradas', JSON.stringify(nuevaLista));
    } catch (e) {
      console.error("Error guardando en localStorage:", e);
    }
  };

  // Acción: Crear Nueva Categoría
  const handleCrearCategoria = (e) => {
    e.preventDefault();
    if (!nuevaCategoria.nombre.trim()) return;

    const nueva = {
      id: Date.now(),
      nombre: nuevaCategoria.nombre.trim(),
      descripcion: nuevaCategoria.descripcion.trim() || 'Sin descripción',
      estado: nuevaCategoria.estado
    };

    actualizarCategorias([nueva, ...categorias]);
    setNuevaCategoria({ nombre: '', descripcion: '', estado: 'Activa' });
    setMostrarModalNueva(false);
  };

  // Acción: Guardar Edición
  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    const modificadas = categorias.map((cat) =>
      cat.id === categoriaEditando.id ? categoriaEditando : cat
    );
    actualizarCategorias(modificadas);
    setCategoriaEditando(null);
  };

  // Acción: Eliminar Categoría
  const handleEliminar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar la categoría "${nombre}"?`)) {
      const filtradas = categorias.filter((cat) => cat.id !== id);
      actualizarCategorias(filtradas);
    }
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      {/* Header Admin */}
      <header className="bg-dark text-white px-3 py-2 d-flex align-items-center">
        <span className="fw-semibold small">Huerto Hogar | Panel Admin</span>
      </header>

      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Sidebar Reutilizable */}
        <AdminSidebar />

        {/* Panel Central */}
        <main className="flex-grow-1 p-4 overflow-auto">
          <div className="card shadow-sm border rounded-0 bg-white p-4">
            
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="h2 fw-bold text-dark m-0">Categorías</h1>
              
              <button 
                type="button" 
                className="btn btn-dark text-uppercase fw-semibold"
                onClick={() => setMostrarModalNueva(true)}
              >
                NUEVA CATEGORÍA
              </button>
            </div>

            {/* TABLA DE CATEGORÍAS */}
            <div className="table-responsive">
              <table className="table table-sm table-striped align-middle m-0">
                <thead>
                  <tr className="table-light">
                    <th className="fw-semibold py-2">ID</th>
                    <th className="fw-semibold py-2">Nombre de Categoría</th>
                    <th className="fw-semibold py-2">Descripción</th>
                    <th className="fw-semibold py-2">Productos Asociados</th>
                    <th className="fw-semibold py-2">Estado</th>
                    <th className="fw-semibold py-2 text-center" style={{ width: '130px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((cat) => {
                    const totalProds = productos.filter((p) => p.categoria === cat.nombre).length;
                    return (
                      <tr key={cat.id}>
                        <td className="py-2 text-secondary small">#{cat.id}</td>
                        <td className="py-2 text-dark small fw-bold">{cat.nombre}</td>
                        <td className="py-2 text-secondary small">{cat.descripcion}</td>
                        <td className="py-2 small">
                          <span className="badge bg-light text-dark border">
                            {totalProds} producto(s)
                          </span>
                        </td>
                        <td className="py-2 small">
                          <span className={`badge ${cat.estado === 'Activa' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                            {cat.estado}
                          </span>
                        </td>
                        <td className="py-2 text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary px-2 py-0"
                              title="Editar categoría"
                              onClick={() => setCategoriaEditando({ ...cat })}
                            >
                              ✏️
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger px-2 py-0"
                              title="Eliminar categoría"
                              onClick={() => handleEliminar(cat.id, cat.nombre)}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {categorias.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No hay categorías registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>

      {/* MODAL: NUEVA CATEGORÍA */}
      {mostrarModalNueva && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">NUEVA CATEGORÍA</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarModalNueva(false)}></button>
              </div>
              <form onSubmit={handleCrearCategoria}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Nombre de la Categoría</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nuevaCategoria.nombre}
                      onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })}
                      placeholder="Ej: Frutos Secos"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Descripción</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={nuevaCategoria.descripcion}
                      onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })}
                      placeholder="Descripción de la categoría..."
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Estado</label>
                    <select
                      className="form-select"
                      value={nuevaCategoria.estado}
                      onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, estado: e.target.value })}
                    >
                      <option value="Activa">Activa</option>
                      <option value="Inactiva">Inactiva</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setMostrarModalNueva(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success btn-sm fw-bold">
                    Guardar Categoría
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR CATEGORÍA */}
      {categoriaEditando && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">EDITAR CATEGORÍA</h5>
                <button type="button" className="btn-close" onClick={() => setCategoriaEditando(null)}></button>
              </div>
              <form onSubmit={handleGuardarEdicion}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Nombre de la Categoría</label>
                    <input
                      type="text"
                      className="form-control"
                      value={categoriaEditando.nombre}
                      onChange={(e) => setCategoriaEditando({ ...categoriaEditando, nombre: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Descripción</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={categoriaEditando.descripcion}
                      onChange={(e) => setCategoriaEditando({ ...categoriaEditando, descripcion: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Estado</label>
                    <select
                      className="form-select"
                      value={categoriaEditando.estado}
                      onChange={(e) => setCategoriaEditando({ ...categoriaEditando, estado: e.target.value })}
                    >
                      <option value="Activa">Activa</option>
                      <option value="Inactiva">Inactiva</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setCategoriaEditando(null)}>
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