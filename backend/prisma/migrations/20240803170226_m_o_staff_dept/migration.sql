/*
  Warnings:

  - You are about to drop the `_DepartmentsToStaff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_DepartmentsToStaff_B_index";

-- DropIndex
DROP INDEX "_DepartmentsToStaff_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_DepartmentsToStaff";
PRAGMA foreign_keys=on;

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
    CONSTRAINT "staff_depId_fkey" FOREIGN KEY ("depId") REFERENCES "departments" ("depId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_staff" ("age", "code", "createdAt", "createdBy", "depId", "email", "gender", "joinedDate", "mobile", "name", "position", "staffId", "status", "updatedAt", "updatedBy") SELECT "age", "code", "createdAt", "createdBy", "depId", "email", "gender", "joinedDate", "mobile", "name", "position", "staffId", "status", "updatedAt", "updatedBy" FROM "staff";
DROP TABLE "staff";
ALTER TABLE "new_staff" RENAME TO "staff";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
