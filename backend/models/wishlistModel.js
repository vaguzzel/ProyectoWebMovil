
const db = require('../config/db');

const WishlistModel = {
  // Añadir un producto a la lista de deseos de un usuario
  add: (data, callback) => {
    db.query('INSERT INTO ListadeDeseo SET ?', data, callback);
  },

  // Obtener todos los productos en la lista de deseos de un usuario específico con el precio más bajo
  // Si no hay ofertas, se asigna un precio por defecto de 10990
  getByUser: (userId, callback) => {
    const query = `
      SELECT 
        p.*, 
        m.nombre as marca_nombre, 
        c.nombre as categoria_nombre,
        -- Y aquí también añadimos la lógica de precios
        COALESCE(
          (SELECT MIN(ppt.precio) FROM PrecioProductoTienda ppt WHERE ppt.id_producto = p.id_producto),
          10990
        ) AS precio_mas_bajo
      FROM ListadeDeseo w
      JOIN Producto p ON w.id_producto = p.id_producto
      LEFT JOIN Marcas m ON p.marca_id = m.marca_id
      LEFT JOIN Categorias c ON p.categoria_id = c.id_categoria
      WHERE w.id_usuario = ?
    `;
    db.query(query, [userId], callback);
  },

  // Eliminar un producto de la lista de deseos de un usuario
  remove: (userId, productId, callback) => {
    db.query('DELETE FROM ListadeDeseo WHERE id_usuario = ? AND id_producto = ?', [userId, productId], callback);
  }
};

module.exports = WishlistModel;