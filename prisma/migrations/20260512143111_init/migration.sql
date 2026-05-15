/*
  Warnings:

  - You are about to drop the column `content` on the `slide` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "slide" DROP COLUMN "content",
ADD COLUMN     "description" TEXT;
