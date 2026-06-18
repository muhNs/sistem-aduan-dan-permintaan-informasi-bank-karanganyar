/*
  Warnings:

  - Made the column `category` on table `complaint` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `complaint` MODIFY `category` ENUM('TRANSAKSI', 'TABUNGAN', 'AKUN_DAN_KARTU', 'APLIKASI_ERROR', 'PELAYANAN_CABANG', 'INFO_DAN_PROMO', 'LAINNYA') NOT NULL;
