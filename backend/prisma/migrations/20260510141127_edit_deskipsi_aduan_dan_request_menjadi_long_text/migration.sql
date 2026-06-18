-- AlterTable
ALTER TABLE `complaint` MODIFY `description` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `complaintresolution` MODIFY `resolutionMessage` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `informationrequest` MODIFY `infoDetail` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `informationrequestresponse` MODIFY `responseMessage` LONGTEXT NOT NULL;
