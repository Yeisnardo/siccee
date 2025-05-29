// controllers/controlador_ubicaciones.js
const { query } = require('../config/db');

const getUbicaciones = async (req, res) => {
  try {
    const result = await query('SELECT * FROM ubicaciones');
    res.json(result.rows);
  } catch (err) {
    console.error('Error en getUbicaciones:', err);
    res.status(500).json({ error: 'Error al obtener ubicaciones' });
  }
};

const createUbicacion = async (req, res) => {
  try {
    const { estado, municipio, parroquia, direccion_actual, emprendedor_id } = req.body;
    const result = await query(
      'INSERT INTO ubicaciones (estado, municipio, parroquia, direccion_actual, emprendedor_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [estado, municipio, parroquia, direccion_actual, emprendedor_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error en createUbicacion:', err);
    res.status(500).json({ error: err.message });
  }
};

const updateUbicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, municipio, parroquia, direccion_actual } = req.body;
    const result = await query(
      `UPDATE ubicaciones SET estado=$1, municipio=$2, parroquia=$3, direccion_actual=$4 WHERE id=$5 RETURNING *`,
      [estado, municipio, parroquia, direccion_actual, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ubicación no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error en updateUbicacion:', err);
    res.status(500).json({ error: err.message });
  }
};

const deleteUbicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM ubicaciones WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ubicación no encontrada' });
    }
    res.json({ message: 'Ubicación eliminada', ubicacion: result.rows[0] });
  } catch (err) {
    console.error('Error en deleteUbicacion:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUbicaciones,
  createUbicacion,
  updateUbicacion,
  deleteUbicacion,
};