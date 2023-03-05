-- CreateEnum
CREATE TYPE "InternalRole" AS ENUM ('Admin', 'Moderator', 'Member');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('Administration', 'Warehouse', 'Finance', 'CustomerService');

-- CreateEnum
CREATE TYPE "DepartRole" AS ENUM ('Head', 'Moderator', 'Member');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "organization" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "gender" "Gender",
    "platform_ban" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "internal_users" (
    "id" SERIAL NOT NULL,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "internal_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "internal_invitations" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" "InternalRole" NOT NULL,
    "accepted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "internal_invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "internal_user_roles" (
    "internal_user_id" INTEGER NOT NULL,
    "role" "InternalRole" NOT NULL,

    CONSTRAINT "internal_user_roles_pkey" PRIMARY KEY ("internal_user_id","role")
);

-- CreateTable
CREATE TABLE "organization_users" (
    "id" SERIAL NOT NULL,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "organization_id" INTEGER NOT NULL,

    CONSTRAINT "organization_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_invitations" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "department" "Department" NOT NULL,
    "role" "DepartRole" NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "accepted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_user_departments" (
    "id" SERIAL NOT NULL,
    "organization_user_id" INTEGER NOT NULL,

    CONSTRAINT "organization_user_departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department_roles" (
    "organization_department_id" INTEGER NOT NULL,
    "department_role" "DepartRole" NOT NULL,

    CONSTRAINT "department_roles_pkey" PRIMARY KEY ("organization_department_id","department_role")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "internal_users_user_id_key" ON "internal_users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "internal_invitations_email_key" ON "internal_invitations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organization_users_organization_id_key" ON "organization_users"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_invitations_email_key" ON "organization_invitations"("email");

-- AddForeignKey
ALTER TABLE "internal_users" ADD CONSTRAINT "internal_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internal_user_roles" ADD CONSTRAINT "internal_user_roles_internal_user_id_fkey" FOREIGN KEY ("internal_user_id") REFERENCES "internal_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_users" ADD CONSTRAINT "organization_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_users" ADD CONSTRAINT "organization_users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_user_departments" ADD CONSTRAINT "organization_user_departments_organization_user_id_fkey" FOREIGN KEY ("organization_user_id") REFERENCES "organization_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_roles" ADD CONSTRAINT "department_roles_organization_department_id_fkey" FOREIGN KEY ("organization_department_id") REFERENCES "organization_user_departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
