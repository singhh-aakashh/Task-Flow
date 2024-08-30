/*
  Warnings:

  - You are about to drop the column `appId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Action` table. All the data in the column will be lost.
  - The primary key for the `Trigger` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appId` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the `App` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Connection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_appId_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_appId_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_userId_fkey";

-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_appId_fkey";

-- DropForeignKey
ALTER TABLE "ZapStep" DROP CONSTRAINT "ZapStep_triggerId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "appId",
DROP COLUMN "description",
ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_pkey",
DROP COLUMN "appId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Trigger_id_seq";

-- AlterTable
ALTER TABLE "ZapStep" ALTER COLUMN "triggerId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "App";

-- DropTable
DROP TABLE "Connection";

-- CreateTable
CREATE TABLE "AvailableTrigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableTrigger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ZapStep" ADD CONSTRAINT "ZapStep_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "Trigger"("id") ON DELETE SET NULL ON UPDATE CASCADE;
