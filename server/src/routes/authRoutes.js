const r = require("express").Router();
const c = require("../controllers/authController");
const { validateRegister, validateLogin } = require("../validators/authValidator");

r.post("/register", validateRegister, c.register);
r.post("/login", validateLogin, c.login);

module.exports = r;