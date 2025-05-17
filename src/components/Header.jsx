// src/components/Header.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redireccionar
import Swal from "sweetalert2"; // Para las alertas
import logo from "../assets/imagenes/logo_header.jpg";
import "../assets/css/style.css";

const Header = ({ toggleMenu, menuOpen }) => {
  const navigate = useNavigate(); // Instancia para navegar
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleToggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleToggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const handleCerrarSesion = () => {
    Swal.fire({
      title: "¿Estás seguro que quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("¡Sesión cerrada!", "", "success");
        setProfileMenuOpen(false);
        // Redireccionar a la página de login
        navigate("/");
      }
    });
  };

  // Funciones para los botones independientes
  const irACaracterizacion = () => {
    alert("Ir a Caracterización");
  };
  const irAEmprendimiento = () => {
    alert("Ir a Emprendimiento");
  };
  const irACredito = () => {
    alert("Ir a Crédito");
  };

  return (
    <header className="w-full fixed top-0 left-0 bg-gray-800 p-4 shadow-md z-50 flex items-center justify-between">
      {/* Logo y título */}
      <div className="flex items-center mx-4">
        {/* Logo circular, tamaño ajustado */}
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        {/* Texto 'IFEMI' solo visible en pantallas sm en adelante */}
        <h1 className="text-xl font-bold text-white hidden sm:inline">IFEMI</h1>
      </div>

      {/* Botón para abrir/cerrar menú hamburguesa */}
      <button
        onClick={toggleMenu}
        className="text-white focus:outline-none md:hidden mr-4"
        aria-label="Toggle menu"
      >
        <i
          className={`bx ${menuOpen ? "bxs-x" : "bx-menu"}`}
          style={{ fontSize: "24px" }}
        ></i>
      </button>

      {/* Área con los botones independientes */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Botón Caracterización */}
        <button
          className="flex items-center text-white px-3 py-1 rounded hover:bg-gray-700 transition"
          onClick={irACaracterizacion}
          title="Caracterización"
        >
          <i className="bx bx-user-circle mr-2"></i>
          {/* Texto solo visible en pantallas medianas y superiores */}
          <span className="hidden sm:inline">Caracterización</span>
        </button>

        {/* Botón Emprendimiento */}
        <button
          className="flex items-center text-white px-3 py-1 rounded hover:bg-gray-700 transition"
          onClick={irAEmprendimiento}
          title="Emprendimiento"
        >
          <i className="bx bx-rocket mr-2"></i>
          <span className="hidden sm:inline">Emprendimiento</span>
        </button>

        {/* Botón Crédito */}
        <button
          className="flex items-center text-white px-3 py-1 rounded hover:bg-gray-700 transition"
          onClick={irACredito}
          title="Crédito"
        >
          <i className="bx bx-credit-card mr-2"></i>
          <span className="hidden sm:inline">Crédito</span>
        </button>
      </div>

      {/* Iconos de notificaciones y perfil */}
      <div className="flex items-center space-x-4 ml-4 relative">
        {/* Notificaciones */}
        <div className="relative">
          <button
            onClick={handleToggleNotifications}
            className="text-white focus:outline-none"
            aria-label="Notificaciones"
          >
            <i className="bx bxs-bell" style={{ fontSize: "24px" }}></i>
            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 animate-fadeInDown">
              <div className="p-4 border-b border-gray-200 font-semibold text-gray-700">
                Notificaciones
              </div>
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
            onClick={handleToggleProfileMenu}
            className="text-white focus:outline-none flex items-center px-3 py-2 rounded hover:bg-gray-700 transition"
            aria-label="Perfil"
          >
            <i className="bx bxs-user" style={{ fontSize: "24px" }}></i>
            <span className="hidden sm:inline ml-2">Usuario</span>
          </button>

          {/* Menú perfil */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50 animate-fadeInDown">
              <button
                className="block px-4 py-2 w-full text-left hover:bg-gray-100 flex items-center"
                onClick={() => {
                  alert("Configuraciones");
                  setProfileMenuOpen(false);
                }}
              >
                <i className="bx bx-cog mr-2"></i> Configuraciones
              </button>
              <button
                className="block px-4 py-2 w-full text-left hover:bg-gray-100 flex items-center"
                onClick={() => {
                  alert("Ver Perfil");
                  setProfileMenuOpen(false);
                }}
              >
                <i className="bx bx-user-circle mr-2"></i> Ver Perfil
              </button>
              <button
                className="block px-4 py-2 w-full text-left hover:bg-gray-100 flex items-center"
                onClick={handleCerrarSesion}
              >
                <i className="bx bx-log-out mr-2"></i> Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;