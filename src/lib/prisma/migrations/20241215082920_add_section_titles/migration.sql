/*
  Warnings:

  - You are about to drop the `ResumePublicFields` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ResumePublicFields" DROP CONSTRAINT "ResumePublicFields_resumeId_fkey";

-- AlterTable
ALTER TABLE "ResumeBasicInformation" ADD COLUMN     "imageDisabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ResumeMeta" ADD COLUMN     "educationTitle" TEXT NOT NULL DEFAULT 'Education',
ADD COLUMN     "experienceTitle" TEXT NOT NULL DEFAULT 'Experience',
ADD COLUMN     "languagesTitle" TEXT NOT NULL DEFAULT 'Languages',
ADD COLUMN     "skillsTitle" TEXT NOT NULL DEFAULT 'Skills',
ADD COLUMN     "summaryTitle" TEXT NOT NULL DEFAULT 'Summary';

-- DropTable
DROP TABLE "ResumePublicFields";
