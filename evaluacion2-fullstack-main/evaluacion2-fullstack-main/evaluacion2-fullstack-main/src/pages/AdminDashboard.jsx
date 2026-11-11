import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import '../css/admin.css';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [cantUsuarios, setCantUsuarios] = useState(890);
  const [cantCategorias, setCantCategorias] = useState(400);

  useEffect(() => {
    const usuariosGuardados = localStorage.getItem('usuarios_registrados');
    if (usuariosGuardados) {
      try {
        const parsed = JSON.parse(usuariosGuardados);
        setCantUsuarios(parsed.length);
      } catch (e) {
        console.error("Error al leer usuarios", e);
      }
    }

    const categoriasGuardadas = localStorage.getItem('categorias_registradas');
    if (categoriasGuardadas) {
      try {
        const parsed = JSON.parse(categoriasGuardadas);
        setCantCategorias(parsed.length);
      } catch (e) {
        console.error("Error al leer categorías", e);
      }
    }
  }, []);

  const accesosDirectos = [
    {
      titulo: 'Dashboard',
      descripcion: 'Visión general de todas las métricas y estadísticas clave del sistema.',
      icono: '⏱️',
      ruta: '/admin'
    },
    {
      titulo: 'Órdenes',
      descripcion: 'Gestión y seguimiento de todas las órdenes de compra realizadas.',
      icono: '🛒',
      ruta: '/admin/ordenes'
    },
    {
      titulo: 'Productos',
      descripcion: 'Administrar inventario y detalles de los productos disponibles.',
      icono: '📦',
      ruta: '/admin/productos'
    },
    {
      titulo: 'Categorías',
      descripcion: 'Organizar productos en categorías para facilitar su navegación.',
      icono: '🏷️',
      ruta: '/admin/categorias'
    },
    {
      titulo: 'Usuarios',
      descripcion: 'Gestión de cuentas de usuario y sus roles dentro del sistema.',
      icono: '👥',
      ruta: '/admin/usuarios'
    },
    {
      titulo: 'Reportes',
      descripcion: 'Generación de informes detallados sobre las operaciones del sistema.',
      icono: '📈',
      ruta: '/admin/reportes'
    },
    {
      titulo: 'Perfil',
      descripcion: 'Administración de la información personal y configuraciones de cuenta.',
      icono: '👤',
      ruta: '/admin/perfil'
    },
    {
      titulo: 'Tienda',
      descripcion: 'Visualiza tu tienda en tiempo real y gestiona los pedidos.',
      icono: '🏪',
      ruta: '/'
    }
  ];

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <header className="bg-dark text-white px-3 py-2 d-flex align-items-center">
        <span className="fw-semibold small">Huerto Hogar | Admin</span>
      </header>

      <div className="d-flex flex-grow-1 overflow-hidden">
        <AdminSidebar />

        <main className="flex-grow-1 p-4 overflow-auto">
          <div className="mb-4">
            <h1 className="h2 fw-bold text-dark mb-1">Dashboard</h1>
            <p className="text-secondary small m-0">Resumen de las actividades diarias</p>
          </div>

          {/* Tarjetas superiores de resumen */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-4">
              <div 
                className="card text-white p-3 rounded-3 shadow-sm border-0 cursor-pointer"
                style={{ backgroundColor: '#0d6efd', cursor: 'pointer' }}
                onClick={() => navigate('/admin/usuarios')}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <span className="small text-uppercase fw-bold text-white-50">COMPRAS</span>
                    <h2 className="display-6 fw-bold my-1">1,234</h2>
                    <span className="small">Probabilidad de aumento: <strong>20%</strong></span>
                  </div>
                  <div className="fs-1 opacity-50">🛒</div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div 
                className="card text-white p-3 rounded-3 shadow-sm border-0 cursor-pointer"
                style={{ backgroundColor: '#198754', cursor: 'pointer' }}
                onClick={() => navigate('/admin/categorias')}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <span className="small text-uppercase fw-bold text-white-50">PRODUCTOS</span>
                    <h2 className="display-6 fw-bold my-1">{cantCategorias}</h2>
                    <span className="small">Inventario actual: <strong>500</strong></span>
                  </div>
                  <div className="fs-1 opacity-50">📦</div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div 
                className="card text-white p-3 rounded-3 shadow-sm border-0 cursor-pointer"
                style={{ backgroundColor: '#ffc107', cursor: 'pointer' }}
                onClick={() => navigate('/admin/usuarios')}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <span className="small text-uppercase fw-bold text-dark-50">USUARIOS</span>
                    <h2 className="display-6 fw-bold my-1 text-dark">{cantUsuarios}</h2>
                    <span className="small text-dark">Nuevos usuarios este mes: <strong>120</strong></span>
                  </div>
                  <div className="fs-1 opacity-50">👥</div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Accesos Directos */}
          <div className="row g-3">
            {accesosDirectos.map((item, index) => (
              <div className="col-12 col-sm-6 col-md-3" key={index}>
                <div 
                  className="card h-100 p-3 text-center border shadow-sm rounded-3 bg-white cursor-pointer"
                  onClick={() => navigate(item.ruta)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="fs-2 mb-2">{item.icono}</div>
                  <h3 className="h6 fw-bold text-dark mb-2">{item.titulo}</h3>
                  <p className="text-secondary small m-0 flex-grow-1" style={{ fontSize: '0.825rem' }}>
                    {item.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}