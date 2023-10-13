const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener lista de Materiales
module.exports.get = async (request, response, next) => {
  const materiales = await prisma.material.findMany({
    orderBy: { nombre: "asc" },
  });

  response.json(materiales);
};

//Obtener Material por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const material = await prisma.material.findUnique({
    where: { id: id },
  });

  response.json(material);
};
