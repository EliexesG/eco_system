const express = require('express');
const router = express.Router();

//Controlador
const centroAcopioController = require("../controllers/centroAcopioController");

//Ruta: locahost:3000/centroacopio/habilitados
router.get('/habilitados', centroAcopioController.getHabilitados);

//Ruta: locahost:3000/centroacopio/deshabilitados
router.get('/deshabilitados', centroAcopioController.getDeshabilitados);

//Ruta: locahost:3000/centroacopio/
router.get('/', centroAcopioController.get);

//Ruta: locahost:3000/centroacopio/id
router.get('/:id', centroAcopioController.getById);

//Ruta: locahost:3000/centroacopio/
router.post('/', centroAcopioController.create);

//Ruta: locahost:3000/centroacopio/id
router.put('/:id', centroAcopioController.update);


module.exports = router;