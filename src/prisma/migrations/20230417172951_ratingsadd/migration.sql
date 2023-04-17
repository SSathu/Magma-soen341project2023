-- CreateTable
CREATE TABLE "Ratings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "CompanyName" TEXT NOT NULL,
    "CompanyReview" TEXT NOT NULL DEFAULT '',
    "Rating" INTEGER NOT NULL DEFAULT 0
);
