const { PrismaClient } = require("@prisma/client");
const { Decimal } = require("@prisma/client/runtime/library");
const prisma = new PrismaClient();

//Obtener Listado por Centro de Acopio
module.exports.getByCentroAcopio = async (request, response, next) => {
  try {
    const idCentroAcopio = parseInt(request.params.idCentroAcopio);

    const canjeosMateriales = await prisma.canjeoMateriales.findMany({
      where: {
        centroAcopioId: idCentroAcopio,
      },
      orderBy: {
        fecha: "desc",
      },
      include: {
        billetera: {
          select: {
            cliente: {
              select: {
                tipoUsuario: true,
                identificacion: true,
                nombre: true,
                correo: true,
              },
            },
          },
        },
        canjeoMaterialesDetalles: true,
      },
    });

    response.json(canjeosMateriales);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener listado por id de Usuario
module.exports.getByUsuario = async (request, response, next) => {
  try {
    const idUsuario = parseInt(request.params.idUsuario);

    const canjeosMateriales = await prisma.canjeoMateriales.findMany({
      where: {
        billetera: {
          clienteId: idUsuario,
        },
      },
      orderBy: {
        fecha: "desc",
      },
      include: {
        canjeoMaterialesDetalles: true,
      },
    });

    response.json(canjeosMateriales);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Crear Canjeo de Materiales
module.exports.create = async (request, response, next) => {
  try {
    const data = request.body;
    const fechaActual = new Date();

    const canjeoMaterialesDetalles = await Promise.all(
      data.canjeoMaterialesDetalles.map(async (detalle) => {
        let monedasUnidad = await prisma.material.findUnique({
          where: {
            id: parseInt(detalle.materialId),
          },
          select: {
            monedasUnidad: true,
          },
        });

        return {
          ...detalle,
          cantMonedas: monedasUnidad.monedasUnidad * detalle.cantidadUnidades,
        };
      })
    );

    let cantMonedas = 0;

    canjeoMaterialesDetalles.map((detalle) => {
      cantMonedas += detalle.cantMonedas;
    });

    const canjeoMateriales = await prisma.canjeoMateriales.create({
      data: {
        billeteraId: data.billeteraId,
        centroAcopioId: data.centroAcopioId,
        fecha: fechaActual,
        cantMonedas: cantMonedas,
        canjeoMaterialesDetalles: {
          createMany: {
            data: canjeoMaterialesDetalles,
          },
        },
      },
    });

    const billeteraActual = await prisma.billetera.findUnique({
      where: {
        id: data.billeteraId,
      },
    });

    const cantMonedasActual = billeteraActual.disponibles;

    const billetera = await prisma.billetera.update({
      data: {
        disponibles: cantMonedas + parseInt(cantMonedasActual.toString()),
      },
      where: {
        id: data.billeteraId,
      },
    });

    response.json({ canjeoMateriales, billetera });
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener Canjeo de Materiales por Id
module.exports.getById = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);

    const canjeo = await prisma.canjeoMateriales.findUnique({
      where: {
        id: id,
      },
      include: {
        billetera: {
          include: {
            cliente: {
              select: {
                tipoUsuario: true,
                identificacion: true,
                nombre: true,
                correo: true,
              },
            },
          },
        },
        canjeoMaterialesDetalles: {
          include: {
            material: true,
          },
        },
        centroAcopio: true,
      },
    });

    response.json(canjeo);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener cantidad de canjes realizados en el mes por centro de acopio
module.exports.getCantMesActual = async (request, response, next) => {
  try {
    const fechaActual = new Date();
    let mes = fechaActual.getMonth();
    let anno = fechaActual.getFullYear();

    const canjes = await prisma.canjeoMateriales.findMany({
      where: {
        fecha: {
          gte: new Date(anno, mes, 1),
          lt: new Date(anno, mes + 1, 1),
        },
      },
    });

    response.json({ cantidad: canjes.length });
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener cantidad de canjes realizados en el mes por centro de acopio
module.exports.getCantMesActualByCentroAcopio = async (
  request,
  response,
  next
) => {
  try {
    const fechaActual = new Date();
    let mes = fechaActual.getMonth();
    let anno = fechaActual.getFullYear();

    const idCentroAcopio = parseInt(request.params.idCentroAcopio);

    const canjes = await prisma.canjeoMateriales.findMany({
      where: {
        fecha: {
          gte: new Date(anno, mes, 1),
          lt: new Date(anno, mes + 1, 1),
        },
        centroAcopioId: idCentroAcopio,
      },
    });

    response.json({ cantidad: canjes.length });
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener cantidad de canjes agrupados por material del año actual
module.exports.getCantAnnoActualByCentroAcopio = async (
  request,
  response,
  next
) => {
  try {
    const fechaActual = new Date();
    let anno = fechaActual.getFullYear();

    const idCentroAcopio = parseInt(request.params.idCentroAcopio);

    const canjesAgrupados = await prisma.canjeoMaterialesDetalle.groupBy({
      where: {
        canjeoMateriales: {
          fecha: {
            gte: new Date(anno, 1, 1),
            lt: new Date(anno + 1, 1, 1),
          },
          centroAcopioId: idCentroAcopio,
        },
      },
      _count: {
        _all: true,
      },
      by: ["materialId"],
    });

    const canjes = await Promise.all(
      canjesAgrupados.map(async (canje) => {
        const material = await prisma.material.findUnique({
          where: {
            id: canje.materialId,
          },
        });

        return {
          cantidadUnidades: canje._count._all,
          material: material.nombre,
        };
      })
    );

    canjes.sort((a, b) => (a.material > b.material ? 1 : -1));

    response.json(canjes);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};
