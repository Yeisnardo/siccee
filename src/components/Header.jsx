// src/components/Header.jsx
import { useState } from 'react';
import '../assets/css/style.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full fixed top-0 left-0 bg-gray-800 p-4 shadow-md z-50 flex items-center justify-between">
      {/* Botón para abrir/cerrar menu con icono */}
      <button
        onClick={toggleMenu}
        className="text-white focus:outline-none md:hidden mr-4"
        aria-label="Toggle menu"
      >
        {/* Icono Material Icons que cambia según estado */}
        <span className="material-icons">{menuOpen ? 'close' : 'menu'}</span>
      </button>
      {/* Título */}
      <h1 className="text-xl font-bold text-white">Mi Aplicación</h1>
    </header>
  );
};

export default Header;