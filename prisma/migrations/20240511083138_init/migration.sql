-- CreateEnum
CREATE TYPE "AuthLoggerType" AS ENUM ('INFO', 'ERROR');

-- CreateEnum
CREATE TYPE "AuthAction" AS ENUM ('LOGIN', 'REGISTER', 'CHANGE_PASSWORD', 'RESET_PASSWORD', 'CHANGE_EMAIL', 'SEND_CODE', 'VERIFICATION_EMAIL');

-- CreateEnum
CREATE TYPE "Actor" AS ENUM ('USER', 'SYSTEM');

-- CreateTable
CREATE TABLE "auth_logger" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "message" TEXT NOT NULL,
    "log_date" TIMESTAMP(3) NOT NULL,
    "public" BOOLEAN NOT NULL,
    "result" TEXT NOT NULL,
    "type" "AuthLoggerType" NOT NULL,
    "actor" "Actor" NOT NULL,
    "error_message" TEXT,
    "auth_action" "AuthAction",

    CONSTRAINT "auth_logger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "auth_logger_log_date_idx" ON "auth_logger"("log_date");
