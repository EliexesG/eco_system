/*
  Warnings:

  - You are about to drop the column `codCanton` on the `centroacopio` table. All the data in the column will be lost.
  - You are about to drop the column `codDistrito` on the `centroacopio` table. All the data in the column will be lost.
  - You are about to drop the column `codProvincia` on the `centroacopio` table. All the data in the column will be lost.
  - You are about to drop the column `sennas` on the `centroacopio` table. All the data in the column will be lost.
  - Added the required column `sennas` to the `direccionCentroAcopio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sennas` to the `direccionUsuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `centroacopio` DROP COLUMN `codCanton`,
    DROP COLUMN `codDistrito`,
    DROP COLUMN `codProvincia`,
    DROP COLUMN `sennas`;

-- AlterTable
ALTER TABLE `direccioncentroacopio` ADD COLUMN `sennas` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `direccionusuario` ADD COLUMN `sennas` VARCHAR(191) NOT NULL;
