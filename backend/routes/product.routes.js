const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Rutas para Productos (el prefijo /api/products se definirá en server.js)
router.post('/', ProductController.create);
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;