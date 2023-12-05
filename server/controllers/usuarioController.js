const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    if (!usuario) {
      response.status(401).send({
        success: false,
        message: 'Usuario no registrado',
      })
    }

    let contrasennaCorrecta = await bcrypt.compare(contrasenna, usuario.contrasenna);

    if (!contrasennaCorrecta) {
      response.status(401).send({
        success: false,
        message: 'Credenciales no válidas',
      })
    }
    else {

      const payload = {
        id: usuario.id,
        correo: usuario.correo,
        tipoUsuario: usuario.tipoUsuario,
        nombre: usuario.nombre,
        primerApellido: usuario.primerApellido,
        segundoApellido: usuario.segundoApellido,
      }

      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
      });

      response.json({
        success: true,
        message: "Usuario loggeado",
        token,
      })
    }

  } catch (e) {
    response.json({
      error: true,
      response: "Ocurrió un error, contacte al administrador: \n" + e.message,
      status: 400,
    });
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

//Obtener usuario cliente por correo
module.exports.getUsuarioClienteByCorreo = async (request, response, next) => {
  try {
    const tipoUsuario = 'CLIENTE';
    const correo = String(request.params.correo);

    const usuario = await prisma.usuario.findUnique({
      include: {
        billetera: true,
        direccionUsuario: true,
      },
      where: {
        tipoUsuario: tipoUsuario,
        correo: correo,
      },
    });

    const usuarioSinContrasenna = usuario ? exclude(usuario, ["contrasenna"]) : null;

    response.json(usuarioSinContrasenna);
  }
  catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
}

//Obtener administradores de centros sin centro
module.exports.getUsuariosAdminCentroSinCentro = async (request, response, next) => {
  try {

    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        nombre: 'asc'
      },
      where: {
        centroAcopio: null,
        tipoUsuario: "ADMINISTRADOR_CENTROS_ACOPIO"
      }
    })

    response.json(usuarios)

  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
}


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

    response.json({ error: false, response: usuario, status: 200 });
  } catch (e) {
    response.json({
      error: true,
      response: "Ocurrió un error, contacte al administrador: \n" + e.message,
      status: 400,
    });
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
