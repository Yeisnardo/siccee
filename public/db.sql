-- Tabla de persona (datos personales vinculados a usuario)
CREATE TABLE persona (
  id SERIAL PRIMARY KEY,
  cedula VARCHAR(20) NOT NULL UNIQUE,  -- Aseguramos que la cédula sea única
  nombre_completo VARCHAR(100) NOT NULL,
  f_nacimiento DATE,  -- Almacena la fecha de nacimiento
  edad INTEGER NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(100),
  tipo_persona VARCHAR(20)  -- Almacena el tipo de persona
);

-- Inserciones de ejemplo en la tabla persona
INSERT INTO persona (cedula, nombre_completo, f_nacimiento, edad, telefono, email, tipo_persona) VALUES
('12345678', 'Juan Pérez', '1990-01-01', 33, '555-1234', 'jperez@example.com', 'Emprendedor'),
('87654321', 'María Gómez', '1985-05-15', 38, '555-5678', 'mgomez@example.com', 'Usuario'),
('11223344', 'Carlos Ruiz', '1992-03-20', 31, '555-8765', 'cruiz@example.com', 'Usuario'),
('55667788', 'Ana López', '1988-07-30', 35, '555-4321', 'alopez@example.com', 'Editor'),
('44332211', 'Luis Fernández', '1995-11-11', 28, '555-6789', 'lfernandez@example.com', 'Usuario');

-- Tabla de usuario (cuentas y autenticación), que depende de persona
CREATE TABLE usuario (
  persona_id INTEGER PRIMARY KEY,
  cedula VARCHAR(20),
  usuario VARCHAR(50) NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  estatus VARCHAR(20),
  rol VARCHAR(20),
  foto_rostro BYTEA,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_usuario_persona FOREIGN KEY (persona_id) REFERENCES persona(id) ON DELETE CASCADE
);

-- Inserciones de ejemplo en la tabla usuario
INSERT INTO usuario (persona_id, cedula, usuario, contrasena, estatus, rol, foto_rostro) VALUES
(1, '12345678', 'jperez', 'Contrasena123!', 'Activo', 'Administrador', NULL),
(2, '87654321', 'mgomez', 'Segura123!', 'Activo', 'Usuario', NULL),
(3, '11223344', 'cruiz', 'Password456!', 'Inactivo', 'Usuario', NULL),
(4, '55667788', 'alopez', 'MiContraseña789!', 'Activo', 'Editor', NULL),
(5, '44332211', 'lfernandez', 'ClaveSegura987!', 'Activo', 'Usuario', NULL);

-- Tabla de ubicaciones (estado, municipio, parroquia, dirección)
CREATE TABLE ubicaciones (
  id SERIAL PRIMARY KEY,
  estado VARCHAR(50),
  municipio VARCHAR(50),
  parroquia VARCHAR(50),
  direccion_actual VARCHAR(255),
  emprendedor_id VARCHAR(20) NOT NULL,  -- Cambiado a VARCHAR para referenciar la cédula
  CONSTRAINT fk_ubicacion_emprendedor FOREIGN KEY (emprendedor_id) REFERENCES persona(cedula) ON DELETE CASCADE
);

-- Tabla de emprendimientos
CREATE TABLE emprendimientos (
  id SERIAL PRIMARY KEY,
  emprendedor_cedula VARCHAR(20) NOT NULL,  -- Cambiado a VARCHAR para referenciar la cédula
  sector VARCHAR(50),
  tipo_negocio VARCHAR(50),
  nombre_emprendimiento VARCHAR(100),
  direccion_emprendimiento VARCHAR(255),
  CONSTRAINT fk_emprendimiento_emprendedor FOREIGN KEY (emprendedor_cedula) REFERENCES persona(cedula) ON DELETE CASCADE
);

-- Tabla del consejo comunal (dependiendo solo de emprendimientos)
CREATE TABLE consejo_comunal (
  id SERIAL PRIMARY KEY,
  emprendimiento_id INTEGER NOT NULL,  -- Referencia al emprendimiento
  consejo_nombre VARCHAR(100),
  consejo_direccion VARCHAR(255),
  comuna VARCHAR(50),
  CONSTRAINT fk_consejo_emprendimiento FOREIGN KEY (emprendimiento_id) REFERENCES emprendimientos(id) ON DELETE CASCADE
);