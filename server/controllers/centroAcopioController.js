const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const centrosAcopio = await prisma.centroAcopio.findMany({
    orderBy: {
      nombre: "asc",
    },
  });

  response.json(centrosAcopio);
};

module.exports.getHabilitados = async (request, response, next) => {
  const centrosAcopio = await prisma.centroAcopio.findMany({
    orderBy: {
      nombre: "asc",
    },
    where: {
      desabilitado: false,
    },
  });

  response.json(centrosAcopio);
};

module.exports.getDeshabilitados = async (request, response, next) => {
  const centrosAcopio = await prisma.centroAcopio.findMany({
    orderBy: {
      nombre: "asc",
    },
    where: {
      desabilitado: true,
    },
  });
  
  response.json(centrosAcopio);
};

module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);

  const centroAcopio = await prisma.centroAcopio.findUnique({
    include: {
      materiales: true,
      horarios: true,
      administrador: true,
      direccionCentroAcopio: true,
    },
    where: { id: id },
  });

  response.json(centroAcopio);
};

module.exports.create = async (request, response, next) => {
  let data = request.body;

  const newCentroAcopio = await prisma.centroAcopio.create({
    data: {
      nombre: data.nombre,
      telefono: data.telefono,
      horarios: {
        create: data.horarios,
      },
      administrador: {
        connect: data.administrador,
      },
      materiales: {
        connect: data.materiales,
      },
      direccionCentroAcopio: {
        create: data.direccionCentroAcopio,
      },
    },
  });

  response.json(newCentroAcopio);
};

module.exports.update = async (request, response, next) => {
  let id = parseInt(request.params.id);
  let data = request.body;

  const materialesViejos = await prisma.centroAcopio.findUnique({
    where: { id: id },
    include: { materiales: { select: { id: true } } },
  });

  const updatedCentroAcopio = await prisma.centroAcopio.update({
    data: {
      nombre: data.nombre,
      telefono: data.telefono,
      desabilitado: data.desabilitado,
      horarios: {
        update: {
          horaInicio: data.horarios.horaInicio,
          horaCierre: data.horarios.horaCierre,
        },
      },
      administrador: {
        connect: data.administrador,
      },
      materiales: {
        disconnect: materialesViejos.materiales,
        connect: data.materiales,
      },
      direccionCentroAcopio: {
        update: {
          codProvincia: data.direccionCentroAcopio.codProvincia,
          codCanton: data.direccionCentroAcopio.codCanton,
          codDistrito: data.direccionCentroAcopio.codDistrito,
          sennas: data.direccionCentroAcopio.sennas,
        },
      },
    },
    where: {
      id: id,
    },
  });

  response.json(updatedCentroAcopio);
};
