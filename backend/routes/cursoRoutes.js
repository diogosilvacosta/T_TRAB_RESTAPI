// Rotas de Cursos
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cursoController');

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Listar todos os cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 */
router.get('/cursos', ctrl.listarCursos);

/**
 * @swagger
 * /api/cursos/{id}:
 *   get:
 *     summary: Obter um curso pelo ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Curso encontrado
 *       404:
 *         description: Curso não encontrado
 */
router.get('/cursos/:id', ctrl.obterCurso);

module.exports = router;
