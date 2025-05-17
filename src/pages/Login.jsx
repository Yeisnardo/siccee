import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import Swal from 'sweetalert2'; // Importar SweetAlert2
import miImagen from "../assets/imagenes/logo_ifemi.jpg";
import '../assets/css/style.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Crear la función de navegación

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (username.trim() === "" || password.trim() === "") {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }

    // Validación adicional (ejemplo: mínimo de caracteres)
    if (username.length < 5) {
      Swal.fire({
        icon: 'error',
        title: 'Nombre de usuario inválido',
        text: 'El nombre de usuario debe tener al menos 5 caracteres.',
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña inválida',
        text: 'La contraseña debe tener al menos 6 caracteres.',
      });
      return;
    }

    // Si pasa todas las validaciones, navega
    // Aquí puedes agregar lógica de autenticación
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen">
      {/* Lado izquierdo con la imagen */}
      <div className="w-1/2 hidden md:flex items-center justify-center p-4 bg-logoLoginEfimi">
        <div className="relative rounded-lg overflow-hidden w-max h-max">
          {/* Pseudo-elemento para el degradado */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500 opacity-50"></div>
          {/* Imagen */}
          <img
            src={miImagen}
            alt="Descripción de la imagen"
            className="max-w-xs max-h-xs object-cover relative z-10"
          />
        </div>
      </div>

      {/* Lado derecho con el formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
            Iniciar Sesión
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre de Usuario */}
            <div className="relative">
              <label
                htmlFor="username"
                className="block mb-1 text-sm font-medium text-gray-600 text-left"
              >
                Nombre de Usuario
              </label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                <i className="bx bxs-user mr-2 text-gray-500"></i>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full outline-none"
                  placeholder="Tu nombre de usuario"
                />
              </div>
            </div>
            {/* Contraseña */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-600 text-left"
              >
                Contraseña
              </label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                <i className="bx bxs-lock mr-2 text-gray-500"></i>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none"
                  placeholder="Tu contraseña"
                />
              </div>
            </div>
            {/* Botón */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;