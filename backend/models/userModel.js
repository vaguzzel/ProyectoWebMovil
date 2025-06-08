
const db = require('../config/db');


const UserModel = {

  // Método para crear un nuevo usuario.
  // 'userData' es un objeto que contiene todos los datos del usuario.
  create: (userData, callback) => {
    const query = 'INSERT INTO Usuarios (nombre, rut, email, region, comuna, password_hash, rol) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(
      query,
      [
        userData.nombre,
        userData.rut,
        userData.email,
        userData.region,
        userData.comuna,
        userData.password_hash, 
        userData.rol || 'Usuario' 
      ],
      callback
    );
  },

  // Método para encontrar un usuario por su email.
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM Usuarios WHERE email = ?', [email], callback);
  },

  // Método para encontrar un usuario por su ID.
  findById: (id, callback) => {
    db.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id], callback);
  },

  // --- Actualizar un usuario por su ID ---
  updateById: (id, data, callback) => {
      const query = 'UPDATE Usuarios SET ? WHERE id_usuario = ?';
      db.query(query, [data, id], callback);
  }

  
};

module.exports = UserModel;