import { PrismaClient } from "@prisma/client";
import { cupones } from "./seeds/cupones";
import { materiales } from "./seeds/materiales";
import { tipoUsuario } from "@prisma/client"

const prisma = new PrismaClient();

async function main() {

  //Cupones
  await prisma.cupon.createMany({
      data: cupones,
  });

  //Materiales
  await prisma.material.createMany({
      data: materiales
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
        contrasenna: "",
        direccionUsuario: {
          create: {
            codProvincia: 2,
            codCanton: 1,
            codDistrito: 4,
            sennas: "300mts este del parque linda vista"
          }
        }
      }
  });

  await prisma.usuario.create({
    data: {
      tipoUsuario: tipoUsuario.ADMINISTRADOR_CENTROS_ACOPIO,
        identificacion: "504260860",
        nombre: "Luis Fernando",
        primerApellido: "Chavarria",
        segundoApellido: "Guiltres",
        correo: "lchavarria@ecosystem.com",
        contrasenna: "",
        direccionUsuario: {
          create: {
            codProvincia: 2,
            codCanton: 1,
            codDistrito: 4,
            sennas: "400mts oeste del parque MD"
          }
        }
      }
  });

  await prisma.usuario.create({
    data: {
      tipoUsuario: tipoUsuario.CLIENTE,
        identificacion: "288052675",
        nombre: "Pedro",
        primerApellido: "Perez",
        segundoApellido: "Zeledon",
        correo: "juanperez123@gmail.com",
        contrasenna: "",
        direccionUsuario: {
          create: {
            codProvincia: 1,
            codCanton: 19,
            codDistrito: 5,
            sennas: "400mts oeste del restaurante Perez Pedro"
          }
        }
      }
  });

  //Centro de acopio
  await prisma.centroAcopio.create({
    data: {
      nombre: "Centro de Acopio San Antonio",
      telefono: "25895516",
      horarios: {
        create: {
          horaInicio: new Date("2023-10-03T07:30:00.000Z"),
          horaCierre: new Date("2023-10-03T17:30:00.000Z")
        }
      },
      administrador: {
        connect: {id:2}
      },
      materiales: {
        connect: [{id: 1}, {id: 3}, {id: 6}]
      },
      direccionCentroAcopio: {
        create: {
          codProvincia: 2,
          codCanton: 1,
          codDistrito: 4,
          sennas: "24 mts norte del Super la Amistad",
        }
      }
    }
  })

  //Billetera
  await prisma.billetera.create({
    data: {
      cliente: {
        connect: {id: 3}
      },
      disponibles: 8,
      canjeados: 6
    }
  })

  //Canjeo de materiales
  await prisma.canjeoMateriales.create({
    data: {
      fecha: new Date(),
      billetera: {
        connect: {id: 1}
      },
      centroAcopio: {
        connect: {id: 1}
      },
      canjeoMaterialesDetalles: {
        createMany: {
          data: [
            {
              cantidadUnidades: 1,
              cantMonedas: 8,
              materialId: 6
            }
          ]
        }
      },
      cantMonedas: 8
    }
  })

  //Canjeo de cupones con monedas
  await prisma.canjeoCupon.create({
    data: {
      fecha: new Date(),
      billetera: {
        connect: {id: 1}
      },
      cantMonedas: 6,
      cupon: {
        connect: {id: 5}
      }
    }
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