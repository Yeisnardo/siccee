// src/components/Menu.jsx
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen p-4 fixed top-0 left-0 z-50">
      <nav className="flex flex-col space-y-4 mt-16">
        <Link to="/dashboard" className="text-gray-700 hover:bg-gray-200 p-2 rounded">
          Inicio
        </Link>
        <Link to="/perfil" className="text-gray-700 hover:bg-gray-200 p-2 rounded">
          Perfil
        </Link>
        <Link to="/estadisticas" className="text-gray-700 hover:bg-gray-200 p-2 rounded">
          Estadísticas
        </Link>
        <Link to="/config" className="text-gray-700 hover:bg-gray-200 p-2 rounded">
          Configuración
        </Link>
      </nav>
    </aside>
  );
};

export default Menu;