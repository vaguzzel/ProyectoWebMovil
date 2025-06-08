// backend/db/seed.js

const db = require('../config/db'); 

const seedSQL = `
-- Usar la base de datos correcta
USE look_4_beauty;

-- PASO 1: INSERTAR LAS MARCAS
INSERT IGNORE INTO Marcas (nombre) VALUES
('tocobo'), ('skin1004'), ('rare_beauty'), ('nyx'), ('loreal'),
('kiko_milano'), ('cerave'), ('bell_hypoallergenic'), ('anua');

-- PASO 2: INSERTAR CATEGORÍAS
INSERT IGNORE INTO Categorias (nombre, descripcion) VALUES
('Skincare', 'Productos para el cuidado de la piel.'),
('Rostro', 'Maquillaje para el rostro como bases, correctores y coloretes.'),
('Labios', 'Productos para los labios como gloss y bálsamos.');

-- PASO 3: INSERTAR LOS PRODUCTOS (VERSIÓN CORREGIDA)
INSERT IGNORE INTO Producto (nombre, descripcion, marca_id, categoria_id, image_url) VALUES
('Sunscreen', 'Protector solar de alta eficacia.', (SELECT marca_id FROM Marcas WHERE nombre = 'tocobo'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Skincare'), 'assets/images/tocobo-sunscreen.png'),
('Lipbalm', 'Bálsamo labial hidratante.', (SELECT marca_id FROM Marcas WHERE nombre = 'tocobo'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Labios'), 'assets/images/tocobo-lipbalm.png'),
('Limpiador Oleoso', 'Limpiador facial a base de aceite.', (SELECT marca_id FROM Marcas WHERE nombre = 'skin1004'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Skincare'), 'assets/images/skin1004-limpiador_oleoso.png'),
('Tinted Moisturizer', 'Hidratante con color para un look natural.', (SELECT marca_id FROM Marcas WHERE nombre = 'rare_beauty'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Rostro'), 'assets/images/rare_beauty-moisturized.png'),
('Liquid Blush', 'Colorete líquido de alta pigmentación.', (SELECT marca_id FROM Marcas WHERE nombre = 'rare_beauty'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Rostro'), 'assets/images/rare_beauty-liquid_blush.png'),
('Concealer', 'Corrector de ojeras e imperfecciones.', (SELECT marca_id FROM Marcas WHERE nombre = 'nyx'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Rostro'), 'assets/images/nyx-concealer.png'),
('Serum Revitalift', 'Serum con ácido hialurónico.', (SELECT marca_id FROM Marcas WHERE nombre = 'loreal'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Skincare'), 'assets/images/loreal-serum_revitalift.png'),
('Serum Ojos', 'Serum para el contorno de ojos.', (SELECT marca_id FROM Marcas WHERE nombre = 'loreal'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Skincare'), 'assets/images/loreal-serum_ojos.png'),
('3D Hydra Lip Gloss', 'Brillo de labios con efecto 3D.', (SELECT marca_id FROM Marcas WHERE nombre = 'kiko_milano'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Labios'), 'assets/images/kiko_milano-gloss.png'),
('Limpiador Facial', 'Gel limpiador facial espumoso.', (SELECT marca_id FROM Marcas WHERE nombre = 'cerave'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Skincare'), 'assets/images/cerave-limpiador_facial.png'),
('Hypoallergenic Base', 'Base de maquillaje hipoalergénica.', (SELECT marca_id FROM Marcas WHERE nombre = 'bell_hypoallergenic'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Rostro'), 'assets/images/bell_hypoallergenic-base.png'),
('Heartleaf Toner', 'Tónico calmante para la piel.', (SELECT marca_id FROM Marcas WHERE nombre = 'anua'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Skincare'), 'assets/images/anua-toner.png');
`;

// Ejecutar la consulta
db.query(seedSQL, (err, results) => {
  if (err) {
    console.error('Error al ejecutar el script de siembra:', err);
    return;
  }
  console.log('Base de datos sembrada exitosamente.');
  db.end(); // Cerrar la conexión
});