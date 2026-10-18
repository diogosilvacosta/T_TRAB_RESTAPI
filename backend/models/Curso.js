// Modelo de Curso
const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  nomeDoCurso: { type: String, required: [true, 'O nome do curso é obrigatório'] }
}, { timestamps: true });

module.exports = mongoose.model('Curso', cursoSchema);
