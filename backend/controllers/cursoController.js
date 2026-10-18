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

// GET /api/cursos/:id - Obter um curso
exports.obterCurso = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
    res.json(curso);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/cursos - Criar curso
exports.criarCurso = async (req, res) => {
  try {
    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/cursos/:id - Apagar curso
exports.apagarCurso = async (req, res) => {
  try {
    const curso = await Curso.findByIdAndDelete(req.params.id);
    if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
    res.json({ message: 'Curso apagado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
