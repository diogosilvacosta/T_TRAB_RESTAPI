// Modelo de Curso
const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema(
  {
    nomeDoCurso: {
      type: String,
      required: [true, 'O nome do curso é obrigatório'],
      trim: true
    }
  },
  {
    timestamps: true,
    // Devolver "id" em vez de "_id" para manter o mesmo formato do JSON-server
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('Curso', cursoSchema);
