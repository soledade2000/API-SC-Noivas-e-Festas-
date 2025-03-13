require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json()); 
app.use(cors()); 
app.use("/auth", authRoutes); 

const fornecedorRoutes = require("./routes/fornecedorRoutes"); // Importa rotas
app.use("/fornecedores", fornecedorRoutes); // Ativa as rotas no servidor

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("ERRO: A variável de ambiente MONGO_URI não está definida.");
  process.exit(1);
}

async function connectDB() {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(" Conectado ao MongoDB Atlas!");
  } catch (error) {
    console.error(" Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
}

connectDB();

app.get("/", (req, res) => {
  res.send("API do App SC Noivas e Festas está rodando!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Servidor rodando na porta ${PORT}`));
