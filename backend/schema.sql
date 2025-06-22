const db = require('../config/db');
const bcrypt = require('bcrypt'); // Importamos bcrypt para encriptar la contraseña

// Usamos una función asíncrona para tener un mejor control del flujo
async function seedDatabase() {
  try {
    // Usamos la versión de promesas de la conexión para evitar anidamiento de callbacks
    const connection = db.promise(); 

    console.log('--- INICIANDO SIEMBRA DE DATOS ---');

    // PASO 1: INSERTAR MARCAS (sin cambios)
    const marcasSQL = `
      INSERT IGNORE INTO Marcas (nombre) VALUES
      ('tocobo'), ('skin1004'), ('rare_beauty'), ('nyx'), ('loreal'),
      ('kiko_milano'), ('cerave'), ('bell_hypoallergenic'), ('anua');
    `;
    await connection.query(marcasSQL);
    console.log('Paso 1/6: Marcas insertadas correctamente.');

    // PASO 2: INSERTAR CATEGORÍAS (sin cambios)
    const categoriasSQL = `
      INSERT IGNORE INTO Categorias (nombre, descripcion) VALUES
      ('Skincare', 'Productos para el cuidado de la piel.'),
      ('Rostro', 'Maquillaje para el rostro como bases, correctores y coloretes.'),
      ('Labios', 'Productos para los labios como gloss y bálsamos.');
    `;
    await connection.query(categoriasSQL);
    console.log('Paso 2/6: Categorías insertadas correctamente.');
    
    // PASO 3: INSERTAR TIENDAS (con tus nuevas adiciones)
    const tiendasSQL = `
      INSERT IGNORE INTO Tiendas (nombre, url) VALUES
      ('Cruz Verde', 'https://www.cruzverde.cl/'),
      ('Maicao', 'https://www.maicao.cl/'),
      ('Preunic', 'https://www.preunic.cl/'),
      ('DBS Beauty Store', 'https://dbs.cl/'),
      ('Falabella', 'https://www.falabella.com/falabella-cl'),
      ('NYX Cosmetics', 'https://www.nyxcosmetics.cl/'),
      ('Maybelline', 'https://www.maybelline.cl/'),
      ('Blush-Bar', 'https://www.blush-bar.cl/');
    `;
    await connection.query(tiendasSQL);
    console.log('Paso 3/6: Tiendas insertadas correctamente.');

    // PASO 4: INSERTAR USUARIO ADMINISTRADOR (sin cambios)
    const adminPassword = 'admin';
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(adminPassword, salt);
    
    const adminSQL = `
      INSERT IGNORE INTO Usuarios (nombre, rut, email, region, comuna, password_hash, rol) VALUES
      ('Admin', '1-9', 'admin@look4beauty.com', 'Valparaíso', 'Viña del Mar', ?, 'admin');
    `;
    await connection.query(adminSQL, [password_hash]);
    console.log('Paso 4/6: Usuario Administrador creado. (Email: admin@look4beauty.com, Pass: admin)');

    // PASO 5: INSERTAR PRODUCTOS (sin cambios, usamos los mismos 3 para el ejemplo)
    const productosSQL = `
      INSERT IGNORE INTO Producto (id_producto, nombre, descripcion, marca_id, categoria_id, image_url) VALUES
      (1, 'Sunscreen', 'Protector solar de alta eficacia.', (SELECT marca_id FROM Marcas WHERE nombre = 'tocobo'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Skincare'), 'images/tocobo-sunscreen.png'),
      (2, 'Liquid Blush', 'Colorete líquido de alta pigmentación.', (SELECT marca_id FROM Marcas WHERE nombre = 'rare_beauty'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Rostro'), 'images/rare_beauty-liquid_blush.png'),
      (3, '3D Hydra Lip Gloss', 'Brillo de labios con efecto 3D.', (SELECT marca_id FROM Marcas WHERE nombre = 'kiko_milano'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Labios'), 'images/kiko_milano-gloss.png');
    `;
    await connection.query(productosSQL);
    console.log('Paso 5/6: Productos de ejemplo insertados correctamente.');

    // PASO 6: INSERTAR PRECIOS EN LA TABLA PIVOTE (con nuevas ofertas para las nuevas tiendas)
    const preciosSQL = `
      INSERT IGNORE INTO PrecioProductoTienda (id_tienda, id_producto, precio, stock, url_producto) VALUES
      -- Precios para Sunscreen (id_producto = 1)
      ((SELECT id_tienda FROM Tiendas WHERE nombre = 'Cruz Verde'), 1, 12990, 50, 'https://www.cruzverde.cl/'),
      ((SELECT id_tienda FROM Tiendas WHERE nombre = 'Falabella'), 1, 13490, 30, 'https://www.falabella.com/falabella-cl/'),
      -- Precios para Liquid Blush (id_producto = 2)
      ((SELECT id_tienda FROM Tiendas WHERE nombre = 'DBS Beauty Store'), 2, 24990, 100, 'https://dbs.cl/'),
      ((SELECT id_tienda FROM Tiendas WHERE nombre = 'Falabella'), 2, 25990, 80, 'https://www.falabella.com/falabella-cl/'),
      ((SELECT id_tienda FROM Tiendas WHERE nombre = 'Blush-Bar'), 2, 26990, 40, 'https://www.blush-bar.cl/'),
      -- Precios para 3D Hydra Lip Gloss (id_producto = 3)
      ((SELECT id_tienda FROM Tiendas WHERE nombre = 'Falabella'), 3, 9990, 120, 'https://www.falabella.com/falabella-cl/'),
      ((SELECT id_tienda FROM Tiendas WHERE nombre = 'NYX Cosmetics'), 3, 10490, 60, 'https://www.nyxcosmetics.cl/');
    `;
    await connection.query(preciosSQL);
    console.log('Paso 6/6: Precios de productos insertados correctamente.');

    console.log('\n--- ¡SIEMBRA DE DATOS COMPLETADA EXITOSAMENTE! ---');
    
  } catch (err) {
    console.error('ERROR: No se pudo completar la siembra de datos.', err);
  } finally {
    // Asegurarse de que la conexión siempre se cierre, incluso si hay un error
    db.end();
  }
}

// Ejecutar la función principal
seedDatabase();
