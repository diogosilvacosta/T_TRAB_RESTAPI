// API real - Node.js + Express + MongoDB Atlas (Mongoose, arquitetura MVC)
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const swaggerDocs = require('./docs/swagger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api', alunoRoutes);
app.use('/api', cursoRoutes);

// Documentação Swagger em /api-docs
swaggerDocs(app);

// Informação da API
app.get('/api', (req, res) => {
  res.json({
    message: 'API RESTful - Gestão de Alunos e Cursos',
    endpoints: ['/api/alunos', '/api/cursos'],
    docs: '/api-docs'
  });
});

// Servir o frontend (quando a pasta existe, ex.: execução local a partir da raiz do projeto)
const frontendDir = path.join(__dirname, '..', 'frontend');
if (fs.existsSync(frontendDir)) {
  app.use(express.static(frontendDir));
} else {
  app.get('/', (req, res) => res.redirect('/api'));
}

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ error: `Rota não encontrada: ${req.method} ${req.originalUrl}` });
});

// JSON inválido no body e outros erros inesperados
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido no corpo do pedido' });
  }
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Ligar à BD e só depois iniciar o servidor
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
    console.log(`Swagger em http://localhost:${PORT}/api-docs`);
  });
});
