const express = require('express');
const router = express.Router();

//Controlador
const canjeoMaterialesController = require("../controllers/canjeoMaterialesController");

//Ruta: locahost:3000/canjeomateriales/centroacopio/id
router.get('/centroacopio/:idCentroAcopio', canjeoMaterialesController.getByCentroAcopio);

//Ruta: locahost:3000/canjeomateriales/usuario/id
router.get('/usuario/:idUsuario', canjeoMaterialesController.getByUsuario);

//Ruta: locahost:3000/canjeomateriales
router.post('/', canjeoMaterialesController.create);

//Ruta: locahost:3000/canjeomateriales/cantidadmes
router.get('/cantidadmes', canjeoMaterialesController.getCantMesActual);

//Ruta: locahost:3000/canjeomateriales/cantidadmes/centroacopio/id
router.get('/cantidadmes/centroacopio/:idCentroAcopio', canjeoMaterialesController.getCantMesActualByCentroAcopio);

//Ruta: locahost:3000/canjeomateriales/cantidadmes/centroacopio/id
router.get('/cantidadanno/centroacopio/:idCentroAcopio', canjeoMaterialesController.getCantAnnoActualByCentroAcopio);

//Ruta: locahost:3000/canjeomateriales/id
router.get('/:id', canjeoMaterialesController.getById);

module.exports = router;