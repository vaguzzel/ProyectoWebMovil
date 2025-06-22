
const db = require('../config/db');

const ProductModel = {
  // Crear un nuevo producto
  createWithOffers: (productData, offersData, callback) => {
    // 1. Iniciar la transacción
    db.beginTransaction(err => {
      if (err) { return callback(err); }

      // 2. Insertar el producto principal
      db.query('INSERT INTO Producto SET ?', productData, (err, productResult) => {
        if (err) {
          return db.rollback(() => callback(err));
        }

        const productId = productResult.insertId;

        // Si no hay ofertas, simplemente confirmamos la transacción y terminamos.
        if (!offersData || offersData.length === 0) {
          return db.commit(err => {
            if (err) {
              return db.rollback(() => callback(err));
            }
            callback(null, productResult);
          });
        }

        // 3. Preparar las inserciones para la tabla pivote PrecioProductoTienda
        const priceInserts = offersData.map(offer => [
          offer.id_tienda,
          productId,
          offer.precio,
          offer.stock, // Asegúrate de que tu frontend envíe esto
          offer.url_producto
        ]);

        // 4. Insertar todas las ofertas
        const query = 'INSERT INTO PrecioProductoTienda (id_tienda, id_producto, precio, stock, url_producto) VALUES ?';
        db.query(query, [priceInserts], (err, priceResult) => {
          if (err) {
            return db.rollback(() => callback(err));
          }

          // 5. Si todo fue exitoso, confirmar la transacción
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



  // Obtener todos los productos con el nombre de su marca y categoría
  getAll: (callback) => {
    const query = `
      SELECT p.*, m.nombre AS marca_nombre, c.nombre AS categoria_nombre
      FROM Producto p
      LEFT JOIN Marcas m ON p.marca_id = m.marca_id
      LEFT JOIN Categorias c ON p.categoria_id = c.id_categoria
    `;
    db.query(query, callback);
  },

  // Obtener un producto por su ID, incluyendo datos de marca y categoría
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

  // Encontrar productos por categoría (ejemplo de búsqueda específica)
  findByCategory: (categoryId, callback) => {
    db.query('SELECT * FROM Producto WHERE categoria_id = ?', [categoryId], callback);
  }
};

module.exports = ProductModel;