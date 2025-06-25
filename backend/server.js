const express = require('express');
const cors = require('cors');

// --- Importación de Archivos de Rutas ---
const authRoutes = require('./routes/auth.routes');
const brandRoutes = require('./routes/brand.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const wishlistRoutes = require('./routes/wishlist.routes');
const tiendaRoutes = require('./routes/tienda.routes');

const app = express();
const port = process.env.PORT || 5000;



// 1. Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:8100',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// 2. Habilitar la respuesta a las solicitudes de pre-vuelo (preflight)
app.options('*', cors(corsOptions));

// 3. Aplicar la configuración de CORS a todas las demás rutas
app.use(cors(corsOptions));

// 4. Middleware para parsear cuerpos JSON
app.use(express.json());

// 5. Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));


// --- Registro de Rutas de la API ---
app.use('/api/auth', authRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/tiendas', tiendaRoutes);


// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('¡API de Look4Beauty funcionando correctamente!');
});


// --- Inicio del Servidor ---
app.listen(port, () => {
  console.log(`Servidor de Node.js escuchando en http://localhost:${port}`);
});
