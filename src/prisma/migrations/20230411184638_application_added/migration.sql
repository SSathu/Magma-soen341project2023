-- CreateTable
CREATE TABLE "Applications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "JobId" INTEGER NOT NULL,
    "Viewed" BOOLEAN NOT NULL DEFAULT false,
    "Accepted" BOOLEAN NOT NULL DEFAULT false
);
