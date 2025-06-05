 const express = require('express');
 const cors = require('cors'); 
 const authRoutes = require('./routes/auth.routes');

 const app = express();
 const port = process.env.PORT || 5000;
app.use(express.json());

// Middlewares
app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('¡Hola desde el backend de Node.js!');
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'Datos del backend', items: ['item1', 'item2', 'item3'] });
});

app.listen(port, () => {
  console.log(`Servidor de Node.js escuchando en http://localhost:${port}`);
});