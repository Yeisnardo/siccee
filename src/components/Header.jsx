// src/components/Header.jsx
import { useState } from 'react';
import '../assets/css/style.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  return (
    <header className="w-full fixed top-0 left-0 bg-gray-800 p-4 shadow-md z-50 flex items-center justify-between">
      
      {/* Botón para abrir/cerrar menú hamburguesa */}
      <button
        onClick={toggleMenu}
        className="text-white focus:outline-none md:hidden mr-4"
        aria-label="Toggle menu"
      >
        {/* Icono de BoxIcons para menu/close */}
        <i className={`bx ${menuOpen ? 'bxs-x' : 'bx-menu'}`} style={{ fontSize: '24px' }}></i>
      </button>

      {/* Título principal */}
      <h1 className="text-xl font-bold text-white mx-4">IFEMI</h1>

      {/* Íconos de notificaciones y perfil */}
      <div className="flex items-center space-x-4 relative">
        
        {/* Icono de notificaciones */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="text-white focus:outline-none"
            aria-label="Notificaciones"
          >
            {/* Icono de BoxIcons para notificaciones */}
            <i className="bx bxs-bell" style={{ fontSize: '24px' }}></i>
            {/* Indicador de nuevas notificaciones */}
            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Menú de notificaciones */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 animate-fadeInDown">
              <div className="p-4 border-b border-gray-200 font-semibold text-gray-700">Notificaciones</div>
              <div className="flex flex-col divide-y divide-gray-200">
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <i className="bx bx-envelope mr-2"></i> Nuevo mensaje recibido
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <i className="bx bx-edit mr-2"></i> Tarea asignada
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                  <i className="bx bx-bell mr-2"></i> Recordatorio importante
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Perfil */}
        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="text-white focus:outline-none flex items-center px-3 py-2 rounded hover:bg-gray-700 transition"
            aria-label="Perfil"
          >
            {/* Icono de BoxIcons para usuario */}
            <i className="bx bxs-user" style={{ fontSize: '24px' }}></i>
            <span className="hidden sm:inline ml-2">Usuario</span>
          </button>

          {/* Menú desplegable de perfil */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50 animate-fadeInDown">
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left flex items-center"
                onClick={() => {
                  alert('Configuraciones');
                  setProfileMenuOpen(false);
                }}
              >
                <i className="bx bx-cog mr-2"></i> Configuraciones
              </button>
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left flex items-center"
                onClick={() => {
                  alert('Cerrar sesión');
                  setProfileMenuOpen(false);
                }}
              >
                <i className="bx bx-log-out mr-2"></i> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;