const mongoose = require("mongoose");

const FornecedorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { type: String, required: true }, // Ex: Buffet, Fotografia, Decoração
  telefone: { type: String, required: true },
  endereco: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  precoMedio: { type: Number },
  portfolio: { type: String } // URL do site ou Instagram
});

module.exports = mongoose.model("Fornecedor", FornecedorSchema);
