// controllers/controlador_emprendimientos.js
const { query } = require('../config/db');

const getEmprendimientos = async (req, res) => {
  try {
    const result = await query('SELECT * FROM emprendimientos');
    res.json(result.rows);
  } catch (err) {
    console.error('Error en getEmprendimientos:', err);
    res.status(500).json({ error: 'Error al obtener emprendimientos' });
  }
};

const createEmprendimiento = async (req, res) => {
  try {
    const { emprendedor_id, sector, tipo_negocio, nombre_emprendimiento, direccion_emprendimiento } = req.body;
    const result = await query(
      'INSERT INTO emprendimientos (emprendedor_id, sector, tipo_negocio, nombre_emprendimiento, direccion_emprendimiento) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [emprendedor_id, sector, tipo_negocio, nombre_emprendimiento, direccion_emprendimiento]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error en createEmprendimiento:', err);
    res.status(500).json({ error: err.message });
  }
};

const updateEmprendimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { sector, tipo_negocio, nombre_emprendimiento, direccion_emprendimiento } = req.body;
    const result = await query(
      `UPDATE emprendimientos SET sector=$1, tipo_negocio=$2, nombre_emprendimiento=$3, direccion_emprendimiento=$4 WHERE id=$5 RETURNING *`,
      [sector, tipo_negocio, nombre_emprendimiento, direccion_emprendimiento, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Emprendimiento no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error en updateEmprendimiento:', err);
    res.status(500).json({ error: err.message });
  }
};

const deleteEmprendimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM emprendimientos WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Emprendimiento no encontrado' });
    }
    res.json({ message: 'Emprendimiento eliminado', emprendimiento: result.rows[0] });
  } catch (err) {
    console.error('Error en deleteEmprendimiento:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getEmprendimientos,
  createEmprendimiento,
  updateEmprendimiento,
  deleteEmprendimiento,
};