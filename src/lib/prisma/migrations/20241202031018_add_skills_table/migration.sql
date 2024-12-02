-- CreateTable
CREATE TABLE "ResumeSkillInformation" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "sortOrder" SERIAL NOT NULL,

    CONSTRAINT "ResumeSkillInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumeSkillInformation_id_key" ON "ResumeSkillInformation"("id");

-- AddForeignKey
ALTER TABLE "ResumeSkillInformation" ADD CONSTRAINT "ResumeSkillInformation_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
