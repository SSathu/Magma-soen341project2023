/*
  Warnings:

  - You are about to alter the column `Rating` on the `Ratings` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ratings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "CompanyName" TEXT NOT NULL,
    "CompanyReview" TEXT NOT NULL DEFAULT '',
    "Rating" REAL NOT NULL DEFAULT 0
);
INSERT INTO "new_Ratings" ("CompanyName", "CompanyReview", "Email", "FirstName", "LastName", "Rating", "id") SELECT "CompanyName", "CompanyReview", "Email", "FirstName", "LastName", "Rating", "id" FROM "Ratings";
DROP TABLE "Ratings";
ALTER TABLE "new_Ratings" RENAME TO "Ratings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
