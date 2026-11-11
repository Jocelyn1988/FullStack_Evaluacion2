import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import IniciarSesion from './pages/IniciarSesion';
import RegistrarUsuario from './pages/RegistrarUsuario';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsuarios from './pages/AdminUsuarios';
import AdminCategorias from './pages/AdminCategorias';
import AdminReportes from './pages/AdminReportes';
import AdminPerfil from './pages/AdminPerfil';
import Categorias from './pages/Categorias';
import Checkout from './pages/Checkout';
import PagoExitoso from './pages/PagoExitoso';
import PagoError from './pages/PagoError';
import Ofertas from './pages/Ofertas';
import AdminOrdenes from './pages/AdminOrdenes';
import AdminProductos from './pages/AdminProductos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tienda y Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/detalle_producto" element={<DetalleProducto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/iniciar_sesion" element={<IniciarSesion />} />
        <Route path="/registrar_usuario" element={<RegistrarUsuario />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pago_exitoso" element={<PagoExitoso />} />
        <Route path="/pago_error" element={<PagoError />} />
        <Route path="/ofertas" element={<Ofertas />} />

        {/* Rutas del Administrador */}
        <Route path="/admin" element={<AdminDashboard />} /> 
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/categorias" element={<AdminCategorias />} />
        <Route path="/admin/reportes" element={<AdminReportes />} />
        <Route path="/admin/perfil" element={<AdminPerfil />} />
        <Route path="/admin/ordenes" element={<AdminOrdenes />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;