
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

// Rutas para Categorías (el prefijo /api/categories se definirá en server.js)
router.post('/', CategoryController.create);
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

module.exports = router;