const mongoose = require("mongoose");

const agendamentoSchema = new mongoose.Schema({
  data: {
    type: Date,
    required: [true, "Data é obrigatória"],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: "Data deve ser futura"
    }
  },
  servico: {
    type: String,
    required: [true, "Serviço é obrigatório"],
    trim: true,
    minlength: [3, "Serviço deve ter pelo menos 3 caracteres"]
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Agendamento", agendamentoSchema);