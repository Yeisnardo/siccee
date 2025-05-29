const express = require('express');
const router = express.Router();
const emprendimientoController = require('../controllers/controlador_emprendimientos');

// Obtener todos los emprendimientos
router.get('/', emprendimientoController.getEmprendimientos);

// Crear un nuevo emprendimiento
router.post('/', emprendimientoController.createEmprendimiento);

// Actualizar un emprendimiento por id
router.put('/:id', emprendimientoController.updateEmprendimiento);

// Eliminar un emprendimiento por id
router.delete('/:id', emprendimientoController.deleteEmprendimiento);

module.exports = router;