const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/cursos/:idCarrera', async (req, res) => {
  const { idCarrera } = req.params;

  try {
    const [rows] = await db.query(`
      SELECT idAsignatura, nombre, creditos, horasTeoricas, horasPracticas, semestre
      FROM maeAsignatura
      WHERE idPlanEstudio = ?
      ORDER BY semestre ASC
    `, [idCarrera]);

    res.json(rows);
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Obtener horarios de teoría y práctica por curso
router.get('/horarios/:idAsignatura', async (req, res) => {
  const { idAsignatura } = req.params;

  try {
    const [rows] = await db.query(`
      SELECT 
        a.idAsignatura,
        m.nombre AS nombreAsignatura,
        a.seccion,
        a.grupo,
        a.horario,
        u.nombre AS docente,
        s.codigo AS aula
      FROM transAsignacionCurso a
      INNER JOIN maeAsignatura m ON a.idAsignatura = m.idAsignatura
      LEFT JOIN maeSalon s ON a.idSalon = s.idSalon
      LEFT JOIN maeUsuario u ON a.idDocente = u.idUsuario
      WHERE a.idAsignatura = ?
    `, [idAsignatura]);

    res.json(rows);
  } catch (error) {
    console.error("Error al obtener horarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});


module.exports = router;
