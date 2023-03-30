/*
  Warnings:

  - You are about to drop the column `jobDescription` on the `Postings` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `Postings` table. All the data in the column will be lost.
  - Added the required column `JobDescription` to the `Postings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `JobTitle` to the `Postings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Salary` to the `Postings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Postings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "JobTitle" TEXT NOT NULL,
    "JobDescription" TEXT NOT NULL,
    "Salary" TEXT NOT NULL,
    "Image" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Postings" ("Image", "id") SELECT "Image", "id" FROM "Postings";
DROP TABLE "Postings";
ALTER TABLE "new_Postings" RENAME TO "Postings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
