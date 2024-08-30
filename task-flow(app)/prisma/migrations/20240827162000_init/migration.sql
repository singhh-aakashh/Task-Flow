/*
  Warnings:

  - The primary key for the `ZapStep` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ZapLog" DROP CONSTRAINT "ZapLog_zapStepId_fkey";

-- AlterTable
ALTER TABLE "ZapLog" ALTER COLUMN "zapStepId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ZapStep" DROP CONSTRAINT "ZapStep_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ZapStep_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ZapStep_id_seq";

-- AddForeignKey
ALTER TABLE "ZapLog" ADD CONSTRAINT "ZapLog_zapStepId_fkey" FOREIGN KEY ("zapStepId") REFERENCES "ZapStep"("id") ON DELETE SET NULL ON UPDATE CASCADE;
