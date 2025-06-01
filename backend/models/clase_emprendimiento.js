const { query } = require('../config/db');

class Emprendimiento {
  static validarEmprendimiento(emprendimiento) {
    const { nombre, descripcion, propietario } = emprendimiento;
    if (!nombre || !descripcion || !propietario) {
      throw new Error("Campos obligatorios incompletos");
    }
    // Validaciones adicionales si es necesario
  }

  static async getEmprendimiento() {
    const resultado = await query('SELECT * FROM emprendimiento');
    return resultado.rows;
  }

  static async getUnaEmprendimiento(id) {
    const resultado = await query('SELECT * FROM emprendimiento WHERE id = $1', [id]);
    return resultado.rows[0];
  }

  static async createEmprendimiento(emprendimientoData) {
    this.validarEmprendimiento(emprendimientoData);
    const { nombre, descripcion, propietario } = emprendimientoData;
    const resultado = await query(
      `INSERT INTO emprendimiento (nombre, descripcion, propietario)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre, descripcion, propietario]
    );
    return resultado.rows[0];
  }

  static async updateEmprendimiento(id, emprendimientoData) {
    const { nombre, descripcion, propietario } = emprendimientoData;
    if (!nombre || !descripcion || !propietario) {
      throw new Error("Campos obligatorios incompletos");
    }
    const resultado = await query(
      `UPDATE emprendimiento SET
        nombre = $1,
        descripcion = $2,
        propietario = $3
       WHERE id = $4
       RETURNING *`,
      [nombre, descripcion, propietario, id]
    );
    return resultado.rows[0];
  }

  static async deleteEmprendimiento(id) {
    const resultado = await query('DELETE FROM emprendimiento WHERE id = $1 RETURNING *', [id]);
    return resultado.rows[0];
  }
}

module.exports = Emprendimiento;