-- CreateTable
CREATE TABLE "Notifications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CompanyName" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "Notified" BOOLEAN NOT NULL
);
