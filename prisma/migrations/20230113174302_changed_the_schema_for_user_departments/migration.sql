/*
  Warnings:

  - The primary key for the `department_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `department_role` on the `department_roles` table. All the data in the column will be lost.
  - You are about to drop the column `organization_department_id` on the `department_roles` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `organization_invitations` table. All the data in the column will be lost.
  - You are about to drop the `organization_user_departments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization_users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `department_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_department_id` to the `department_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `organization_invitations` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `organization_invitations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DepartmentRole" AS ENUM ('Head', 'Moderator', 'Member');

-- DropForeignKey
ALTER TABLE "department_roles" DROP CONSTRAINT "department_roles_organization_department_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_invitations" DROP CONSTRAINT "organization_invitations_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "organization_user_departments" DROP CONSTRAINT "organization_user_departments_organization_user_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_users" DROP CONSTRAINT "organization_users_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_users" DROP CONSTRAINT "organization_users_user_id_fkey";

-- AlterTable
ALTER TABLE "department_roles" DROP CONSTRAINT "department_roles_pkey",
DROP COLUMN "department_role",
DROP COLUMN "organization_department_id",
ADD COLUMN     "role" "DepartmentRole" NOT NULL,
ADD COLUMN     "user_department_id" INTEGER NOT NULL,
ADD CONSTRAINT "department_roles_pkey" PRIMARY KEY ("user_department_id", "role");

-- AlterTable
ALTER TABLE "organization_invitations" DROP COLUMN "organizationId",
ADD COLUMN     "organization_id" INTEGER NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "DepartmentRole" NOT NULL;

-- DropTable
DROP TABLE "organization_user_departments";

-- DropTable
DROP TABLE "organization_users";

-- DropEnum
DROP TYPE "DepartRole";

-- CreateTable
CREATE TABLE "organization_profiles" (
    "id" SERIAL NOT NULL,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "organization_id" INTEGER NOT NULL,

    CONSTRAINT "organization_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_departments" (
    "id" SERIAL NOT NULL,
    "organization_profile_id" INTEGER NOT NULL,

    CONSTRAINT "user_departments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_profiles_organization_id_key" ON "organization_profiles"("organization_id");

-- AddForeignKey
ALTER TABLE "organization_profiles" ADD CONSTRAINT "organization_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_profiles" ADD CONSTRAINT "organization_profiles_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_departments" ADD CONSTRAINT "user_departments_organization_profile_id_fkey" FOREIGN KEY ("organization_profile_id") REFERENCES "organization_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_roles" ADD CONSTRAINT "department_roles_user_department_id_fkey" FOREIGN KEY ("user_department_id") REFERENCES "user_departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
