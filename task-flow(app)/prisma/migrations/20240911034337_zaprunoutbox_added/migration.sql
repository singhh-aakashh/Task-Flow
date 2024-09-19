-- AlterTable
ALTER TABLE "ZapRun" ADD COLUMN     "metaData" JSONB NOT NULL DEFAULT '{}';

-- CreateTable
CREATE TABLE "ZapRunOutBox" (
    "id" SERIAL NOT NULL,
    "zapRunId" INTEGER NOT NULL,

    CONSTRAINT "ZapRunOutBox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZapRunOutBox_zapRunId_key" ON "ZapRunOutBox"("zapRunId");

-- AddForeignKey
ALTER TABLE "ZapRunOutBox" ADD CONSTRAINT "ZapRunOutBox_zapRunId_fkey" FOREIGN KEY ("zapRunId") REFERENCES "ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
