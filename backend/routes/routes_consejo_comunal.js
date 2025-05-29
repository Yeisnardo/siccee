const express = require('express');
const router = express.Router();
const consejoController = require('../controllers/controlador_consejo_comunal');

// Obtener todos los consejos comunales
router.get('/', consejoController.getConsejos);

// Crear un nuevo consejo comunal
router.post('/', consejoController.createConsejo);

// Actualizar un consejo comunal por id
router.put('/:id', consejoController.updateConsejo);

// Eliminar un consejo comunal por id
router.delete('/:id', consejoController.deleteConsejo);

module.exports = router;