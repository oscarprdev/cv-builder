/*
  Warnings:

  - Changed the type of `level` on the `ResumeLanguageInformation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LanguageLevel" AS ENUM ('BEGGINER', 'INTERMEDIATE', 'ADVANCED', 'NATIVE');

-- AlterTable
ALTER TABLE "ResumeLanguageInformation" DROP COLUMN "level",
ADD COLUMN     "level" "LanguageLevel" NOT NULL;
