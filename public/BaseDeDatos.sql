CREATE TABLE usuario (
  cedula VARCHAR(20) NOT NULL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  usuario VARCHAR(50) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  rol VARCHAR(50) NOT NULL,
  estatus VARCHAR(20) NOT NULL
);

INSERT INTO usuario (cedula, nombre, usuario, contrasena, rol, estatus) VALUES
('1234567890', 'Juan Perez', 'jperez', 'Contrasena123!', 'Administrador', 'Activo'),
('0987654321', 'Maria Gomez', 'mgomez', 'Segura123!', 'Usuario', 'Activo'),
('1122334455', 'Carlos Ruiz', 'cruiz', 'Password456!', 'Usuario', 'Inactivo'),
('6677889900', 'Ana Lopez', 'alopez', 'MiContraseña789!', 'Editor', 'Activo'),
('5566778899', 'Luis Fernandez', 'lfernandez', 'ClaveSegura987!', 'Usuario', 'Activo');