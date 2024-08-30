-- CreateTable
CREATE TABLE "WebhookData" (
    "id" SERIAL NOT NULL,
    "data" JSONB,

    CONSTRAINT "WebhookData_pkey" PRIMARY KEY ("id")
);
