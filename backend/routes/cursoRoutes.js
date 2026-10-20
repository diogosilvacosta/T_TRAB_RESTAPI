// Rotas de Cursos
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cursoController');
const validarId = require('../middleware/validarId');

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Gestão de cursos
 */

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Listar todos os cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Curso' }
 *   post:
 *     summary: Criar um curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CursoInput' }
 *     responses:
 *       201:
 *         description: Curso criado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Curso' }
 *       400: { description: Dados inválidos }
 */
router.get('/cursos', ctrl.listarCursos);
router.post('/cursos', ctrl.criarCurso);

/**
 * @swagger
 * /api/cursos/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema: { type: string }
 *       description: ID do curso
 *   get:
 *     summary: Obter um curso pelo ID
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Curso' }
 *       400: { description: ID inválido }
 *       404: { description: Curso não encontrado }
 *   put:
 *     summary: Atualizar um curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CursoInput' }
 *     responses:
 *       200: { description: Curso atualizado }
 *       400: { description: Dados ou ID inválidos }
 *       404: { description: Curso não encontrado }
 *   patch:
 *     summary: Atualizar um curso (igual ao PUT, só tem um campo)
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CursoInput' }
 *     responses:
 *       200: { description: Curso atualizado }
 *       404: { description: Curso não encontrado }
 *   delete:
 *     summary: Apagar um curso (só se não tiver alunos)
 *     tags: [Cursos]
 *     responses:
 *       200: { description: Curso apagado }
 *       404: { description: Curso não encontrado }
 *       409: { description: O curso tem alunos inscritos }
 */
router.get('/cursos/:id', validarId, ctrl.obterCurso);
router.put('/cursos/:id', validarId, ctrl.atualizarCurso);
router.patch('/cursos/:id', validarId, ctrl.atualizarCurso);
router.delete('/cursos/:id', validarId, ctrl.apagarCurso);

module.exports = router;
