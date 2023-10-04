import { PrismaClient } from "@prisma/client";
import { cupones } from "./seeds/cupones";
import { materiales } from "./seeds/materiales";
import { usuarios } from "./seeds/usuarios";

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

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });