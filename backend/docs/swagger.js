// Documentação Swagger - disponível em /api-docs
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestão de Alunos e Cursos',
      version: '1.0.0',
      description: 'API RESTful para gestão de alunos e cursos - Atividade Prática #1 SIR'
    },
    components: {
      schemas: {
        Aluno: {
          type: 'object',
          required: ['nome', 'apelido', 'idCurso', 'anoCurricular'],
          properties: {
            nome: { type: 'string', example: 'Joana' },
            apelido: { type: 'string', example: 'Silva' },
            idCurso: { type: 'number', example: 1 },
            anoCurricular: { type: 'number', example: 2 },
            idade: { type: 'number', example: 21 }
          }
        }
      }
    }
  },
  // Ficheiros onde estão os comentários @swagger
  apis: [path.join(__dirname, '../routes/*.js').replace(/\\/g, '/')]
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
