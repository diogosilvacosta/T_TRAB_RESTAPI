// Configuração da ligação ao MongoDB Atlas
const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('Falta a variável MONGO_URI (ver backend/.env.example)');
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB ligado: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`Erro de ligação ao MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
