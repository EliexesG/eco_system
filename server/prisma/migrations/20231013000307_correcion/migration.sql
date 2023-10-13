/*
  Warnings:

  - You are about to drop the column `dia` on the `horario` table. All the data in the column will be lost.
  - You are about to drop the column `codCanton` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `codDistrito` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `codProvincia` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `canjeocupones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `canjeocuponesdetalle` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[centroAcopioId]` on the table `horario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `canjeocupones` DROP FOREIGN KEY `canjeoCupones_billeteraId_fkey`;

-- DropForeignKey
ALTER TABLE `canjeocuponesdetalle` DROP FOREIGN KEY `canjeoCuponesDetalle_canjeoCuponesId_fkey`;

-- DropForeignKey
ALTER TABLE `canjeocuponesdetalle` DROP FOREIGN KEY `canjeoCuponesDetalle_cuponId_fkey`;

-- AlterTable
ALTER TABLE `horario` DROP COLUMN `dia`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `codCanton`,
    DROP COLUMN `codDistrito`,
    DROP COLUMN `codProvincia`;

-- DropTable
DROP TABLE `canjeocupones`;

-- DropTable
DROP TABLE `canjeocuponesdetalle`;

-- CreateTable
CREATE TABLE `direccionUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codProvincia` INTEGER NOT NULL,
    `codCanton` INTEGER NOT NULL,
    `codDistrito` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    UNIQUE INDEX `direccionUsuario_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `direccionCentroAcopio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codProvincia` INTEGER NOT NULL,
    `codCanton` INTEGER NOT NULL,
    `codDistrito` INTEGER NOT NULL,
    `centroAcopioId` INTEGER NOT NULL,

    UNIQUE INDEX `direccionCentroAcopio_centroAcopioId_key`(`centroAcopioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `canjeoCupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `billeteraId` INTEGER NOT NULL,
    `cantMonedas` INTEGER NOT NULL,
    `cuponId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `horario_centroAcopioId_key` ON `horario`(`centroAcopioId`);

-- AddForeignKey
ALTER TABLE `direccionUsuario` ADD CONSTRAINT `direccionUsuario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direccionCentroAcopio` ADD CONSTRAINT `direccionCentroAcopio_centroAcopioId_fkey` FOREIGN KEY (`centroAcopioId`) REFERENCES `centroAcopio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `canjeoCupon` ADD CONSTRAINT `canjeoCupon_billeteraId_fkey` FOREIGN KEY (`billeteraId`) REFERENCES `billetera`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `canjeoCupon` ADD CONSTRAINT `canjeoCupon_cuponId_fkey` FOREIGN KEY (`cuponId`) REFERENCES `cupon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
