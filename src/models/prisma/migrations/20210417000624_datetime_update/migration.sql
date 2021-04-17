/*
  Warnings:

  - You are about to alter the column `created_at` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "daily_hours" INTEGER,
    "total_hours" INTEGER,
    "created_at" INTEGER,
    "profileId" INTEGER NOT NULL,
    FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("id", "name", "daily_hours", "total_hours", "created_at", "profileId") SELECT "id", "name", "daily_hours", "total_hours", "created_at", "profileId" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
