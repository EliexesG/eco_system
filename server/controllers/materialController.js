const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener lista de Materiales
module.exports.get = async (request, response, next) => {
  try {
    const materiales = await prisma.material.findMany({
      orderBy: { nombre: "asc" },
    });

    response.json(materiales);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener Material por Id
module.exports.getById = async (request, response, next) => {
  try {
    let id = parseInt(request.params.id);

    const material = await prisma.material.findUnique({
      where: { id: id },
    });

    response.json(material);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};
