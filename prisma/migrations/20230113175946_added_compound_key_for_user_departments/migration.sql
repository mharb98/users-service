/*
  Warnings:

  - The primary key for the `user_departments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_departments` table. All the data in the column will be lost.
  - Added the required column `department` to the `user_departments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_departments" DROP CONSTRAINT "user_departments_pkey",
DROP COLUMN "id",
ADD COLUMN     "department" "Department" NOT NULL,
ADD CONSTRAINT "user_departments_pkey" PRIMARY KEY ("department", "role", "organization_profile_id");
