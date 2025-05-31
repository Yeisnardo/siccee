// controllers/controlador_persona.js
const personaModel = require('../models/clase_persona');

const getPersona = async (req, res) => {
  try {
    const personas = await personaModel.getPersona();
    res.json(personas);
  } catch (err) {
    console.error('Error en getPersona:', err);
    res.status(500).json({ error: 'Error al obtener personas' });
  }
};

const getUnaPersona = async (req, res) => {
  try {
    const { id } = req.params;
    const persona = await personaModel.getUnaPersona(id);
    if (!persona) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }
    res.json(persona);
  } catch (err) {
    console.error('Error en getUnaPersona:', err);
    res.status(500).json({ error: 'Error al obtener la persona' });
  }
};

const createPersona = async (req, res) => {
  try {
    const personaData = req.body;
    const nuevaPersona = await personaModel.createPersona(personaData);
    res.status(201).json(nuevaPersona);
  } catch (err) {
    console.error('Error en createPersona:', err);
    res.status(500).json({ error: err.message });
  }
};

const updatePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const personaData = req.body;
    const personaActualizada = await personaModel.updatePersona(id, personaData);
    if (!personaActualizada) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }
    res.json(personaActualizada);
  } catch (err) {
    console.error('Error en updatePersona:', err);
    res.status(500).json({ error: err.message });
  }
};

const deletePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const personaEliminada = await personaModel.deletePersona(id);
    if (!personaEliminada) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }
    res.json({ message: 'Persona eliminada', persona: personaEliminada });
  } catch (err) {
    console.error('Error en deletePersona:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getPersona,
  getUnaPersona,
  createPersona,
  updatePersona,
  deletePersona
};