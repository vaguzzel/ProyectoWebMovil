
const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlistController');

// Añadir un producto a la lista
// POST /api/wishlist/add
router.post('/add', WishlistController.addProduct);

// Obtener la lista de un usuario
// GET /api/wishlist/user/123
router.get('/user/:userId', WishlistController.getByUser);

// Eliminar un producto de la lista
// DELETE /api/wishlist/user/123/product/456
router.delete('/user/:userId/product/:productId', WishlistController.removeProduct);

module.exports = router;