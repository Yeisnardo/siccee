const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/routes_usuario');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json()); // Middleware para parsear JSON

app.use('/api/usuarios', usuarioRoutes); // Rutas de usuarios

// Error handling middleware (opcional)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));