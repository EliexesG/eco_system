const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

//excluir contrasenna
function exclude(usuario, keys) {
  return Object.fromEntries(
    Object.entries(usuario).filter(([key]) => !keys.includes(key))
  );
}

//Login de usuario
module.exports.login = async (request, response, next) => {
  try {
    const { correo, contrasenna } = request.body;

    const usuario = await prisma.usuario.findUnique({
      where: {
        correo: correo,
        desabilitado: false,
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

//Obtener listado
module.exports.get = async (request, response, next) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        nombre: "asc",
      },
    });

    const usuariosSinContrasenna = usuarios.map((usuario) => {
      return exclude(usuario, ["contrasenna"]);
    });

    response.json(usuariosSinContrasenna);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener listado Habilitados
module.exports.getHabilitados = async (request, response, next) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        nombre: "asc",
      },
      where: {
        desabilitado: false,
      },
    });

    const usuariosSinContrasenna = usuarios.map((usuario) => {
      return exclude(usuario, ["contrasenna"]);
    });

    response.json(usuariosSinContrasenna);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener listado Desabilitados
module.exports.getDesabilitados = async (request, response, next) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        nombre: "asc",
      },
      where: {
        desabilitado: true,
      },
    });

    const usuariosSinContrasenna = usuarios.map((usuario) => {
      return exclude(usuario, ["contrasenna"]);
    });

    response.json(usuariosSinContrasenna);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Obtener por Tipo de Usuario
module.exports.getByTipoUsuario = async (request, response, next) => {
  try {
    const tipoUsuario = String(request.params.tipousuario).toUpperCase();

    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        nombre: "asc",
      },
      where: {
        tipoUsuario: tipoUsuario,
      },
    });

    const usuariosSinContrasenna = usuarios.map((usuario) => {
      return exclude(usuario, ["contrasenna"]);
    });

    response.json(usuariosSinContrasenna);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};
//Obtener por Tipo de Usuario
module.exports.sByAdminCentroAcopio = async (request, response, next) => {
  try {
    const tipoUsuario = String(request.params.tipousuario).toUpperCase();

    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        nombre: "asc",
      },
      where: {
        tipoUsuario: "ADMINISTRADOR_CENTROS_ACOPIO",
      },
    });

    const usuariosSinContrasenna = usuarios.map((usuario) => {
      return exclude(usuario, ["contrasenna"]);
    });

    response.json(usuariosSinContrasenna);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};


//Obtener Usuario por Id
module.exports.getById = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);

    const usuario = await prisma.usuario.findUnique({
      where: {
        id: id,
      },
      include: {
        billetera: true,
        centroAcopio: true,
        direccionUsuario: true,
      },
    });

    response.json(usuario);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Crear Usuario
module.exports.create = async (request, response, next) => {
  try {
    const data = request.body;
    var contrasennaHash = await bcrypt.hash(data.contrasenna, 10);

    var usuario = await prisma.usuario.create({
      data: {
        tipoUsuario: data.tipoUsuario,
        identificacion: data.identificacion,
        nombre: data.nombre,
        primerApellido: data.primerApellido,
        segundoApellido: data.segundoApellido,
        correo: data.correo,
        contrasenna: contrasennaHash,
        direccionUsuario: {
          create: {
            codProvincia: data.direccionUsuario.codProvincia,
            codCanton: data.direccionUsuario.codCanton,
            codDistrito: data.direccionUsuario.codDistrito,
            sennas: data.direccionUsuario.sennas,
          },
        },
        billetera:
          data.tipoUsuario === "CLIENTE"
            ? {
                create: {
                  canjeados: 0,
                  disponibles: 0,
                },
              }
            : {},
      },
    });

    response.json(usuario);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Actualizar Usuario
module.exports.update = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);
    const data = request.body;
    var contrasennaHash = await bcrypt.hash(data.contrasenna, 10);

    const newUsuario = await prisma.usuario.update({
      where: { id: id },
      data: {
        tipoUsuario: data.tipoUsuario,
        identificacion: data.identificacion,
        nombre: data.nombre,
        primerApellido: data.primerApellido,
        segundoApellido: data.segundoApellido,
        correo: data.correo,
        contrasenna: contrasennaHash,
        direccionUsuario: {
          update: {
            codProvincia: data.direccionUsuario.codProvincia,
            codCanton: data.direccionUsuario.codCanton,
            codDistrito: data.direccionUsuario.codDistrito,
            sennas: data.direccionUsuario.sennas,
          },
        },
      },
    });

    if (newUsuario.tipoUsuario == "CLIENTE") {
      let billetera = await prisma.billetera.findUnique({
        where: {
          clienteId: newUsuario.id,
        },
      });

      if (!billetera) {
        var newBilletera = await prisma.billetera.create({
          data: {
            cliente: {
              connect: { id: newUsuario.id },
            },
            canjeados: 0,
            disponibles: 0,
          },
        });
      }
    }

    newUsuario.billetera = newBilletera;

    response.json(newUsuario);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};

//Habilitar o deshabilitar Usuario
module.exports.habilitarODesabilitar = async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);

    const ultimoEstado = await prisma.usuario.findUnique({
      where: { id: id },
      select: {
        desabilitado: true,
      },
    });

    const usuario = await prisma.usuario.update({
      where: {
        id: id,
      },
      data: {
        desabilitado: !ultimoEstado.desabilitado,
      },
    });

    response.json(usuario);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};
