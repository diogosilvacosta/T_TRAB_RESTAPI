// Rotas de Alunos
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/alunoController');

router.get('/alunos', ctrl.listarAlunos);
router.get('/alunos/:id', ctrl.obterAluno);
router.post('/alunos', ctrl.criarAluno);
router.put('/alunos/:id', ctrl.atualizarAluno);
router.delete('/alunos/:id', ctrl.apagarAluno);

module.exports = router;
