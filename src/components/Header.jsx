import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/imagenes/logo_header.jpg";
import "../assets/css/style.css";

const Header = ({ toggleMenu, menuOpen, user }) => {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
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
        navigate("/");
      }
    });
  };

  const handleAbrirConfiguracion = async () => {
    // Preguntar qué desea cambiar
    const { value } = await Swal.fire({
      title: '¿Qué deseas cambiar?',
      input: 'radio',
      inputOptions: {
        password: 'Contraseña',
        user: 'Usuario',
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor, selecciona una opción';
        }
      },
      showCancelButton: true,
    });

    if (value === 'password') {
      // Cambiar contraseña
      await Swal.fire({
        title: 'Cambiar Contraseña',
        html: `
          <input id="password" type="password" placeholder="Nueva Contraseña" class="swal2-input"/>
          <input id="repeatPassword" type="password" placeholder="Repetir Contraseña" class="swal2-input"/>
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          const pass = document.getElementById('password').value.trim();
          const repeatPass = document.getElementById('repeatPassword').value.trim();

          if (!pass || !repeatPass) {
            Swal.showValidationMessage('Por favor, completa todos los campos');
            return false;
          }
          if (pass.length < 6) {
            Swal.showValidationMessage('La contraseña debe tener al menos 6 caracteres');
            return false;
          }
          if (pass !== repeatPass) {
            Swal.showValidationMessage('Las contraseñas no coinciden');
            return false;
          }
          return { pass };
        },
      }).then(({ value }) => {
        if (value) {
          // Aquí realiza la llamada a API para cambiar contraseña
          Swal.fire('Éxito', 'Su contraseña ha sido actualizada', 'success');
        }
      });
    } else if (value === 'user') {
      // Cambiar usuario
      await Swal.fire({
        title: 'Cambiar Usuario',
        html: `
          <input id="usuario" type="text" placeholder="Nuevo Usuario" class="swal2-input"/>
          <input id="repeatUsuario" type="text" placeholder="Repetir Usuario" class="swal2-input"/>
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          const user = document.getElementById('usuario').value.trim();
          const repeatUser = document.getElementById('repeatUsuario').value.trim();

          if (!user || !repeatUser) {
            Swal.showValidationMessage('Por favor, completa todos los campos');
            return false;
          }
          if (user.length < 6) {
            Swal.showValidationMessage('El usuario debe tener al menos 6 caracteres');
            return false;
          }
          if (user !== repeatUser) {
            Swal.showValidationMessage('Los usuarios no coinciden');
            return false;
          }
          return { user };
        },
      }).then(({ value }) => {
        if (value) {
          // Aquí realiza la llamada a API para cambiar usuario
          Swal.fire('Éxito', 'Su usuario ha sido actualizado', 'success');
        }
      });
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 bg-gray-800 p-4 shadow-md z-50 flex items-center justify-between">
      {/* Logo y título */}
      <div className="flex items-center mx-4">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover mr-3" />
        <h1 className="text-xl font-bold text-white hidden sm:inline">IFEMI</h1>
      </div>

      {/* Botón de menú (en móviles) */}
      <button
        onClick={toggleMenu}
        className="text-white focus:outline-none md:hidden mr-4"
        aria-label="Toggle menu"
      >
        <i className={`bx ${menuOpen ? "bxs-x" : "bx-menu"}`} style={{ fontSize: "24px" }}></i>
      </button>

      {/* Botones de navegación */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Ejemplo: Botones de navegación */}
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

      {/* Perfil y notificaciones */}
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
            <span className="hidden sm:inline ml-2">{user?.nombre || "Usuario"}</span>
          </button>

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

      {/* Tarjeta perfil en línea estilo WhatsApp */}
{profileOnline && (
  <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg z-50 p-4 animate-fadeInUp">
    <div className="flex items-center mb-4">
      <div className="relative">
        <div className="relative">
          <img
            src="../public/OIP.jpeg" // Aquí puedes poner la foto del usuario
            alt="Perfil"
            className="w-20 h-20 rounded-full object-cover border-4 border-green-500"
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center">
          <i className="bx bx-user-circle mr-2 text-xl text-gray-600"></i>
          {user?.nombre || "Usuario"} {/* Muestra el nombre del usuario */}
        </h3>
        <p className="text-sm text-gray-500 flex items-center">
          <i className="bx bx-shield-quarter mr-2 text-lg text-gray-400"></i>
          Rol: <span className="font-semibold ml-1">{user?.rol || "Rol"}</span> {/* Muestra el rol del usuario */}
        </p>
      </div>
    </div>
  </div>
)}
    </header>
  );
};

export default Header;