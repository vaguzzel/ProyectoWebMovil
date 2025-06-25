const db = require('../config/db');

const TiendaModel = {
  // Método para obtener todas las tiendas
  getAll: (callback) => {
    const query = 'SELECT * FROM Tiendas ORDER BY nombre ASC';
    db.query(query, callback);
  }
  // En el futuro, aquí podrías añadir métodos para crear, editar o eliminar tiendas si fuera necesario.
};

module.exports = TiendaModel;
