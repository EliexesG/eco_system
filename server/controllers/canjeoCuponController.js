const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Obtener listado por id de Usuario
module.exports.getByUsuario = async (request, response, next) => {
  try {
    const idUsuario = parseInt(request.params.idUsuario);

    const canjeosCupon = await prisma.canjeoCupon.findMany({
      where: {
        billetera: {
          clienteId: idUsuario,
        },
      },
      orderBy: {
        fecha: "desc",
      },
      include: {
        cupon: true,
        billetera: {
          select: {
            cliente: {
              select: {
                id: true,
                tipoUsuario: true,
                identificacion: true,
                nombre: true,
                correo: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });

    response.json(canjeosCupon);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Crear canje de Cupon
module.exports.create = async (request, response, next) => {
  try {
    const data = request.body;
    const fechaActual = new Date();

    var cupon = await prisma.cupon.findUnique({
      where: {
        id: data.cuponId,
      },
    });

    const canjeoCupon = await prisma.canjeoCupon.create({
      data: {
        cantMonedas: cupon.monedasCupon,
        fecha: fechaActual,
        billeteraId: data.billeteraId,
        cuponId: data.cuponId,
      },
    });

    const { disponibles, canjeados } = await prisma.billetera.findUnique({
      where: {
        id: data.billeteraId,
      },
    });

    const billetera = await prisma.billetera.update({
      where: {
        id: data.billeteraId,
      },
      data: {
        disponibles:
          parseInt(disponibles.toString()) -
          parseInt(cupon.monedasCupon.toString()),
        canjeados:
          parseInt(canjeados.toString()) +
          parseInt(cupon.monedasCupon.toString()),
      },
    });

    response.json({ canjeoCupon, billetera });
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener canjeo de cupon por Id
module.exports.getById = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);

    const canjeo = await prisma.canjeoCupon.findUnique({
      where: {
        id: id,
      },
      include: {
        billetera: {
          include: {
            cliente: {
              select: {
                id: true,
                tipoUsuario: true,
                identificacion: true,
                nombre: true,
                correo: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
        cupon: true,
      },
    });

    response.json(canjeo);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener cantidad de canjes de cupones del año actual
module.exports.getTotalCuponesAnnoActual = async (request, response, next) => {
  try {
    const fechaActual = new Date();
    let anno = fechaActual.getFullYear();

    const totalCanjes = await prisma.canjeoCupon.aggregate({
      _count: {
        _all: true,
      },
      where: {
        fecha: {
          gte: new Date(anno, 1, 1),
          lt: new Date(anno + 1, 1, 1),
        },
      },
    });

    response.json({ totalCanjes: totalCanjes._count._all });
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener cantidad de monedas usadas en cupones del año actual
module.exports.getTotalMonedasAnnoActual = async (request, response, next) => {
  try {
    const fechaActual = new Date();
    let anno = fechaActual.getFullYear();

    const totalCanjes = await prisma.canjeoCupon.aggregate({
      _sum: {
        cantMonedas: true,
      },
      where: {
        fecha: {
          gte: new Date(anno, 1, 1),
          lt: new Date(anno + 1, 1, 1),
        },
      },
    });

    response.json({ totalMonedas: totalCanjes._sum.cantMonedas });
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};
