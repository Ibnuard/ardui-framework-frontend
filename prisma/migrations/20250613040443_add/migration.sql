-- DropForeignKey
ALTER TABLE `Module` DROP FOREIGN KEY `Module_parentModuleId_fkey`;

-- DropIndex
DROP INDEX `Module_parentModuleId_fkey` ON `Module`;

-- AddForeignKey
ALTER TABLE `Module` ADD CONSTRAINT `Module_parentModuleId_fkey` FOREIGN KEY (`parentModuleId`) REFERENCES `Module`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
