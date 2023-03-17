/*
  Warnings:

  - The primary key for the `organization` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "organization_invitations" DROP CONSTRAINT "organization_invitations_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_profiles" DROP CONSTRAINT "organization_profiles_organization_id_fkey";

-- AlterTable
ALTER TABLE "organization" DROP CONSTRAINT "organization_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "organization_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "organization_invitations" ALTER COLUMN "organization_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "organization_profiles" ALTER COLUMN "organization_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "organization_profiles" ADD CONSTRAINT "organization_profiles_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
