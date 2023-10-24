import { PrismaClient } from "@prisma/client";
import { cupones } from "./seeds/cupones";
import { materiales } from "./seeds/materiales";
import { tipoUsuario } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //Cupones
  await prisma.cupon.createMany({
    data: cupones,
  });

  //Materiales
  await prisma.material.createMany({
    data: materiales,
  });

  //Usuarios
  await prisma.usuario.create({
    data: {
      tipoUsuario: tipoUsuario.ADMINISTRADOR,
      identificacion: "117900330",
      nombre: "Elías Gabriel",
      primerApellido: "González",
      segundoApellido: "Lara",
      correo: "egonzalezlar@ecosystem.com",
      contrasenna:
        "$2b$10$OmaHEkucRHLxjl/YTaecY.F8lrl8b98Uqp6Q6cJYcWD/bzNPOf89q",
      direccionUsuario: {
        create: {
          codProvincia: 2,
          codCanton: 1,
          codDistrito: 4,
          sennas: "300mts este del parque linda vista",
        },
      },
    },
  });

  await prisma.usuario.create({
    data: {
      tipoUsuario: tipoUsuario.ADMINISTRADOR_CENTROS_ACOPIO,
      identificacion: "504260860",
      nombre: "Luis Fernando",
      primerApellido: "Chavarria",
      segundoApellido: "Guiltres",
      correo: "lchavarria@ecosystem.com",
      contrasenna:
        "$2b$10$TfZrLepoNfZ/dhN9N4GVJePZIvkg/.JQs.WcKbxt1jCxl8eac5cW6",
      direccionUsuario: {
        create: {
          codProvincia: 2,
          codCanton: 1,
          codDistrito: 4,
          sennas: "400mts oeste del parque MD",
        },
      },
    },
  });

  await prisma.usuario.create({
    data: {
      tipoUsuario: tipoUsuario.ADMINISTRADOR_CENTROS_ACOPIO,
      identificacion: "117900329",
      nombre: "Josué David",
      primerApellido: "González",
      segundoApellido: "Lara",
      correo: "josuedavid900@gmail.com",
      contrasenna:
        "$2b$10$LqZdOsKwce97K5SrDTVYZe98fVkLobvxrWroeb79tddQXJwFBSdUq",
      direccionUsuario: {
        create: {
          codProvincia: 2,
          codCanton: 1,
          codDistrito: 4,
          sennas: "400mts oeste del parque MD",
        },
      },
    },
  });

  await prisma.usuario.create({
    data: {
      tipoUsuario: tipoUsuario.ADMINISTRADOR_CENTROS_ACOPIO,
      identificacion: "117900319",
      nombre: "Josué",
      primerApellido: "Araya",
      segundoApellido: "Castro",
      correo: "josueac777@gmail.com",
      contrasenna:
        "$2b$10$LqZdOsKwce97K5SrDTVYZe98fVkLobvxrWroeb79tddQXJwFBSdUq",
      direccionUsuario: {
        create: {
          codProvincia: 3,
          codCanton: 1,
          codDistrito: 4,
          sennas: "400mts del parque La Amistad",
        },
      },
    },
  });

  await prisma.usuario.create({
    data: {
      tipoUsuario: tipoUsuario.CLIENTE,
      identificacion: "288052675",
      nombre: "Pedro",
      primerApellido: "Perez",
      segundoApellido: "Zeledon",
      correo: "juanperez123@gmail.com",
      contrasenna:
        "$2b$10$uBDNqojy3oo42nkLuy.pVe518Ufg9TyB/CUWGu92CTqQIBm5SiLsq",
      direccionUsuario: {
        create: {
          codProvincia: 1,
          codCanton: 19,
          codDistrito: 5,
          sennas: "400mts oeste del restaurante Perez Pedro",
        },
      },
      billetera: {
        create: {
          canjeados: 17,
          disponibles: 7,
        },
      },
    },
  });

  await prisma.usuario.create({
    data: {
      tipoUsuario: tipoUsuario.CLIENTE,
      identificacion: "117900328",
      nombre: "Pedro",
      primerApellido: "González",
      segundoApellido: "Araya",
      correo: "pedrog900@gmail.com",
      contrasenna:
        "$2b$10$lL0fECqqiqtjdOZsVmi8Hemlpj23mEGOPUM07OfZ90PJ6OCEHG.c6",
      direccionUsuario: {
        create: {
          codProvincia: 1,
          codCanton: 1,
          codDistrito: 1,
          sennas: "400mts oeste del parque Mui",
        },
      },
      billetera: {
        create: {
          canjeados: 7,
          disponibles: 1,
        },
      },
    },
  });

  //Centro de acopio
  await prisma.centroAcopio.create({
    data: {
      nombre: "Centro de Acopio San Antonio",
      telefono: "25895516",
      horarios: {
        create: {
          horaInicio: new Date("2023-10-03T07:30:00.000Z"),
          horaCierre: new Date("2023-10-03T17:30:00.000Z"),
        },
      },
      administrador: {
        connect: { id: 2 },
      },
      materiales: {
        connect: [{ id: 1 }, { id: 3 }, { id: 6 }],
      },
      direccionCentroAcopio: {
        create: {
          codProvincia: 2,
          codCanton: 1,
          codDistrito: 4,
          sennas: "24 mts norte del Super la Amistad",
        },
      },
    },
  });

  await prisma.centroAcopio.create({
    data: {
      nombre: "Centro de Acopio Barrio la Merced",
      telefono: "24656589",
      horarios: {
        create: {
          horaInicio: new Date("2023-10-03T07:00:00.000Z"),
          horaCierre: new Date("2023-10-03T17:00:00.000Z"),
        },
      },
      administrador: {
        connect: { id: 3 },
      },
      materiales: {
        connect: [{ id: 2 }, { id: 4 }, { id: 5 }],
      },
      direccionCentroAcopio: {
        create: {
          codProvincia: 1,
          codCanton: 1,
          codDistrito: 4,
          sennas: "200 mts Oeste del Centro de la Merced",
        },
      },
    },
  });

  await prisma.centroAcopio.create({
    data: {
      nombre: "Centro de Acopio Alajuela Centro",
      telefono: "22654545",
      horarios: {
        create: {
          horaInicio: new Date("2023-10-03T07:00:00.000Z"),
          horaCierre: new Date("2023-10-03T17:00:00.000Z"),
        },
      },
      administrador: {
        connect: { id: 4 },
      },
      materiales: {
        connect: [{ id: 1 }, { id: 4 }, { id: 6 }],
      },
      direccionCentroAcopio: {
        create: {
          codProvincia: 2,
          codCanton: 1,
          codDistrito: 1,
          sennas: "A la par de la Central de buses FECOSA",
        },
      },
    },
  });

  //Canjeo de materiales
  await prisma.canjeoMateriales.create({
    data: {
      fecha: new Date("2023-09-03T07:00:00.000Z"),
      billetera: {
        connect: { id: 1 },
      },
      centroAcopio: {
        connect: { id: 1 },
      },
      canjeoMaterialesDetalles: {
        createMany: {
          data: [
            {
              cantidadUnidades: 1,
              cantMonedas: 8,
              materialId: 6,
            },
            {
              cantidadUnidades: 2,
              cantMonedas: 4,
              materialId: 1,
            },
          ],
        },
      },
      cantMonedas: 12,
    },
  });

  await prisma.canjeoMateriales.create({
    data: {
      fecha: new Date("2023-10-03T07:00:00.000Z"),
      billetera: {
        connect: { id: 1 },
      },
      centroAcopio: {
        connect: { id: 2 },
      },
      canjeoMaterialesDetalles: {
        createMany: {
          data: [
            {
              cantidadUnidades: 3,
              cantMonedas: 12,
              materialId: 2,
            },
          ],
        },
      },
      cantMonedas: 12,
    },
  });

  await prisma.canjeoMateriales.create({
    data: {
      fecha: new Date("2023-10-22T07:00:00.000Z"),
      billetera: {
        connect: { id: 2 },
      },
      centroAcopio: {
        connect: { id: 3 },
      },
      canjeoMaterialesDetalles: {
        createMany: {
          data: [
            {
              cantidadUnidades: 3,
              cantMonedas: 6,
              materialId: 1,
            },
            {
              cantidadUnidades: 1,
              cantMonedas: 2,
              materialId: 4,
            },
          ],
        },
      },
      cantMonedas: 8,
    },
  });

  //Canjeo de cupones con monedas
  await prisma.canjeoCupon.create({
    data: {
      fecha: new Date(),
      billetera: {
        connect: { id: 1 },
      },
      cantMonedas: 7,
      cupon: {
        connect: { id: 6 },
      },
    },
  });

  await prisma.canjeoCupon.create({
    data: {
      fecha: new Date(),
      billetera: {
        connect: { id: 1 },
      },
      cantMonedas: 10,
      cupon: {
        connect: { id: 2 },
      },
    },
  });

  await prisma.canjeoCupon.create({
    data: {
      fecha: new Date(),
      billetera: {
        connect: { id: 2 },
      },
      cantMonedas: 7,
      cupon: {
        connect: { id: 6 },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
