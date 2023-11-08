const express = require("express");
const router = express.Router();

//Controlador
const matarialController = require('../controllers/materialController');

//Ruta: localhost:3000/material
router.get('/', matarialController.get);

//Ruta: localhost:3000/material
router.post('/', matarialController.create);

//Ruta: localhost:3000/material
router.put('/', matarialController.update);

//Ruta: localhost:3000/material/:id
router.get('/:id', matarialController.getById);

module.exports = router;