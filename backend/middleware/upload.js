const multer = require('multer');
const path = require('path');

// 1. Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  // Define la carpeta donde se guardarán las imágenes
  destination: (req, file, cb) => {
    // Los archivos se guardarán en la carpeta 'public/images' dentro de 'backend'
    cb(null, 'public/images');
  },
  // Define el nombre del archivo para evitar que se sobrescriban
  filename: (req, file, cb) => {
    // Crea un nombre único: campo_original-timestamp.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 2. Filtro para aceptar solo ciertos tipos de imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Error: ¡Solo se permiten archivos de imagen (jpeg, jpg, png, gif, webp)!'));
};

// 3. Crear la instancia de Multer con la configuración
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Límite de 5MB por archivo
});

// Exportamos el middleware configurado para manejar un solo archivo
// que en el formulario se llamará 'image'.
module.exports = upload.single('image');
