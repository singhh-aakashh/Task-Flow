/*
  Warnings:

  - You are about to drop the column `credits` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `googleResourceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `localGoogleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tier` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Connections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiscordWebhook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LocalGoogleCredential` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Slack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workflows` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StepType" AS ENUM ('TRIGGER', 'ACTION');

-- CreateEnum
CREATE TYPE "RunStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILURE');

-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('INFO', 'WARNING', 'ERROR');

-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_discordWebhookId_fkey";

-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_notionId_fkey";

-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_slackId_fkey";

-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_userId_fkey";

-- DropForeignKey
ALTER TABLE "DiscordWebhook" DROP CONSTRAINT "DiscordWebhook_userId_fkey";

-- DropForeignKey
ALTER TABLE "LocalGoogleCredential" DROP CONSTRAINT "LocalGoogleCredential_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notion" DROP CONSTRAINT "Notion_userId_fkey";

-- DropForeignKey
ALTER TABLE "Slack" DROP CONSTRAINT "Slack_userId_fkey";

-- DropForeignKey
ALTER TABLE "Workflows" DROP CONSTRAINT "Workflows_userId_fkey";

-- DropIndex
DROP INDEX "User_googleResourceId_key";

-- DropIndex
DROP INDEX "User_localGoogleId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "credits",
DROP COLUMN "googleResourceId",
DROP COLUMN "localGoogleId",
DROP COLUMN "name",
DROP COLUMN "profileImage",
DROP COLUMN "tier";

-- DropTable
DROP TABLE "Connections";

-- DropTable
DROP TABLE "DiscordWebhook";

-- DropTable
DROP TABLE "LocalGoogleCredential";

-- DropTable
DROP TABLE "Notion";

-- DropTable
DROP TABLE "Slack";

-- DropTable
DROP TABLE "Workflows";

-- CreateTable
CREATE TABLE "App" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trigger" (
    "id" SERIAL NOT NULL,
    "appId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "appId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zap" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZapStep" (
    "id" SERIAL NOT NULL,
    "zapId" INTEGER NOT NULL,
    "stepType" "StepType" NOT NULL,
    "triggerId" INTEGER,
    "actionId" INTEGER,
    "orderPosition" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ZapStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "appId" INTEGER NOT NULL,
    "connectionName" TEXT,
    "credentials" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZapRun" (
    "id" SERIAL NOT NULL,
    "zapId" INTEGER NOT NULL,
    "status" "RunStatus" NOT NULL,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "ZapRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZapLog" (
    "id" SERIAL NOT NULL,
    "zapRunId" INTEGER NOT NULL,
    "zapStepId" INTEGER,
    "logMessage" TEXT NOT NULL,
    "logType" "LogType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ZapLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zap" ADD CONSTRAINT "Zap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapStep" ADD CONSTRAINT "ZapStep_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapStep" ADD CONSTRAINT "ZapStep_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "Trigger"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapStep" ADD CONSTRAINT "ZapStep_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapRun" ADD CONSTRAINT "ZapRun_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapLog" ADD CONSTRAINT "ZapLog_zapRunId_fkey" FOREIGN KEY ("zapRunId") REFERENCES "ZapRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ZapLog" ADD CONSTRAINT "ZapLog_zapStepId_fkey" FOREIGN KEY ("zapStepId") REFERENCES "ZapStep"("id") ON DELETE SET NULL ON UPDATE CASCADE;
