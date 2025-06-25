
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

  getProductsByCategoryId: (id, callback) => {
    // Unimos Producto con Marcas para obtener también el nombre de la marca
    const query = `
      SELECT 
        p.*, 
        m.nombre AS marca_nombre 
      FROM Producto p
      LEFT JOIN Marcas m ON p.marca_id = m.marca_id
      WHERE p.categoria_id = ?
    `;
    db.query(query, [id], callback);
  }

};

module.exports = CategoryModel;