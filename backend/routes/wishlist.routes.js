
const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlistController');
const { verificarToken } = require('../middleware/authJwt');

// Añadir un producto a la lista
// POST /api/wishlist/add
router.post('/add', verificarToken,WishlistController.addProduct);

// Obtener la lista de un usuario
// GET /api/wishlist/user/123
router.get('/user/:userId', verificarToken,WishlistController.getByUser);

// Eliminar un producto de la lista
// DELETE /api/wishlist/user/123/product/456
router.delete('/user/:userId/product/:productId', verificarToken,WishlistController.removeProduct);

module.exports = router;