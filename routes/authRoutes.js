const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Usuario");

const router = express.Router();

// Registro de usuário
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Verifica se o usuário já existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: "Email já cadastrado." });
    }

    // Criar e salvar novo usuário
    const novoUsuario = new User({ nome, email, senha });
    await novoUsuario.save();

    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário." });
  }
});

// Login de usuário
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    // Busca o usuário no banco
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ error: "Usuário não encontrado." });
    }

    // Compara a senha fornecida com a do banco
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ error: "Senha inválida." });
    }

    // Gera token JWT
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET || "segredo", { expiresIn: "1h" });

    res.json({ token, message: "Login realizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login." });
  }
});

module.exports = router;
