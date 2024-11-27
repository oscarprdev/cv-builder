/*
  Warnings:

  - You are about to drop the column `role` on the `ResumeExperienceInformation` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ResumeExperienceInformation` table. All the data in the column will be lost.
  - Added the required column `position` to the `ResumeExperienceInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ResumeExperienceInformation" DROP COLUMN "role",
DROP COLUMN "title",
ADD COLUMN     "position" TEXT NOT NULL;
