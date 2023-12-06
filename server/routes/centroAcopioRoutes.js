const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//Controlador
const centroAcopioController = require("../controllers/centroAcopioController");

//Ruta: locahost:3000/centroacopio/habilitados
router.get("/habilitados", centroAcopioController.getHabilitados);

//Ruta: locahost:3000/centroacopio/deshabilitados
router.get(
  "/deshabilitados",
  auth.grantRole(["ADMINISTRADOR"]),
  centroAcopioController.getDeshabilitados
);

//Ruta: localhost:3000/centroacopio/usuario/idUsuario
router.get(
  "/usuario/:idUsuario",
  auth.grantRole(["ADMINISTRADOR_CENTROS_ACOPIO", "ADMINISTRADOR"]),
  centroAcopioController.getByIdUsuario
);

//Ruta: locahost:3000/centroacopio/
router.get(
  "/",
  auth.grantRole(["ADMINISTRADOR_CENTROS_ACOPIO"]),
  centroAcopioController.get
);

//Ruta: locahost:3000/centroacopio/id
router.get("/:id", centroAcopioController.getById);

//Ruta: locahost:3000/centroacopio/
router.post(
  "/",
  auth.grantRole(["ADMINISTRADOR"]),
  centroAcopioController.create
);

//Ruta: locahost:3000/centroacopio/id
router.put(
  "/:id",
  auth.grantRole(["ADMINISTRADOR"]),
  centroAcopioController.update
);

//Ruta: localhost:3000/centroacopio/habilitarodesabilitar/id
router.post(
  "/habilitarodesabilitar/:id",
  auth.grantRole(["ADMINISTRADOR"]),
  centroAcopioController.habilitarODesabilitar
);

module.exports = router;
