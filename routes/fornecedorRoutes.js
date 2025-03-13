const express = require("express");
const Fornecedor = require("../models/Fornecedor");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router(); 

// Criar um fornecedor (somente autenticados)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const fornecedor = new Fornecedor(req.body);
    await fornecedor.save();
    return res.status(201).json(fornecedor);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao cadastrar fornecedor" });
  }
});

// Atualizar um fornecedor por ID (somente autenticados)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const fornecedor = await Fornecedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fornecedor) return res.status(404).json({ error: "Fornecedor não encontrado" });
    return res.json(fornecedor);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar fornecedor" });
  }
});

// Deletar um fornecedor por ID (somente autenticados)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const fornecedor = await Fornecedor.findByIdAndDelete(req.params.id);
    if (!fornecedor) return res.status(404).json({ error: "Fornecedor não encontrado" });
    return res.json({ message: "Fornecedor excluído com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao excluir fornecedor" });
  }
});

// Buscar fornecedores por categoria ou cidade (acesso livre)
router.get("/buscar", async (req, res) => {
  try {
    const { categoria, cidade } = req.query;
    const query = {};
    if (categoria) query.categoria = categoria;
    if (cidade) query.cidade = cidade;

    const fornecedores = await Fornecedor.find(query);
    return res.json(fornecedores);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar fornecedores" });
  }
});

// Listar todos os fornecedores (acesso livre)
router.get("/", async (req, res) => {
  try {
    const fornecedores = await Fornecedor.find();
    return res.json(fornecedores);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar fornecedores" });
  }
});

module.exports = router;
