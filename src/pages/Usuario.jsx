import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Swal from 'sweetalert2';

const Usuario = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showModal, setShowModal] = useState(false);

  // Datos iniciales
  const [data, setData] = useState([
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan.perez@example.com",
      rol: "Administrador",
    },
    {
      id: 2,
      nombre: "María Gómez",
      email: "maria.gomez@example.com",
      rol: "Editor",
    },
    {
      id: 3,
      nombre: "Carlos López",
      email: "carlos.lopez@example.com",
      rol: "Usuario",
    },
  ]);

  // Estados para formulario de nuevo usuario
  const [newNombre, setNewNombre] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRol, setNewRol] = useState("");

  // Funciones para abrir y cerrar modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    // Limpiar los campos del formulario
    setNewNombre("");
    setNewEmail("");
    setNewRol("");
  };

  // Función para agregar nuevo usuario
  const handleAddUser = (e) => {
    e.preventDefault();
    const newId = data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;
    const newUser = {
      id: newId,
      nombre: newNombre,
      email: newEmail,
      rol: newRol,
    };
    setData((prev) => [...prev, newUser]);
    handleCloseModal();
  };

  // Filtrar datos
  const filteredData = data.filter(
    (item) =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordenar datos
  const sortedData = useMemo(() => {
    if (sortConfig.key) {
      const sorted = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
      return sorted;
    }
    return filteredData;
  }, [filteredData, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {menuOpen && <Menu />}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        {/* Header */}
        <Header toggleMenu={toggleMenu} />

        {/* Contenido principal */}
        <div className="pt-20 pb-20 px-6 md:px-12">
          {/* Encabezado */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-3 rounded-full shadow-lg text-white">
                <i className="bx bx-user text-2xl"></i>
              </div>
              <h1 className="text-3xl font-semibold text-gray-800">
                Gestión de Usuarios
              </h1>
            </div>
          </div>

          {/* Barra de búsqueda y botón */}
          <div className="mb-6 max-w-4xl mx-auto flex items-center space-x-4">
            {/* Buscador */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full p-3 pl-10 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4-4m0 0A7 7 0 104 4a7 7 0 0013 13z"
                  />
                </svg>
              </div>
            </div>
            {/* Botón para abrir modal */}
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-full shadow-lg transition"
              onClick={handleOpenModal}
            >
              + Nuevo Usuario
            </button>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white max-w-4xl mx-auto mb-20">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    { label: "ID", key: "id" },
                    { label: "Nombre", key: "nombre" },
                    { label: "Email", key: "email" },
                    { label: "Rol", key: "rol" },
                  ].map(({ label, key }) => (
                    <th
                      key={key}
                      className="px-4 py-3 cursor-pointer select-none text-gray-700 font-medium hover:bg-gray-100 transition"
                      onClick={() => handleSort(key)}
                    >
                      <div className="flex items-center justify-between">
                        {label}
                        {sortConfig.key === key ? (
                          <span className="text-sm">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        ) : null}
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-gray-700 font-medium">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedData.length > 0 ? (
                  sortedData.map((item) => (
                    <tr key={item.id} className="transition hover:bg-gray-100">
                      <td className="px-4 py-3 text-center text-gray-600">
                        {item.id}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{item.nombre}</td>
                      <td className="px-4 py-3 text-gray-700">{item.email}</td>
                      <td className="px-4 py-3 text-gray-700">{item.rol}</td>
                      <td className="px-4 py-3 flex justify-center space-x-3">
                     {/* Ícono de editar */}

<button
  className="text-blue-600 hover:text-blue-800"
  onClick={() => alert(`Editar usuario ${item.id}`)}
  aria-label="Editar"
>
  <i className='bx bx-edit-alt text-xl'></i>
</button>

{/* Botón de eliminar con SweetAlert2 */}
<button
  className="text-red-600 hover:text-red-800"
  onClick={() => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al usuario ${item.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes agregar la lógica para eliminar el usuario
        Swal.fire(
          'Eliminado!',
          `El usuario ${item.id} ha sido eliminado.`,
          'success'
        );
      }
    });
  }}
  aria-label="Eliminar"
>
  <i className='bx bx-trash text-xl'></i>
</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-4 text-gray-500 font-semibold"
                    >
                      No se encontraron resultados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pie de página */}
        <footer className="mt-auto p-6 bg-gray-100 border-t border-gray-300 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} TuEmpresa. Todos los derechos reservados.
        </footer>
      </div>

      {/* Modal para agregar usuario */}
      {showModal && (
<div
    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
    style={{
      background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))'
    }}
  >
          {/* Contenedor del modal */}
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative shadow-lg">
            {/* Botón para cerrar */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={handleCloseModal}
              aria-label="Cerrar"
            >
              ✖
            </button>

            {/* Título del modal */}
            <h2 className="text-xl font-semibold mb-4">
              Agregar Nuevo Usuario
            </h2>

            {/* Formulario */}
            <form onSubmit={handleAddUser}>
              {/* Campo Nombre */}
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  id="nombre"
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  placeholder="Nombre"
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  required
                />
              </div>

              {/* Campo Email */}
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  type="email"
                  placeholder="Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
              </div>

              {/* Selección Rol */}
              <div className="mb-4">
                <label className="block mb-1 font-medium" htmlFor="rol">
                  Rol
                </label>
                <select
                  id="rol"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newRol}
                  onChange={(e) => setNewRol(e.target.value)}
                  required
                >
                  <option value="">Selecciona un rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Editor">Editor</option>
                  <option value="Usuario">Usuario</option>
                </select>
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuario;
