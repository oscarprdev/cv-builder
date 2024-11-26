-- CreateTable
CREATE TABLE "ResumeExperienceInformation" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "ResumeExperienceInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumeExperienceInformation_id_key" ON "ResumeExperienceInformation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeExperienceInformation_experienceId_key" ON "ResumeExperienceInformation"("experienceId");

-- AddForeignKey
ALTER TABLE "ResumeExperienceInformation" ADD CONSTRAINT "ResumeExperienceInformation_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
