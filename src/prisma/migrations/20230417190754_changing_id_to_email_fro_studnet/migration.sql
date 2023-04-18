/*
  Warnings:

  - You are about to drop the column `studentId` on the `Notifications` table. All the data in the column will be lost.
  - Added the required column `studentEmail` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notifications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CompanyName" TEXT NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "Notified" BOOLEAN NOT NULL
);
INSERT INTO "new_Notifications" ("CompanyName", "Notified", "id") SELECT "CompanyName", "Notified", "id" FROM "Notifications";
DROP TABLE "Notifications";
ALTER TABLE "new_Notifications" RENAME TO "Notifications";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
