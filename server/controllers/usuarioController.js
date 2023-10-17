const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { response } = require("express");

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

    const usuarioSinContrasenna = exclude(usuario, ["contrasenna"]);

    response.json(usuarioSinContrasenna);
  } catch (e) {
    response.json(
      "Ocurrió un error, contacte al administrador: \n" + e.message
    );
  }
};
