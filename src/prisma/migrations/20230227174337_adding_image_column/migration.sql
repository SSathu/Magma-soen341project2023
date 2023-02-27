-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Postings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jobTitle" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "Image" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Postings" ("id", "jobDescription", "jobTitle") SELECT "id", "jobDescription", "jobTitle" FROM "Postings";
DROP TABLE "Postings";
ALTER TABLE "new_Postings" RENAME TO "Postings";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
