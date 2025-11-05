-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'DELETE';

-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "contactNumber" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;
