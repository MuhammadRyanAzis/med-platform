-- DropForeignKey
ALTER TABLE `resepdetail` DROP FOREIGN KEY `ResepDetail_resepDigitalId_fkey`;

-- DropForeignKey
ALTER TABLE `resepdigital` DROP FOREIGN KEY `ResepDigital_bookingId_fkey`;

-- DropIndex
DROP INDEX `ResepDetail_resepDigitalId_fkey` ON `resepdetail`;

-- AlterTable
ALTER TABLE `booking` ADD COLUMN `status` ENUM('PENDING', 'SELESAI') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `chat` MODIFY `pesan` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `profilpasien` MODIFY `alamat` TEXT NULL;

-- AddForeignKey
ALTER TABLE `ResepDigital` ADD CONSTRAINT `ResepDigital_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResepDetail` ADD CONSTRAINT `ResepDetail_resepDigitalId_fkey` FOREIGN KEY (`resepDigitalId`) REFERENCES `ResepDigital`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
