// Controller de Alunos
const mongoose = require('mongoose');
const Aluno = require('../models/Aluno');
const Curso = require('../models/Curso');

// Erros de validação / cast do Mongoose -> 400, restantes -> 500
const tratarErro = (res, err) => {
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({ error: err.message });
};

// Confirma que o curso indicado existe (quando idCurso vem no pedido)
const cursoExiste = async (idCurso) => {
  if (idCurso === undefined) return true;
  if (!mongoose.isValidObjectId(idCurso)) return false;
  return Boolean(await Curso.exists({ _id: idCurso }));
};

// GET /api/alunos - Listar alunos (aceita filtro ?idCurso=)
exports.listarAlunos = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.idCurso) {
      if (!mongoose.isValidObjectId(req.query.idCurso)) return res.json([]);
      filtro.idCurso = req.query.idCurso;
    }
    const alunos = await Aluno.find(filtro).sort({ createdAt: 1 });
    res.json(alunos);
  } catch (err) {
    tratarErro(res, err);
  }
};

// GET /api/alunos/:id - Obter um aluno
exports.obterAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    tratarErro(res, err);
  }
};

// POST /api/alunos - Criar aluno
exports.criarAluno = async (req, res) => {
  try {
    if (!(await cursoExiste(req.body.idCurso))) {
      return res.status(400).json({ error: 'O curso indicado não existe' });
    }
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (err) {
    tratarErro(res, err);
  }
};

// PUT /api/alunos/:id - Substituir aluno (todos os campos)
exports.substituirAluno = async (req, res) => {
  try {
    if (!(await cursoExiste(req.body.idCurso))) {
      return res.status(400).json({ error: 'O curso indicado não existe' });
    }
    const { nome, apelido, idCurso, anoCurricular, idade } = req.body;
    const aluno = await Aluno.findOneAndReplace(
      { _id: req.params.id },
      { nome, apelido, idCurso, anoCurricular, idade },
      { new: true, runValidators: true }
    );
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    tratarErro(res, err);
  }
};

// PATCH /api/alunos/:id - Atualizar parcialmente
exports.atualizarAluno = async (req, res) => {
  try {
    if (!(await cursoExiste(req.body.idCurso))) {
      return res.status(400).json({ error: 'O curso indicado não existe' });
    }
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    tratarErro(res, err);
  }
};

// DELETE /api/alunos/:id - Apagar aluno
exports.apagarAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json({ message: 'Aluno apagado com sucesso' });
  } catch (err) {
    tratarErro(res, err);
  }
};
