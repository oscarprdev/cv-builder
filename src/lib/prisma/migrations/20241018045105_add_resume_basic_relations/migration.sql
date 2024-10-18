/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeBasicInformation" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResumeBasicInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeBasicCustomFields" (
    "id" TEXT NOT NULL,
    "basicInfoId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,

    CONSTRAINT "ResumeBasicCustomFields_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_id_key" ON "Resume"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeBasicInformation_id_key" ON "ResumeBasicInformation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeBasicCustomFields_id_key" ON "ResumeBasicCustomFields"("id");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeBasicInformation" ADD CONSTRAINT "ResumeBasicInformation_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeBasicCustomFields" ADD CONSTRAINT "ResumeBasicCustomFields_basicInfoId_fkey" FOREIGN KEY ("basicInfoId") REFERENCES "ResumeBasicInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
