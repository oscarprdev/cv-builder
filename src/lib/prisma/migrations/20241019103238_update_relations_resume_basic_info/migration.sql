/*
  Warnings:

  - A unique constraint covering the columns `[resumeId]` on the table `ResumeBasicInformation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ResumeBasicInformation_resumeId_key" ON "ResumeBasicInformation"("resumeId");
