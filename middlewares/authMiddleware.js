const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Acesso negado" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), "segredo_super_secreto");
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token inválido" });
  }
};
