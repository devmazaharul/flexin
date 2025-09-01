/*
  Warnings:

  - Added the required column `note` to the `OrderInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."OrderInfo" ADD COLUMN     "note" TEXT NOT NULL;
