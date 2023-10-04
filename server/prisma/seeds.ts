import { PrismaClient } from "@prisma/client";
import { cupones } from "./seeds/cupones";
import { materiales } from "./seeds/materiales";
import { usuarios } from "./seeds/usuarios";
import { dia } from "@prisma/client";

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
  await prisma.usuario.createMany({
      data: usuarios
  });

  //Centro de acopio
  await prisma.centroAcopio.create({
    data: {
      nombre: "Centro de Acopio San Antonio",
      codProvincia: 2,
      codCanton: 1,
      codDistrito: 4,
      sennas: "24 mts norte del Super la Amistad",
      telefono: "25895516",
      horarios: {
        createMany: {
          data: [
            {
              dia: dia.LUNES,
              horaInicio: new Date("2023-10-03 07:00:00.000"),
              horaCierre: new Date("2023-10-03 17:00:00.000")
            },
            {
              dia: dia.MARTES,
              horaInicio: new Date("2023-10-03 07:00:00.000"),
              horaCierre: new Date("2023-10-03 17:00:00.000")
            },
            {
              dia: dia.MIERCOLES,
              horaInicio: new Date("2023-10-03 07:00:00.000"),
              horaCierre: new Date("2023-10-03 17:00:00.000")
            },
            {
              dia: dia.JUEVES,
              horaInicio: new Date("2023-10-03 07:00:00.000"),
              horaCierre: new Date("2023-10-03 17:00:00.000")
            },
            {
              dia: dia.VIERNES,
              horaInicio: new Date("2023-10-03 07:00:00.000"),
              horaCierre: new Date("2023-10-03 17:00:00.000")
            }
          ]
        }
      },
      administrador: {
        connect: {id:2}
      },
      materiales: {
        connect: [{id: 1}, {id: 3}, {id: 6}]
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
      canjeados: 7
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
  await prisma.canjeoCupones.create({
    data: {
      fecha: new Date(),
      billetera: {
        connect: {id: 1}
      },
      cantMonedas: 7,
      canjeoCuponesDetalles: {
        createMany: {
          data: [
            {
              cantidadCupones: 1,
              cuponId: 6,
              cantMonedas: 7
            }
          ]
        }
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