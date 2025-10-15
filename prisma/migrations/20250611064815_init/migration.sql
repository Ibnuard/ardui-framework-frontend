/*
  Warnings:

  - You are about to alter the column `status` on the `Module` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Module` MODIFY `status` ENUM('Active', 'Inactive') NOT NULL;
