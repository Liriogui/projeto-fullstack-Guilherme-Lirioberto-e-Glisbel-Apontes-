const Agendamento = require("../models/Agendamento");

exports.create = async (req, res) => {
  try {
    const agendamento = await Agendamento.create({
      ...req.body,
      usuario: req.user.id
    });
    await agendamento.populate("usuario", "nome email");
    res.status(201).json(agendamento);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ errors: ["Erro ao criar agendamento"] });
  }
};

exports.getAll = async (req, res) => {
  try {
    // Usuários comuns só veem seus próprios agendamentos
    // Admins veem todos
    const filter = req.user.role === "admin" ? {} : { usuario: req.user.id };
    
    const agendamentos = await Agendamento.find(filter)
      .populate("usuario", "nome email")
      .sort({ data: 1 });
    
    res.json(agendamentos);
  } catch (error) {
    res.status(500).json({ errors: ["Erro ao buscar agendamentos"] });
  }
};

exports.getById = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    
    // Usuários comuns só podem ver seus próprios agendamentos
    if (req.user.role !== "admin") {
      filter.usuario = req.user.id;
    }
    
    const agendamento = await Agendamento.findOne(filter)
      .populate("usuario", "nome email");
    
    if (!agendamento) {
      return res.status(404).json({ errors: ["Agendamento não encontrado"] });
    }
    
    res.json(agendamento);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ errors: ["ID inválido"] });
    }
    res.status(500).json({ errors: ["Erro ao buscar agendamento"] });
  }
};

exports.update = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    
    // Usuários comuns só podem atualizar seus próprios agendamentos
    if (req.user.role !== "admin") {
      filter.usuario = req.user.id;
    }
    
    const agendamento = await Agendamento.findOneAndUpdate(
      filter,
      req.body,
      { new: true, runValidators: true }
    ).populate("usuario", "nome email");
    
    if (!agendamento) {
      return res.status(404).json({ errors: ["Agendamento não encontrado"] });
    }
    
    res.json(agendamento);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ errors: ["ID inválido"] });
    }
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ errors: ["Erro ao atualizar agendamento"] });
  }
};

exports.delete = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    
    // Usuários comuns só podem deletar seus próprios agendamentos
    // Admins podem deletar qualquer agendamento
    if (req.user.role !== "admin") {
      filter.usuario = req.user.id;
    }
    
    const agendamento = await Agendamento.findOneAndDelete(filter);
    
    if (!agendamento) {
      return res.status(404).json({ errors: ["Agendamento não encontrado"] });
    }
    
    res.status(204).end();
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ errors: ["ID inválido"] });
    }
    res.status(500).json({ errors: ["Erro ao deletar agendamento"] });
  }
};
