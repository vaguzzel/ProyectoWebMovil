// backend/routes/product.routes.js

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { verificarToken, esAdmin } = require('../middleware/authJwt');

// --- INICIO DE LA CORRECCIÓN ---
// Se reordenan las rutas para que las más específicas estén primero.

// Rutas públicas
router.get('/', ProductController.getAll);
router.get('/buscar', ProductController.buscarProductos);

// La ruta para categorías va ANTES que la ruta para un ID específico.
router.get('/category/:id', ProductController.getProductsByCategory);

// La ruta genérica para un ID va después.
router.get('/:id', ProductController.getById);

// --- FIN DE LA CORRECCIÓN ---

// Rutas protegidas por administrador
router.put('/:id', verificarToken, esAdmin, ProductController.update);
router.delete('/:id', verificarToken, esAdmin, ProductController.delete);
router.post('/', verificarToken, esAdmin, ProductController.create);

module.exports = router;