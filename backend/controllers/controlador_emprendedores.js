// controllers/controlador_emprendedores.js
const { query } = require('../config/db');

const getEmprendedores = async (req, res) => {
  try {
    const result = await query('SELECT * FROM emprendedores');
    res.json(result.rows);
  } catch (err) {
    console.error('Error en getEmprendedores:', err);
    res.status(500).json({ error: 'Error al obtener emprendedores' });
  }
};

const createEmprendedor = async (req, res) => {
  try {
    const { usuario_id, cedula, nombre_completo, telefono, email } = req.body;
    const result = await query(
      'INSERT INTO emprendedores (usuario_id, cedula, nombre_completo, telefono, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [usuario_id, cedula, nombre_completo, telefono, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error en createEmprendedor:', err);
    res.status(500).json({ error: err.message });
  }
};

const updateEmprendedor = async (req, res) => {
  try {
    const { id } = req.params;
    const { cedula, nombre_completo, telefono, email } = req.body;
    const result = await query(
      `UPDATE emprendedores SET cedula=$1, nombre_completo=$2, telefono=$3, email=$4 WHERE id=$5 RETURNING *`,
      [cedula, nombre_completo, telefono, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Emprendedor no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error en updateEmprendedor:', err);
    res.status(500).json({ error: err.message });
  }
};

const deleteEmprendedor = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM emprendedores WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Emprendedor no encontrado' });
    }
    res.json({ message: 'Emprendedor eliminado', emprendedor: result.rows[0] });
  } catch (err) {
    console.error('Error en deleteEmprendedor:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getEmprendedores,
  createEmprendedor,
  updateEmprendedor,
  deleteEmprendedor,
};