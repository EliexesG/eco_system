-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoUsuario` ENUM('ADMINISTRADOR', 'ADMINISTRADOR_CENTROS_ACOPIO', 'CLIENTE') NOT NULL DEFAULT 'CLIENTE',
    `identificacion` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `primerApellido` VARCHAR(191) NOT NULL,
    `segundoApellido` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `contrasenna` VARCHAR(191) NOT NULL,
    `codProvincia` INTEGER NOT NULL,
    `codCanton` INTEGER NOT NULL,
    `codDistrito` INTEGER NOT NULL,
    `desabilitado` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuario_identificacion_key`(`identificacion`),
    UNIQUE INDEX `usuario_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `centroAcopio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `codProvincia` INTEGER NOT NULL,
    `codCanton` INTEGER NOT NULL,
    `codDistrito` INTEGER NOT NULL,
    `sennas` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `administradorId` INTEGER NOT NULL,
    `desabilitado` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `centroAcopio_telefono_key`(`telefono`),
    UNIQUE INDEX `centroAcopio_administradorId_key`(`administradorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `horario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dia` ENUM('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO') NOT NULL DEFAULT 'LUNES',
    `horaInicio` DATETIME(3) NOT NULL,
    `horaCierre` DATETIME(3) NOT NULL,
    `centroAcopioId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `codColor` VARCHAR(191) NOT NULL,
    `unidadMedida` VARCHAR(191) NOT NULL,
    `monedasUnidad` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `material_codColor_key`(`codColor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `categoria` ENUM('HOGAR', 'JARDINERIA', 'TURISMO', 'EDUCACION', 'ROPA', 'ALIMENTOS', 'TRANSPORTE', 'VARIOS') NOT NULL DEFAULT 'VARIOS',
    `fechaInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaFin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `monedasCupon` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `billetera` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `disponibles` DECIMAL(10, 2) NOT NULL,
    `canjeados` DECIMAL(10, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `billetera_clienteId_key`(`clienteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `canjeoMateriales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `billeteraId` INTEGER NOT NULL,
    `centroAcopioId` INTEGER NOT NULL,
    `cantMonedas` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `canjeoMaterialesDetalle` (
    `canjeoMaterialesId` INTEGER NOT NULL,
    `materialId` INTEGER NOT NULL,
    `cantidadUnidades` INTEGER NOT NULL,
    `cantMonedas` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`canjeoMaterialesId`, `materialId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `canjeoCupones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `billeteraId` INTEGER NOT NULL,
    `cantMonedas` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `canjeoCuponesDetalle` (
    `canjeoCuponesId` INTEGER NOT NULL,
    `cuponId` INTEGER NOT NULL,
    `cantidadCupones` INTEGER NOT NULL,
    `cantMonedas` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`canjeoCuponesId`, `cuponId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_centroAcopioTomaterial` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_centroAcopioTomaterial_AB_unique`(`A`, `B`),
    INDEX `_centroAcopioTomaterial_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `centroAcopio` ADD CONSTRAINT `centroAcopio_administradorId_fkey` FOREIGN KEY (`administradorId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `horario` ADD CONSTRAINT `horario_centroAcopioId_fkey` FOREIGN KEY (`centroAcopioId`) REFERENCES `centroAcopio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `billetera` ADD CONSTRAINT `billetera_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `canjeoMateriales` ADD CONSTRAINT `canjeoMateriales_billeteraId_fkey` FOREIGN KEY (`billeteraId`) REFERENCES `billetera`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `canjeoMateriales` ADD CONSTRAINT `canjeoMateriales_centroAcopioId_fkey` FOREIGN KEY (`centroAcopioId`) REFERENCES `centroAcopio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `canjeoMaterialesDetalle` ADD CONSTRAINT `canjeoMaterialesDetalle_canjeoMaterialesId_fkey` FOREIGN KEY (`canjeoMaterialesId`) REFERENCES `canjeoMateriales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `canjeoMaterialesDetalle` ADD CONSTRAINT `canjeoMaterialesDetalle_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `material`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `canjeoCupones` ADD CONSTRAINT `canjeoCupones_billeteraId_fkey` FOREIGN KEY (`billeteraId`) REFERENCES `billetera`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `canjeoCuponesDetalle` ADD CONSTRAINT `canjeoCuponesDetalle_canjeoCuponesId_fkey` FOREIGN KEY (`canjeoCuponesId`) REFERENCES `canjeoCupones`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `canjeoCuponesDetalle` ADD CONSTRAINT `canjeoCuponesDetalle_cuponId_fkey` FOREIGN KEY (`cuponId`) REFERENCES `cupon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_centroAcopioTomaterial` ADD CONSTRAINT `_centroAcopioTomaterial_A_fkey` FOREIGN KEY (`A`) REFERENCES `centroAcopio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_centroAcopioTomaterial` ADD CONSTRAINT `_centroAcopioTomaterial_B_fkey` FOREIGN KEY (`B`) REFERENCES `material`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
