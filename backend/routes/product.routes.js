const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { verificarToken } = require('../middleware/authJwt');

// Rutas para Productos (el prefijo /api/products se definirá en server.js)
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);

router.put('/:id', verificarToken,ProductController.update);
router.delete('/:id', verificarToken,ProductController.delete);
router.post('/', verificarToken,ProductController.create);

module.exports = router;