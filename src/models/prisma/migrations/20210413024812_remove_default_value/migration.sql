-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_profile" (
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
INSERT INTO "new_profile" ("id", "email", "password", "name", "avatar", "monthly_budget", "days_per_week", "hours_per_day", "vacation_per_year", "value_hour") SELECT "id", "email", "password", "name", "avatar", "monthly_budget", "days_per_week", "hours_per_day", "vacation_per_year", "value_hour" FROM "profile";
DROP TABLE "profile";
ALTER TABLE "new_profile" RENAME TO "profile";
CREATE UNIQUE INDEX "profile.email_unique" ON "profile"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
