import { useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";

const Fondo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const [registros, setRegistros] = useState([]);
  const [fondoCapital, setFondoCapital] = useState(0);
  const tasaCambio = 4.5; // 1 dólar = 4.5 Bs

  // Estados de modales
  const [mostrarModalFondo, setMostrarModalFondo] = useState(false);
  const [montoFondo, setMontoFondo] = useState("");

  const [mostrarModalInspeccion, setMostrarModalInspeccion] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

  const [mostrarModalAsignar, setMostrarModalAsignar] = useState(false);
  const [montoAAsignar, setMontoAAsignar] = useState("");
  const [registroAAsignar, setRegistroAAsignar] = useState(null);

  const [mostrarModalFormulario, setMostrarModalFormulario] = useState(false);
  const [formEmprendimiento, setFormEmprendimiento] = useState("");
  const [formMonto, setFormMonto] = useState("");

  const [busqueda, setBusqueda] = useState("");

  // Funciones de apertura y cierre de modales
  const handleAbrirModalFondo = () => setMostrarModalFondo(true);
  const handleCerrarModalFondo = () => {
    setMostrarModalFondo(false);
    setMontoFondo("");
  };
  const handleAgregarFondo = () => {
    const montoTotal = parseFloat(montoFondo);
    if (isNaN(montoTotal) || montoTotal <= 0) {
      alert("Por favor ingresa un monto válido");
      return;
    }
    setFondoCapital(fondoCapital + montoTotal);
    handleCerrarModalFondo();
  };

  const handleCerrarModal = () => {
    setMostrarModalFormulario(false);
    setFormEmprendimiento("");
    setFormMonto("");
  };
  const handleCargar = () => {
    const montoTotal = parseFloat(formMonto);
    if (isNaN(montoTotal) || montoTotal <= 0) {
      alert("Por favor ingresa un monto válido");
      return;
    }
    const nuevoRegistro = {
      id: Date.now(),
      emprendimiento: formEmprendimiento,
      monto: montoTotal,
      fondoAsignado: 0,
      fecha: new Date().toLocaleString(),
    };
    setRegistros([nuevoRegistro, ...registros]);
    handleCerrarModal();
  };

  // Funciones para inspeccionar
  const handleInspeccionar = (registro) => {
    setRegistroSeleccionado(registro);
    setMostrarModalInspeccion(true);
  };
  const handleCerrarInspeccion = () => {
    setMostrarModalInspeccion(false);
    setRegistroSeleccionado(null);
  };

  // Filtrado
  const registrosFiltrados = registros.filter((reg) =>
    reg.emprendimiento.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Función para abrir modal de asignar fondo desde la tabla
  const abrirModalAsignar = (registro) => {
    setRegistroAAsignar(registro);
    setMontoAAsignar("");
    setMostrarModalAsignar(true);
  };

  // Función para realizar la asignación en el modal
  const handleAsignarDesdeModal = () => {
    const monto = parseFloat(montoAAsignar);
    if (isNaN(monto) || monto <= 0) {
      alert("Por favor ingresa un monto válido");
      return;
    }
    if (fondoCapital < monto) {
      alert("Fondo insuficiente");
      return;
    }
    // Actualizar fondo general
    setFondoCapital(fondoCapital - monto);
    // Actualizar el registro
    const nuevosRegistros = registros.map((reg) => {
      if (reg.id === registroAAsignar.id) {
        return {
          ...reg,
          fondoAsignado: reg.fondoAsignado + monto,
        };
      }
      return reg;
    });
    setRegistros(nuevosRegistros);
    // Cerrar modal y limpiar
    setMostrarModalAsignar(false);
    setMontoAAsignar("");
    setRegistroAAsignar(null);
  };

  // Funciones para formulario
  const handleAbrirFormulario = () => setMostrarModalFormulario(true);
  const handleCerrarFormulario = () => {
    setMostrarModalFormulario(false);
    setFormEmprendimiento("");
    setFormMonto("");
  };
  const handleEnviarFormulario = () => handleCargar();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isMenuOpen && <Menu />}
      <div className={`flex-1 flex flex-col ${isMenuOpen ? "ml-0 md:ml-64" : "ml-0"}`}>
        {/* Header */}
        <Header toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />

        {/* Contenido principal */}
        <main className="pt-20 px-8 flex-1 flex flex-col">
          {/* Encabezado */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500 p-3 rounded-full shadow-lg text-white">
                <i className="bx bx-money-withdraw text-2xl"></i>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                Gestión de Fondo Financiero de Créditos
              </h1>
            </div>
            <button
              className="bg-purple-500 text-white py-2 px-4 rounded"
              onClick={handleAbrirFormulario}
            >
              Agregar Registro
            </button>
          </header>

          {/* Tarjeta Fondo en Bs */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-xl">
              <div className="p-6 flex items-center space-x-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-3 text-[#07142A]">
                    Fondo General en Bolívares
                  </h2>
                  <p className="text-gray-700 mb-2">
                    Saldo Disponible: {fondoCapital.toFixed(2)} Bs
                  </p>
                  <button
                    onClick={handleAbrirModalFondo}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Agregar Fondo
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Lista registros */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Registros</h2>
            <input
              type="text"
              placeholder="Buscar..."
              className="border border-gray-300 p-2 rounded mb-4 w-full"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Emprendimiento</th>
                    <th className="border px-4 py-2">Monto</th>
                    <th className="border px-4 py-2">Fondo Asignado</th>
                    <th className="border px-4 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {registrosFiltrados.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-100 cursor-pointer">
                      <td
                        className="border px-4 py-2"
                        onClick={() => handleInspeccionar(reg)}
                      >
                        {reg.emprendimiento}
                      </td>
                      <td
                        className="border px-4 py-2"
                        onClick={() => handleInspeccionar(reg)}
                      >
                        {reg.monto.toFixed(2)} Bs
                      </td>
                      <td
                        className="border px-4 py-2"
                        onClick={() => handleInspeccionar(reg)}
                      >
                        {reg.fondoAsignado.toFixed(2)} Bs
                      </td>
                      <td className="border px-4 py-2 flex space-x-2">
                        {/* Botón que abre modal para asignar fondo */}
                        <button
                          onClick={() => abrirModalAsignar(reg)}
                          className="bg-green-500 text-white py-1 px-3 rounded"
                        >
                          Asignar Fondo
                        </button>
                        <button
                          onClick={() => handleInspeccionar(reg)}
                          className="bg-blue-500 text-white py-1 px-3 rounded"
                        >
                          Inspeccionar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>

        {/* Modal para agregar fondo */}
        {mostrarModalFondo && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold mb-4">Agregar Fondo</h2>
              <input
                type="number"
                value={montoFondo}
                onChange={(e) => setMontoFondo(e.target.value)}
                placeholder="Monto a agregar"
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleCerrarModalFondo}
                  className="bg-gray-300 py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAgregarFondo}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal para inspección */}
        {mostrarModalInspeccion && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full overflow-y-auto max-h-full">
              <h2 className="text-xl font-semibold mb-4">Detalle del Registro</h2>
              {registroSeleccionado && (
                <div>
                  <p>
                    <strong>Emprendimiento:</strong> {registroSeleccionado.emprendimiento}
                  </p>
                  <p>
                    <strong>Monto:</strong> {registroSeleccionado.monto.toFixed(2)} Bs
                  </p>
                  <p>
                    <strong>Fondo Asignado:</strong> {registroSeleccionado.fondoAsignado.toFixed(2)} Bs
                  </p>
                  <button
                    onClick={() => abrirModalAsignar(registroSeleccionado)}
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Asignar Fondo al Emprendimiento
                  </button>
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleCerrarInspeccion}
                  className="bg-gray-300 py-2 px-4 rounded"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal para asignar fondo desde la tabla */}
        {mostrarModalAsignar && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
              <h2 className="text-xl mb-4">
                Asignar Fondo a {registroAAsignar?.emprendimiento}
              </h2>
              <input
                type="number"
                value={montoAAsignar}
                onChange={(e) => setMontoAAsignar(e.target.value)}
                placeholder="Monto a asignar"
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setMostrarModalAsignar(false);
                    setMontoAAsignar("");
                    setRegistroAAsignar(null);
                  }}
                  className="bg-gray-300 py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                {/* Aquí llamamos la función para hacer la asignación */}
                <button
                  onClick={handleAsignarDesdeModal}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Asignar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal formulario */}
        {mostrarModalFormulario && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            style={{
              background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
            }}
          >
            <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full overflow-y-auto max-h-full">
              <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Registro</h2>
              {/* Solo campos Emprendimiento y Monto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-semibold">Emprendimiento</label>
                  <input
                    type="text"
                    value={formEmprendimiento}
                    onChange={(e) => setFormEmprendimiento(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Monto</label>
                  <input
                    type="number"
                    value={formMonto}
                    onChange={(e) => setFormMonto(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
              </div>
              {/* Botones */}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={handleCerrarFormulario}
                  className="bg-gray-300 py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEnviarFormulario}
                  className="bg-green-500 text-white py-2 px-4 rounded"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pie */}
        <footer className="mt-auto p-4 text-center text-gray-500 bg-gray-100 border-t border-gray-300">
          © {new Date().getFullYear()} TuEmpresa. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
};

export default Fondo;