/*
  Warnings:

  - You are about to drop the column `updateAt` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `workspace` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `workspace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'TODO';

-- AlterTable
ALTER TABLE "workspace" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
