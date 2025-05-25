const { query } = require('../config/db');

const validarUsuario = (usuario) => {
  // Ejemplo simple: verificar que los campos estén presentes y no sean vacíos
  const { cedula, nombre, usuario: user, contrasena, rol } = usuario;
  if (
    !cedula || !nombre || !user || !contrasena || !rol ||
    cedula.trim() === "" || nombre.trim() === "" || user.trim() === "" ||
    contrasena.trim() === "" || rol.trim() === ""
  ) {
    throw new Error("Campos incompletos o inválidos");
  }
  // Puedes agregar más validaciones específicas aquí
};

const getUsuario = async (req, res) => {
  try {
    const result = await query('SELECT * FROM usuario');
    res.json(result.rows);
  } catch (err) {
    console.error('Error en getUsuario:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

const createUsuario = async (req, res) => {
  try {
    validarUsuario(req.body);
    const { cedula, nombre, usuario, contrasena, rol, estatus } = req.body;
    const result = await query(
      'INSERT INTO usuario (cedula, nombre, usuario, contrasena, rol, estatus) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [cedula, nombre, usuario, contrasena, rol, estatus]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error en createUsuario:', err);
    res.status(500).json({ error: err.message });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { cedula } = req.params;
    const { nombre, usuario, contrasena, rol, estatus } = req.body;

    // Validate input
    if (!nombre || !usuario || !rol) {
      return res.status(400).json({ error: 'Campos incompletos' });
    }

    const result = await query(
      `UPDATE usuario 
       SET nombre = $1, usuario = $2, contrasena = $3, rol = $4, estatus = $5
       WHERE cedula = $6
       RETURNING *`,
      [nombre, usuario, contrasena, rol, estatus, cedula]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error en updateUsuario:', err);
    res.status(500).json({ error: err.message });
  }
};


const updateEstatusUsuario = async (req, res) => {
  try {
    const { cedula } = req.params;
    const { estatus } = req.body; // esperas recibir solo el nuevo estatus
    if (!estatus || (estatus !== 'Activo' && estatus !== 'Inactivo')) {
      return res.status(400).json({ error: 'Estatus inválido' });
    }

    const result = await query(
      'UPDATE usuario SET estatus = $1 WHERE cedula = $2 RETURNING *',
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

const deleteUsuario = async (req, res) => {
  try {
    const { cedula } = req.params;
    const result = await query('DELETE FROM usuario WHERE cedula = $1 RETURNING *', [cedula]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado', usuario: result.rows[0] });
  } catch (err) {
    console.error('Error en deleteUsuario:', err);
    res.status(500).json({ error: err.message });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;
    const result = await query('SELECT * FROM usuario WHERE usuario = $1', [usuario]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    // Aquí deberías comparar la contraseña (usa bcrypt para hashear y comparar contraseñas)
    if (user.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Si las credenciales son correctas, puedes devolver un token o un mensaje de éxito
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
  updateEstatusUsuario, // Añadir aquí
};
