const express = require('express');
const router = express.Router();
const TiendaController = require('../controllers/tiendaController');

// Ruta para obtener la lista de todas las tiendas
// GET /api/tiendas
router.get('/', TiendaController.getAll);

module.exports = router;
