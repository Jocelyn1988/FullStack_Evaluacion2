import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import '../css/admin.css';

const ordenesPorDefecto = [
  {
    id: "SO1001",
    fecha: "2024-06-01",
    cliente: "Acme Corporation",
    email: "acme@empresa.com",
    rut: "76.123.456-7",
    direccion: "Av. Providencia 1234, Santiago",
    estado: "Enviado",
    metodoPago: "Tarjeta de Débito",
    items: [
      { producto: "Manzanas Fuji (10 kg)", cantidad: 10, precioUnitario: 1500, subtotal: 15000 },
      { producto: "Miel Orgánica (2 frascos)", cantidad: 2, precioUnitario: 4500, subtotal: 9000 }
    ],
    total: 24000
  },
  {
    id: "SO1002",
    fecha: "2024-06-02",
    cliente: "Bravo Solutions",
    email: "contacto@bravo.cl",
    rut: "77.987.654-3",
    direccion: "Calle Valparaíso 456, Viña del Mar",
    estado: "Pendiente",
    metodoPago: "Transferencia Bancaria",
    items: [
      { producto: "Zanahorias Orgánicas (5 kg)", cantidad: 5, precioUnitario: 900, subtotal: 4500 },
      { producto: "Leche Entera (5 litros)", cantidad: 5, precioUnitario: 1600, subtotal: 8000 }
    ],
    total: 12500
  },
  {
    id: "SO1003",
    fecha: "2024-06-03",
    cliente: "Charlie's Workshop",
    email: "charlie@workshop.com",
    rut: "15.444.333-2",
    direccion: "Calle Barros Arana 789, Concepción",
    estado: "En proceso",
    metodoPago: "Webpay Plus",
    items: [
      { producto: "Quinua Orgánica (3 kg)", cantidad: 3, precioUnitario: 3200, subtotal: 9600 }
    ],
    total: 9600
  }
];

