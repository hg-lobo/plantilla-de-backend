const { Pool } = require('pg'); //conexion a la base de datos

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'inventario_db',
    password: 'tu_contraseña_aqui',
    port: 5432,
});

module.exports = pool;