const express = require('express');
const router = express.Router();

//Controlador
const canjeoCuponController = require("../controllers/canjeoCuponController");

//Ruta: locahost:3000/canjeocupon/usuario/id
router.get('/usuario/:idUsuario', canjeoCuponController.getByUsuario);

//Ruta: locahost:3000/canjeocupon
router.post('/', canjeoCuponController.create);

//Ruta: locahost:3000/canjeocupon/totalcanjesanno/
router.get('/totalcanjesanno', canjeoCuponController.getTotalCuponesAnnoActual);

//Ruta: locahost:3000/canjeocupon/totalmonedasanno/
router.get('/totalmonedasanno', canjeoCuponController.getTotalMonedasAnnoActual);

//Ruta: locahost:3000/canjeocupon/id
router.get('/:id', canjeoCuponController.getById);

module.exports = router;