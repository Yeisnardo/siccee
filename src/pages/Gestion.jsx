import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/style.css';
import Header from "../components/Header";
import Menu from "../components/Menu";

const Gestion = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(true); // controla si el menu está abierto



  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Menú condicional */}
      {menuOpen && <Menu />}

      {/* Contenido principal, con margen para header y menu */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        {/* Header con botón para abrir/cerrar menu */}
        <Header toggleMenu={toggleMenu} />

        {/* Contenido debajo del header */}
        <div className="pt-20 px-8">
          {/* Encabezado con título y botón */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
                <i className='bx bx-credit-card mr-3 text-xl'></i>
                <h1 className="text-3xl font-bold text-gray-800">Gestion de Credito</h1>
            </div>          
          </header>

          {/* Sección de tarjetas */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          </section>
        </div>
        {/* Pie de página */}
        <footer className="mt-auto p-4 text-center text-gray-500 bg-gray-100 border-t border-gray-300">
          © {new Date().getFullYear()} TuEmpresa. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
};

export default Gestion;