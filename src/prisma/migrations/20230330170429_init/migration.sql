/*
  Warnings:

  - Added the required column `Location` to the `Postings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Postings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CompanyName" TEXT NOT NULL,
    "JobTitle" TEXT NOT NULL,
    "JobDescription" TEXT NOT NULL,
    "Salary" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Image" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Postings" ("CompanyName", "Image", "JobDescription", "JobTitle", "Salary", "id") SELECT "CompanyName", "Image", "JobDescription", "JobTitle", "Salary", "id" FROM "Postings";
DROP TABLE "Postings";
ALTER TABLE "new_Postings" RENAME TO "Postings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
