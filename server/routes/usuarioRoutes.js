const express = require('express');
const router = express.Router();

//Controlador
const usuarioController = require("../controllers/usuarioController");

//Ruta: localhost:3000/usuario/login
router.post('/login/', usuarioController.login);

module.exports = router;