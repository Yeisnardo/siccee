// routes/routes_persona.js
const express = require('express');
const router = express.Router();
const personaController = require('../controllers/controlador_persona');

// Obtener todas las personas
router.get('/', personaController.getPersona);

// Obtener una persona por id
router.get('/:id', personaController.getUnaPersona);

// Crear una nueva persona
router.post('/', personaController.createPersona);

// Actualizar una persona por id
router.put('/:id', personaController.updatePersona);

// Eliminar una persona por id
router.delete('/:id', personaController.deletePersona);

module.exports = router;