//segundo el service

const ProductosModel = require('../models/productosModel');

const listarProductos = async () => {
    return await ProductosModel.obtenerTodos();
};

const registrarProducto = async (nombre, precio) => {
    // Reglas de negocio básicas
    if (!nombre || nombre.trim() === '') {
        throw new Error('EL_NOMBRE_ES_REQUERIDO');
    }
    if (precio === undefined || precio < 0) {
        throw new Error('PRECIO_INVALIDO');
    }

    const nombreFormateado = nombre.trim();
    return await ProductosModel.crear(nombreFormateado, precio);
};

const modificarProducto = async (id, nombre, precio) => {
    if (!nombre || nombre.trim() === '') throw new Error('EL_NOMBRE_ES_REQUERIDO');
    if (precio === undefined || precio < 0) throw new Error('PRECIO_INVALIDO');

    const productoModificado = await ProductosModel.actualizar(id, nombre.trim(), precio);
    if (!productoModificado) {
        throw new Error('PRODUCTO_NO_ENCONTRADO');
    }
    return productoModificado;
};

const borrarProducto = async (id) => {
    const fueEliminado = await ProductosModel.eliminar(id);
    if (!fueEliminado) {
        throw new Error('PRODUCTO_NO_ENCONTRADO');
    }
    return { mensaje: 'Producto eliminado correctamente.' };
};

module.exports = {
    listarProductos,
    registrarProducto,
    modificarProducto,
    borrarProducto
};