
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
  }
};

module.exports = CategoryModel;