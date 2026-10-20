// Rotas de Alunos
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/alunoController');

/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Listar todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos
 *   post:
 *     summary: Criar um aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       201:
 *         description: Aluno criado
 *       400:
 *         description: Dados inválidos
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
 *       schema:
 *         type: string
 *   get:
 *     summary: Obter um aluno pelo ID
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *       404:
 *         description: Aluno não encontrado
 *   put:
 *     summary: Atualizar um aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *       404:
 *         description: Aluno não encontrado
 *   patch:
 *     summary: Atualizar parcialmente um aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *       404:
 *         description: Aluno não encontrado
 *   delete:
 *     summary: Apagar um aluno
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Aluno apagado
 *       404:
 *         description: Aluno não encontrado
 */
router.get('/alunos/:id', ctrl.obterAluno);
router.put('/alunos/:id', ctrl.atualizarAluno);
router.patch('/alunos/:id', ctrl.atualizarAluno);
router.delete('/alunos/:id', ctrl.apagarAluno);

module.exports = router;
