
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const { verificarToken } = require('../middleware/authJwt');

// Rutas para Categorías (el prefijo /api/categories se definirá en server.js)
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);

router.put('/:id', verificarToken,CategoryController.update);
router.delete('/:id', verificarToken,CategoryController.delete);
router.post('/', verificarToken,CategoryController.create);

module.exports = router;