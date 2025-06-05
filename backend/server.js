 const express = require('express');
 const app = express();
 const port = 3000;
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