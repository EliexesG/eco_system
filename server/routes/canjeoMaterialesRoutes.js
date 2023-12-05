const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//Controlador
const canjeoMaterialesController = require("../controllers/canjeoMaterialesController");

//Ruta: locahost:3000/canjeomateriales/centroacopio/id
router.get(
  "/centroacopio/:idCentroAcopio",
  auth.grantRole(["ADMINISTRADOR_CENTROS_ACOPIO", "ADMINISTRADOR"]),
  canjeoMaterialesController.getByCentroAcopio
);

//Ruta: locahost:3000/canjeomateriales/usuario/id
router.get(
  "/usuario/:idUsuario",
  auth.grantRole(["CLIENTE"]),
  canjeoMaterialesController.getByUsuario
);

//Ruta: locahost:3000/canjeomateriales
router.post(
  "/",
  auth.grantRole(["ADMINISTRADOR_CENTROS_ACOPIO"]),
  canjeoMaterialesController.create
);

//Ruta: locahost:3000/canjeomateriales/cantidadmes
router.get(
  "/cantidadmes",
  auth.grantRole(["ADMINISTRADOR_CENTROS_ACOPIO", "ADMINISTRADOR"]),
  canjeoMaterialesController.getCantMesActual
);

//Ruta: locahost:3000/canjeomateriales/cantidadmes/centroacopio/id
router.get(
  "/cantidadmes/centroacopio/:idCentroAcopio",
  auth.grantRole(["ADMINISTRADOR_CENTROS_ACOPIO", "ADMINISTRADOR"]),
  canjeoMaterialesController.getCantMesActualByCentroAcopio
);

//Ruta: locahost:3000/canjeomateriales/cantidadmes/centroacopio/id
router.get(
  "/cantidadanno/centroacopio/:idCentroAcopio",
  auth.grantRole(["ADMINISTRADOR_CENTROS_ACOPIO", "ADMINISTRADOR"]),
  canjeoMaterialesController.getCantAnnoActualByCentroAcopio
);

//Ruta: locahost:3000/canjeomateriales/totalmonedasanno/
router.get(
  "/totalmonedasanno",
  auth.grantRole(["ADMINISTRADOR_CENTROS_ACOPIO", "ADMINISTRADOR"]),
  canjeoMaterialesController.getTotalMonedasAnnoActualGroupedCentroAcopio
);

//Ruta: locahost:3000/canjeomateriales/totalmonedas/
router.get(
  "/totalmonedas",
  auth.grantRole(["ADMINISTRADOR_CENTROS_ACOPIO", "ADMINISTRADOR"]),
  canjeoMaterialesController.getTotalMonedasGroupedCentroAcopio
);

//Ruta: locahost:3000/canjeomateriales/totalmonedas/centroacopio/id
router.get(
  "/totalmonedas/centroacopio/:idCentroAcopio",
  auth.grantRole(["ADMINISTRADOR_CENTROS_ACOPIO", "ADMINISTRADOR"]),
  canjeoMaterialesController.getTotalMonedasByCentroAcopio
);

//Ruta: locahost:3000/canjeomateriales/id
router.get(
  "/:id",
  auth.grantRole(["ADMINISTRADOR_CENTROS_ACOPIO", "ADMINISTRADOR", "CLIENTE"]),
  canjeoMaterialesController.getById
);

module.exports = router;
