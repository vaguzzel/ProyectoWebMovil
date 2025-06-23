const db = require('../config/db');
const bcrypt = require('bcrypt');

async function seedDatabase() {
  try {
    const connection = db.promise(); 

    console.log('--- INICIANDO SIEMBRA DE DATOS ---');

    // PASO 1: INSERTAR MARCAS
    const marcasSQL = `
      INSERT IGNORE INTO Marcas (nombre) VALUES
      ('tocobo'), ('skin1004'), ('rare_beauty'), ('nyx'), ('loreal'),
      ('kiko_milano'), ('cerave'), ('bell_hypoallergenic'), ('anua');
    `;
    await connection.query(marcasSQL);
    console.log('Paso 1/6: Marcas insertadas correctamente.');

    // PASO 2: INSERTAR CATEGORÍAS
    const categoriasSQL = `
      INSERT IGNORE INTO Categorias (nombre, descripcion) VALUES
      ('Skincare', 'Productos para el cuidado de la piel.'),
      ('Rostro', 'Maquillaje para el rostro como bases, correctores y coloretes.'),
      ('Labios', 'Productos para los labios como gloss y bálsamos.');
    `;
    await connection.query(categoriasSQL);
    console.log('Paso 2/6: Categorías insertadas correctamente.');
    
    // PASO 3: INSERTAR TIENDAS
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

    // PASO 4: INSERTAR USUARIO ADMINISTRADOR
    const adminPassword = 'admin';
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(adminPassword, salt);
    
    const adminSQL = `
      INSERT IGNORE INTO Usuarios (nombre, rut, email, region, comuna, password_hash, rol) VALUES
      ('Admin', '1-9', 'admin@look4beauty.com', 'Valparaíso', 'Viña del Mar', ?, 'admin');
    `;
    await connection.query(adminSQL, [password_hash]);
    console.log('Paso 4/6: Usuario Administrador creado. (Email: admin@look4beauty.com, Pass: admin)');

    // PASO 5: INSERTAR TODOS LOS PRODUCTOS CORRESPONDIENTES A LAS IMÁGENES
    const productosSQL = `
      INSERT IGNORE INTO Producto (id_producto, nombre, descripcion, marca_id, categoria_id, image_url) VALUES
        (1, 'Sunscreen', 'Protector solar de alta eficacia.', (SELECT marca_id FROM Marcas WHERE nombre = 'tocobo'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Skincare'), 'images/tocobo-sunscreen.png'),
        (2, 'Lipbalm', 'Bálsamo labial hidratante.', (SELECT marca_id FROM Marcas WHERE nombre = 'tocobo'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Labios'), 'images/tocobo-lipbalm.png'),
        (3, 'Limpiador Oleoso', 'Limpiador facial a base de aceite.', (SELECT marca_id FROM Marcas WHERE nombre = 'skin1004'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Skincare'), 'images/skin1004-limpiador_oleoso.png'),
        (4, 'Tinted Moisturizer', 'Hidratante con color para un look natural.', (SELECT marca_id FROM Marcas WHERE nombre = 'rare_beauty'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Rostro'), 'images/rare_beauty-moisturized.png'),
        (5, 'Liquid Blush', 'Colorete líquido de alta pigmentación.', (SELECT marca_id FROM Marcas WHERE nombre = 'rare_beauty'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Rostro'), 'images/rare_beauty-liquid_blush.png'),
        (6, 'Concealer', 'Corrector de ojeras e imperfecciones.', (SELECT marca_id FROM Marcas WHERE nombre = 'nyx'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Rostro'), 'images/nyx-concealer.png'),
        (7, 'Serum Revitalift', 'Serum con ácido hialurónico.', (SELECT marca_id FROM Marcas WHERE nombre = 'loreal'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Skincare'), 'images/loreal-serum_revitalift.png'),
        (8, 'Serum Ojos', 'Serum para el contorno de ojos.', (SELECT marca_id FROM Marcas WHERE nombre = 'loreal'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Skincare'), 'images/loreal-serum_ojos.png'),
        (9, '3D Hydra Lip Gloss', 'Brillo de labios con efecto 3D.', (SELECT marca_id FROM Marcas WHERE nombre = 'kiko_milano'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Labios'), 'images/kiko_milano-gloss.png'),
        (10, 'Limpiador Facial', 'Gel limpiador facial espumoso.', (SELECT marca_id FROM Marcas WHERE nombre = 'cerave'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Skincare'), 'images/cerave-limpiador_facial.png'),
        (11, 'Hypoallergenic Base', 'Base de maquillaje hipoalergénica.', (SELECT marca_id FROM Marcas WHERE nombre = 'bell_hypoallergenic'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Rostro'), 'images/bell_hypoallergenic-base.png'),
        (12, 'Heartleaf Toner', 'Tónico calmante para la piel.', (SELECT marca_id FROM Marcas WHERE nombre = 'anua'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Skincare'), 'images/anua-toner.png'),
        (13, 'Soft Pinch Luminous Powder Blush', 'Colorete en polvo luminoso.', (SELECT marca_id FROM Marcas WHERE nombre = 'rare_beauty'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Rostro'), 'images/rare_beauty.webp'),
        (14, 'Cotton Soft Sun Stick', 'Protector solar en barra con acabado suave.', (SELECT marca_id FROM Marcas WHERE nombre = 'tocobo'), (SELECT id_categoria FROM Categorias WHERE nombre = 'Skincare'), 'images/tocobo_protector.webp');
    `;
    await connection.query(productosSQL);
    console.log('Paso 5/6: Todos los productos de ejemplo han sido insertados correctamente.');

    // PASO 6: INSERTAR PRECIOS EN LA TABLA PIVOTE (AÑADIENDO MÁS OFERTAS)
    const preciosSQL = `
      INSERT IGNORE INTO PrecioProductoTienda (id_tienda, id_producto, precio, stock, url_producto) VALUES
        -- Sunscreen (ID 1)
        (1, 1, 12990, 50, 'https://www.cruzverde.cl/'),
        (5, 1, 13490, 30, 'https://www.falabella.com/falabella-cl/'),
        -- Lipbalm (ID 2)
        (2, 2, 6990, 100, 'https://www.maicao.cl/'),
        -- Limpiador Oleoso (ID 3)
        (4, 3, 18990, 45, 'https://dbs.cl/'),
        (8, 3, 19990, 20, 'https://www.blush-bar.cl/'),
        -- Liquid Blush (ID 5)
        (4, 5, 24990, 100, 'https://dbs.cl/'),
        (5, 5, 25990, 80, 'https://www.falabella.com/falabella-cl/'),
        (8, 5, 26990, 40, 'https://www.blush-bar.cl/'),
        -- Concealer (ID 6)
        (6, 6, 8990, 70, 'https://www.nyxcosmetics.cl/'),
        -- 3D Hydra Lip Gloss (ID 9)
        (5, 9, 9990, 120, 'https://www.falabella.com/falabella-cl/'),
        (6, 9, 10490, 60, 'https://www.nyxcosmetics.cl/'),
        -- Limpiador Facial Cerave (ID 10)
        (2, 10, 8990, 200, 'https://www.maicao.cl/'),
        (1, 10, 8490, 150, 'https://www.cruzverde.cl/'),
        -- Heartleaf Toner (ID 12)
        (4, 12, 19990, 25, 'https://dbs.cl/');
    `;
    await connection.query(preciosSQL);
    console.log('Paso 6/6: Precios de productos insertados correctamente.');

    console.log('\n--- ¡SIEMBRA DE DATOS COMPLETADA EXITOSAMENTE! ---');
    
  } catch (err) {
    console.error('ERROR: No se pudo completar la siembra de datos.', err);
  } finally {
    db.end();
  }
}

// Ejecutar la función principal
seedDatabase();
