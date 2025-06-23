const express = require('express');
const router = express.Router();
const TiendaController = require('../controllers/tiendaController');

router.get('/', TiendaController.getAll);

module.exports = router;
