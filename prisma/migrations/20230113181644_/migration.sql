/*
  Warnings:

  - The primary key for the `user_departments` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "user_departments" DROP CONSTRAINT "user_departments_pkey",
ADD CONSTRAINT "user_departments_pkey" PRIMARY KEY ("department", "organization_profile_id");
