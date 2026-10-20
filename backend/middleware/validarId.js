// Middleware que valida se o parâmetro :id é um ObjectId válido do MongoDB
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }
  next();
};
