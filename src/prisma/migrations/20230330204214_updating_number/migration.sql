-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "LoggedIn" BOOLEAN NOT NULL DEFAULT false,
    "PhoneNumber" TEXT,
    "City" TEXT,
    "Country" TEXT,
    "PostalCode" TEXT,
    "Bio" TEXT
);
INSERT INTO "new_User" ("Bio", "City", "Country", "Email", "FirstName", "LastName", "LoggedIn", "Password", "PhoneNumber", "PostalCode", "id") SELECT "Bio", "City", "Country", "Email", "FirstName", "LastName", "LoggedIn", "Password", "PhoneNumber", "PostalCode", "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
