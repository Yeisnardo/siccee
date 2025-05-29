// server.js

const express = require('express');
const cors = require('cors');

// Importar rutas
const usuarioRoutes = require('./routes/routes_usuario');
const emprendimientoRoutes = require('./routes/routes_emprendimientos');
const emprendedorRoutes = require('./routes/routes_emprendedores');
const ubicacionRoutes = require('./routes/routes_ubicaciones');
const consejoRoutes = require('./routes/routes_consejo_comunal');

const app = express();

// Configuración de CORS
app.use(cors({ origin: 'http://localhost:5173' }));

// Configuración para aceptar payloads grandes (ejemplo: 50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Rutas de recursos
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/emprendimientos', emprendimientoRoutes);
app.use('/api/emprendedores', emprendedorRoutes);
app.use('/api/ubicaciones', ubicacionRoutes);
app.use('/api/consejo_comunal', consejoRoutes);

// Error handling middleware (opcional)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));