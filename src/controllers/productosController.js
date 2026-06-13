//tercero el controlador

const ProductosService = require('../services/productosService');

const obtenerTodos = async (req, res) => {
    try {
        const productos = await ProductosService.listarProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const crearProducto = async (req, res) => {
    try {
        const { nombre, precio } = req.body;
        const nuevoProducto = await ProductosService.registrarProducto(nombre, precio);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        // Manejamos errores controlados del servicio
        if (error.message === 'EL_NOMBRE_ES_REQUERIDO' || error.message === 'PRECIO_INVALIDO') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio } = req.body;
        
        const productoActualizado = await ProductosService.modificarProducto(id, nombre, precio);
        res.json(productoActualizado);
    } catch (error) {
        if (error.message === 'EL_NOMBRE_ES_REQUERIDO' || error.message === 'PRECIO_INVALIDO') {
            return res.status(400).json({ error: error.message });
        }
        if (error.message === 'PRODUCTO_NO_ENCONTRADO') {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await ProductosService.borrarProducto(id);
        res.json(resultado);
    } catch (error) {
        if (error.message === 'PRODUCTO_NO_ENCONTRADO') {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    obtenerTodos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};