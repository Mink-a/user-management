-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_staff" (
    "staffId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "joinedDate" DATETIME NOT NULL,
    "depId" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER NOT NULL,
    CONSTRAINT "staff_depId_fkey" FOREIGN KEY ("depId") REFERENCES "departments" ("depId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_staff" ("age", "code", "createdAt", "createdBy", "depId", "email", "gender", "joinedDate", "mobile", "name", "position", "staffId", "status", "updatedAt", "updatedBy") SELECT "age", "code", "createdAt", "createdBy", "depId", "email", "gender", "joinedDate", "mobile", "name", "position", "staffId", "status", "updatedAt", "updatedBy" FROM "staff";
DROP TABLE "staff";
ALTER TABLE "new_staff" RENAME TO "staff";
CREATE TABLE "new_users" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "staffId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER NOT NULL,
    "flag" BOOLEAN NOT NULL,
    CONSTRAINT "users_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staff" ("staffId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_users" ("createdAt", "createdBy", "email", "flag", "hashedPassword", "name", "staffId", "updatedAt", "updatedBy", "userId") SELECT "createdAt", "createdBy", "email", "flag", "hashedPassword", "name", "staffId", "updatedAt", "updatedBy", "userId" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_staffId_key" ON "users"("staffId");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
