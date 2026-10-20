// Rotas de Alunos
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/alunoController');
const validarId = require('../middleware/validarId');

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Gestão de alunos
 */

/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Listar todos os alunos
 *     tags: [Alunos]
 *     parameters:
 *       - in: query
 *         name: idCurso
 *         schema: { type: string }
 *         description: Filtrar alunos por curso
 *     responses:
 *       200:
 *         description: Lista de alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Aluno' }
 *   post:
 *     summary: Criar um aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/AlunoInput' }
 *     responses:
 *       201:
 *         description: Aluno criado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Aluno' }
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Erro' }
 */
router.get('/alunos', ctrl.listarAlunos);
router.post('/alunos', ctrl.criarAluno);

/**
 * @swagger
 * /api/alunos/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema: { type: string }
 *       description: ID do aluno
 *   get:
 *     summary: Obter um aluno pelo ID
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Aluno' }
 *       400: { description: ID inválido }
 *       404: { description: Aluno não encontrado }
 *   put:
 *     summary: Substituir todos os dados de um aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/AlunoInput' }
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Aluno' }
 *       400: { description: Dados ou ID inválidos }
 *       404: { description: Aluno não encontrado }
 *   patch:
 *     summary: Atualizar parcialmente um aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: { anoCurricular: 3 }
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Aluno' }
 *       400: { description: Dados ou ID inválidos }
 *       404: { description: Aluno não encontrado }
 *   delete:
 *     summary: Apagar um aluno
 *     tags: [Alunos]
 *     responses:
 *       200: { description: Aluno apagado }
 *       400: { description: ID inválido }
 *       404: { description: Aluno não encontrado }
 */
router.get('/alunos/:id', validarId, ctrl.obterAluno);
router.put('/alunos/:id', validarId, ctrl.substituirAluno);
router.patch('/alunos/:id', validarId, ctrl.atualizarAluno);
router.delete('/alunos/:id', validarId, ctrl.apagarAluno);

module.exports = router;
