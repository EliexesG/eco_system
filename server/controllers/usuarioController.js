const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

//Login de usuario
module.exports.login = async (request, response, next) => {
  try {
    const { correo, contrasenna } = request.body;

    const usuario = await prisma.usuario.findUnique({
      where: {
        correo: correo,
      },
    });

    let contrasennaCorrecta = usuario
      ? await bcrypt.compare(contrasenna, usuario.contrasenna)
      : false;

    response.json(contrasennaCorrecta ? usuario : null);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};
