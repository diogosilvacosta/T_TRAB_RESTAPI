// Migrar os dados do mock-data/bd.json para o MongoDB Atlas
// Executar: npm run seed
require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const Aluno = require('./models/Aluno');
const Curso = require('./models/Curso');
const bd = require('../mock-data/bd.json');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Ligado ao MongoDB Atlas');

    // Limpar as coleções
    await Aluno.deleteMany({});
    await Curso.deleteMany({});

    // Inserir cursos (mantêm o id numérico)
    await Curso.insertMany(bd.cursos);

    // Inserir alunos (o MongoDB cria o _id, por isso tiramos o id do json)
    const alunos = bd.alunos.map(({ id, ...aluno }) => aluno);
    await Aluno.insertMany(alunos);

    console.log(`${bd.cursos.length} cursos e ${alunos.length} alunos migrados`);
    await mongoose.disconnect();
  } catch (err) {
    console.error('Erro no seed:', err.message);
    process.exit(1);
  }
};

seed();
