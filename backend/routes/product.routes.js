const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { verificarToken, esAdmin } = require('../middleware/authJwt');
const uploadMiddleware = require('../middleware/upload');

// --- Rutas Públicas ---
router.get('/', ProductController.getAll);
router.get('/buscar', ProductController.buscarProductos);
router.get('/:id', ProductController.getById);

// --- Rutas Protegidas ---
// Agrupamos los middlewares en un array. Esta es la sintaxis más segura.
router.post('/', 
    [verificarToken, esAdmin, uploadMiddleware], 
    ProductController.create
);

router.put('/:id', 
    [verificarToken, esAdmin, uploadMiddleware], 
    ProductController.update
);

router.delete('/:id', 
    [verificarToken, esAdmin], 
    ProductController.delete
);

module.exports = router;
