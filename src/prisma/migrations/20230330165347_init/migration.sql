/*
  Warnings:

  - Added the required column `CompanyName` to the `Postings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Postings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CompanyName" TEXT NOT NULL,
    "JobTitle" TEXT NOT NULL,
    "JobDescription" TEXT NOT NULL,
    "Salary" TEXT NOT NULL,
    "Image" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Postings" ("Image", "JobDescription", "JobTitle", "Salary", "id") SELECT "Image", "JobDescription", "JobTitle", "Salary", "id" FROM "Postings";
DROP TABLE "Postings";
ALTER TABLE "new_Postings" RENAME TO "Postings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
