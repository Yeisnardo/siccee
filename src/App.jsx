import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from './components/AppLayout';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DatosPersonales from "./pages/DatosPersonales";
import Usuario from "./pages/Usuario";
import Perfil_emprendedores from "./pages/Perfil_emprendedores";
import Emprendimiento from "./pages/Emprendimiento";
import Gestion from "./pages/Gestion";
import Aprobacion from "./pages/Aprobacion";
import Fondo from "./pages/Fondo";
import Amortizacion from "./pages/Amortizacion";
import Credito from "./pages/Credito";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/datosPersonales"
          element={
            <ProtectedRoute>
              <DatosPersonales />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuario"
          element={
            <ProtectedRoute>
              <Usuario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil_emprendedores"
          element={
            <ProtectedRoute>
              <Perfil_emprendedores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/emprendimiento"
          element={
            <ProtectedRoute>
              <Emprendimiento />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion"
          element={
            <ProtectedRoute>
              <Gestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aprobacion"
          element={
            <ProtectedRoute>
              <Aprobacion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fondo"
          element={
            <ProtectedRoute>
              <Fondo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/amortizacion"
          element={
            <ProtectedRoute>
              <Amortizacion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Credito"
          element={
            <ProtectedRoute>
              <Credito />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
