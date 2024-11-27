/*
  Warnings:

  - You are about to drop the column `experienceId` on the `ResumeExperienceInformation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resumeId]` on the table `ResumeExperienceInformation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resumeId` to the `ResumeExperienceInformation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResumeExperienceInformation" DROP CONSTRAINT "ResumeExperienceInformation_experienceId_fkey";

-- DropIndex
DROP INDEX "ResumeExperienceInformation_experienceId_key";

-- AlterTable
ALTER TABLE "ResumeExperienceInformation" DROP COLUMN "experienceId",
ADD COLUMN     "resumeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ResumeExperienceInformation_resumeId_key" ON "ResumeExperienceInformation"("resumeId");

-- AddForeignKey
ALTER TABLE "ResumeExperienceInformation" ADD CONSTRAINT "ResumeExperienceInformation_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
