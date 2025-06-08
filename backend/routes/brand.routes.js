const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/brandController');
const { verificarToken, esAdmin } = require('../middleware/authJwt');

// Rutas para Marcas (el prefijo /api/brands se definirá en server.js)
router.get('/', BrandController.getAll);        // GET  /api/brands
router.get('/:id', BrandController.getById);    // GET  /api/brands/123

router.put('/:id',verificarToken, esAdmin,BrandController.update);     // PUT  /api/brands/123
router.delete('/:id',verificarToken, esAdmin,BrandController.delete);  // DELETE /api/brands/123
router.post('/',verificarToken, esAdmin,BrandController.create);        // POST /api/brands

module.exports = router;