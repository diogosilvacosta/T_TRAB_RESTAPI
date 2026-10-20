// Modelo de Aluno
const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome é obrigatório'],
      trim: true
    },
    apelido: {
      type: String,
      required: [true, 'O apelido é obrigatório'],
      trim: true
    },
    // Referência ao curso (equivalente ao idCurso do bd.json)
    idCurso: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Curso',
      required: [true, 'O curso é obrigatório']
    },
    anoCurricular: {
      type: Number,
      required: [true, 'O ano curricular é obrigatório'],
      min: [1, 'O ano curricular mínimo é 1'],
      max: [5, 'O ano curricular máximo é 5']
    },
    idade: {
      type: Number,
      min: [16, 'A idade mínima é 16'],
      max: [120, 'Idade inválida']
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

module.exports = mongoose.model('Aluno', alunoSchema);
