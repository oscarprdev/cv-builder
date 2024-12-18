-- CreateTable
CREATE TABLE "ResumePublicFields" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "isNamePublic" BOOLEAN NOT NULL,
    "isEmailPublic" BOOLEAN NOT NULL,
    "isPhonePublic" BOOLEAN NOT NULL,
    "isLocationPublic" BOOLEAN NOT NULL,
    "isWebsitePublic" BOOLEAN NOT NULL,
    "isImagePublic" BOOLEAN NOT NULL,

    CONSTRAINT "ResumePublicFields_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumePublicFields_id_key" ON "ResumePublicFields"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ResumePublicFields_resumeId_key" ON "ResumePublicFields"("resumeId");

-- AddForeignKey
ALTER TABLE "ResumePublicFields" ADD CONSTRAINT "ResumePublicFields_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
