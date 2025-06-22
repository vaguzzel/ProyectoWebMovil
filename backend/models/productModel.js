const db = require('../config/db'); // Asegúrate de que este 'db' soporta callbacks y transacciones como lo usas

const ProductModel = {
  // Crear un nuevo producto con ofertas (lógica de transacción existente)
  createWithOffers: (productData, offersData, callback) => {
    db.beginTransaction(err => {
      if (err) { return callback(err); }

      db.query('INSERT INTO Producto SET ?', productData, (err, productResult) => {
        if (err) {
          return db.rollback(() => callback(err));
        }

        const productId = productResult.insertId;

        if (!offersData || offersData.length === 0) {
          return db.commit(err => {
            if (err) {
              return db.rollback(() => callback(err));
            }
            callback(null, productResult);
          });
        }

        const priceInserts = offersData.map(offer => [
          offer.id_tienda,
          productId,
          offer.precio,
          offer.stock,
          offer.url_producto
        ]);

        const query = 'INSERT INTO PrecioProductoTienda (id_tienda, id_producto, precio, stock, url_producto) VALUES ?';
        db.query(query, [priceInserts], (err, priceResult) => {
          if (err) {
            return db.rollback(() => callback(err));
          }

          db.commit(err => {
            if (err) {
              return db.rollback(() => callback(err));
            }
            callback(null, productResult);
          });
        });
      });
    });
  },

  // Obtener todos los productos
  getAll: (callback) => {
    const query = `
      SELECT p.*, m.nombre AS marca_nombre, c.nombre AS categoria_nombre
      FROM Producto p
      LEFT JOIN Marcas m ON p.marca_id = m.marca_id
      LEFT JOIN Categorias c ON p.categoria_id = c.id_categoria
    `;
    db.query(query, callback);
  },

  // Obtener producto por ID (lógica existente)
  getById: (id, callback) => {
    const query = `
      SELECT
        p.id_producto, p.nombre, p.descripcion, p.image_url,
        m.nombre AS marca_nombre,
        c.nombre AS categoria_nombre,
        (SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id_tienda', t.id_tienda,
              'tienda_nombre', t.nombre,
              'precio', ppt.precio,
              'stock', ppt.stock,
              'url_producto', ppt.url_producto
            )
          )
        FROM PrecioProductoTienda ppt
        JOIN Tiendas t ON t.id_tienda = ppt.id_tienda
        WHERE ppt.id_producto = p.id_producto
        ) AS ofertas
      FROM Producto p
      LEFT JOIN Marcas m ON p.marca_id = m.marca_id
      LEFT JOIN Categorias c ON p.categoria_id = c.id_categoria
      WHERE p.id_producto = ?
    `;
    db.query(query, [id], callback);
  },

  // Actualizar un producto
  update: (id, data, callback) => {
    db.query('UPDATE Producto SET ? WHERE id_producto = ?', [data, id], callback);
  },

  // Eliminar un producto
  delete: (id, callback) => {
    db.query('DELETE FROM Producto WHERE id_producto = ?', [id], callback);
  },

  // Encontrar productos por categoría
  findByCategory: (categoryId, callback) => {
    db.query('SELECT * FROM Producto WHERE categoria_id = ?', [categoryId], callback);
  },

  // --- Método de búsqueda adaptado al estilo directo de db.query ---
  buscarPorPalabraClave: (palabraClave, callback) => {
    const query = `
      SELECT
        id_producto,
        nombre,
        descripcion,
        marca_id,
        categoria_id,
        image_url
      FROM
        producto
      WHERE
        nombre LIKE ? OR CAST(descripcion AS CHAR) LIKE ?
    `;

    const searchTerm = `%${palabraClave}%`;

    // Pasamos el callback directamente a db.query,
    // asumiendo que db.query manejará la estructura (err, rows) para nosotros.
    // El mapeo de datos se haría en el controlador si fuera necesario,
    // o en el frontend, o se dejaría así si los nombres de columna ya coinciden.
    db.query(query, [searchTerm, searchTerm], (err, rows) => {
      if (err) {
        console.error('Error al buscar productos en el modelo:', err);
        return callback(err); // Propaga el error
      }
      // Realizamos el mapeo aquí para mantener la consistencia de los datos
      // que el modelo debe devolver al controlador.
      const productosFormateados = rows.map(row => ({
        id_producto: row.id_producto,
        nombre: row.nombre,
        descripcion: row.descripcion, // Asegúrate de que `descripcion` es correcta aquí
        marca_id: row.marca_id,
        categoria_id: row.categoria_id || null,
        image_url: row.image_url || null
      }));
       callback(null, productosFormateados); // Devuelve los datos formateados
    });
  }
};


module.exports = ProductModel;