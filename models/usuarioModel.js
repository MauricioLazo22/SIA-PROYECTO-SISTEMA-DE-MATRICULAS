// models/usuarioModel.js
const db = require('../config/db');

const obtenerPorCorreo = (correo, callback) => {
  const sql = `
    SELECT * FROM maeUsuario
    WHERE correo = ? AND estado = 'activo'
    LIMIT 1
  `;
  db.query(sql, [correo], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};

module.exports = {
  obtenerPorCorreo
};
