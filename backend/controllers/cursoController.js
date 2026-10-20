// Controller de Cursos
const mongoose = require('mongoose');
const Curso = require('../models/Curso');
const Aluno = require('../models/Aluno');

const tratarErro = (res, err) => {
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({ error: err.message });
};

// GET /api/cursos - Listar cursos
exports.listarCursos = async (req, res) => {
  try {
    const cursos = await Curso.find().sort({ createdAt: 1 });
    res.json(cursos);
  } catch (err) {
    tratarErro(res, err);
  }
};

// GET /api/cursos/:id - Obter um curso
exports.obterCurso = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
    res.json(curso);
  } catch (err) {
    tratarErro(res, err);
  }
};

// POST /api/cursos - Criar curso
exports.criarCurso = async (req, res) => {
  try {
    const curso = await Curso.create({ nomeDoCurso: req.body.nomeDoCurso });
    res.status(201).json(curso);
  } catch (err) {
    tratarErro(res, err);
  }
};

// PUT /api/cursos/:id - Atualizar curso
exports.atualizarCurso = async (req, res) => {
  try {
    const curso = await Curso.findByIdAndUpdate(
      req.params.id,
      { nomeDoCurso: req.body.nomeDoCurso },
      { new: true, runValidators: true }
    );
    if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
    res.json(curso);
  } catch (err) {
    tratarErro(res, err);
  }
};

// DELETE /api/cursos/:id - Apagar curso (só se não tiver alunos inscritos)
exports.apagarCurso = async (req, res) => {
  try {
    const inscritos = await Aluno.countDocuments({ idCurso: req.params.id });
    if (inscritos > 0) {
      return res
        .status(409)
        .json({ error: `Não é possível apagar: o curso tem ${inscritos} aluno(s) inscrito(s)` });
    }
    const curso = await Curso.findByIdAndDelete(req.params.id);
    if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
    res.json({ message: 'Curso apagado com sucesso' });
  } catch (err) {
    tratarErro(res, err);
  }
};
