 const express = require('express');
 const cors = require('cors'); 

 const authRoutes = require('./routes/auth.routes');
 const brandRoutes = require('./routes/brand.routes');
 const categoryRoutes = require('./routes/category.routes');
 const productRoutes = require('./routes/product.routes');
 const wishlistRoutes = require('./routes/wishlist.routes');
 const tiendaRoutes = require('./routes/tienda.routes');

 const app = express();
 const port = process.env.PORT || 5000;
app.use(express.json());

// Middlewares
app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('¡API de Look4Beauty funcionando!');
});

app.use('/api/auth', authRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/tiendas', tiendaRoutes);

/*
app.get('/api/data', (req, res) => {
  res.json({ message: 'Datos del backend', items: ['item1', 'item2', 'item3'] });
});
*/

app.listen(port, () => {
  console.log(`Servidor de Node.js escuchando en http://localhost:${port}`);
});