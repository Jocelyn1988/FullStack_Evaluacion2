import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Tipado estricto de los roles permitidos
export type RolUsuario = 'usuario' | 'admin';

interface IniciarSesionProps {
  onLoginSuccess?: (email: string, rol: RolUsuario) => void;
}

export const IniciarSesion: React.FC<IniciarSesionProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rol, setRol] = useState<RolUsuario>('usuario');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Si intenta ingresar como Administrador, validamos credenciales de Admin
    if (rol === 'admin') {
      const esCorreoAdmin = email.toLowerCase() === 'admin@huertohogar.cl';
      const esClaveCorrecta = password === 'admin123'; // Cambia o elimina según la lógica de tu backend/contexto

      if (!esCorreoAdmin || !esClaveCorrecta) {
        setErrorMsg('Acceso denegado: Este correo o contraseña no corresponde a una cuenta Administradora.');
        return;
      }
    }

    // 2. Si la validación pasa o es usuario estándar:
    if (onLoginSuccess) {
      onLoginSuccess(email, rol);
    }

    // 3. Redirección según rol
    if (rol === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <Navbar />

      <main className="container my-5 py-4 d-flex justify-content-center align-items-center">
        <div style={{ maxWidth: '400px', width: '100%', padding: '30px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)' }}>
          <h2 className="mb-4 text-center fw-bold">Iniciar Sesión</h2>

          {/* Selector de rol: Usuario o Administrador */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => { setRol('usuario'); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: rol === 'usuario' ? '#0d6efd' : '#f8f9fa',
                color: rol === 'usuario' ? '#fff' : '#000',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Usuario
            </button>
            <button
              type="button"
              onClick={() => { setRol('admin'); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: rol === 'admin' ? '#198754' : '#f8f9fa',
                color: rol === 'admin' ? '#fff' : '#000',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Administrador
            </button>
          </div>

          {/* Mensaje de error cuando no es un Admin válido */}
          {errorMsg && (
            <div className="alert alert-danger py-2 text-center small fw-bold mb-3" role="alert">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
              Modo actual seleccionado: <strong>{rol === 'usuario' ? 'Usuario Estándar' : 'Administrador'}</strong>
            </p>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Correo electrónico:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={rol === 'admin' ? 'admin@huertohogar.cl' : 'tu@correo.com'}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ced4da', borderRadius: '4px' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Contraseña:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ced4da', borderRadius: '4px' }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: rol === 'admin' ? '#198754' : '#0d6efd',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Entrar como {rol === 'usuario' ? 'Usuario' : 'Administrador'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default IniciarSesion;