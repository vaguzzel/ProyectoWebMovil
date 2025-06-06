const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/brandController');

// Rutas para Marcas (el prefijo /api/brands se definirá en server.js)
router.post('/', BrandController.create);        // POST /api/brands
router.get('/', BrandController.getAll);        // GET  /api/brands
router.get('/:id', BrandController.getById);    // GET  /api/brands/123
router.put('/:id', BrandController.update);     // PUT  /api/brands/123
router.delete('/:id', BrandController.delete);  // DELETE /api/brands/123

module.exports = router;