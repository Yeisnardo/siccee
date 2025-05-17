import { NavLink } from "react-router-dom";

const Menu = () => {
  const activeClassName = "bg-gray-300"; // Clase para el estado activo

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen p-4 fixed top-0 left-0 z-50">
      <nav className="flex flex-col space-y-4 mt-16">
        {/* Inicio */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors duration-200 ${
              isActive ? activeClassName : ""
            }`
          }
        >
          <i className='bx bx-home mr-3'></i>
          Inicio
        </NavLink>
        {/* Perfil */}
        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            `flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors duration-200 ${
              isActive ? activeClassName : ""
            }`
          }
        >
          <i className='bx bx-user mr-3'></i>
          Perfil
        </NavLink>
        {/* Estadísticas */}
        <NavLink
          to="/estadisticas"
          className={({ isActive }) =>
            `flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors duration-200 ${
              isActive ? activeClassName : ""
            }`
          }
        >
          <i className='bx bx-line-chart mr-3'></i>
          Estadísticas
        </NavLink>
        {/* Configuración */}
        <NavLink
          to="/config"
          className={({ isActive }) =>
            `flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors duration-200 ${
              isActive ? activeClassName : ""
            }`
          }
        >
          <i className='bx bx-cog mr-3'></i>
          Configuración
        </NavLink>
      </nav>
    </aside>
  );
};

export default Menu;