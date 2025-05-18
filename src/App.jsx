import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Usuario   from './pages/Usuario';
import Perfil from './pages/Perfil'
import Emprendedor   from './pages/Emprendedor';
import Gestion from './pages/Gestion'
import Aprobacion from './pages/Aprobacion'
import Amortizacion from './pages/Amortizacion'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/emprendedor" element={<Emprendedor />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/Aprobacion" element={<Aprobacion />} />
        <Route path="/amortizacion" element={<Amortizacion />} />
      </Routes>
    </Router>
  );
}

export default App;