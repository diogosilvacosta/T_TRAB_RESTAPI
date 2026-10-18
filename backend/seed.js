// Script para popular a base de dados inicial
// Executar: node backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Aluno = require('./models/Aluno');
const Curso = require('./models/Curso');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Ligado ao MongoDB Atlas');

    await Aluno.deleteMany({});
    await Curso.deleteMany({});
    console.log('Base de dados limpa');

    const cursos = await Curso.insertMany([
      { nomeDoCurso: 'Engenharia da Computação Gráfica e Multimédia' },
      { nomeDoCurso: 'Engenharia de Redes e Sistemas de Computadores' }
    ]);
    console.log(`${cursos.length} cursos criados`);

    const alunos = await Aluno.insertMany([
      { nome: 'Joana', apelido: 'Silva', idCurso: 1, anoCurricular: 2, idade: 21 },
      { nome: 'Pedro', apelido: 'Costa', idCurso: 2, anoCurricular: 1, idade: 19 },
      { nome: 'Ana', apelido: 'Ferreira', idCurso: 1, anoCurricular: 3, idade: 22 }
    ]);
    console.log(`${alunos.length} alunos criados`);

    await mongoose.disconnect();
    console.log('Seed concluído!');
  } catch (err) {
    console.error('Erro no seed:', err.message);
    process.exit(1);
  }
};

seed();
