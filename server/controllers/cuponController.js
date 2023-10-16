const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  const cupones = await prisma.cupon.findMany({
    orderBy: {
      nombre: "asc",
    },
  });
  response.json(cupones);
};

//Obtener cupones validos
module.exports.getValidos = async (request, response, next) => {
  const fechaActual = new Date();

  const cupones = await prisma.cupon.findMany({
    orderBy: {
      nombre: "asc",
    },
    where: {
      AND: [
        {
          fechaInicio: {
            lte: fechaActual,
          },
        },
        {
          fechaFin: {
            gte: fechaActual,
          },
        },
      ],
    },
  });

  response.json(cupones);
};

//Obtener cupones invalidos
module.exports.getInvalidos = async (request, response, next) => {
  const fechaActual = new Date();

  const cupones = await prisma.cupon.findMany({
    orderBy: {
      nombre: "asc",
    },
    where: {
      OR: [
        {
          fechaInicio: {
            gte: fechaActual,
          },
        },
        {
          fechaFin: {
            lte: fechaActual,
          },
        },
      ],
    },
  });

  response.json(cupones);
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let idCupon = parseInt(request.params.id);
  const cupon = await prisma.cupon.findUnique({
    where: { id: idCupon },
  });
  response.json(cupon);
};

//Crear un cupon
module.exports.create = async (request, response, next) => {
  let cupon = request.body;
  const newCupon = await prisma.cupon.create({
    data: {
      nombre: cupon.nombre,
      descripcion: cupon.descripcion,
      imagen: cupon.imagen,
      categoria: cupon.categoria,
      fechaInicio: cupon.fechaInicio,
      fechaFin: cupon.fechaFin,
      monedasCupon: cupon.monedasCupon,
    },
  });
  response.json(newCupon);
};

//Actualizar un cupon
module.exports.update = async (request, response, next) => {
  let cupon = request.body;
  let idCupon = parseInt(request.params.id);

  const newCupon = await prisma.cupon.update({
    where: {
      id: idCupon,
    },
    data: {
      nombre: cupon.nombre,
      descripcion: cupon.descripcion,
      imagen: cupon.imagen,
      categoria: cupon.categoria,
      fechaInicio: cupon.fechaInicio,
      fechaFin: cupon.fechaFin,
      monedasCupon: cupon.monedasCupon,
    },
  });
  response.json(newCupon);
};
