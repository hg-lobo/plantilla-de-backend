const express = require('express');
const productosRoutes = require('./src/routes/productosRoutes');

const app = express();

// Middleware para entender JSON en el body
app.use(express.json());

// Enlazamos las rutas
app.use('/productos', productosRoutes);

// 🚨 ESTO ES LO QUE MANTIENE EL SERVIDOR ENCENDIDO 🚨
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor profesional corriendo en http://localhost:${PORT}`);
});