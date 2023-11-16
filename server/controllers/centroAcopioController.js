const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado
module.exports.get = async (request, response, next) => {
  try {
    const centrosAcopio = await prisma.centroAcopio.findMany({
      orderBy: {
        nombre: "asc",
      },
      include: {
        administrador: true,
        materiales: true,
        horarios: true,
        direccionCentroAcopio: true,
      },
    });

    response.json(centrosAcopio);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener listado habilitados
module.exports.getHabilitados = async (request, response, next) => {
  try {
    const centrosAcopio = await prisma.centroAcopio.findMany({
      orderBy: {
        nombre: "asc",
      },
      where: {
        desabilitado: false,
      },
    });

    response.json(centrosAcopio);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener listado desabilitados
module.exports.getDeshabilitados = async (request, response, next) => {
  try {
    const centrosAcopio = await prisma.centroAcopio.findMany({
      orderBy: {
        nombre: "asc",
      },
      where: {
        desabilitado: true,
      },
    });

    response.json(centrosAcopio);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener Centro de Acopio por usuario
module.exports.getByIdUsuario = async (request, response, next) => {
  try {
    const idUsuario = parseInt(request.params.idUsuario);

    const centroAcopio = await prisma.centroAcopio.findUnique({
      include: {
        administrador: true,
        materiales: true,
        horarios: true,
        direccionCentroAcopio: true,
      },
      where: {
        administradorId: idUsuario,
      },
    });

    response.json(centroAcopio);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  try {
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
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Crear un Centro de Acopio
module.exports.create = async (request, response, next) => {
  try {
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
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Actualizar Centro de Acopio
module.exports.update = async (request, response, next) => {
  try {
    let id = parseInt(request.params.id);
    console.log(id)
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
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Habilitar o deshabilitar Centro de Acopio
module.exports.habilitarODesabilitar = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);

    const ultimoEstado = await prisma.centroAcopio.findUnique({
      where: { id: id },
      select: {
        desabilitado: true,
      },
    });

    const centroAcopio = await prisma.centroAcopio.update({
      where: {
        id: id,
      },
      data: {
        desabilitado: !ultimoEstado.desabilitado,
      },
    });

    response.json(centroAcopio);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};
