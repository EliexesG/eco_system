const express = require("express");
const router = express.Router();

//Controlador
const usuarioController = require("../controllers/usuarioController");

//Ruta: localhost:3000/usuario/login
router.post("/login/", usuarioController.login);

//Ruta: localhost:3000/usuario
router.get("/", auth.grantRole(["ADMINISTRADOR"]), usuarioController.get);

//Ruta: localhost:3000/usuario/habilitados
router.get(
  "/habilitados",
  auth.grantRole(["ADMINISTRADOR"]),
  usuarioController.getHabilitados
);

//Ruta: localhost:3000/usuario/desabilitados
router.get(
  "/desabilitados",
  auth.grantRole(["ADMINISTRADOR"]),
  usuarioController.getDesabilitados
);

//Ruta: localhost:3000/usuario/admincentrosincentro
router.get(
  "/admincentrosincentro",
  auth.grantRole(["ADMINISTRADOR"]),
  usuarioController.getUsuariosAdminCentroSinCentro
);

//Ruta: localhost:3000/usuario/tipousuario/administrador
router.get(
  "/tipousuario/:tipousuario",
  auth.grantRole(["ADMINISTRADOR"]),
  usuarioController.getByTipoUsuario
);

//Ruta: localhost:3000/usuario/usuarioclientecorreo/administrador
router.get(
  "/usuarioclientecorreo/:correo",
  auth.grantRole(["ADMINISTRADOR_CENTROS_ACOPIO"]),
  usuarioController.getUsuarioClienteByCorreo
);

//Ruta: localhost:3000/usuario/id
router.get("/:id", usuarioController.getById);

//Ruta: localhost:3000/usuario
router.post("/", auth.grantRole(["ADMINISTRADOR"]), usuarioController.create);

//Ruta: localhost:3000/usuario
router.put("/:id", auth.grantRole(["ADMINISTRADOR"]), usuarioController.update);

//Ruta: localhost:3000/usuario/habilitarodesabilitar/id
router.post(
  "/habilitarodesabilitar/:id",
  auth.grantRole(["ADMINISTRADOR"]),
  usuarioController.habilitarODesabilitar
);

module.exports = router;
