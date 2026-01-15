const Joi = require("joi");

const registerSchema = Joi.object({
  nome: Joi.string().min(2).max(100).required().messages({
    "string.min": "Nome deve ter pelo menos 2 caracteres",
    "string.max": "Nome deve ter no máximo 100 caracteres",
    "any.required": "Nome é obrigatório"
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email inválido",
    "any.required": "Email é obrigatório"
  }),
  senha: Joi.string().min(6).required().messages({
    "string.min": "Senha deve ter pelo menos 6 caracteres",
    "any.required": "Senha é obrigatória"
  }),
  role: Joi.string().valid("user", "admin").optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email inválido",
    "any.required": "Email é obrigatório"
  }),
  senha: Joi.string().required().messages({
    "any.required": "Senha é obrigatória"
  })
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
  validateRegister: validate(registerSchema),
  validateLogin: validate(loginSchema)
};
