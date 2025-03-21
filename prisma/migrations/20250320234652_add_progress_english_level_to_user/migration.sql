/*
  Warnings:

  - You are about to drop the `Progress` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "english_level" TEXT;
ALTER TABLE "User" ADD COLUMN "progress" REAL;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Progress";
PRAGMA foreign_keys=on;
