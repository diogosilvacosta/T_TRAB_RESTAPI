// Modelo de Curso
const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // mesmo id numérico do bd.json
  nomeDoCurso: { type: String, required: [true, 'O nome do curso é obrigatório'] }
});

module.exports = mongoose.model('Curso', cursoSchema);
