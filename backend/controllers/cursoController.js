// Controller de Cursos
const Curso = require('../models/Curso');

// GET /api/cursos - Listar todos os cursos
exports.listarCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/cursos/:id - Obter um curso (pelo id numérico, como no bd.json)
exports.obterCurso = async (req, res) => {
  try {
    const curso = await Curso.findOne({ id: Number(req.params.id) });
    if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
    res.json(curso);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
