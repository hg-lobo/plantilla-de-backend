const { Pool } = require('pg'); //conexion a la base de datos

const pool = new Pool({
    user: '',
    host: 'localhost',
    database: '',
    password: '',
    port: 5432,
});

module.exports = pool;
