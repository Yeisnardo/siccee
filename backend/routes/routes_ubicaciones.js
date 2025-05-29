const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/controlador_ubicaciones');

// Obtener todas las ubicaciones
router.get('/', ubicacionController.getUbicaciones);

// Crear una nueva ubicación
router.post('/', ubicacionController.createUbicacion);

// Actualizar una ubicación por id
router.put('/:id', ubicacionController.updateUbicacion);

// Eliminar una ubicación por id
router.delete('/:id', ubicacionController.deleteUbicacion);

module.exports = router;