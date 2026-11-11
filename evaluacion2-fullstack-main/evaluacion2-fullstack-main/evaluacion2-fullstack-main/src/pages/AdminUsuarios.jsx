import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import '../css/admin.css';
import '../css/admin_usuarios.css';

const usuariosPorDefecto = [
  { id: 1, date: "2024-06-01", order: "SO1001", customer: "Acme Corporation", status: "Enviado", amount: "$2.500.000", email: "acme@empresa.com", telefono: "+56 9 1234 5678", region: "Región Metropolitana de Santiago", comuna: "Santiago" },
  { id: 2, date: "2024-06-02", order: "SO1002", customer: "Bravo Solutions", status: "Pendiente", amount: "$1.200.000", email: "contacto@bravo.cl", telefono: "+56 9 8765 4321", region: "Región de Valparaíso", comuna: "Viña del Mar" },
  { id: 3, date: "2024-06-02", order: "SO1003", customer: "Charlie's Workshop", status: "Cancelado", amount: "$500.000", email: "charlie@workshop.com", telefono: "+56 9 5555 4444", region: "Región del Biobío", comuna: "Concepción" },
  { id: 4, date: "2024-06-03", order: "SO1004", customer: "Delta Retail", status: "En proceso", amount: "$750.000", email: "delta@retail.cl", telefono: "+56 9 1122 3344", region: "Región Metropolitana de Santiago", comuna: "Providencia" },
  { id: 5, date: "2024-06-04", order: "SO1005", customer: "Echo Enterprises", status: "Enviado", amount: "$3.000.000", email: "info@echo.com", telefono: "+56 9 9988 7766", region: "Región de la Araucanía", comuna: "Temuco" },
  { id: 6, date: "2024-06-05", order: "SO1006", customer: "Foxtrot Media", status: "Pendiente", amount: "$1.150.000", email: "contacto@foxtrot.cl", telefono: "+56 9 4433 2211", region: "Región del Ñuble", comuna: "Chillán" }
];

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem('usuarios_registrados');
    if (guardados) {
      try {
        return JSON.parse(guardados);
      } catch (e) {
        return usuariosPorDefecto;
      }
    }
    localStorage.setItem('usuarios_registrados', JSON.stringify(usuariosPorDefecto));
    return usuariosPorDefecto;
  });

  const [paginaActual, setPaginaActual] = useState(1);
  const [usuarioDetalle, setUsuarioDetalle] = useState(null);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [historialUsuario, setHistorialUsuario] = useState(null);

  const traducirEstado = (estado) => {
    switch (estado) {
      case 'Shipped':
      case 'Enviado':
        return 'Enviado';
      case 'Pending':
      case 'Pendiente':
        return 'Pendiente';
      case 'Processing':
      case 'En proceso':
        return 'En proceso';
      case 'Cancelled':
      case 'Cancelado':
        return 'Cancelado';
      default:
        return estado;
    }
  };

  const actualizarUsuarios = (nuevaLista) => {
    setUsuarios(nuevaLista);
    localStorage.setItem('usuarios_registrados', JSON.stringify(nuevaLista));
  };

  const handleEliminar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar a "${nombre}"?`)) {
      const filtrados = usuarios.filter((u) => u.id !== id);
      actualizarUsuarios(filtrados);
    }
  };

  const handleEditarClick = (user) => {
    setUsuarioEditando({
      ...user,
      status: traducirEstado(user.status)
    });
  };

  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    const modificados = usuarios.map((u) => (u.id === usuarioEditando.id ? usuarioEditando : u));
    actualizarUsuarios(modificados);
    setUsuarioEditando(null);
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <header className="bg-dark text-white px-3 py-2 d-flex align-items-center">
        <span className="fw-semibold small">Huerto Hogar | Panel Admin</span>
      </header>

      <div className="d-flex flex-grow-1 overflow-hidden">
        <AdminSidebar />

        <main className="flex-grow-1 p-4 overflow-auto">
          <div className="card shadow-sm border rounded-0 bg-white p-4">
            
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-3">
                <h1 className="h2 fw-bold text-dark m-0">Usuarios</h1>
                <Link to="/registrar_usuario" className="btn btn-dark text-uppercase fw-semibold btn-nuevo-usuario">
                  NUEVO USUARIO
                </Link>
              </div>

              <div className="d-flex align-items-center gap-3">
                <button type="button" className="btn border-0 bg-transparent fs-5 p-0" title="Notificaciones">
                  🔔
                </button>
              </div>
            </div>

            <div className="mb-3">
              <span className="fw-semibold text-secondary small d-inline-flex align-items-center gap-1 cursor-pointer">
                Todas las órdenes de compra ▾
              </span>
            </div>

            <div className="table-responsive">
              <table className="table table-sm table-striped align-middle tabla-ordenes m-0">
                <thead>
                  <tr className="table-light-header">
                    <th className="fw-semibold py-2">Fecha ⬍</th>
                    <th className="fw-semibold py-2">Orden N° ⬍</th>
                    <th className="fw-semibold py-2">Cliente / Usuario ⬍</th>
                    <th className="fw-semibold py-2">Estado ⬍</th>
                    <th className="fw-semibold py-2 text-end">Monto ⬍</th>
                    <th className="fw-semibold py-2 text-center" style={{ width: '150px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((item) => {
                    const estadoEsp = traducirEstado(item.status);
                    return (
                      <tr key={item.id}>
                        <td className="py-2 text-secondary small">{item.date}</td>
                        <td className="py-2 text-secondary small">{item.order}</td>
                        <td className="py-2 text-dark small fw-medium">{item.customer}</td>
                        <td className="py-2 text-secondary small">
                          <span className={`badge ${
                            estadoEsp === 'Enviado' ? 'bg-success-subtle text-success' :
                            estadoEsp === 'Pendiente' ? 'bg-warning-subtle text-warning-emphasis' :
                            estadoEsp === 'En proceso' ? 'bg-primary-subtle text-primary' :
                            'bg-danger-subtle text-danger'
                          }`}>
                            {estadoEsp}
                          </span>
                        </td>
                        <td className="py-2 text-dark small text-end fw-medium">{item.amount}</td>
                        <td className="py-2 text-center">
                          <div className="d-flex justify-content-center gap-1">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-info px-2 py-0"
                              title="Mostrar usuario"
                              onClick={() => setUsuarioDetalle(item)}
                            >
                              👁️
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary px-2 py-0"
                              title="Editar usuario"
                              onClick={() => handleEditarClick(item)}
                            >
                              ✏️
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger px-2 py-0"
                              title="Eliminar usuario"
                              onClick={() => handleEliminar(item.id, item.customer)}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {usuarios.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No hay usuarios registrados actualmente.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="d-flex justify-content-center mt-4">
              <div className="btn-group paginador-custom" role="group">
                <button type="button" className="btn btn-light border py-1 px-3 small">&laquo;</button>
                <button type="button" className="btn btn-light border py-1 px-3 small">&lsaquo;</button>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`btn border py-1 px-3 small ${paginaActual === num ? 'btn-primary text-white' : 'btn-light'}`}
                    onClick={() => setPaginaActual(num)}
                  >
                    {num}
                  </button>
                ))}
                <button type="button" className="btn btn-light border py-1 px-3 small">&rsaquo;</button>
                <button type="button" className="btn btn-light border py-1 px-3 small">&raquo;</button>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* MODAL MOSTRAR USUARIO */}
      {usuarioDetalle && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">MOSTRAR USUARIO</h5>
                <button type="button" className="btn-close" onClick={() => setUsuarioDetalle(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>ID Usuario:</strong> #{usuarioDetalle.id}</p>
                <p><strong>Cliente / Usuario:</strong> {usuarioDetalle.customer}</p>
                <p><strong>Correo Electrónico:</strong> {usuarioDetalle.email || 'correo@ejemplo.com'}</p>
                <p><strong>Teléfono:</strong> {usuarioDetalle.telefono || '+56 9 1234 5678'}</p>
                <p><strong>Región:</strong> {usuarioDetalle.region || 'Región Metropolitana de Santiago'}</p>
                <p><strong>Comuna:</strong> {usuarioDetalle.comuna || 'Santiago'}</p>
                <p><strong>Última Orden:</strong> {usuarioDetalle.order} ({usuarioDetalle.date})</p>
                <p><strong>Monto Acumulado:</strong> {usuarioDetalle.amount}</p>
              </div>
              <div className="modal-footer justify-content-between">
                <div className="d-flex gap-2">
                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm fw-semibold"
                    onClick={() => {
                      setUsuarioEditando(usuarioDetalle);
                      setUsuarioDetalle(null);
                    }}
                  >
                    ✏️ EDITAR USUARIO
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-success btn-sm fw-semibold"
                    onClick={() => {
                      setHistorialUsuario(usuarioDetalle);
                      setUsuarioDetalle(null);
                    }}
                  >
                    📜 HISTORIAL DE COMPRAS
                  </button>
                </div>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setUsuarioDetalle(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL HISTORIAL DE COMPRAS */}
      {historialUsuario && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">HISTORIAL DE COMPRAS</h5>
                <button type="button" className="btn-close" onClick={() => setHistorialUsuario(null)}></button>
              </div>
              <div className="modal-body">
                <h6 className="fw-bold mb-3">Cliente: {historialUsuario.customer}</h6>
                <div className="list-group">
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Orden Nº: {historialUsuario.order}</strong>
                      <br />
                      <small className="text-muted">Fecha: {historialUsuario.date}</small>
                    </div>
                    <span className="badge bg-success fs-6">{historialUsuario.amount}</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setHistorialUsuario(null)}>
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR USUARIO */}
      {usuarioEditando && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">EDITAR USUARIO</h5>
                <button type="button" className="btn-close" onClick={() => setUsuarioEditando(null)}></button>
              </div>
              <form onSubmit={handleGuardarEdicion}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Nombre del Cliente / Usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      value={usuarioEditando.customer}
                      onChange={(e) => setUsuarioEditando({ ...usuarioEditando, customer: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Estado de la Orden</label>
                    <select
                      className="form-select"
                      value={usuarioEditando.status}
                      onChange={(e) => setUsuarioEditando({ ...usuarioEditando, status: e.target.value })}
                    >
                      <option value="Enviado">Enviado</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="En proceso">En proceso</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Monto</label>
                    <input
                      type="text"
                      className="form-control"
                      value={usuarioEditando.amount}
                      onChange={(e) => setUsuarioEditando({ ...usuarioEditando, amount: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setUsuarioEditando(null)}>
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