-- CreateTable
CREATE TABLE "jobs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "daily_hours" INTEGER,
    "total_hours" INTEGER,
    "created_at" DATETIME
);

-- CreateTable
CREATE TABLE "profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "avatar" TEXT,
    "monthly_budget" INTEGER,
    "days_per_week" INTEGER,
    "hours_per_day" INTEGER,
    "vacation_per_year" INTEGER,
    "value_hour" REAL
);
