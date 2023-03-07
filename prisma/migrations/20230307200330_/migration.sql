/*
  Warnings:

  - You are about to drop the column `gender` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "gender";

-- CreateTable
CREATE TABLE "social_profile" (
    "id" SERIAL NOT NULL,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "gender" "Gender",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "social_profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "social_profile_user_id_key" ON "social_profile"("user_id");

-- AddForeignKey
ALTER TABLE "social_profile" ADD CONSTRAINT "social_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
