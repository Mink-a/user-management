-- CreateTable
CREATE TABLE "_DepartmentsToStaff" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DepartmentsToStaff_A_fkey" FOREIGN KEY ("A") REFERENCES "departments" ("depId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DepartmentsToStaff_B_fkey" FOREIGN KEY ("B") REFERENCES "staff" ("staffId") ON DELETE CASCADE ON UPDATE CASCADE
);

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
    "updatedBy" INTEGER NOT NULL
);
INSERT INTO "new_staff" ("age", "code", "createdAt", "createdBy", "depId", "email", "gender", "joinedDate", "mobile", "name", "position", "staffId", "status", "updatedAt", "updatedBy") SELECT "age", "code", "createdAt", "createdBy", "depId", "email", "gender", "joinedDate", "mobile", "name", "position", "staffId", "status", "updatedAt", "updatedBy" FROM "staff";
DROP TABLE "staff";
ALTER TABLE "new_staff" RENAME TO "staff";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentsToStaff_AB_unique" ON "_DepartmentsToStaff"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentsToStaff_B_index" ON "_DepartmentsToStaff"("B");
