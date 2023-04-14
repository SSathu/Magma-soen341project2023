/*
  Warnings:

  - You are about to drop the column `Email` on the `Applications` table. All the data in the column will be lost.
  - Added the required column `EmployerEmail` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FirstName` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `JobDescription` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `JobTitle` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastName` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StudentEmail` to the `Applications` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Applications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "EmployerEmail" TEXT NOT NULL,
    "StudentEmail" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "JobId" INTEGER NOT NULL,
    "JobTitle" TEXT NOT NULL,
    "JobDescription" TEXT NOT NULL,
    "Viewed" BOOLEAN NOT NULL DEFAULT false,
    "Accepted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Applications" ("Accepted", "JobId", "Viewed", "id") SELECT "Accepted", "JobId", "Viewed", "id" FROM "Applications";
DROP TABLE "Applications";
ALTER TABLE "new_Applications" RENAME TO "Applications";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
