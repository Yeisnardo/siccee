-- Tabla de usuarios (cuentas y autenticación)
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  estatus VARCHAR(20) DEFAULT 'activo',
  tipo_usuario VARCHAR(20) DEFAULT 'Emprendedor',
  foto_rostro BYTEA,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserciones de ejemplo en la tabla usuarios
INSERT INTO usuarios (nombre_usuario, contrasena, estatus, tipo_usuario, foto_rostro) VALUES
('jperez', 'Contrasena123!', 'Activo', 'Administrador', NULL),
('mgomez', 'Segura123!', 'Activo', 'Usuario', NULL),
('cruiz', 'Password456!', 'Inactivo', 'Usuario', NULL),
('alopez', 'MiContraseña789!', 'Activo', 'Editor', NULL),
('lfernandez', 'ClaveSegura987!', 'Activo', 'Usuario', NULL);

-- Tabla de emprendedores (datos personales vinculados a usuarios)
CREATE TABLE emprendedores (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL,
  cedula VARCHAR(20) NOT NULL,
  nombre_completo VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(100),
  CONSTRAINT fk_emprendedor_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de ubicaciones (estado, municipio, parroquia, dirección)
CREATE TABLE ubicaciones (
  id SERIAL PRIMARY KEY,
  estado VARCHAR(50),
  municipio VARCHAR(50),
  parroquia VARCHAR(50),
  direccion_actual VARCHAR(255),
  emprendedor_id INTEGER NOT NULL,
  CONSTRAINT fk_ubicacion_emprendedor FOREIGN KEY (emprendedor_id) REFERENCES emprendedores(id) ON DELETE CASCADE
);

-- Tabla del consejo comunal
CREATE TABLE consejo_comunal (
  id SERIAL PRIMARY KEY,
  emprendedor_id INTEGER NOT NULL,
  consejo_nombre VARCHAR(100),
  consejo_direccion VARCHAR(255),
  comuna VARCHAR(50),
  CONSTRAINT fk_consejo_emprendedor FOREIGN KEY (emprendedor_id) REFERENCES emprendedores(id) ON DELETE CASCADE
);

-- Tabla de emprendimientos
CREATE TABLE emprendimientos (
  id SERIAL PRIMARY KEY,
  emprendedor_id INTEGER NOT NULL,
  sector VARCHAR(50),
  tipo_negocio VARCHAR(50),
  nombre_emprendimiento VARCHAR(100),
  direccion_emprendimiento VARCHAR(255),
  CONSTRAINT fk_emprendimiento_emprendedor FOREIGN KEY (emprendedor_id) REFERENCES emprendedores(id) ON DELETE CASCADE
);