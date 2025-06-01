// models/clase_persona.js
const { query } = require('../config/db');

class Persona {
  // Validar los datos de una persona
  static validarPersona(persona) {
    const { cedula, nombre_completo, edad, tipo_persona } = persona;
    if (!cedula || !nombre_completo || edad == null || !tipo_persona) {
      throw new Error("Campos obligatorios incompletos");
    }
    // Validaciones adicionales pueden agregarse aquí
  }

  // Obtener todas las personas
  static async getPersona() {
    const resultado = await query('SELECT * FROM persona');
    return resultado.rows;
  }

  // Obtener una persona por ID
  static async getUnaPersona(id) {
    const resultado = await query('SELECT * FROM persona WHERE id = $1', [id]);
    return resultado.rows[0];
  }

  // Crear una nueva persona
  static async createPersona(personaData) {
    this.validarPersona(personaData);
    const {
      cedula,
      nombre_completo,
      f_nacimiento,
      edad,
      telefono,
      email,
      tipo_persona
    } = personaData;

    const resultado = await query(
      `INSERT INTO persona 
        (cedula, nombre_completo, f_nacimiento, edad, telefono, email, tipo_persona)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [cedula, nombre_completo, f_nacimiento, edad, telefono, email, tipo_persona]
    );
    return resultado.rows[0];
  }

  // Actualizar una persona por ID
  static async updatePersona(id, personaData) {
    const { cedula, nombre_completo, f_nacimiento, edad, telefono, email, tipo_persona } = personaData;

    if (!cedula || !nombre_completo || edad == null || !tipo_persona) {
      throw new Error('Campos obligatorios incompletos');
    }

    const resultado = await query(
      `UPDATE persona SET 
        cedula = $1,
        nombre_completo = $2,
        f_nacimiento = $3,
        edad = $4,
        telefono = $5,
        email = $6,
        tipo_persona = $7
       WHERE id = $8
       RETURNING *`,
      [cedula, nombre_completo, f_nacimiento, edad, telefono, email, tipo_persona, id]
    );
    return resultado.rows[0];
  }

  // Eliminar una persona por ID
  static async deletePersona(id) {
    const resultado = await query('DELETE FROM persona WHERE id = $1 RETURNING *', [id]);
    return resultado.rows[0];
  }
}

module.exports = Persona;