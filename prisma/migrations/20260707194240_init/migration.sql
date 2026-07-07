/*
  Warnings:

  - You are about to drop the column `price` on the `gear_items` table. All the data in the column will be lost.
  - Added the required column `pricePerDay` to the `gear_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gear_items" DROP COLUMN "price",
ADD COLUMN     "pricePerDay" DECIMAL(10,2) NOT NULL;
