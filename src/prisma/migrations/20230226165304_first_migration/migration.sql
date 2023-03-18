-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "LoggedIn" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Postings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jobTitle" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL
);

