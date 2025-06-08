// backend/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { verificarToken } = require('../middleware/authJwt');

// Ruta para el registro de usuarios
// POST /api/auth/register
router.post('/register', UserController.register);

// Ruta para el inicio de sesión de usuarios
// POST /api/auth/login
router.post('/login', UserController.login);

// Actualizar perfil (nombre y email)
router.put('/profile', verificarToken, UserController.updateProfile);

// Cambiar la contraseña
router.put('/change-password', verificarToken, UserController.changePassword);

module.exports = router;