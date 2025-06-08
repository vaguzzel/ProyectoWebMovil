const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Clave secreta para firmar los tokens JWT. Debería estar en una variable de entorno.
const JWT_SECRET = 'tu_super_secreto_para_jwt'; // ¡Cámbialo por algo más seguro!

const UserController = {
  // --- Registro de un nuevo usuario ---
  register: async (req, res) => {
    try {
      
      const { nombre, rut, email, region, comuna, password} = req.body;

      // Asignar rol por defecto
      const rol = 'usuario';

      // 1. Validar que la contraseña exista
      if (!password) {
        return res.status(400).json({ message: 'La contraseña es requerida.' });
      }

      // 2. Encriptar la contraseña usando bcrypt
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      // 3. Crear el objeto de usuario para el modelo
      const newUser = {
        nombre,
        rut,
        email,
        region,
        comuna,
        password_hash, // Guardamos la contraseña encriptada
        rol
      };

      // 4. Llamar al modelo para crear el usuario
      UserModel.create(newUser, (err, result) => {
        if (err) {
          // Manejar errores comunes, como email o rut duplicado
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'El email o RUT ya está registrado.' });
          }
          return res.status(500).json({ message: 'Error al registrar el usuario.', error: err });
        }
        res.status(201).json({ message: 'Usuario registrado exitosamente.', userId: result.insertId });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor.', error });
    }
  },

  // --- Inicio de sesión de un usuario ---
  login: (req, res) => {
    const { email, password } = req.body;

    // 1. Buscar al usuario por email
    UserModel.findByEmail(email, async (err, users) => {
      if (err) {
        return res.status(500).json({ message: 'Error en el servidor.', error: err });
      }
      // 2. Verificar si el usuario existe
      if (users.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      const user = users[0];

      // 3. Comparar la contraseña enviada con la encriptada en la BD
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }

      // 4. Si las credenciales son correctas, crear el token JWT
      const payload = {
        userId: user.id_usuario,
        nombre: user.nombre,
        rol: user.rol
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // El token expira en 1 hora

      // 5. Enviar el token al cliente
      res.json({
        message: 'Inicio de sesión exitoso.',
        token,
        user: {
            id: user.id_usuario,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol
        }
      });
    });
  },

  updateProfile: (req, res) => {
    // Obtenemos el ID del usuario directamente del token verificado para mayor seguridad
    const userId = req.usuario.userId; 
    const { nombre, email } = req.body;

    const userData = { nombre, email };

    UserModel.updateById(userId, userData, (err, result) => {
        if (err) {
            // Manejar posible error de email duplicado
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'El email ya está en uso por otro usuario.' });
            }
            return res.status(500).json({ message: 'Error al actualizar el perfil.', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.json({ message: 'Perfil actualizado exitosamente.' });
    });
},

// --- Cambiar la contraseña ---
  changePassword: async (req, res) => {
    const userId = req.usuario.userId; // Obtenemos el ID del usuario desde el token verificado
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'La contraseña actual y la nueva son requeridas.' });
    }

    try {
        // 1. Buscar al usuario para obtener su contraseña actual hasheada
        UserModel.findById(userId, async (err, users) => {
            if (err) return res.status(500).json({ message: 'Error del servidor.', error: err });
            if (users.length === 0) return res.status(404).json({ message: 'Usuario no encontrado.' });

            const user = users[0];

            // 2. Comparar la contraseña actual enviada con la de la BD
            const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ message: 'La contraseña actual es incorrecta.' });
            }

            // 3. Hashear la nueva contraseña
            const salt = await bcrypt.genSalt(10);
            const newPasswordHash = await bcrypt.hash(newPassword, salt);

            // 4. Actualizar la contraseña en la BD
            UserModel.updateById(userId, { password_hash: newPasswordHash }, (err, result) => {
                if (err) return res.status(500).json({ message: 'Error al cambiar la contraseña.', error: err });
                res.json({ message: 'Contraseña cambiada exitosamente.' });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor.', error });
    }
  }

  

};

module.exports = UserController;