/*
  Warnings:

  - You are about to drop the column `companyName` on the `Applications` table. All the data in the column will be lost.
  - Added the required column `AppCompanyName` to the `Applications` table without a default value. This is not possible if the table is not empty.

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
    "AppCompanyName" TEXT NOT NULL,
    "Viewed" BOOLEAN NOT NULL DEFAULT false,
    "Accepted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Applications" ("Accepted", "EmployerEmail", "FirstName", "JobId", "JobTitle", "LastName", "StudentEmail", "Viewed", "id") SELECT "Accepted", "EmployerEmail", "FirstName", "JobId", "JobTitle", "LastName", "StudentEmail", "Viewed", "id" FROM "Applications";
DROP TABLE "Applications";
ALTER TABLE "new_Applications" RENAME TO "Applications";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
