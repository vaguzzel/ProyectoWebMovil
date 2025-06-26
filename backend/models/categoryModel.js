
const db = require('../config/db');

const CategoryModel = {
  // Crear una nueva categoría
  create: (data, callback) => {
    db.query('INSERT INTO Categorias SET ?', data, callback);
  },

  // Obtener todas las categorías
  getAll: (callback) => {
    db.query('SELECT * FROM Categorias', callback);
  },

  // Obtener una categoría por su ID
  getById: (id, callback) => {
    db.query('SELECT * FROM Categorias WHERE id_categoria = ?', [id], callback);
  },

  // Actualizar una categoría
  update: (id, data, callback) => {
    db.query('UPDATE Categorias SET ? WHERE id_categoria = ?', [data, id], callback);
  },

  // Eliminar una categoría
  delete: (id, callback) => {
    db.query('DELETE FROM Categorias WHERE id_categoria = ?', [id], callback);
  },

  // Obtener productos por categoría, incluyendo el precio más bajo
  // Si no hay ofertas, se asigna un precio por defecto de 10990
  getProductsByCategoryId: (id, callback) => {
    const query = `
      SELECT 
        p.*, 
        m.nombre AS marca_nombre,
        -- Añadimos la misma lógica de precios aquí
        COALESCE(
          (SELECT MIN(ppt.precio) FROM PrecioProductoTienda ppt WHERE ppt.id_producto = p.id_producto),
          10990
        ) AS precio_mas_bajo
      FROM Producto p
      LEFT JOIN Marcas m ON p.marca_id = m.marca_id
      WHERE p.categoria_id = ?
    `;
    db.query(query, [id], callback);
  }

};

module.exports = CategoryModel;