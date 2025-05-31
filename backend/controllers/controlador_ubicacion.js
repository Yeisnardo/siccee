// controllers/ubicacionController.js
const Ubicacion = require('../models/clase_ubicacion');

const ubicacionController = {
  obtenerUbicaciones: async (req, res) => {
    try {
      const ubicaciones = await Ubicacion.getUbicaciones();
      res.json(ubicaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  obtenerUnaUbicacion: async (req, res) => {
    const { id } = req.params;
    try {
      const ubicacion = await Ubicacion.getUnaUbicacion(id);
      if (ubicacion) {
        res.json(ubicacion);
      } else {
        res.status(404).json({ message: 'Ubicación no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  crearUbicacion: async (req, res) => {
    const data = req.body;
    try {
      const nuevaUbicacion = await Ubicacion.createUbicacion(data);
      res.status(201).json(nuevaUbicacion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  actualizarUbicacion: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const ubicacionActualizada = await Ubicacion.updateUbicacion(id, data);
      if (ubicacionActualizada) {
        res.json(ubicacionActualizada);
      } else {
        res.status(404).json({ message: 'Ubicación no encontrada' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  eliminarUbicacion: async (req, res) => {
    const { id } = req.params;
    try {
      const eliminado = await Ubicacion.deleteUbicacion(id);
      if (eliminado) {
        res.json({ message: 'Ubicación eliminada' });
      } else {
        res.status(404).json({ message: 'Ubicación no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ubicacionController;