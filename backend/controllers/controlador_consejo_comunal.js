// controllers/controlador_consejo_comunal.js
const { query } = require('../config/db');

const getConsejos = async (req, res) => {
  try {
    const result = await query('SELECT * FROM consejo_comunal');
    res.json(result.rows);
  } catch (err) {
    console.error('Error en getConsejos:', err);
    res.status(500).json({ error: 'Error al obtener consejos comunales' });
  }
};

const createConsejo = async (req, res) => {
  try {
    const { emprendedor_id, consejo_nombre, consejo_direccion, comuna } = req.body;
    const result = await query(
      'INSERT INTO consejo_comunal (emprendedor_id, consejo_nombre, consejo_direccion, comuna) VALUES ($1, $2, $3, $4) RETURNING *',
      [emprendedor_id, consejo_nombre, consejo_direccion, comuna]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error en createConsejo:', err);
    res.status(500).json({ error: err.message });
  }
};

const updateConsejo = async (req, res) => {
  try {
    const { id } = req.params;
    const { consejo_nombre, consejo_direccion, comuna } = req.body;
    const result = await query(
      `UPDATE consejo_comunal SET consejo_nombre=$1, consejo_direccion=$2, comuna=$3 WHERE id=$4 RETURNING *`,
      [consejo_nombre, consejo_direccion, comuna, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Consejo no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error en updateConsejo:', err);
    res.status(500).json({ error: err.message });
  }
};

const deleteConsejo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM consejo_comunal WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Consejo no encontrado' });
    }
    res.json({ message: 'Consejo eliminado', consejo: result.rows[0] });
  } catch (err) {
    console.error('Error en deleteConsejo:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getConsejos,
  createConsejo,
  updateConsejo,
  deleteConsejo,
};