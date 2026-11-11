import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import '../css/admin.css';

export default function AdminReportes() {
  const [rangoFecha, setRangoFecha] = useState('mes');

  // Datos de resumen para los reportes
  const reportesVentas = [
    { mes: 'Enero', ordenes: 45, total: '$1.850.000', estado: 'Completado' },
    { mes: 'Febrero', ordenes: 52, total: '$2.100.000', estado: 'Completado' },
    { mes: 'Marzo', ordenes: 61, total: '$2.650.000', estado: 'Completado' },
    { mes: 'Abril', ordenes: 48, total: '$1.980.000', estado: 'Completado' },
    { mes: 'Mayo', ordenes: 70, total: '$3.100.000', estado: 'Completado' }
  ];

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <header className="bg-dark text-white px-3 py-2 d-flex align-items-center">
        <span className="fw-semibold small">Huerto Hogar | Panel Admin</span>
      </header>

      <div className="d-flex flex-grow-1 overflow-hidden">
        <AdminSidebar />

        <main className="flex-grow-1 p-4 overflow-auto">
          <div className="card shadow-sm border rounded-0 bg-white p-4">
            
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <div>
                <h1 className="h2 fw-bold text-dark m-0">Reportes de Ventas</h1>
                <p className="text-secondary small m-0">Análisis detallado del rendimiento de la tienda</p>
              </div>

              <div className="d-flex gap-2">
                <select 
                  className="form-select form-select-sm" 
                  value={rangoFecha} 
                  onChange={(e) => setRangoFecha(e.target.value)}
                >
                  <option value="semana">Última Semana</option>
                  <option value="mes">Último Mes</option>
                  <option value="año">Año 2026</option>
                </select>
                <button 
                  className="btn btn-outline-success btn-sm fw-semibold"
                  onClick={() => alert('Exportando informe a Excel/PDF...')}
                >
                  📥 Exportar Reporte
                </button>
              </div>
            </div>

            {/* Tarjetas de Métricas de Reportes */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4">
                <div className="border p-3 rounded bg-light">
                  <span className="text-muted small fw-semibold">VENTAS TOTALES</span>
                  <h3 className="fw-bold text-success m-0 mt-1">$11.680.000</h3>
                  <small className="text-success">↑ 14% vs mes anterior</small>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="border p-3 rounded bg-light">
                  <span className="text-muted small fw-semibold">TOTAL ÓRDENES</span>
                  <h3 className="fw-bold text-primary m-0 mt-1">276 Órdenes</h3>
                  <small className="text-muted">Promedio: 55/mes</small>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="border p-3 rounded bg-light">
                  <span className="text-muted small fw-semibold">PRODUCTO MÁS VENDIDO</span>
                  <h3 className="fw-bold text-dark m-0 mt-1">Miel Orgánica</h3>
                  <small className="text-muted">150 unidades vendidas</small>
                </div>
              </div>
            </div>

            {/* Tabla de Reporte Mensual */}
            <h5 className="fw-bold text-dark mb-3">Histórico de Ventas Mensuales</h5>
            <div className="table-responsive">
              <table className="table table-sm table-striped align-middle m-0">
                <thead>
                  <tr className="table-light">
                    <th className="fw-semibold py-2">Periodo</th>
                    <th className="fw-semibold py-2">Órdenes Atendidas</th>
                    <th className="fw-semibold py-2 text-end">Monto Total</th>
                    <th className="fw-semibold py-2 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {reportesVentas.map((rep, idx) => (
                    <tr key={idx}>
                      <td className="py-2 fw-medium">{rep.mes} 2026</td>
                      <td className="py-2">{rep.ordenes} pedidos</td>
                      <td className="py-2 text-end fw-bold text-dark">{rep.total}</td>
                      <td className="py-2 text-center">
                        <span className="badge bg-success-subtle text-success">
                          {rep.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}