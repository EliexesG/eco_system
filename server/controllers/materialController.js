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

//crear Material
module.exports.create = async (request, response, next) => {
  try {
    let data = request.body;

    const newMaterial = await prisma.material.create({
      data: {
        codColor: data.codColor,
        descripcion: data.descripcion,
        imagen: data.imagen,
        monedasUnidad: data.monedasUnidad,
        nombre: data.nombre,
        unidadMedida: data.unidadMedida,
      },
    });

    response.json({error: false, response: newMaterial, status: 200});
  } catch (e) {
    response.json(
      {error: true, response: "Ocurrió un error, contacte al administrador: \n" + e.message, status: 400}
    );
  }
};

//Actualizar Material
module.exports.update = async (request, response, next) => {
  try {
    let data = request.body;
    let id = parseInt(request.params.id);

    const materialUpdated = await prisma.material.update({
      data: {
        codColor: data.codColor,
        descripcion: data.descripcion,
        imagen: data.imagen,
        monedasUnidad: data.monedasUnidad,
        nombre: data.nombre,
        unidadMedida: data.unidadMedida,
      },
      where: {
        id: id,
      },
    });

    response.json({error: false, response: materialUpdated, status: 200});
  } catch (e) {
    response.json(
      {error: true, response: "Ocurrió un error, contacte al administrador: \n" + e.message, status: 400}
    );
  }
};

//Obtener Colores
module.exports.getColors = async (request, response, next) => {
  try {

    const colores = await prisma.material.findMany({
      orderBy: {
        codColor: 'asc'
      },
      select: {
        codColor: true
      }
    })

    response.json(colores);

  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
}
