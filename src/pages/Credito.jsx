import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/css/style.css";
import Header from "../components/Header";
import Menu from "../components/Menu";
import api from "../services/api_usuario"; // Tu API

const Credito = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(true);
  const [user, setUser] = useState(null);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    comentario: ""
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.getUsers();
        if (response.length > 0) {
          setUser(response[0]);
        }
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnviar = () => {
    Swal.fire({
      icon: "success",
      title: "Solicitud enviada",
      text: "Su solicitud de crédito ha sido enviada exitosamente.",
    });
    // Aquí puedes agregar lógica para enviar el formulario a tu backend
  };

  const handleCancelar = () => {
    Swal.fire({
      icon: "warning",
      title: "Cancelar",
      text: "¿Está seguro que desea cancelar?",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData({ nombre: "", apellido: "", cedula: "", comentario: "" });
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Menú condicional */}
      {menuOpen && <Menu />}

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        <Header user={user} toggleMenu={toggleMenu} menuOpen={menuOpen} />

        {/* Contenido principal con encabezado y formulario */}
        <div className="p-8 flex-1">
          {/* Título principal */}
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
            Solicitud de Crédito
          </h2>

          {/* Formulario */}
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            {/* Nombre */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700 flex items-center">
                <i className='bx bx-user mr-2'></i> Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ingrese su nombre"
              />
            </div>

            {/* Apellido */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700 flex items-center">
                <i className='bx bx-user-circle mr-2'></i> Apellido
              </label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ingrese su apellido"
              />
            </div>

            {/* Cédula */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700 flex items-center">
                <i className='bx bx-id-card mr-2'></i> Cédula
              </label>
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ingrese su cédula"
              />
            </div>

            {/* Comentario */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700 flex items-center">
                <i className='bx bx-message-rounded-detail mr-2'></i> Comentario
              </label>
              <textarea
                name="comentario"
                value={formData.comentario}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Agregue su comentario"
                rows={4}
              ></textarea>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleCancelar}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow"
              >
                Cancelar
              </button>
              <button
                onClick={handleEnviar}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <footer className="mt-auto p-4 text-center text-gray-500 bg-gray-100 border-t border-gray-300">
          © {new Date().getFullYear()} TuEmpresa. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
};

export default Credito;