const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/brandController');
const { verificarToken, esAdmin } = require('../middleware/authJwt');

// Rutas públicas
router.get('/', BrandController.getAll);
router.get('/:id', BrandController.getById);

// Rutas protegidas (agrupando middlewares en un array)
router.post('/', [verificarToken, esAdmin], BrandController.create);
router.put('/:id', [verificarToken, esAdmin], BrandController.update);
router.delete('/:id', [verificarToken, esAdmin], BrandController.delete);

module.exports = router;
