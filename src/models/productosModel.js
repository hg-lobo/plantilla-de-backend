//primero creamos el model


const pool = require('../config/db');

// Crear la tabla si no existe (Se ejecuta al iniciar la app)
const inicializarTabla = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS productos (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            precio NUMERIC(10, 2) NOT NULL
        );
    `;
    await pool.query(query);
};

const obtenerTodos = async () => {
    const query = 'SELECT * FROM productos ORDER BY id ASC';
    const resultado = await pool.query(query);
    return resultado.rows;
};

const obtenerPorId = async (id) => {
    const query = 'SELECT * FROM productos WHERE id = $1';
    const resultado = await pool.query(query, [id]);
    return resultado.rows[0];
};

const crear = async (nombre, precio) => {
    const query = 'INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *';
    const resultado = await pool.query(query, [nombre, precio]);
    return resultado.rows[0];
};

const actualizar = async (id, nombre, precio) => {
    const query = 'UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3 RETURNING *';
    const resultado = await pool.query(query, [nombre, precio, id]);
    return resultado.rows[0];
};

const eliminar = async (id) => {
    const query = 'DELETE FROM productos WHERE id = $1';
    const resultado = await pool.query(query, [id]);
    return resultado.rowCount > 0; // Retorna true si eliminó algo, false si no
};

// Ejecutamos la verificación de la tabla de forma asíncrona
inicializarTabla().catch(err => console.error("Error al crear tabla productos:", err));

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};