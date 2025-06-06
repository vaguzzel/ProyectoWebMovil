
const db = require('../config/db');

const BrandModel = {
  // Crear una nueva marca
  create: (data, callback) => {
    
    db.query('INSERT INTO Marcas SET ?', data, callback);
  },

  // Obtener todas las marcas
  getAll: (callback) => {
    db.query('SELECT * FROM Marcas', callback);
  },

  // Obtener una marca por su ID
  getById: (id, callback) => {
    db.query('SELECT * FROM Marcas WHERE marca_id = ?', [id], callback);
  },

  // Actualizar una marca
  update: (id, data, callback) => {
    db.query('UPDATE Marcas SET ? WHERE marca_id = ?', [data, id], callback);
  },

  // Eliminar una marca
  delete: (id, callback) => {
    db.query('DELETE FROM Marcas WHERE marca_id = ?', [id], callback);
  }
};

module.exports = BrandModel;