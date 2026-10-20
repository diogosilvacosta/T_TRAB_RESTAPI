// Configuração da ligação ao MongoDB Atlas
const mongoose = require('mongoose');
const dns = require('dns');

// Usar DNS públicos para resolver o endereço "mongodb+srv" do Atlas
// (alguns PCs Windows têm um DNS local que não responde a este tipo de pedido)
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB ligado: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Erro de ligação: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
