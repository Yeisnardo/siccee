const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/controlador_usuario');
const verificarEstatusUsuario = require('../middlewares/verificarEstatus');

// Rutas de usuario
router.get('/', usuarioController.getUsuario);
router.post('/', usuarioController.createUsuario);
router.post('/login', usuarioController.loginUsuario);
router.put('/:cedula', usuarioController.updateUsuario);
router.delete('/:cedula', usuarioController.deleteUsuario);
router.put('/:cedula/estatus', usuarioController.updateEstatusUsuario);

// Ruta protegida
router.get('/perfil', verificarEstatusUsuario, (req, res) => {
  res.json({ message: 'Acceso permitido', usuario: req.usuario });
});

module.exports = router;
