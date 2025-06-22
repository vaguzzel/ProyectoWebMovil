const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { verificarToken, esAdmin } = require('../middleware/authJwt');

// Rutas para Productos (el prefijo /api/products se definirá en server.js)
router.get('/', ProductController.getAll);
router.get('/buscar', ProductController.buscarProductos);

router.put('/:id',verificarToken, esAdmin,ProductController.update);
router.delete('/:id', verificarToken, esAdmin,ProductController.delete);
router.post('/', verificarToken, esAdmin,ProductController.create);

module.exports = router;