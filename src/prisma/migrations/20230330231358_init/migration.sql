/*
  Warnings:

  - You are about to drop the column `JobDescription` on the `Postings` table. All the data in the column will be lost.
  - You are about to drop the column `JobTitle` on the `Postings` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Postings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "CompanyName" TEXT NOT NULL,
    "jobTitle" TEXT,
    "jobDescription" TEXT,
    "Salary" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Image" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Postings" ("CompanyName", "Email", "Image", "Location", "Salary", "id") SELECT "CompanyName", "Email", "Image", "Location", "Salary", "id" FROM "Postings";
DROP TABLE "Postings";
ALTER TABLE "new_Postings" RENAME TO "Postings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
