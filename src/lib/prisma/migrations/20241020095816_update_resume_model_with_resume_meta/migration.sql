-- CreateEnum
CREATE TYPE "ResumeTheme" AS ENUM ('DEFAULT', 'HARVARD');

-- CreateTable
CREATE TABLE "ResumeMeta" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "theme" "ResumeTheme" NOT NULL,

    CONSTRAINT "ResumeMeta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumeMeta_id_key" ON "ResumeMeta"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeMeta_resumeId_key" ON "ResumeMeta"("resumeId");

-- AddForeignKey
ALTER TABLE "ResumeMeta" ADD CONSTRAINT "ResumeMeta_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
