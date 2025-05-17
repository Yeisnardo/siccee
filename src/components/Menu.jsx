// src/components/Menu.jsx
import { NavLink } from "react-router-dom";

const Menu = ({ onClose }) => {
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
          onClick={onClose}
        >
          <i className='bx bx-home mr-3 text-xl'></i>
          <span>Inicio</span>
        </NavLink>

        {/* Perfil Financiero */}
        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            `flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors duration-200 ${
              isActive ? activeClassName : ""
            }`
          }
          onClick={onClose}
        >
          <i className='bx bx-user mr-3 text-xl'></i>
          <span>Perfil Financiero</span>
        </NavLink>

        {/* Estadísticas */}
        <NavLink
          to="/estadisticas"
          className={({ isActive }) =>
            `flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors duration-200 ${
              isActive ? activeClassName : ""
            }`
          }
          onClick={onClose}
        >
          <i className='bx bx-line-chart mr-3 text-xl'></i>
          <span>Gestión de Usuarios</span>
        </NavLink>

        {/* Configuración */}
        <NavLink
          to="/config"
          className={({ isActive }) =>
            `flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors duration-200 ${
              isActive ? activeClassName : ""
            }`
          }
          onClick={onClose}
        >
          <i className='bx bx-user mr-3 text-xl'></i>
          <span>Gestión de Emprendedor</span>
        </NavLink>

        {/* Aprobación de Solicitud */}
        <NavLink
          to="/aprobacion"
          className={({ isActive }) =>
            `flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors duration-200 ${
              isActive ? activeClassName : ""
            }`
          }
          onClick={onClose}
        >
          <i className='bx bx-check-circle mr-3 text-xl'></i>
          <span>Aprobación de Solicitud</span>
        </NavLink>

        {/* Gestión de Crédito */}
        <NavLink
          to="/credito"
          className={({ isActive }) =>
            `flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors duration-200 ${
              isActive ? activeClassName : ""
            }`
          }
          onClick={onClose}
        >
          <i className='bx bx-credit-card mr-3 text-xl'></i>
          <span>Gestión de Crédito</span>
        </NavLink>

        {/* Gestión de Amortización */}
        <NavLink
          to="/amortizacion"
          className={({ isActive }) =>
            `flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors duration-200 ${
              isActive ? activeClassName : ""
            }`
          }
          onClick={onClose}
        >
          <i className='bx bx-money-withdraw mr-3 text-xl'></i>
          <span>Gestión de Amortización</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Menu;