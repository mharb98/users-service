/*
  Warnings:

  - You are about to drop the `internal_user_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `internal_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "internal_user_roles" DROP CONSTRAINT "internal_user_roles_internal_user_id_fkey";

-- DropForeignKey
ALTER TABLE "internal_users" DROP CONSTRAINT "internal_users_user_id_fkey";

-- DropTable
DROP TABLE "internal_user_roles";

-- DropTable
DROP TABLE "internal_users";

-- CreateTable
CREATE TABLE "internal_profiles" (
    "id" SERIAL NOT NULL,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "internal_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "internal_roles" (
    "internal_profile_id" INTEGER NOT NULL,
    "role" "InternalRole" NOT NULL,

    CONSTRAINT "internal_roles_pkey" PRIMARY KEY ("internal_profile_id","role")
);

-- CreateIndex
CREATE UNIQUE INDEX "internal_profiles_user_id_key" ON "internal_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "internal_profiles" ADD CONSTRAINT "internal_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internal_roles" ADD CONSTRAINT "internal_roles_internal_profile_id_fkey" FOREIGN KEY ("internal_profile_id") REFERENCES "internal_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
