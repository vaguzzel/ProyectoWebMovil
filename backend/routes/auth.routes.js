const express = require('express');
const router = express.Router();



// Ruta para el registro de usuarios
router.post('/register', (req, res) => {
    
    res.status(201).json({ message: "Ruta /register alcanzada." });
});

// Ruta para el inicio de sesión de usuarios
router.post('/login', (req, res) => {
    
    res.json({ message: "Ruta /login alcanzada." });
});

module.exports = router;