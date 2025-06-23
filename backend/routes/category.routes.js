const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const { verificarToken, esAdmin } = require('../middleware/authJwt');

// Rutas públicas
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);

// Rutas protegidas
router.post('/', [verificarToken, esAdmin], CategoryController.create);
router.put('/:id', [verificarToken, esAdmin], CategoryController.update);
router.delete('/:id', [verificarToken, esAdmin], CategoryController.delete);

module.exports = router;
