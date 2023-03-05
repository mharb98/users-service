/*
  Warnings:

  - You are about to drop the `user_department_roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `user_departments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_department_roles" DROP CONSTRAINT "user_department_roles_user_department_id_fkey";

-- AlterTable
ALTER TABLE "user_departments" ADD COLUMN     "role" "DepartmentRole" NOT NULL;

-- DropTable
DROP TABLE "user_department_roles";
