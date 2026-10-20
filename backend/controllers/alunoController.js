// Controller de Alunos
const Aluno = require('../models/Aluno');

// GET /api/alunos - Listar todos os alunos
exports.listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/alunos/:id - Obter um aluno
exports.obterAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ error: 'ID inválido' });
  }
};

// POST /api/alunos - Criar aluno
exports.criarAluno = async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT e PATCH /api/alunos/:id - Atualizar aluno
exports.atualizarAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/alunos/:id - Apagar aluno
exports.apagarAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json({ message: 'Aluno apagado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: 'ID inválido' });
  }
};
