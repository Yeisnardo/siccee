// routes/rutas_emprendimiento.js
const express = require('express');
const router = express.Router();
const emprendimientoController = require('../controllers/controlador_emprendimiento');

// Obtener todas los emprendimientos
router.get('/', emprendimientoController.getEmprendimientos);

// Obtener un emprendimiento por ID
router.get('/:id', emprendimientoController.getUnaEmprendimiento);

// Crear un nuevo emprendimiento
router.post('/', emprendimientoController.createEmprendimiento);

// Actualizar un emprendimiento por ID
router.put('/:id', emprendimientoController.updateEmprendimiento);

// Eliminar un emprendimiento por ID
router.delete('/:id', emprendimientoController.deleteEmprendimiento);

module.exports = router;