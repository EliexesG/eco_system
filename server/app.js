const dotEnv = require("dotenv");
const express = require("express");
//const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
//const prism = new PrismaClient();

//--- Archives de rutas ---


// Acceder  a la configuracion del archivo .env
dotEnv.config();

// Puerto que escucha por defecto 3000 o definido .env
const port = process.env.PORT || 3000;

// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());

// Middleware para loggear los llamadas al servidor
app.use(logger("dev"));

// Middlewaare para gestionar Requests y Response json
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

//--- Definir rutas ---
app.listen(port, () => {
    console.log(`http//localhost:${port}`);
    console.log("Presione CTRL-C para detener la ejecución");
});