import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import '../css/admin.css';

export default function AdminPerfil() {
  const [perfil, setPerfil] = useState(() => {
    const guardado = localStorage.getItem('admin_perfil');
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch (e) {
        console.error("Error al leer perfil", e);
      }
    }
    return {
      nombre: "Administrador Huerto Hogar",
      email: "admin@huertohogar.cl",
      telefono: "+56 9 8765 4321",
      rol: "Administrador General",
      region: "Región Metropolitana de Santiago",
      comuna: "Santiago"
    };
  });

  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ ...perfil });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    setPerfil(formData);
    localStorage.setItem('admin_perfil', JSON.stringify(formData));
    setEditando(false);
    setMensaje('¡Perfil actualizado correctamente!');
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <header className="bg-dark text-white px-3 py-2 d-flex align-items-center">
        <span className="fw-semibold small">Huerto Hogar | Panel Admin</span>
      </header>

      <div className="d-flex flex-grow-1 overflow-hidden">
        <AdminSidebar />

        <main className="flex-grow-1 p-4 overflow-auto">
          <div className="card shadow-sm border rounded-0 bg-white p-4" style={{ maxWidth: '800px' }}>
            
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h2 fw-bold text-dark m-0">Perfil de Administrador</h1>
              {!editando && (
                <button 
                  type="button" 
                  className="btn btn-primary fw-semibold btn-sm"
                  onClick={() => setEditando(true)}
                >
                  ✏️ Editar Perfil
                </button>
              )}
            </div>

            {mensaje && (
              <div className="alert alert-success py-2 small mb-4" role="alert">
                {mensaje}
              </div>
            )}

            {!editando ? (
              <div className="row g-3">
                <div className="col-12 text-center mb-3">
                  <div className="display-1">👤</div>
                  <h3 className="h4 fw-bold text-dark mt-2">{perfil.nombre}</h3>
                  <span className="badge bg-primary text-white">{perfil.rol}</span>
                </div>

                <div className="col-12 col-md-6">
                  <label className="text-secondary small fw-semibold">Correo Electrónico</label>
                  <p className="fw-medium text-dark">{perfil.email}</p>
                </div>

                <div className="col-12 col-md-6">
                  <label className="text-secondary small fw-semibold">Teléfono</label>
                  <p className="fw-medium text-dark">{perfil.telefono}</p>
                </div>

                <div className="col-12 col-md-6">
                  <label className="text-secondary small fw-semibold">Región</label>
                  <p className="fw-medium text-dark">{perfil.region}</p>
                </div>

                <div className="col-12 col-md-6">
                  <label className="text-secondary small fw-semibold">Comuna</label>
                  <p className="fw-medium text-dark">{perfil.comuna}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleGuardar}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Nombre Completo</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Correo Electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Región</label>
                    <input
                      type="text"
                      className="form-control"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Comuna</label>
                    <input
                      type="text"
                      className="form-control"
                      name="comuna"
                      value={formData.comuna}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-success fw-bold">
                      Guardar Cambios
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => {
                        setFormData({ ...perfil });
                        setEditando(false);
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}