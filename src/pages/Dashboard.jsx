// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import '../assets/css/style.css';
import Header from "../components/Header";
import Menu from "../components/Menu";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica de cierre de sesión
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Menú lateral */}
      <Menu />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Encabezado con título y botón */}
        <header className="flex items-center justify-between px-8 py-4 bg-gray-100 border-b border-gray-300">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="mt-2 text-gray-600">Bienvenido a tu panel de control.</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Cerrar sesión
          </button>
        </header>

        {/* Sección de tarjetas */}
        <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {/* Tarjeta 1 */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Resumen de usuario</h2>
            <p>Nombre: Yei5</p>
            <p>Status: Activo</p>
          </div>
          {/* Tarjeta 2 */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Estadísticas</h2>
            <p>Mensajes enviados: 120</p>
            <p>Sesiones hoy: 5</p>
          </div>
          {/* Tarjeta 3 */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Configuraciones</h2>
            <ul className="list-disc list-inside">
              <li>Perfil</li>
              <li>Seguridad</li>
              <li>Notificaciones</li>
            </ul>
          </div>
        </section>

        {/* Pie de página */}
        <footer className="mt-auto p-4 text-center text-gray-500 bg-gray-100 border-t border-gray-300">
          © {new Date().getFullYear()} TuEmpresa. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;