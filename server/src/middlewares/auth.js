const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ errors: ["Token não fornecido"] });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ errors: ["Token não fornecido"] });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ errors: ["Token inválido"] });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ errors: ["Token expirado"] });
    }
    return res.status(401).json({ errors: ["Erro na autenticação"] });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ errors: ["Acesso negado. Apenas administradores."] });
  }
  next();
};