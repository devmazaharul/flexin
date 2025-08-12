/*
  Warnings:

  - You are about to drop the column `sVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "sVerified",
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;
