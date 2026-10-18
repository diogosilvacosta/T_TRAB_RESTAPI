// Rotas de Cursos
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cursoController');

router.get('/cursos', ctrl.listarCursos);
router.get('/cursos/:id', ctrl.obterCurso);
router.post('/cursos', ctrl.criarCurso);
router.delete('/cursos/:id', ctrl.apagarCurso);

module.exports = router;
