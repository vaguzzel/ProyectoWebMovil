// backend/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Ruta para el registro de usuarios
// POST /api/auth/register
router.post('/register', UserController.register);

// Ruta para el inicio de sesión de usuarios
// POST /api/auth/login
router.post('/login', UserController.login);

module.exports = router;