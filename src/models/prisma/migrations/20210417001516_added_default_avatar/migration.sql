-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT DEFAULT 'images/default-user-icon.jpg',
    "monthly_budget" INTEGER,
    "days_per_week" INTEGER,
    "hours_per_day" INTEGER,
    "vacation_per_year" INTEGER,
    "value_hour" REAL
);
INSERT INTO "new_Profile" ("id", "email", "password", "name", "avatar", "monthly_budget", "days_per_week", "hours_per_day", "vacation_per_year", "value_hour") SELECT "id", "email", "password", "name", "avatar", "monthly_budget", "days_per_week", "hours_per_day", "vacation_per_year", "value_hour" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile.email_unique" ON "Profile"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
