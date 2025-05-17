// src/pages/Login.jsx
import { useState } from "react";
import miImagen from "../assets/imagenes/logo_ifemi.jpg";
import '../assets/css/style.css'; // Importa los estilos CSS personalizados

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Nombre de Usuario: ${username}\nPassword: ${password}`);
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
            <div>
              <label
                htmlFor="username"
                className="block mb-1 text-sm font-medium text-gray-600 text-left"
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Tu nombre de usuario"
              />
            </div>
            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-600 text-left"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Tu contraseña"
              />
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
