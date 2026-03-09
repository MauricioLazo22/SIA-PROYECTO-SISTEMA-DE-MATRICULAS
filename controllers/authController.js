const db = require('../config/db');

exports.login = (req, res) => {
    const { correo, password } = req.body;

    const query = 'SELECT * FROM maeUsuario WHERE correo = ? AND password = ? AND estado = "activo"';
    db.query(query, [correo, password], (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: results[0] });
    });
};
