// controllers/simulacionController.js
const db = require('../config/db');

exports.obtenerCursosPorCarrera = async (req, res) => {
  const { idCarrera } = req.params;

  try {
    const [cursos] = await db.query(`
      SELECT a.idAsignatura, a.nombre, a.creditos, a.horasTeoricas, a.horasPracticas, a.semestre
      FROM maeAsignatura a
      WHERE a.idCarrera = ?
    `, [idCarrera]);

    res.json(cursos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener cursos", error });
  }
};

exports.validarPrerrequisitos = async (req, res) => {
  const { idUsuario, cursosSeleccionados } = req.body;

  try {
    const [cursosAprobados] = await db.query(`
      SELECT idAsignatura FROM transNotas WHERE idUsuario = ? AND estado = 'aprobado'
    `, [idUsuario]);

    const aprobados = cursosAprobados.map(r => r.idAsignatura);

    let errores = [];

    for (const idCurso of cursosSeleccionados) {
      const [prereqs] = await db.query(`
        SELECT idAsignaturaReq FROM maeprerrequisito WHERE idAsignatura = ?
      `, [idCurso]);

      for (const { idAsignaturaReq } of prereqs) {
        if (!aprobados.includes(idAsignaturaReq)) {
          errores.push({ idCurso, falta: idAsignaturaReq });
        }
      }
    }

    res.json({ errores });
  } catch (err) {
    res.status(500).json({ message: "Error en validación de prerrequisitos", err });
  }
};
