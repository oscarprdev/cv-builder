-- CreateTable
CREATE TABLE "ResumeEducationInformation" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "study" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "sortOrder" SERIAL NOT NULL,

    CONSTRAINT "ResumeEducationInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumeEducationInformation_id_key" ON "ResumeEducationInformation"("id");

-- AddForeignKey
ALTER TABLE "ResumeEducationInformation" ADD CONSTRAINT "ResumeEducationInformation_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
