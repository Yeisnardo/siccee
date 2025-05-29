import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import miImagen from "../assets/imagenes/logo_ifemi.jpg";
import { locationData } from "../components/Venezuela";

// Importa tus servicios API ajustando las rutas y nombres
import usuarioService from '../services/api_usuario';
import emprendedorService from '../services/api_emprendedores';
import ubicacionService from '../services/api_ubicaciones';
import consejoService from '../services/api_consejoComunal';
import emprendimientoService from '../services/api_empredimiento';

import "../assets/css/style.css";

const RegistroPasos = () => {
  const [paso, setPaso] = useState(1);
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    cedula: "",
    nombreCompleto: "",
    telefono: "",
    email: "",
    estado: "",
    municipio: "",
    parroquia: "",
    direccionActual: "",
    consejoNombre: "",
    consejoDireccion: "",
    comuna: "",
    sector: "",
    tipoNegocio: "",
    nombreEmprendimiento: "",
    direccionEmprendimiento: "",
    nombreUsuario: "",
    contrasena: "",
    estatus: "activo",
    tipoUsuario: "Emprendedor",
    fotoRostro: null,
  });

  const [municipios, setMunicipios] = useState([]);
  const [parroquias, setParroquias] = useState([]);

  // Actualiza municipios y parroquias en función del estado seleccionado
  useEffect(() => {
    if (datos.estado) {
      const estadoActual = locationData.find((e) => e.estado === datos.estado);
      setMunicipios(estadoActual ? estadoActual.municipios : []);
      setDatos((prev) => ({ ...prev, municipio: "", parroquia: "" }));
      setParroquias([]);
    }
  }, [datos.estado]);

  useEffect(() => {
    if (datos.municipio && municipios.length > 0) {
      const municipioActual = municipios.find(
        (m) => m.municipio === datos.municipio
      );
      setParroquias(municipioActual ? municipioActual.parroquias : []);
      setDatos((prev) => ({ ...prev, parroquia: "" }));
    }
  }, [datos.municipio, municipios]);

  const handleChange = (campo, valor) => {
    setDatos({ ...datos, [campo]: valor });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDatos((prevDatos) => ({
          ...prevDatos,
          fotoRostro: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para gestionar el proceso de registro completo en el backend
  const handleRegister = async () => {
    try {
      // Crear usuario
      const nuevoUsuario = {
        nombre_usuario: datos.nombreUsuario,
        contrasena: datos.contrasena,
        estatus: datos.estatus,
        tipo_usuario: datos.tipoUsuario,
        foto_rostro: datos.fotoRostro,
      };
      const usuarioCreado = await usuarioService.createUsuario(nuevoUsuario);

      // Crear emprendedor
      const nuevoEmprendedor = {
        usuario_id: usuarioCreado.id,
        cedula: datos.cedula,
        nombre_completo: datos.nombreCompleto,
        telefono: datos.telefono,
        email: datos.email,
      };
      const emprendedorCreado = await emprendedorService.createEmprendedor(nuevoEmprendedor);

      // Crear ubicación
      const nuevaUbicacion = {
        estado: datos.estado,
        municipio: datos.municipio,
        parroquia: datos.parroquia,
        direccion_actual: datos.direccionActual,
        emprendedor_id: emprendedorCreado.id,
      };
      await ubicacionService.createUbicacion(nuevaUbicacion);

      // Crear consejo comunal
      const nuevoConsejo = {
        emprendedor_id: emprendedorCreado.id,
        consejo_nombre: datos.consejoNombre,
        consejo_direccion: datos.consejoDireccion,
        comuna: datos.comuna,
      };
      await consejoService.createConsejo(nuevoConsejo);

      // Crear emprendimiento
      const nuevoEmprendimiento = {
        emprendedor_id: emprendedorCreado.id,
        sector: datos.sector,
        tipo_negocio: datos.tipoNegocio,
        nombre_emprendimiento: datos.nombreEmprendimiento,
        direccion_emprendimiento: datos.direccionEmprendimiento,
      };
      await emprendimientoService.createEmprendimiento(nuevoEmprendimiento);

      Swal.fire({
        icon: "success",
        title: "Registro completo",
        text: "Tus datos han sido registrados correctamente.",
      });
      navigate("/");

    } catch (error) {
      console.error("Error al registrar los datos:", error);
      Swal.fire({
        icon: "error",
        title: "Error en el registro",
        text: "Hubo un problema al guardar los datos. Intenta nuevamente.",
      });
    }
  };

  const handleNext = () => {
    // Validaciones por paso
    if (paso === 1) {
      if (
        !datos.cedula.trim() ||
        !datos.nombreCompleto.trim() ||
        !datos.telefono.trim() ||
        !datos.email.trim()
      ) {
        Swal.fire({
          icon: "error",
          title: "Campos incompletos",
          text: "Por favor, completa todos los datos personales.",
        });
        return;
      }
    } else if (paso === 2) {
      if (
        !datos.estado ||
        !datos.municipio ||
        !datos.parroquia ||
        !datos.direccionActual.trim()
      ) {
        Swal.fire({
          icon: "error",
          title: "Campos incompletos",
          text: "Por favor, ingresa toda la dirección.",
        });
        return;
      }
    } else if (paso === 3) {
      if (
        !datos.consejoNombre.trim() ||
        !datos.consejoDireccion.trim() ||
        !datos.comuna.trim()
      ) {
        Swal.fire({
          icon: "error",
          title: "Campos incompletos",
          text: "Por favor, ingresa toda la info del Consejo Comunal.",
        });
        return;
      }
    } else if (paso === 4) {
      if (
        !datos.sector.trim() ||
        !datos.tipoNegocio.trim() ||
        !datos.nombreEmprendimiento.trim() ||
        !datos.direccionEmprendimiento.trim()
      ) {
        Swal.fire({
          icon: "error",
          title: "Campos incompletos",
          text: "Por favor, ingresa toda la info del Emprendimiento.",
        });
        return;
      }
    } else if (paso === 5) {
      if (!datos.nombreUsuario.trim() || !datos.contrasena.trim()) {
        Swal.fire({
          icon: "error",
          title: "Campos incompletos",
          text: "Por favor, ingresa el nombre de usuario y la contraseña.",
        });
        return;
      }
    }

    if (paso < 5) {
      setPaso(paso + 1);
    }
  };

  const handleBack = () => {
    if (paso > 1) setPaso(paso - 1);
  };

  const handleFinalizar = () => {
    handleRegister();
  };

  return (
    <div className="flex min-h-screen">
      {/* Lado izquierda con imagen */}
      <div className="w-1/2 hidden md:flex items-center justify-center p-4 bg-logoLoginEfimi">
        <img src={miImagen} alt="Logo" className="max-w-full h-auto" />
      </div>

      {/* Contenido paso a paso */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-2xl">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-700">
            Registro de Emprendedor
          </h2>

          {/* Indicadores de pasos */}
          <div className="flex justify-center mb-4 space-x-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => {
                  if (n <= paso) {
                    setPaso(n);
                    document
                      .querySelector(`#paso-${n}`)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
                  paso === n ? "bg-blue-500 scale-125" : "bg-gray-400"
                }`}
              >
                {n < paso ? (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-white font-semibold">{n}</span>
                )}
              </button>
            ))}
          </div>

          {/* Contenido por paso */}

          {/* PASO 1: Datos Personales */}
          {paso === 1 && (
            <div>
              <h3 className="text-xl mb-4">Datos Personales</h3>
              {/* Inputs */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="cedula">
                  Cédula
                </label>
                <input
                  type="text"
                  id="cedula"
                  value={datos.cedula}
                  onChange={(e) => handleChange("cedula", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Ingresa tu cédula"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="nombreCompleto">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="nombreCompleto"
                  value={datos.nombreCompleto}
                  onChange={(e) => handleChange("nombreCompleto", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Ingresa tu nombre completo"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="telefono">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  value={datos.telefono}
                  onChange={(e) => handleChange("telefono", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Número de teléfono"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="email">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  value={datos.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="ejemplo@correo.com"
                />
              </div>
              {/* Botón Siguiente */}
              <button
                onClick={handleNext}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Siguiente
              </button>
            </div>
          )}

          {/* PASO 2: Dirección */}
          {paso === 2 && (
            <div>
              <h3 className="text-xl mb-4">Dirección del Emprendedor</h3>
              {/* Estado */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="estado">
                  Estado
                </label>
                <select
                  id="estado"
                  value={datos.estado}
                  onChange={(e) => handleChange("estado", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">-- Selecciona un Estado --</option>
                  {locationData.map((estado) => (
                    <option key={estado.estado} value={estado.estado}>
                      {estado.estado}
                    </option>
                  ))}
                </select>
              </div>
              {/* Municipio */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="municipio">
                  Municipio
                </label>
                <select
                  id="municipio"
                  value={datos.municipio}
                  onChange={(e) => handleChange("municipio", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  disabled={!datos.estado}
                >
                  <option value="">-- Selecciona un Municipio --</option>
                  {municipios.map((m) => (
                    <option key={m.municipio} value={m.municipio}>
                      {m.municipio}
                    </option>
                  ))}
                </select>
              </div>
              {/* Parroquia */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="parroquia">
                  Parroquia
                </label>
                <select
                  id="parroquia"
                  value={datos.parroquia}
                  onChange={(e) => handleChange("parroquia", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  disabled={!datos.municipio}
                >
                  <option value="">-- Selecciona una Parroquia --</option>
                  {parroquias.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              {/* Dirección actual */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="direccionActual">
                  Dirección Actual
                </label>
                <input
                  type="text"
                  id="direccionActual"
                  value={datos.direccionActual}
                  onChange={(e) => handleChange("direccionActual", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Dirección actual"
                />
              </div>
              {/* Botones */}
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Anterior
                </button>
                <button
                  onClick={handleNext}
                  className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* PASO 3: Datos del Consejo */}
          {paso === 3 && (
            <div>
              <h3 className="text-xl mb-4">Datos del Consejo Comunal</h3>
              {/* Sector */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="consejoNombre">
                  Sector
                </label>
                <input
                  type="text"
                  id="consejoNombre"
                  value={datos.consejoNombre}
                  onChange={(e) => handleChange("consejoNombre", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Sector"
                />
              </div>
              {/* Consejo */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="consejoDireccion">
                  Consejo Comunal
                </label>
                <input
                  type="text"
                  id="consejoDireccion"
                  value={datos.consejoDireccion}
                  onChange={(e) => handleChange("consejoDireccion", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Dirección del Consejo"
                />
              </div>
              {/* Comunidad */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="comuna">
                  Comuna
                </label>
                <input
                  type="text"
                  id="comuna"
                  value={datos.comuna}
                  onChange={(e) => handleChange("comuna", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Nombre de la Comuna"
                />
              </div>
              {/* Botones */}
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Anterior
                </button>
                <button
                  onClick={handleNext}
                  className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* PASO 4: Registro de Emprendimiento */}
          {paso === 4 && (
            <div>
              <h3 className="text-xl mb-4">Registro de Emprendimiento</h3>
              {/* Sector */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="sector">
                  Sector
                </label>
                <input
                  type="text"
                  id="sector"
                  value={datos.sector}
                  onChange={(e) => handleChange("sector", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Ej: Agroindustrial, Comercial, etc."
                />
              </div>
              {/* Tipo de Negocio */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="tipoNegocio">
                  Tipo de Negocio
                </label>
                <input
                  type="text"
                  id="tipoNegocio"
                  value={datos.tipoNegocio}
                  onChange={(e) => handleChange("tipoNegocio", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Ej: Venta, Producción, Servicios"
                />
              </div>
              {/* Nombre del Emprendimiento */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="nombreEmprendimiento">
                  Nombre del Emprendimiento
                </label>
                <input
                  type="text"
                  id="nombreEmprendimiento"
                  value={datos.nombreEmprendimiento}
                  onChange={(e) => handleChange("nombreEmprendimiento", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Nombre del emprendimiento"
                />
              </div>
              {/* Dirección del Emprendimiento */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="direccionEmprendimiento">
                  Dirección del Emprendimiento
                </label>
                <input
                  type="text"
                  id="direccionEmprendimiento"
                  value={datos.direccionEmprendimiento}
                  onChange={(e) => handleChange("direccionEmprendimiento", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Dirección del emprendimiento"
                />
              </div>
              {/* Botones */}
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Anterior
                </button>
                <button
                  onClick={handleNext}
                  className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* PASO 5: Registro de Usuario */}
          {paso === 5 && (
            <div>
              <h3 className="text-xl mb-4">Registro de Usuario</h3>
              {/* Nombre de Usuario */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="nombreUsuario">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  id="nombreUsuario"
                  value={datos.nombreUsuario}
                  onChange={(e) => handleChange("nombreUsuario", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Nombre de usuario"
                />
              </div>
              {/* Contraseña */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="contrasena">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="contrasena"
                  value={datos.contrasena}
                  onChange={(e) => handleChange("contrasena", e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Contraseña"
                />
              </div>
              {/* Foto del rostro */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-600" htmlFor="fotoRostro">
                  Foto del Rostro
                </label>
                <input
                  type="file"
                  id="fotoRostro"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-2"
                />
                {datos.fotoRostro && (
                  <div className="mt-2">
                    <img
                      src={datos.fotoRostro}
                      alt="Foto del Rostro"
                      className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                    />
                  </div>
                )}
              </div>
              {/* Botones */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleBack}
                  className="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Anterior
                </button>
                <button
                  onClick={handleFinalizar}
                  className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Finalizar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistroPasos;