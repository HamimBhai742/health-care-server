/*
  Warnings:

  - You are about to drop the column `videoCallLink` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `videoCallLink` on the `doctor_schedules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "videoCallLink",
ADD COLUMN     "videoCallLinkId" TEXT;

-- AlterTable
ALTER TABLE "doctor_schedules" DROP COLUMN "videoCallLink";
