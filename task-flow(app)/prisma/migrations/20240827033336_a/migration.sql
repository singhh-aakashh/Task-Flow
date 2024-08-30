/*
  Warnings:

  - The primary key for the `Trigger` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ZapStep" DROP CONSTRAINT "ZapStep_triggerId_fkey";

-- AlterTable
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Trigger_id_seq";

-- AlterTable
ALTER TABLE "ZapStep" ALTER COLUMN "triggerId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "ZapStep" ADD CONSTRAINT "ZapStep_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "Trigger"("id") ON DELETE SET NULL ON UPDATE CASCADE;
