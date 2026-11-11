import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    navigate('/iniciar_sesion');
  };

  return (
    <aside className="admin-sidebar bg-white border-end d-flex flex-column justify-content-between p-3" style={{ width: '240px', minHeight: '100vh' }}>
      <div>
        <ul className="nav nav-pills flex-column gap-1">
          <li className="nav-item">
            <NavLink 
              to="/admin" 
              end
              className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active fw-semibold' : 'text-secondary'}`}
            >
              <span>📊</span> Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/ordenes" 
              className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active fw-semibold' : 'text-secondary'}`}
            >
              <span>📋</span> Órdenes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/productos" 
              className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active fw-semibold' : 'text-secondary'}`}
            >
              <span>🛒</span> Productos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/categorias" 
              className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active fw-semibold' : 'text-secondary'}`}
            >
              <span>🏷️</span> Categorías
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/usuarios" 
              className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active fw-semibold' : 'text-secondary'}`}
            >
              <span>👥</span> Usuarios
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/admin/reportes" 
              className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active fw-semibold' : 'text-secondary'}`}
            >
              <span>📈</span> Reportes
            </NavLink>
          </li>
          <li className="nav-item mt-3 pt-2 border-top">
            <NavLink 
              to="/admin/perfil" 
              className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active fw-semibold' : 'text-secondary'}`}
            >
              <span>👤</span> Perfil
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="d-flex flex-column gap-2 mt-4">
        <NavLink to="/" className="btn btn-dark w-100 fw-semibold d-flex align-items-center justify-content-center gap-2">
          <span>🏪</span> Tienda
        </NavLink>
        <button 
          type="button" 
          className="btn btn-danger w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
          onClick={handleCerrarSesion}
        >
          <span>🚪</span> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}