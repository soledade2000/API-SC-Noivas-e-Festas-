const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  senha: { type: String, required: true }
});

// Antes de salvar, criptografa a senha apenas se ela for modificada
UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
