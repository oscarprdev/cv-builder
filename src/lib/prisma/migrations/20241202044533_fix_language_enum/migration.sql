/*
  Warnings:

  - The values [BEGGINER] on the enum `LanguageLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LanguageLevel_new" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'NATIVE');
ALTER TABLE "ResumeLanguageInformation" ALTER COLUMN "level" TYPE "LanguageLevel_new" USING ("level"::text::"LanguageLevel_new");
ALTER TYPE "LanguageLevel" RENAME TO "LanguageLevel_old";
ALTER TYPE "LanguageLevel_new" RENAME TO "LanguageLevel";
DROP TYPE "LanguageLevel_old";
COMMIT;
