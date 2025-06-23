const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { verificarToken } = require('../middleware/authJwt');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/profile', verificarToken, UserController.updateProfile);
router.put('/change-password', verificarToken, UserController.changePassword);

module.exports = router;