export default function AdminOrdenes() {
  const [ordenes] = useState(() => {
    try {
      const guardadas = localStorage.getItem('ordenes_registradas');
      if (guardadas) return JSON.parse(guardadas);
    } catch (e) {
      console.error("Error al leer órdenes", e);
    }
    localStorage.setItem('ordenes_registradas', JSON.stringify(ordenesPorDefecto));
    return ordenesPorDefecto;
  });

  // Estado para el flujo MOSTRAR BOLETA
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null);

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <header className="bg-dark text-white px-3 py-2 d-flex align-items-center">
        <span className="fw-semibold small">Huerto Hogar | Panel Admin</span>
      </header>

      <div className="d-flex flex-grow-1 overflow-hidden">
        <AdminSidebar />

        <main className="flex-grow-1 p-4 overflow-auto">
          <div className="card shadow-sm border rounded-0 bg-white p-4">
            
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h2 fw-bold text-dark m-0">Órdenes / Boletas</h1>
            </div>

            {/* TABLA DE ÓRDENES */}
            <div className="table-responsive">
              <table className="table table-sm table-striped align-middle m-0">
                <thead>
                  <tr className="table-light">
                    <th className="fw-semibold py-2">N° Orden / Boleta</th>
                    <th className="fw-semibold py-2">Fecha</th>
                    <th className="fw-semibold py-2">Cliente</th>
                    <th className="fw-semibold py-2">Estado</th>
                    <th className="fw-semibold py-2 text-end">Monto Total</th>
                    <th className="fw-semibold py-2 text-center" style={{ width: '160px' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenes.map((ord) => (
                    <tr key={ord.id}>
                      <td className="py-2 text-dark fw-bold small">{ord.id}</td>
                      <td className="py-2 text-secondary small">{ord.fecha}</td>
                      <td className="py-2 text-dark small">{ord.cliente}</td>
                      <td className="py-2 small">
                        <span className={`badge ${
                          ord.estado === 'Enviado' ? 'bg-success-subtle text-success' :
                          ord.estado === 'Pendiente' ? 'bg-warning-subtle text-warning-emphasis' :
                          'bg-primary-subtle text-primary'
                        }`}>
                          {ord.estado}
                        </span>
                      </td>
                      <td className="py-2 text-end fw-bold small">
                        ${ord.total.toLocaleString('es-CL')} CLP
                      </td>
                      <td className="py-2 text-center">
                        {/* BOTÓN MOSTRAR BOLETA */}
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success fw-semibold px-2 py-1 small d-inline-flex align-items-center gap-1"
                          onClick={() => setBoletaSeleccionada(ord)}
                        >
                          <span>📄</span> MOSTRAR BOLETA
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>

      {/* MODAL: MOSTRAR BOLETA */}
      {boletaSeleccionada && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content shadow border-0">
              
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title fw-bold">BOLETA ELECTRÓNICA #{boletaSeleccionada.id}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setBoletaSeleccionada(null)}></button>
              </div>

              <div className="modal-body p-4">
                {/* Encabezado Boleta */}
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                  <div>
                    <h4 className="fw-bold text-success m-0">HUERTO HOGAR S.A.</h4>
                    <small className="text-muted d-block">Giro: Venta de Productos Agrícolas u Orgánicos</small>
                    <small className="text-muted d-block">R.U.T.: 76.890.123-K</small>
                    <small className="text-muted d-block">Santiago, Chile</small>
                  </div>
                  <div className="text-end">
                    <span className="badge bg-danger fs-6 px-3 py-2 mb-1">R.U.T. CLIENTE: {boletaSeleccionada.rut}</span>
                    <div className="small fw-semibold text-secondary">BOLETA ELECTRÓNICA</div>
                    <div className="small text-muted">Fecha: {boletaSeleccionada.fecha}</div>
                  </div>
                </div>

                {/* Datos Cliente */}
                <div className="bg-light p-3 rounded mb-3 small">
                  <div className="row">
                    <div className="col-6"><strong>Señor(es):</strong> {boletaSeleccionada.cliente}</div>
                    <div className="col-6"><strong>Email:</strong> {boletaSeleccionada.email}</div>
                    <div className="col-6 mt-1"><strong>Dirección:</strong> {boletaSeleccionada.direccion}</div>
                    <div className="col-6 mt-1"><strong>Medio de Pago:</strong> {boletaSeleccionada.metodoPago}</div>
                  </div>
                </div>

                {/* Detalle Productos */}
                <table className="table table-bordered table-sm small mb-3">
                  <thead className="table-light">
                    <tr>
                      <th>Producto / Descripción</th>
                      <th className="text-center">Cant.</th>
                      <th className="text-end">P. Unitario</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boletaSeleccionada.items.map((it, i) => (
                      <tr key={i}>
                        <td>{it.producto}</td>
                        <td className="text-center">{it.cantidad}</td>
                        <td className="text-end">${it.precioUnitario.toLocaleString('es-CL')}</td>
                        <td className="text-end">${it.subtotal.toLocaleString('es-CL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totales Netos y con IVA */}
                <div className="d-flex justify-content-end">
                  <div className="w-50">
                    <div className="d-flex justify-content-between border-bottom py-1 small">
                      <span>Monto Neto:</span>
                      <span>${Math.round(boletaSeleccionada.total / 1.19).toLocaleString('es-CL')} CLP</span>
                    </div>
                    <div className="d-flex justify-content-between border-bottom py-1 small">
                      <span>I.V.A. (19%):</span>
                      <span>${(boletaSeleccionada.total - Math.round(boletaSeleccionada.total / 1.19)).toLocaleString('es-CL')} CLP</span>
                    </div>
                    <div className="d-flex justify-content-between py-2 h5 fw-bold text-dark">
                      <span>TOTAL:</span>
                      <span>${boletaSeleccionada.total.toLocaleString('es-CL')} CLP</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-outline-primary btn-sm fw-semibold"
                  onClick={() => window.print()}
                >
                  🖨️ Imprimir Boleta
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm" 
                  onClick={() => setBoletaSeleccionada(null)}
                >
                  Cerrar
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}