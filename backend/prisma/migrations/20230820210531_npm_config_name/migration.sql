/*
  Warnings:

  - Added the required column `createdAt` to the `User` table without a default value. This is not possible if the table is not empty.

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
    "refreshTokenIssued" DATETIME,
    "createdAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("email", "hashSalt", "id", "password", "refreshToken", "refreshTokenIssued", "username") SELECT "email", "hashSalt", "id", "password", "refreshToken", "refreshTokenIssued", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
