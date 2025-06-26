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

  // Obtener un producto por su ID, incluyendo datos de marca y categoría
  getById: (id, callback) => {
    const query = `
      SELECT p.*, m.nombre AS marca_nombre, c.nombre AS categoria_nombre
      FROM Producto p
      LEFT JOIN Marcas m ON p.marca_id = m.marca_id
      LEFT JOIN Categorias c ON p.categoria_id = c.id_categoria
      WHERE p.id_producto = ?
    `;
    db.query(query, [id], callback);
  },
  
  getOffersByProductId: (id, callback) => {
    const query = `
      SELECT 
        t.id_tienda,
        t.nombre AS tienda_nombre,
        ppt.precio,
        ppt.stock,
        ppt.url_producto
      FROM PrecioProductoTienda ppt
      JOIN Tiendas t ON t.id_tienda = ppt.id_tienda
      WHERE ppt.id_producto = ?
      ORDER BY ppt.precio ASC
    `;
    db.query(query, [id], callback);
  },
  // Actualizar un producto
  update: (id, data, callback) => {
    db.query('UPDATE Producto SET ? WHERE id_producto = ?', [data, id], callback);
  },

  updateWithOffers: (productId, productData, offersData, callback) => {
    db.beginTransaction(err => {
      if (err) { return callback(err); }

      // 1. Actualizar la tabla principal 'Producto'
      db.query('UPDATE Producto SET ? WHERE id_producto = ?', [productData, productId], (err, result) => {
        if (err) {
          console.error("Error al actualizar la tabla Producto:", err);
          return db.rollback(() => callback(err));
        }

        // 2. Borrar las ofertas antiguas de la tabla 'PrecioProductoTienda'
        db.query('DELETE FROM PrecioProductoTienda WHERE id_producto = ?', [productId], (err, deleteResult) => {
          if (err) {
            console.error("Error al borrar ofertas antiguas:", err);
            return db.rollback(() => callback(err));
          }

          // 3. Si no hay nuevas ofertas, terminamos la transacción aquí.
          if (!offersData || offersData.length === 0) {
            return db.commit(err => {
              if (err) { return db.rollback(() => callback(err)); }
              callback(null, result);
            });
          }

          // 4. Preparar e insertar las nuevas ofertas
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
              console.error("Error al insertar nuevas ofertas:", err);
              return db.rollback(() => callback(err));
            }

            // 5. Si todo fue exitoso, confirmar la transacción.
            db.commit(err => {
              if (err) { return db.rollback(() => callback(err)); }
              callback(null, result);
            });
          });
        });
      });
    });
  },

  // Borrar un producto y sus ofertas asociadas
  // Este método ahora maneja la eliminación en cascada de las ofertas y otros datos relacionados
  delete: (id, callback) => {
    db.beginTransaction(err => {
      if (err) { return callback(err); }

      // 1. Borrar de ListadeDeseo
      db.query('DELETE FROM ListadeDeseo WHERE id_producto = ?', [id], (err, result1) => {
        if (err) {
          return db.rollback(() => callback(err));
        }

        // 2. Borrar de Reseñas
        db.query('DELETE FROM Reseñas WHERE id_producto = ?', [id], (err, result2) => {
          if (err) {
            return db.rollback(() => callback(err));
          }

          // 3. Borrar de PrecioProductoTienda
          db.query('DELETE FROM PrecioProductoTienda WHERE id_producto = ?', [id], (err, result3) => {
            if (err) {
              return db.rollback(() => callback(err));
            }

            // 4. Finalmente, borrar de la tabla Producto
            db.query('DELETE FROM Producto WHERE id_producto = ?', [id], (err, result4) => {
              if (err) {
                return db.rollback(() => callback(err));
              }

              // Si todo salió bien, confirmamos todos los cambios
              db.commit(err => {
                if (err) {
                  return db.rollback(() => callback(err));
                }
                callback(null, result4); // Devolvemos el resultado del último borrado
              });
            });
          });
        });
      });
    });
  },

  // Encontrar productos por categoría
  findByCategory: (categoryId, callback) => {
    db.query('SELECT * FROM Producto WHERE categoria_id = ?', [categoryId], callback);
  },

  // --- Método de búsqueda adaptado al estilo directo de db.query ---
  buscarPorPalabraClave: (palabraClave, callback) => {
  // 1. Consulta SQL actualizada: combina los JOINs de `getAll` con el WHERE de la búsqueda.
  const query = `
    SELECT
      p.id_producto,
      p.nombre,
      p.descripcion,
      p.image_url,
      p.marca_id,
      p.categoria_id,
      m.nombre AS marca_nombre,    -- Se añade el nombre de la marca
      c.nombre AS categoria_nombre -- Se añade el nombre de la categoría
    FROM
      Producto p
    LEFT JOIN
      Marcas m ON p.marca_id = m.marca_id
    LEFT JOIN
      Categorias c ON p.categoria_id = c.id_categoria
    WHERE
      p.nombre LIKE ? OR p.descripcion LIKE ? OR m.nombre LIKE ?
  `;

  const searchTerm = `%${palabraClave}%`;

  // 2. Se pasan 3 parámetros para los 3 '?' de la cláusula WHERE.
  db.query(query, [searchTerm, searchTerm, searchTerm], (err, rows) => {
    if (err) {
      console.error('Error al buscar productos en el modelo:', err);
      return callback(err);
    }
    
    // 3. Se actualiza el mapeo para incluir los nuevos campos en el objeto final.
    const productosFormateados = rows.map(row => ({
      id_producto: row.id_producto,
      nombre: row.nombre,
      descripcion: row.descripcion,
      marca_id: row.marca_id,
      categoria_id: row.categoria_id,
      image_url: row.image_url || null,
      marca_nombre: row.marca_nombre || null,     // Se añade la nueva propiedad
      categoria_nombre: row.categoria_nombre || null // Se añade la nueva propiedad
    }));
    
    callback(null, productosFormateados);
  });
}
};


module.exports = ProductModel;