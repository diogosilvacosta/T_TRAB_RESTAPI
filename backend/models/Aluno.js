// Modelo de Aluno
const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome: { type: String, required: [true, 'O nome é obrigatório'] },
  apelido: { type: String, required: [true, 'O apelido é obrigatório'] },
  idCurso: { type: Number, required: [true, 'O curso é obrigatório'] },
  anoCurricular: { type: Number, required: [true, 'O ano curricular é obrigatório'] },
  idade: { type: Number }
});

module.exports = mongoose.model('Aluno', alunoSchema);
