import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import Header from "../components/Header";
import Menu from "../components/Menu";

const Emprendedor = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(true);
  const [cedulaBuscar, setCedulaBuscar] = useState("");
  const [showReporte, setShowReporte] = useState(false); // Estado para mostrar el reporte

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleBuscar = () => {
    if (cedulaBuscar.trim() === "") {
      alert("Por favor, ingrese una cédula para buscar.");
      return;
    }
    alert(`Buscando por cédula: ${cedulaBuscar}`);
    setShowReporte(true); // Mostrar reporte al buscar
  };

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col">
      {/* Menú */}
      {menuOpen && <Menu />}

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 justify-between">
        {/* Encabezado (parte superior fija) */}
        <Header toggleMenu={toggleMenu} />

        {/* Sección superior con título y icono */}
        <div className="p-20 mb-8 flex items-center justify-between ">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-3 rounded-full shadow-lg text-white">
              <i className="bx bx-group text-2xl"></i>
            </div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Gestion de Emprendedor
            </h1>
          </div>
        </div>

        {/* Contenedor de búsqueda */}
        <div className="container mx-auto px-4">
          <div className="p-4 mt-4 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
            <div className="flex">
              <input
                type="text"
                placeholder="Cédula"
                className="flex-1 px-4 py-3 border border-gray-500 rounded focus:outline-none"
                value={cedulaBuscar}
                onChange={(e) => setCedulaBuscar(e.target.value)}
              />
              <button
                onClick={handleBuscar}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 font-semibold rounded"
              >
                <i className="bx bx-search text-2xl"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Reporte desplegable */}
        {showReporte && (
          <div className="container mx-auto px-4 mt-8">
            <div className="p-4 max-w-3xl mx-auto bg-white shadow-lg rounded-lg border border-gray-300">
              <h2 className="text-xl font-semibold mb-4">
                Reporte de Cédula: {cedulaBuscar}
              </h2>
              {/* Aquí puedes poner los datos del reporte, por ejemplo, una tabla o detalles */}
              <p>Detalles del reporte para la cédula {cedulaBuscar}.</p>

              {/* Botón de Formalizado */}
              <button
                className="mt-4 mr-2 bg-blue-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => alert("Acción de formalización ejecutada")}
              >
                Formalizado
              </button>

              {/* Botón para cerrar el reporte */}
              <button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => setShowReporte(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Sección de tarjetas (opcional) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          {/* Tarjetas u otro contenido */}
        </section>

        {/* Pie de página */}
        <footer className="p-4 text-center text-gray-500 bg-gray-100 border-t border-gray-300">
          © {new Date().getFullYear()} TuEmpresa. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
};

export default Emprendedor;
