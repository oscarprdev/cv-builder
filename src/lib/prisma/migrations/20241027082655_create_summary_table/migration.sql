-- CreateTable
CREATE TABLE "ResumeSummaryInformation" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "ResumeSummaryInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumeSummaryInformation_id_key" ON "ResumeSummaryInformation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeSummaryInformation_resumeId_key" ON "ResumeSummaryInformation"("resumeId");

-- AddForeignKey
ALTER TABLE "ResumeSummaryInformation" ADD CONSTRAINT "ResumeSummaryInformation_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
