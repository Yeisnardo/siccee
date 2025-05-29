const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/controlador_usuario');
const verificarEstatusUsuario = require('../middlewares/verificarEstatus');

// Rutas para usuarios
router.get('/', usuarioController.getUsuario); // <-- Verifica que la función sea 'getUsuario' o 'getUsuarios'
router.post('/', usuarioController.createUsuario);
router.post('/login', usuarioController.loginUsuario); // Añadido
router.put('/:cedula', usuarioController.updateUsuario);
router.delete('/:cedula', usuarioController.deleteUsuario);
router.put('/:cedula/estatus', usuarioController.updateEstatusUsuario);

// Ruta protegida que requiere usuario activo
router.get('/perfil', verificarEstatusUsuario, (req, res) => {
  res.json({ message: 'Acceso permitido', usuario: req.usuario });
});

module.exports = router;