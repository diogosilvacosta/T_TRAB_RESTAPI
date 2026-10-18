// Documentação Swagger
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
    servers: [
      { url: 'http://localhost:5000', description: 'Desenvolvimento' },
      { url: 'https://sir-restapi-at1.onrender.com', description: 'Produção' }
    ],
    components: {
      schemas: {
        Aluno: {
          type: 'object',
          required: ['nome', 'apelido', 'idCurso', 'anoCurricular', 'idade'],
          properties: {
            _id: { type: 'string', description: 'ID do aluno' },
            nome: { type: 'string', example: 'Joana' },
            apelido: { type: 'string', example: 'Silva' },
            idCurso: { type: 'number', example: 1 },
            anoCurricular: { type: 'number', example: 2 },
            idade: { type: 'number', example: 21 }
          }
        },
        Curso: {
          type: 'object',
          required: ['nomeDoCurso'],
          properties: {
            _id: { type: 'string', description: 'ID do curso' },
            nomeDoCurso: { type: 'string', example: 'Engenharia da Computação Gráfica e Multimédia' }
          }
        }
      }
    }
  },
  apis: ['./backend/routes/*.js', './backend/docs/swagger.js']
};

const specs = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.get('/api-docs.json', (req, res) => res.json(specs));
};

module.exports = swaggerDocs;
