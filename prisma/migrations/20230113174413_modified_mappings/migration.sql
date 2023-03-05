/*
  Warnings:

  - You are about to drop the `department_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "department_roles" DROP CONSTRAINT "department_roles_user_department_id_fkey";

-- DropTable
DROP TABLE "department_roles";

-- CreateTable
CREATE TABLE "user_department_roles" (
    "user_department_id" INTEGER NOT NULL,
    "role" "DepartmentRole" NOT NULL,

    CONSTRAINT "user_department_roles_pkey" PRIMARY KEY ("user_department_id","role")
);

-- AddForeignKey
ALTER TABLE "user_department_roles" ADD CONSTRAINT "user_department_roles_user_department_id_fkey" FOREIGN KEY ("user_department_id") REFERENCES "user_departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
