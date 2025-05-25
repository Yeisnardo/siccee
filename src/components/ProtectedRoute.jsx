// src/components/ProtectedRoute.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioStr = localStorage.getItem('usuario');
    const estatus = localStorage.getItem('estatus');

    if (!usuarioStr || estatus !== 'Activo') {
      if (estatus !== 'Activo' && estatus !== null) {
        // Mostrar mensaje solo si el usuario está inactivo
        Swal.fire({
          icon: 'error',
          title: 'Usuario Inactivo',
          text: 'Tu cuenta está inactiva. Por favor, contacta al administrador.',
        }).then(() => {
          // Después de mostrar, redirige al login
          localStorage.clear();
          navigate('/'); // o '/login' si esa es tu ruta de login
        });
        return; // Para evitar que siga cargando el children
      } else {
        // Si no hay usuario, simplemente redirige
        localStorage.clear();
        navigate('/');
      }
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;