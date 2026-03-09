const express = require('express');
const app = express();
const path = require('path');

// Middlewares
app.use(express.json());

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas (por ejemplo)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Ruta para la simulación de matricula
const simulacionRoutes = require('./routes/simulacionRoutes');
app.use('/api/simulacion', simulacionRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
