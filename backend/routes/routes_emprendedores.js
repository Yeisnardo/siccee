const express = require('express');
const router = express.Router();
const emprendedorController = require('../controllers/controlador_emprendedores');

// Obtener todos los emprendedores
router.get('/', emprendedorController.getEmprendedores);

// Crear un nuevo emprendedor
router.post('/', emprendedorController.createEmprendedor);

// Actualizar un emprendedor por id
router.put('/:id', emprendedorController.updateEmprendedor);

// Eliminar un emprendedor por id
router.delete('/:id', emprendedorController.deleteEmprendedor);

module.exports = router;