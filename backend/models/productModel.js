
const db = require('../config/db');

const ProductModel = {
  // Crear un nuevo producto
  create: (data, callback) => {
    db.query('INSERT INTO Producto SET ?', data, callback);
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
      SELECT p.*, m.nombre AS marca_nombre, c.nombre AS categoria_nombre
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