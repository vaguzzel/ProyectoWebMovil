const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlistController');
const { verificarToken } = require('../middleware/authJwt');

router.post('/add', verificarToken, WishlistController.addProduct);
router.get('/user/:userId', verificarToken, WishlistController.getByUser);
router.delete('/user/:userId/product/:productId', verificarToken, WishlistController.removeProduct);

module.exports = router;
