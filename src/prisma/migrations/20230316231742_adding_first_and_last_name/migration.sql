-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "LoggedIn" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("Email", "FirstName", "LastName", "LoggedIn", "Password", "id") SELECT "Email", "FirstName", "LastName", "LoggedIn", "Password", "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
