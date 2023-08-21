/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hashSalt" TEXT,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT,
    "refreshTokenIssued" DATETIME
);
INSERT INTO "new_User" ("email", "hashSalt", "id", "password", "refreshToken", "refreshTokenIssued", "username") SELECT "email", "hashSalt", "id", "password", "refreshToken", "refreshTokenIssued", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
