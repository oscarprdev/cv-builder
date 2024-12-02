-- CreateTable
CREATE TABLE "ResumeLanguageInformation" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "sortOrder" SERIAL NOT NULL,

    CONSTRAINT "ResumeLanguageInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumeLanguageInformation_id_key" ON "ResumeLanguageInformation"("id");

-- AddForeignKey
ALTER TABLE "ResumeLanguageInformation" ADD CONSTRAINT "ResumeLanguageInformation_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
