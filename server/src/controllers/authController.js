const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;
    
    // Verificar se email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: ["Email já cadastrado"] });
    }

    const hash = await bcrypt.hash(senha, 10);
    const user = await User.create({ 
      nome, 
      email, 
      senha: hash, 
      role: role || "user" 
    });
    
    // Não retornar a senha
    const userResponse = user.toObject();
    delete userResponse.senha;
    
    res.status(201).json(userResponse);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ errors: ["Email já cadastrado"] });
    }
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ errors: ["Erro ao criar usuário"] });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ errors: ["Email ou senha incorretos"] });
    }
    
    const ok = await bcrypt.compare(senha, user.senha);
    if (!ok) {
      return res.status(401).json({ errors: ["Email ou senha incorretos"] });
    }
    
    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role,
        nome: user.nome,
        email: user.email
      }, 
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    res.json({ 
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ errors: ["Erro ao fazer login"] });
  }
};