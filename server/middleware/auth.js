const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

module.exports.verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  let token;

  if (typeof bearerHeader !== "undefined") {
    token = bearerHeader.split(" ")[1].trim().toString();
  } else {
    res.status(403).json({
      status: false,
      message: "Acceso denegado",
      token: bearerHeader,
    });
  }

  if (token) {
    const verify = jwt.verify(token, process.env.SECRET_KEY);

    const usuario = await prisma.usuario.findUnique({
      where: {
        correo: verify.correo,
      },
    });
    req.usuario = verify;
    next();
  }
};

exports.grantRole = (tiposUsuario) => {
  return async (req, res, next) => {
    try {
      const bearerHeader = req.headers["authorization"];
      let token;

      if (typeof bearerHeader !== "undefined") {
        token = bearerHeader.split(" ")[1].trim().toString();
      } else {
        res.status(403).json({
          status: false,
          message: "Acceso denegado",
          token: bearerHeader,
        });
      }

      if (token) {
        const verify = jwt.verify(token, process.env.SECRET_KEY);

        if (
          tiposUsuario.length &&
          tiposUsuario.indexOf(verify.tipoUsuario) === -1
        ) {
          return res.status(401).json({
            message: "No autorizado",
          });
        }
        next();
      }
    } catch (error) {
      next(error);
    }
  };
};
