const dotEnv = require("dotenv");
const express = require("express");
//const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
//const prism = new PrismaClient();

//--- Archives de rutas ---
const materialRoutes = require("./routes/matarialRoutes");
const cuponRoutes = require("./routes/cuponRoutes");
const centroAcopioRoutes = require("./routes/centroAcopioRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const canjeoMaterialesRoutes = require("./routes/canjeoMaterialesRoutes");
const canjeoCuponRoutes = require("./routes/canjeoCuponRoutes");
const imageManagamentRoutes = require("./routes/imageManagamentRoutes");

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
app.use("/material", materialRoutes);
app.use("/cupon", cuponRoutes);
app.use("/centroacopio", centroAcopioRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/canjeomateriales", canjeoMaterialesRoutes);
app.use("/canjeocupon", canjeoCuponRoutes);
app.use("/image", imageManagamentRoutes);
app.use(express.json({ limit: '1024mb' }));

// Servidor
app.listen(port, () => {
  console.log(`http//localhost:${port}`);
  console.log("Presione CTRL-C para detener la ejecución");
});
