const mysql = require('mysql2/promise');

// Usamos createPool en lugar de createConnection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // tu contraseña si usas una
  database: 'sistema_matricula',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportamos el pool correctamente
module.exports = pool;
