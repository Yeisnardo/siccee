// routes/consejoComunalRoutes.js
const express = require('express');
const router = express.Router();
const consejoController = require('../controllers/consejoComunalController');

router.get('/', consejoController.obtenerConsejos);
router.get('/:id', consejoController.obtenerUnConsejo);
router.post('/', consejoController.crearConsejo);
router.put('/:id', consejoController.actualizarConsejo);
router.delete('/:id', consejoController.eliminarConsejo);

module.exports = router;