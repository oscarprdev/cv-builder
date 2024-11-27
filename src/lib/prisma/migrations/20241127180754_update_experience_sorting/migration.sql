/*
  Warnings:

  - You are about to drop the column `position` on the `ResumeExperienceInformation` table. All the data in the column will be lost.
  - Added the required column `role` to the `ResumeExperienceInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResumeExperienceInformation" DROP COLUMN "position",
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "sortOrder" SERIAL NOT NULL;
