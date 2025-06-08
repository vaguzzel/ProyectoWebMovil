// backend/middleware/authJwt.js

const jwt = require('jsonwebtoken');

// IMPORTANTE: Esta clave secreta DEBE ser exactamente la misma que
// tu compañera está usando en userController.js para firmar los tokens.
const JWT_SECRET = 'tu_super_secreto_para_jwt'; // Coordina esto con tu equipo.

const verificarToken = (req, res, next) => {
    // 1. Obtener el token de la cabecera 'Authorization' 
    const authHeader = req.headers['authorization'];
    
    // El formato del header es "Bearer <token>". Lo separamos para obtener solo el token.
    const token = authHeader && authHeader.split(' ')[1]; // 

    // 2. Si no se proporciona un token, se deniega el acceso
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' }); // 
    }

    // 3. Verificar la validez del token
    jwt.verify(token, JWT_SECRET, (err, decoded) => { // 
        // Si el token no es válido (expirado, firma incorrecta, etc.), se deniega el acceso
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado.' }); // 
        }

        // 4. Si el token es válido, guardamos el payload decodificado en el objeto 'req'
        // para que las rutas posteriores tengan acceso a la información del usuario (ID, rol, etc.)
        req.usuario = decoded; // Similar a req.user en el PDF 
        
        // 5. Llamamos a next() para continuar con la siguiente función (el controlador)
        next(); // 
    });
};

const esAdmin = (req, res, next) => {
    // Esta función se ejecuta DESPUÉS de verificarToken, por lo que ya tenemos req.usuario
    if (req.usuario && req.usuario.rol === 'admin') {
        next(); // Si el rol es 'admin', permite continuar
    } else {
        res.status(403).json({ message: "Acceso denegado. Se requiere rol de Administrador." });
    }
};


module.exports = {
    verificarToken,
    esAdmin
};