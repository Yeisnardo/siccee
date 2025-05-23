import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DatosPersonales from './pages/DatosPersonales';
import Usuario   from './pages/Usuario';
import Perfil_emprendedores from './pages/Perfil_emprendedores'
import Emprendimiento from './pages/Emprendimiento'
import Gestion from './pages/Gestion'
import Aprobacion from './pages/Aprobacion'
import Fondo from './pages/Fondo'
import Amortizacion from './pages/Amortizacion'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/datosPersonales" element={<DatosPersonales />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/perfil_emprendedores" element={<Perfil_emprendedores />} />
        <Route path="/emprendimiento" element={<Emprendimiento />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/aprobacion" element={<Aprobacion />} />
        <Route path="/fondo" element={<Fondo />} />
        <Route path="/amortizacion" element={<Amortizacion />} />
      </Routes>
    </Router>
  );
}

export default App;