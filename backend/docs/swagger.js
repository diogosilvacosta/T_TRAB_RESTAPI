// Documentação Swagger (OpenAPI 3) - disponível em /api-docs
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestão de Alunos e Cursos',
      version: '1.0.0',
      description: 'API RESTful para gestão de alunos e cursos - Atividade Prática #1 SIR (IPVC-ESTG)'
    },
    // URL relativo: funciona tanto em localhost como no Render
    servers: [{ url: '/', description: 'Servidor atual' }],
    components: {
      schemas: {
        Aluno: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '6716a1f2c3b4d5e6f7a8b9c0' },
            nome: { type: 'string', example: 'Joana' },
            apelido: { type: 'string', example: 'Silva' },
            idCurso: { type: 'string', example: '6716a1f2c3b4d5e6f7a8b9c1' },
            anoCurricular: { type: 'integer', example: 2 },
            idade: { type: 'integer', example: 21 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        AlunoInput: {
          type: 'object',
          required: ['nome', 'apelido', 'idCurso', 'anoCurricular'],
          properties: {
            nome: { type: 'string', example: 'Joana' },
            apelido: { type: 'string', example: 'Silva' },
            idCurso: { type: 'string', description: 'ID de um curso existente', example: '6716a1f2c3b4d5e6f7a8b9c1' },
            anoCurricular: { type: 'integer', minimum: 1, maximum: 5, example: 2 },
            idade: { type: 'integer', example: 21 }
          }
        },
        Curso: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '6716a1f2c3b4d5e6f7a8b9c1' },
            nomeDoCurso: { type: 'string', example: 'Engenharia da Computação Gráfica e Multimédia' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        CursoInput: {
          type: 'object',
          required: ['nomeDoCurso'],
          properties: {
            nomeDoCurso: { type: 'string', example: 'Engenharia Informática' }
          }
        },
        Erro: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Aluno não encontrado' }
          }
        }
      }
    }
  },
  // Caminho absoluto: funciona independentemente da pasta onde o servidor é iniciado
  // (as barras são normalizadas para o glob funcionar também em Windows)
  apis: [path.join(__dirname, '..', 'routes', '*.js').replace(/\\/g, '/')]
};

const specs = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.get('/api-docs.json', (req, res) => res.json(specs));
};

module.exports = swaggerDocs;
