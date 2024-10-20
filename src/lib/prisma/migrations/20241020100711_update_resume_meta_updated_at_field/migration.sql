/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ResumeBasicInformation` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `ResumeMeta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResumeBasicInformation" DROP CONSTRAINT "ResumeBasicInformation_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "ResumeMeta" DROP CONSTRAINT "ResumeMeta_resumeId_fkey";

-- AlterTable
ALTER TABLE "ResumeBasicInformation" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "ResumeMeta" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "ResumeMeta" ADD CONSTRAINT "ResumeMeta_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeBasicInformation" ADD CONSTRAINT "ResumeBasicInformation_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
