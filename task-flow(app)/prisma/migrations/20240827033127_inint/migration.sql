/*
  Warnings:

  - The primary key for the `Action` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Trigger` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Trigger` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Zap` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `triggerId` column on the `ZapStep` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `image` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ZapRun" DROP CONSTRAINT "ZapRun_zapId_fkey";

-- DropForeignKey
ALTER TABLE "ZapStep" DROP CONSTRAINT "ZapStep_actionId_fkey";

-- DropForeignKey
ALTER TABLE "ZapStep" DROP CONSTRAINT "ZapStep_triggerId_fkey";

-- DropForeignKey
ALTER TABLE "ZapStep" DROP CONSTRAINT "ZapStep_zapId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP CONSTRAINT "Action_pkey",
ADD COLUMN     "image" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Action_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Action_id_seq";

-- AlterTable
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_pkey",
ADD COLUMN     "image" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Zap" DROP CONSTRAINT "Zap_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Zap_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Zap_id_seq";

-- AlterTable
ALTER TABLE "ZapRun" ALTER COLUMN "zapId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ZapStep" ALTER COLUMN "zapId" SET DATA TYPE TEXT,
DROP COLUMN "triggerId",
ADD COLUMN     "triggerId" INTEGER,
ALTER COLUMN "actionId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "AvailableAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "AvailableAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ZapStep" ADD CONSTRAINT "ZapStep_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapStep" ADD CONSTRAINT "ZapStep_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "Trigger"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapStep" ADD CONSTRAINT "ZapStep_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapRun" ADD CONSTRAINT "ZapRun_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
