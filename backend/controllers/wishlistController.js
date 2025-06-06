
const WishlistModel = require('../models/wishlistModel');

const WishlistController = {
  // Añadir un producto a la lista de deseos
  addProduct: (req, res) => {
    // Para un uso real, el id_usuario debería venir del token de autenticación.
    // Por ahora, lo tomamos del cuerpo de la solicitud.
    const { id_usuario, id_producto } = req.body;

    WishlistModel.add({ id_usuario, id_producto }, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Este producto ya está en tu lista de deseos.' });
        }
        return res.status(500).json({ message: 'Error al añadir a la lista de deseos.', error: err });
      }
      res.status(201).json({ message: 'Producto añadido a la lista de deseos.' });
    });
  },

  // Obtener la lista de deseos de un usuario
  getByUser: (req, res) => {
    const userId = req.params.userId;
    WishlistModel.getByUser(userId, (err, items) => {
      if (err) return res.status(500).json({ message: 'Error al obtener la lista de deseos.', error: err });
      res.json(items);
    });
  },

  // Eliminar un producto de la lista de deseos
  removeProduct: (req, res) => {
    // El id_usuario debería venir del token, y el id_producto de los parámetros de la URL
    const { userId, productId } = req.params;
    
    WishlistModel.remove(userId, productId, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al eliminar de la lista de deseos.', error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado en la lista de deseos.' });
      res.status(204).send();
    });
  }
};

module.exports = WishlistController;