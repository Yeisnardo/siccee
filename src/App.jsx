import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Usuario   from './pages/Usuario';
import Perfil_emprendedores from './pages/Perfil_emprendedores'
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
        <Route path="/Perfil_emprendedores" element={<Perfil_emprendedores />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/Aprobacion" element={<Aprobacion />} />
        <Route path="/amortizacion" element={<Amortizacion />} />
      </Routes>
    </Router>
  );
}

export default App;