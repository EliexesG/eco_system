const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//Controlador
const canjeoCuponController = require("../controllers/canjeoCuponController");

//Ruta: locahost:3000/canjeocupon/usuario/id
router.get(
  "/usuario/:idUsuario",
  auth.grantRole(["CLIENTE"]),
  canjeoCuponController.getByUsuario
);

//Ruta: locahost:3000/canjeocupon
router.post("/", auth.grantRole(["CLIENTE"]), canjeoCuponController.create);

//Ruta: locahost:3000/canjeocupon/totalcanjesanno/
router.get(
  "/totalcanjesanno",
  auth.grantRole(["ADMINISTRADOR"]),
  canjeoCuponController.getTotalCuponesAnnoActual
);

//Ruta: locahost:3000/canjeocupon/totalmonedasanno/
router.get(
  "/totalmonedasanno",
  auth.grantRole(["ADMINISTRADOR"]),
  canjeoCuponController.getTotalMonedasAnnoActual
);

//Ruta: locahost:3000/canjeocupon/id
router.get(
  "/:id",
  auth.grantRole(["ADMINISTRADOR", "CLIENTE"]),
  canjeoCuponController.getById
);

module.exports = router;
