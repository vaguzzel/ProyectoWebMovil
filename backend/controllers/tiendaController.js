const TiendaModel = require('../models/tiendaModel');

const TiendaController = {
  // Método para manejar la solicitud GET para obtener todas las tiendas
  getAll: (req, res) => {
    TiendaModel.getAll((err, tiendas) => {
      if (err) {
        return res.status(500).json({ message: 'Error al obtener las tiendas.', error: err });
      }
      res.json(tiendas);
    });
  }
};

module.exports = TiendaController;
