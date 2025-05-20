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

  // Estado para la modal de configuración
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [changingPassword, setChangingPassword] = useState(true); // true: cambio contraseña, false: cambio usuario
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [usuario, setUsuario] = useState("");
  const [repeatUsuario, setRepeatUsuario] = useState("");

  // Estado para la tarjeta de perfil en línea
  const [profileOnline, setProfileOnline] = useState(true);

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

  // Función para abrir la modal de configuración
  const handleAbrirConfiguracion = () => {
    setChangingPassword(true);
    setPassword("");
    setRepeatPassword("");
    setUsuario("");
    setRepeatUsuario("");
    setConfigModalOpen(true);
    setProfileMenuOpen(false);
  };

  const handleCerrarModal = () => {
    setConfigModalOpen(false);
  };

  const handleConfirmarCambio = () => {
    if (changingPassword) {
      // Validar contraseña
      if (!password || !repeatPassword) {
        Swal.fire("Error", "Por favor, completa todos los campos", "error");
        return;
      }
      if (password.length < 6) {
        Swal.fire("Error", "La contraseña debe tener al menos 6 caracteres", "error");
        return;
      }
      if (password !== repeatPassword) {
        Swal.fire("Error", "Las contraseñas no coinciden", "error");
        return;
      }
      Swal.fire("Cambio exitoso", "Su contraseña ha sido actualizada", "success");
      setConfigModalOpen(false);
    } else {
      // Validar usuario
      if (!usuario || !repeatUsuario) {
        Swal.fire("Error", "Por favor, completa todos los campos", "error");
        return;
      }
      if (usuario.length < 6) {
        Swal.fire("Error", "El usuario debe tener al menos 6 caracteres", "error");
        return;
      }
      if (usuario !== repeatUsuario) {
        Swal.fire("Error", "Los usuarios no coinciden", "error");
        return;
      }
      Swal.fire("Cambio exitoso", "Su usuario ha sido actualizado", "success");
      setConfigModalOpen(false);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 bg-gray-800 p-4 shadow-md z-50 flex items-center justify-between">
      {/* Logo y título */}
      <div className="flex items-center mx-4">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover mr-3" />
        <h1 className="text-xl font-bold text-white hidden sm:inline">IFEMI</h1>
      </div>

      {/* Botón para abrir/cerrar menú hamburguesa */}
      <button
        onClick={toggleMenu}
        className="text-white focus:outline-none md:hidden mr-4"
        aria-label="Toggle menu"
      >
        <i className={`bx ${menuOpen ? "bxs-x" : "bx-menu"}`} style={{ fontSize: "24px" }}></i>
      </button>

      {/* Área con botones independientes */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Botones de navegación */}
        <button
          className="flex items-center text-white px-3 py-1 rounded hover:bg-gray-700 transition"
          onClick={() => alert("Ir a Caracterización")}
          title="Caracterización"
        >
          <i className="bx bx-user-circle mr-2"></i>
          <span className="hidden sm:inline">Caracterización</span>
        </button>
        <button
          className="flex items-center text-white px-3 py-1 rounded hover:bg-gray-700 transition"
          onClick={() => alert("Ir a Emprendimiento")}
          title="Emprendimiento"
        >
          <i className="bx bx-rocket mr-2"></i>
          <span className="hidden sm:inline">Emprendimiento</span>
        </button>
        <button
          className="flex items-center text-white px-3 py-1 rounded hover:bg-gray-700 transition"
          onClick={() => alert("Ir a Crédito")}
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
                  handleAbrirConfiguracion();
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

      {/* Modal configuración */}
      {configModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          style={{
            background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
          }}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">
              {changingPassword ? "Cambiar Contraseña" : "Cambiar Usuario"}
            </h2>
            {changingPassword ? (
              <>
                {/* Icono de candado para contraseña */}
                <div className="mb-4 flex items-center">
                  <i className="bx bx-lock-alt mr-2 text-xl"></i>
                  <div className="w-full">
                    <label className="block mb-1 font-medium">Contraseña</label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                    />
                  </div>
                </div>
                <div className="mb-4 flex items-center">
                  <i className="bx bx-lock-alt mr-2 text-xl"></i>
                  <div className="w-full">
                    <label className="block mb-1 font-medium">Repetir Contraseña</label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      placeholder="Repetir Contraseña"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Icono de usuario */}
                <div className="mb-4 flex items-center">
                  <i className="bx bx-user mr-2 text-xl"></i>
                  <div className="w-full">
                    <label className="block mb-1 font-medium">Usuario</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                      placeholder="Nuevo Usuario"
                    />
                  </div>
                </div>
                {/* Repetir usuario */}
                <div className="mb-4 flex items-center">
                  <i className="bx bx-user mr-2 text-xl"></i>
                  <div className="w-full">
                    <label className="block mb-1 font-medium">Repetir Usuario</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={repeatUsuario}
                      onChange={(e) => setRepeatUsuario(e.target.value)}
                      placeholder="Repetir Usuario"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Botones */}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleCerrarModal}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleConfirmarCambio}
              >
                Confirmar
              </button>
            </div>

            {/* Enlace para cambiar modo contraseña/usuario */}
            <div className="mt-4 text-center">
              {changingPassword ? (
                <button
                  className="text-blue-500 underline text-sm"
                  onClick={() => setChangingPassword(false)}
                >
                  ¿Deseas cambiar el usuario? Haz clic aquí
                </button>
              ) : (
                <button
                  className="text-blue-500 underline text-sm"
                  onClick={() => setChangingPassword(true)}
                >
                  ¿Deseas cambiar la contraseña? Haz clic aquí
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tarjeta perfil en línea estilo WhatsApp */}
{profileOnline && (
  <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg z-50 p-4 animate-fadeInUp">
    {/* Encabezado */}
    <div className="flex items-center mb-4">
      <div className="relative">
        {/* Imagen en línea con efecto estilo WhatsApp */}
        <div className="relative">
          <img
            src="../public/OIP.jpeg" // Aquí puedes poner la foto del usuario
            alt="Perfil"
            className="w-20 h-20 rounded-full object-cover border-4 border-green-500"
          />
          {/* Estado en línea */}
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center">
          <i className="bx bx-user-circle mr-2 text-xl text-gray-600"></i>
          Angel Marinez
        </h3>
        <p className="text-sm text-gray-500 flex items-center">
          <i className="bx bx-shield-quarter mr-2 text-lg text-gray-400"></i>
          Rol: <span className="font-semibold ml-1">Administrador</span>
        </p>
      </div>
    </div>
  </div>
)}
    </header>
  );
};

export default Header;