import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import Header from "../components/Header";
import Menu from "../components/Menu";

const solicitudesEjemplo = [
  {
    id: 1,
    solicitante: "Juan Pérez",
    monto: 10000,
    estado: "Pendiente",
    contrato: null,
    detalles: {
      emprendimiento: "Tienda de ropa",
      requerimientos: "Documentos, garantías",
    },
  },
  {
    id: 2,
    solicitante: "María Gómez",
    monto: 5000,
    estado: "Pendiente",
    contrato: null,
    detalles: {
      emprendimiento: "Restaurante",
      requerimientos: "Permisos, comprobantes",
    },
  },
];

const Aprobacion = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(true);
  const [solicitudes, setSolicitudes] = useState(solicitudesEjemplo);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(""); // para mostrar mensaje de éxito
  const [contadorSecuencial, setContadorSecuencial] = useState(1);
  const añoActual = new Date().getFullYear().toString().slice(-2);

  // Efecto para ocultar el mensaje de éxito en 2 segundos
  useEffect(() => {
    if (mensajeExito) {
      const timer = setTimeout(() => {
        setMensajeExito("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [mensajeExito]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleVerDetalles = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
  };

  // Cuando el usuario hace clic en "Aprobar" desde la lista, solo abre el modal
  const handleAprobarDesdeLista = (s) => {
    setSolicitudSeleccionada(s);
    setMostrarModal(true);
  };

  // Cuando el usuario hace clic en "Aprobar y asignar contrato" en el modal
  const handleAprobar = () => {
    if (solicitudSeleccionada) {
      const numeroSecuencial = String(contadorSecuencial).padStart(3, "0");
      const contratoNumero = `IFEMI/CRED-${numeroSecuencial}/${añoActual}`;

      setSolicitudes((prev) =>
        prev.map((s) =>
          s.id === solicitudSeleccionada.id
            ? { ...s, estado: "Aprobado", contrato: contratoNumero }
            : s
        )
      );
      setContadorSecuencial((prev) => prev + 1);

      // Mostrar mensaje de éxito
      setMensajeExito(
        `¡Solicitud aprobada! Número de contrato: ${contratoNumero}`
      );

      // Cerrar el modal inmediatamente después de aprobar
      handleCerrarModal();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {menuOpen && <Menu />}

      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        <Header toggleMenu={toggleMenu} />

        <div className="pt-20 px-8">
          {/* Mostrar mensaje de éxito que desaparece en 2 segundos */}
          {mensajeExito && (
            <div className="mb-4 p-3 bg-green-200 text-green-800 rounded">
              {mensajeExito}
            </div>
          )}

          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500 p-3 rounded-full shadow-lg text-white">
                <i className="bx bx-check-circle text-2xl"></i>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                Aprobacion de Solicitud de Credito
              </h1>
            </div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solicitudes.map((s) => (
              <div
                key={s.id}
                className="bg-white-500 p-4 rounded-xl shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              >
                <h2 className="text-xl font-semibold mb-2">{s.solicitante}</h2>
                <p className="mb-2">
                  <strong>Contrato:</strong>{" "}
                  {s.contrato ? s.contrato : "Pendiente"}
                </p>
                <p className="mb-2">
                  <strong>Estado:</strong> {s.estado}
                </p>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleVerDetalles(s)}
                  >
                    Ver detalles
                  </button>
                  {s.estado === "Pendiente" && (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => handleAprobarDesdeLista(s)}
                    >
                      Aprobar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>
        </div>

        {mostrarModal && solicitudSeleccionada && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            style={{
              background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
            }}
          >
            <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={handleCerrarModal}
              >
                ✖
              </button>
              <h2 className="text-xl font-bold mb-4">
                Detalles de {solicitudSeleccionada.solicitante}
              </h2>
              <p>
                <strong>Emprendimiento:</strong>{" "}
                {solicitudSeleccionada.detalles.emprendimiento}
              </p>
              <p>
                <strong>Requerimientos:</strong>{" "}
                {solicitudSeleccionada.detalles.requerimientos}
              </p>
              <p>
                <strong>Número de contrato:</strong>{" "}
                {solicitudSeleccionada.contrato
                  ? solicitudSeleccionada.contrato
                  : "Pendiente"}
              </p>
              <p>
                <strong>Estado:</strong> {solicitudSeleccionada.estado}
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={handleCerrarModal}
                >
                  Cancelar
                </button>
                {/* Botón para aprobar en el modal */}
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  onClick={handleAprobar}
                >
                  Aprobar y asignar contrato
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Aprobacion;
