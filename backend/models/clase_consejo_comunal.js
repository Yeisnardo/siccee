const { query } = require('../config/db');

class ConsejoComunal {
  static validarConsejo(consejo) {
    const { nombre, descripcion, ubicacion_id } = consejo;
    if (!nombre || !descripcion || !ubicacion_id) {
      throw new Error("Campos obligatorios incompletos");
    }
    // Validaciones adicionales si es necesario
  }

  static async getConsejos() {
    const resultado = await query('SELECT * FROM consejo_comunal');
    return resultado.rows;
  }

  static async getUnaConsejo(id) {
    const resultado = await query('SELECT * FROM consejo_comunal WHERE id = $1', [id]);
    return resultado.rows[0];
  }

  static async createConsejo(consejoData) {
    this.validarConsejo(consejoData);
    const { nombre, descripcion, ubicacion_id } = consejoData;
    const resultado = await query(
      `INSERT INTO consejo_comunal (nombre, descripcion, ubicacion_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre, descripcion, ubicacion_id]
    );
    return resultado.rows[0];
  }

  static async updateConsejo(id, consejoData) {
    const { nombre, descripcion, ubicacion_id } = consejoData;
    if (!nombre || !descripcion || !ubicacion_id) {
      throw new Error("Campos obligatorios incompletos");
    }
    const resultado = await query(
      `UPDATE consejo_comunal SET
        nombre = $1,
        descripcion = $2,
        ubicacion_id = $3
       WHERE id = $4
       RETURNING *`,
      [nombre, descripcion, ubicacion_id, id]
    );
    return resultado.rows[0];
  }

  static async deleteConsejo(id) {
    const resultado = await query('DELETE FROM consejo_comunal WHERE id = $1 RETURNING *', [id]);
    return resultado.rows[0];
  }
}

module.exports = ConsejoComunal;