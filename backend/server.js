// API real - Node.js + Express + MongoDB Atlas (Mongoose MVC)
require('dotenv').config({ path: __dirname + '/.env' });
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

// Conectar à base de dados
connectDB();

// Rotas da API
app.use('/api', alunoRoutes);
app.use('/api', cursoRoutes);

// Swagger docs
swaggerDocs(app);

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'API RESTful - Gestão de Alunos e Cursos' });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});
