// models/clase_ubicacion.js
const { query } = require('../config/db');

class Ubicacion {
  static validarUbicacion(ubicacion) {
    const { nombre, direccion, ciudad, pais } = ubicacion;
    if (!nombre || !direccion || !ciudad || !pais) {
      throw new Error("Campos obligatorios incompletos");
    }
    // Validaciones adicionales si deseas
  }

  static async getUbicaciones() {
    const resultado = await query('SELECT * FROM ubicacion');
    return resultado.rows;
  }

  static async getUnaUbicacion(id) {
    const resultado = await query('SELECT * FROM ubicacion WHERE id = $1', [id]);
    return resultado.rows[0];
  }

  static async createUbicacion(ubicacionData) {
    this.validarUbicacion(ubicacionData);
    const { nombre, direccion, ciudad, pais } = ubicacionData;
    const resultado = await query(
      `INSERT INTO ubicacion (nombre, direccion, ciudad, pais)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre, direccion, ciudad, pais]
    );
    return resultado.rows[0];
  }

  static async updateUbicacion(id, ubicacionData) {
    const { nombre, direccion, ciudad, pais } = ubicacionData;
    if (!nombre || !direccion || !ciudad || !pais) {
      throw new Error("Campos obligatorios incompletos");
    }
    const resultado = await query(
      `UPDATE ubicacion SET
        nombre = $1,
        direccion = $2,
        ciudad = $3,
        pais = $4
       WHERE id = $5
       RETURNING *`,
      [nombre, direccion, ciudad, pais, id]
    );
    return resultado.rows[0];
  }

  static async deleteUbicacion(id) {
    const resultado = await query('DELETE FROM ubicacion WHERE id = $1 RETURNING *', [id]);
    return resultado.rows[0];
  }
}

module.exports = Ubicacion;