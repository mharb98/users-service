/*
  Warnings:

  - The primary key for the `organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `organization` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[organizationId]` on the table `organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationId` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `organization_id` on the `organization_invitations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `organization_id` on the `organization_profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "organization_invitations" DROP CONSTRAINT "organization_invitations_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_profiles" DROP CONSTRAINT "organization_profiles_organization_id_fkey";

-- AlterTable
ALTER TABLE "organization" DROP CONSTRAINT "organization_pkey",
ADD COLUMN     "organizationId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "organization_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "organization_invitations" DROP COLUMN "organization_id",
ADD COLUMN     "organization_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "organization_profiles" DROP COLUMN "organization_id",
ADD COLUMN     "organization_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organization_organizationId_key" ON "organization"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "organization_profiles_organization_id_key" ON "organization_profiles"("organization_id");

-- AddForeignKey
ALTER TABLE "organization_profiles" ADD CONSTRAINT "organization_profiles_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
