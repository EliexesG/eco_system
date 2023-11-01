const express = require("express");
const router = express.Router();

//Controlador
const usuarioController = require("../controllers/usuarioController");

//Ruta: localhost:3000/usuario/login
router.post("/login/", usuarioController.login);

//Ruta: localhost:3000/usuario
router.get("/", usuarioController.get);

//Ruta: localhost:3000/usuario/habilitados
router.get("/habilitados", usuarioController.getHabilitados);

//Ruta: localhost:3000/usuario/desabilitados
router.get("/desabilitados", usuarioController.getDesabilitados);

//Ruta: localhost:3000/usuario/tipousuario/administrador
router.get("/tipousuario/:tipousuario", usuarioController.getByTipoUsuario);

//Ruta: localhost:3000/usuario/id
router.get("/:id", usuarioController.getById);

//Ruta: localhost:3000/usuario
router.post("/", usuarioController.create);

//Ruta: localhost:3000/usuario
router.put("/:id", usuarioController.update);

//Ruta: localhost:3000/usuario/habilitarodesabilitar/id
router.post("/habilitarodesabilitar/:id", usuarioController.habilitarODesabilitar)

module.exports = router;
