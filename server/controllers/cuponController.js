const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { categoriaCupon } = require("@prisma/client");

//Obtener listado
module.exports.get = async (request, response, next) => {
  try {
    const cupones = await prisma.cupon.findMany({
      orderBy: {
        nombre: "asc",
      },
    });
    response.json(cupones);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener cupones validos
module.exports.getValidos = async (request, response, next) => {
  try {
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
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener cupones invalidos
module.exports.getInvalidos = async (request, response, next) => {
  try {
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
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener por Categoria
module.exports.getByCategoria = async (request, response, next) => {
  try {
    const categoria = String(request.params.nombre).toUpperCase();

    const cupones = await prisma.cupon.findMany({
      orderBy: {
        nombre: "asc",
      },
      where: {
        categoria: categoria,
      },
    });

    response.json(cupones);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener por Id
module.exports.getById = async (request, response, next) => {
  try {
    let idCupon = parseInt(request.params.id);
    const cupon = await prisma.cupon.findUnique({
      where: { id: idCupon },
    });

    response.json(cupon);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Crear un cupon
module.exports.create = async (request, response, next) => {
  try {
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

    response.json({ error: false, response: newCupon, status: 200 });
  } catch (e) {
    response.json({
      error: true,
      response: "Ocurrió un error, contacte al administrador: \n" + e.message,
      status: 400,
    });
  }
};

//Actualizar un cupon
module.exports.update = async (request, response, next) => {
  try {
    let cupon = request.body;
    let idCupon = parseInt(request.params.id);

    const cuponUpdated = await prisma.cupon.update({
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

    response.json({ error: false, response: cuponUpdated, status: 200 });
  } catch (e) {
    response.json({
      error: true,
      response: "Ocurrió un error, contacte al administrador: \n" + e.message,
      status: 400,
    });
  }
};

//Obtener Categorias
module.exports.getCategorias = (request, response, next) => {
  try {
    
    let categorias = Object.values(categoriaCupon);

    response.json(categorias); 

  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
}
