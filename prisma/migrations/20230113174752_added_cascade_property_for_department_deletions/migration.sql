-- DropForeignKey
ALTER TABLE "user_department_roles" DROP CONSTRAINT "user_department_roles_user_department_id_fkey";

-- AddForeignKey
ALTER TABLE "user_department_roles" ADD CONSTRAINT "user_department_roles_user_department_id_fkey" FOREIGN KEY ("user_department_id") REFERENCES "user_departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
