// controllers/controlador_usuario.js

const { query } = require('../config/db');

// Función para validar los datos del usuario
const validarUsuario = (usuario) => {
  const { cedula, usuario: nombreUsuario, contrasena, rol, foto_rostro } = usuario;

  if (
    !cedula || cedula.trim() === "" ||
    !nombreUsuario || nombreUsuario.trim() === "" ||
    !contrasena || contrasena.trim() === "" ||
    !rol || rol.trim() === ""
  ) {
    throw new Error("Campos incompletos o inválidos");
  }

  // Si quieres validar que, si se envía, foto_rostro sea una cadena base64 válida, puedes agregar una validación adicional
  if (foto_rostro && typeof foto_rostro !== 'string') {
    throw new Error("La foto debe ser una cadena en base64");
  }
};

// Obtener todos los usuarios
const getUsuario = async (req, res) => {
  try {
    const result = await query('SELECT * FROM usuarios');
    // Convertir foto_rostro a base64 para enviarla al frontend
    const usuariosConFotoBase64 = result.rows.map(usuario => ({
      ...usuario,
      foto_rostro: usuario.foto_rostro ? usuario.foto_rostro.toString('base64') : null
    }));
    res.json(usuariosConFotoBase64);
  } catch (err) {
    console.error('Error en getUsuario:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
  try {
    validarUsuario(req.body);
    const { cedula, usuario: nombreUsuario, contrasena, rol, estatus, tipo_usuario, foto_rostro } = req.body;

    // Convertir la foto de base64 a Buffer si existe
    const bufferFoto = foto_rostro ? Buffer.from(foto_rostro, 'base64') : null;

    const result = await query(
      `INSERT INTO usuarios (cedula, usuario, contrasena, rol, estatus, tipo_usuario, foto_rostro)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [cedula, nombreUsuario, contrasena, rol, estatus || 'activo', tipo_usuario || 'Emprendedor', bufferFoto]
    );
    // Devolver la respuesta con la foto en base64
    const usuarioCreado = result.rows[0];
    if (usuarioCreado.foto_rostro) {
      usuarioCreado.foto_rostro = usuarioCreado.foto_rostro.toString('base64');
    }
    res.status(201).json(usuarioCreado);
  } catch (err) {
    console.error('Error en createUsuario:', err);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un usuario por cédula (incluyendo la foto opcionalmente)
const updateUsuario = async (req, res) => {
  try {
    const { cedula } = req.params;
    const { usuario: nombreUsuario, contrasena, rol, estatus, tipo_usuario, foto_rostro } = req.body;

    if (!nombreUsuario || !rol) {
      return res.status(400).json({ error: 'Campos obligatorios incompletos' });
    }

    // Preparar los datos para la actualización
    const params = [
      nombreUsuario,
      contrasena,
      rol,
      estatus,
      tipo_usuario,
      // Solo actualizar foto si se envía
      foto_rostro ? Buffer.from(foto_rostro, 'base64') : null,
      cedula
    ];

    // Construir la consulta para actualizar la foto solo si se envió
    const queryText = `
      UPDATE usuarios
      SET usuario = $1,
          contrasena = $2,
          rol = $3,
          estatus = $4,
          tipo_usuario = $5,
          foto_rostro = COALESCE($6, foto_rostro)
      WHERE cedula = $7
      RETURNING *`;

    const result = await query(queryText, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuarioActualizado = result.rows[0];
    if (usuarioActualizado.foto_rostro) {
      usuarioActualizado.foto_rostro = usuarioActualizado.foto_rostro.toString('base64');
    }

    res.json(usuarioActualizado);
  } catch (err) {
    console.error('Error en updateUsuario:', err);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar solo el estatus del usuario
const updateEstatusUsuario = async (req, res) => {
  try {
    const { cedula } = req.params;
    const { estatus } = req.body;

    if (!estatus || (estatus !== 'Activo' && estatus !== 'Inactivo')) {
      return res.status(400).json({ error: 'Estatus inválido' });
    }

    const result = await query(
      'UPDATE usuarios SET estatus = $1 WHERE cedula = $2 RETURNING *',
      [estatus, cedula]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error en updateEstatusUsuario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un usuario por cédula
const deleteUsuario = async (req, res) => {
  try {
    const { cedula } = req.params;
    const result = await query('DELETE FROM usuarios WHERE cedula = $1 RETURNING *', [cedula]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado', usuario: result.rows[0] });
  } catch (err) {
    console.error('Error en deleteUsuario:', err);
    res.status(500).json({ error: err.message });
  }
};

// Inicio de sesión del usuario
const loginUsuario = async (req, res) => {
  try {
    const { usuario: nombreUsuario, contrasena } = req.body;
    const result = await query('SELECT * FROM usuarios WHERE usuario = $1', [nombreUsuario]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    // Comparar contraseñas hashed con bcrypt si implementas hashing
    if (user.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Enviar la info del usuario, incluyendo la foto en base64
    if (user.foto_rostro) {
      user.foto_rostro = user.foto_rostro.toString('base64');
    }

    res.json({ message: 'Inicio de sesión exitoso', user });
  } catch (err) {
    console.error('Error en loginUsuario:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario,
  validarUsuario,
  updateEstatusUsuario,
};