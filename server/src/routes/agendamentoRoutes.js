const r = require("express").Router();
const { auth } = require("../middlewares/auth");
const c = require("../controllers/agendamentoController");
const { validateCreate, validateUpdate } = require("../validators/agendamentoValidator");

r.post("/", auth, validateCreate, c.create);
r.get("/", auth, c.getAll);
r.get("/:id", auth, c.getById);
r.put("/:id", auth, validateUpdate, c.update);
r.delete("/:id", auth, c.delete);

module.exports = r;