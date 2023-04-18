-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notifications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CompanyName" TEXT NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "Notified" BOOLEAN NOT NULL,
    "Decision" TEXT NOT NULL DEFAULT '',
    "Position" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Notifications" ("CompanyName", "Decision", "Notified", "id", "studentEmail") SELECT "CompanyName", "Decision", "Notified", "id", "studentEmail" FROM "Notifications";
DROP TABLE "Notifications";
ALTER TABLE "new_Notifications" RENAME TO "Notifications";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
