/*
  Warnings:

  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "jobs";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "profile";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "daily_hours" INTEGER,
    "total_hours" INTEGER,
    "created_at" DATETIME,
    "profileId" INTEGER NOT NULL,
    FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "monthly_budget" INTEGER,
    "days_per_week" INTEGER,
    "hours_per_day" INTEGER,
    "vacation_per_year" INTEGER,
    "value_hour" REAL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile.email_unique" ON "Profile"("email");
