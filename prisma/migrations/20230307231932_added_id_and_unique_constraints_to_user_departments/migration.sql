/*
  Warnings:

  - The primary key for the `user_departments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[department,organization_profile_id]` on the table `user_departments` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user_departments" DROP CONSTRAINT "user_departments_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_departments_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_departments_department_organization_profile_id_key" ON "user_departments"("department", "organization_profile_id");
