// models/clase_emprendimiento.js
const { query } = require('../config/db');

class Emprendimiento {
  // Validar los datos de un emprendimiento
  static validarEmprendimiento(emprendimiento) {
    const { nombre, descripcion, propietario } = emprendimiento;
    if (!nombre || !descripcion || !propietario) {
      throw new Error("Campos obligatorios incompletos");
    }
    // Puedes agregar validaciones adicionales si lo deseas
  }

  // Obtener todos los emprendimientos
  static async getEmprendimiento() {
    const resultado = await query('SELECT * FROM emprendimiento');
    return resultado.rows;
  }

  // Obtener un emprendimiento por ID
  static async getUnaEmprendimiento(id) {
    const resultado = await query('SELECT * FROM emprendimiento WHERE id = $1', [id]);
    return resultado.rows[0];
  }

  // Crear un nuevo emprendimiento
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

  // Actualizar un emprendimiento por ID
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

  // Eliminar un emprendimiento por ID
  static async deleteEmprendimiento(id) {
    const resultado = await query('DELETE FROM emprendimiento WHERE id = $1 RETURNING *', [id]);
    return resultado.rows[0];
  }
}

module.exports = Emprendimiento;