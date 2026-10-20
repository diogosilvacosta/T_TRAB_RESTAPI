// Migração dos dados de mock-data/bd.json para o MongoDB Atlas
// Executar a partir da raiz do projeto: npm run seed
// ATENÇÃO: apaga os alunos e cursos existentes antes de inserir.
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const mongoose = require('mongoose');
const Aluno = require('./models/Aluno');
const Curso = require('./models/Curso');
const bd = require(path.join(__dirname, '..', 'mock-data', 'bd.json'));

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Ligado ao MongoDB Atlas');

    await Aluno.deleteMany({});
    await Curso.deleteMany({});
    console.log('Coleções limpas');

    // Inserir cursos e guardar a correspondência id antigo (número) -> novo ObjectId
    const mapaCursos = {};
    for (const c of bd.cursos) {
      const novo = await Curso.create({ nomeDoCurso: c.nomeDoCurso });
      mapaCursos[c.id] = novo._id;
    }
    console.log(`${bd.cursos.length} cursos migrados`);

    // Inserir alunos com o idCurso convertido para o ObjectId do curso
    const alunos = bd.alunos.map(({ id, ...a }) => ({ ...a, idCurso: mapaCursos[a.idCurso] }));
    await Aluno.insertMany(alunos);
    console.log(`${alunos.length} alunos migrados`);

    await mongoose.disconnect();
    console.log('Migração concluída!');
  } catch (err) {
    console.error('Erro na migração:', err.message);
    process.exit(1);
  }
};

seed();
