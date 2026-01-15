const Joi = require("joi");

const agendamentoSchema = Joi.object({
  data: Joi.date().greater("now").required().messages({
    "date.greater": "Data deve ser futura",
    "any.required": "Data é obrigatória"
  }),
  servico: Joi.string().min(3).max(200).required().messages({
    "string.min": "Serviço deve ter pelo menos 3 caracteres",
    "string.max": "Serviço deve ter no máximo 200 caracteres",
    "any.required": "Serviço é obrigatório"
  })
});

const updateSchema = Joi.object({
  data: Joi.date().greater("now").optional(),
  servico: Joi.string().min(3).max(200).optional()
}).min(1).messages({
  "object.min": "Pelo menos um campo deve ser fornecido para atualização"
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({ errors });
    }
    next();
  };
};

module.exports = {
  validateCreate: validate(agendamentoSchema),
  validateUpdate: validate(updateSchema)
};
