// controllers/controlador_emprendimiento.js

const emprendimientoModel = require('../models/clase_emprendimiento');

const getEmprendimiento = async (req, res) => {
  try {
    const emprendimientos = await emprendimientoModel.getEmprendimiento();
    res.json(emprendimientos);
  } catch (err) {
    console.error('Error en getEmprendimiento:', err);
    res.status(500).json({ error: 'Error al obtener emprendimientos' });
  }
};

const getUnaEmprendimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const emprendimiento = await emprendimientoModel.getUnaEmprendimiento(id);
    if (!emprendimiento) {
      return res.status(404).json({ message: 'Emprendimiento no encontrado' });
    }
    res.json(emprendimiento);
  } catch (err) {
    console.error('Error en getUnaEmprendimiento:', err);
    res.status(500).json({ error: 'Error al obtener el emprendimiento' });
  }
};

const createEmprendimiento = async (req, res) => {
  try {
    const emprendimientoData = req.body;
    const nuevoEmprendimiento = await emprendimientoModel.createEmprendimiento(emprendimientoData);
    res.status(201).json(nuevoEmprendimiento);
  } catch (err) {
    console.error('Error en createEmprendimiento:', err);
    res.status(500).json({ error: err.message });
  }
};

const updateEmprendimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const emprendimientoData = req.body;
    const emprendimientoActualizado = await emprendimientoModel.updateEmprendimiento(id, emprendimientoData);
    if (!emprendimientoActualizado) {
      return res.status(404).json({ message: 'Emprendimiento no encontrado' });
    }
    res.json(emprendimientoActualizado);
  } catch (err) {
    console.error('Error en updateEmprendimiento:', err);
    res.status(500).json({ error: err.message });
  }
};

const deleteEmprendimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const emprendimientoEliminado = await emprendimientoModel.deleteEmprendimiento(id);
    if (!emprendimientoEliminado) {
      return res.status(404).json({ message: 'Emprendimiento no encontrado' });
    }
    res.json({ message: 'Emprendimiento eliminado', emprendimiento: emprendimientoEliminado });
  } catch (err) {
    console.error('Error en deleteEmprendimiento:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getEmprendimiento,
  getUnaEmprendimiento,
  createEmprendimiento,
  updateEmprendimiento,
  deleteEmprendimiento
};