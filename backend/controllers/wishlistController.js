// backend/controllers/wishlistController.js (VERSIÓN FINAL Y CORREGIDA)

const WishlistModel = require('../models/wishlistModel');

const WishlistController = {
  // Añadir un producto a la lista de deseos
  addProduct: (req, res) => {
    const id_usuario = req.usuario.userId;
    const { id_producto } = req.body; // Solo necesitamos el ID del producto del body

    // Verificación por si el id_producto no viene en el body
    if (!id_producto) {
      return res.status(400).json({ message: 'El id_producto es requerido.' });
    }

    WishlistModel.add({ id_usuario, id_producto }, (err, result) => {
      if (err) {
        console.error("ERROR DETALLADO DEL BACKEND AL AÑADIR A WISHLIST:", err); // Mantenemos nuestro log
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Este producto ya está en tu lista de deseos.' });
        }
        return res.status(500).json({ message: 'Error al añadir a la lista de deseos.', error: err });
      }
      res.status(201).json({ message: 'Producto añadido a la lista de deseos.' });
    });
  },

  // Obtener la lista de deseos del usuario autenticado
  getByUser: (req, res) => {
    // ¡CORRECCIÓN! Usamos el ID del token.
    // Esto asegura que un usuario solo pueda ver su propia lista.
    const userId = req.usuario.userId;
    WishlistModel.getByUser(userId, (err, items) => {
      if (err) {
        console.error("ERROR DETALLADO DEL BACKEND AL OBTENER WISHLIST:", err);
        return res.status(500).json({ message: 'Error al obtener la lista de deseos.', error: err });
      }
      res.json(items);
    });
  },

  // Eliminar un producto de la lista de deseos del usuario autenticado
  removeProduct: (req, res) => {
    // ¡CORRECCIÓN! El ID del usuario viene del token.
    const userId = req.usuario.userId;
    const { productId } = req.params; // El ID del producto sí viene de la URL

    WishlistModel.remove(userId, productId, (err, result) => {
      if (err) {
        console.error("ERROR DETALLADO DEL BACKEND AL QUITAR DE WISHLIST:", err);
        return res.status(500).json({ message: 'Error al eliminar de la lista de deseos.', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Producto no encontrado en la lista de deseos.' });
      }
      res.status(204).send();
    });
  }
};

module.exports = WishlistController;