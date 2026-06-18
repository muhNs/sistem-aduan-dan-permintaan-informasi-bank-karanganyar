-- AlterTable
ALTER TABLE `attachment` ADD COLUMN `complaintResolutionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Attachment` ADD CONSTRAINT `Attachment_complaintResolutionId_fkey` FOREIGN KEY (`complaintResolutionId`) REFERENCES `ComplaintResolution`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
