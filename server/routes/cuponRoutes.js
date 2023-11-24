const express = require('express');
const router = express.Router();

//Controlador
const cuponController = require("../controllers/cuponController");

//Ruta: locahost:3000/cupon/
router.get('/', cuponController.get);

//Ruta: locahost:3000/cupon/validos
router.get('/validos', cuponController.getValidos);

//Ruta: locahost:3000/cupon/invalidos
router.get('/invalidos', cuponController.getInvalidos);

//Ruta: locahost:3000/cupon/categoria/nombre
router.get('/categoria/:nombre', cuponController.getByCategoria);

//Ruta: locahost:3000/cupon/categoria/nombre
router.get('/categorias', cuponController.getCategorias);

//Ruta: locahost:3000/cupon/
router.post('/',cuponController.create);

//Ruta: locahost:3000/cupon/2
router.get("/:id",cuponController.getById);

//Ruta: locahost:3000/cupon/2
router.put('/:id',cuponController.update);

module.exports = router;