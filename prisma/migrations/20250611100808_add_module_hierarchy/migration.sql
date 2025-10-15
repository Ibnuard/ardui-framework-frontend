-- AlterTable
ALTER TABLE `Module` ADD COLUMN `parentModuleId` INTEGER NULL,
    ADD COLUMN `path` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Module` ADD CONSTRAINT `Module_parentModuleId_fkey` FOREIGN KEY (`parentModuleId`) REFERENCES `Module`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
