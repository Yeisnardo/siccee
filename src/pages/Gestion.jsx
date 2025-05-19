import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import Header from "../components/Header";
import Menu from "../components/Menu";

const Gestion = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(true); // controla si el menu está abierto

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Menú condicional */}
      {isMenuOpen && <Menu />}

      {/* Contenedor principal */}
      <div className={`flex-1 flex flex-col ${isMenuOpen ? 'ml-0 md:ml-64' : 'ml-0'}`}>
        {/* Header con botón para abrir/cerrar menu */}
        <Header toggleMenu={toggleMenu} />

        {/* Contenido debajo del header */}
        <main className="pt-20 px-8 flex-1 flex flex-col">
          {/* Encabezado con título y logo */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500 p-3 rounded-full shadow-lg text-white">
                <i className="bx bx-credit-card text-2xl"></i>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Gestor de Crédito</h1>
            </div>
            {/* Puedes agregar aquí botones adicionales si es necesario */}
          </header>

          {/* Sección de tarjetas o acciones */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Puedes agregar componentes de tarjetas aquí */}
            {/* Ejemplo: */}
            {/* <TarjetaGestion /> */}
          </section>

          {/* Otra sección de contenido, formularios, etc. */}
          <section className="bg-white p-6 rounded shadow">
            {/* Aquí puedes agregar tus componentes o formularios */}
            <h2 className="text-xl font-semibold mb-4">Resumen de Créditos</h2>
            {/* Lista, tablas, etc. */}
          </section>
        </main>

        {/* Pie de página */}
        <footer className="mt-auto p-4 text-center text-gray-500 bg-gray-100 border-t border-gray-300">
          © {new Date().getFullYear()} TuEmpresa. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
};

export default Gestion;