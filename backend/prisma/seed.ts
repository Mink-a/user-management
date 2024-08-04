import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { DEPARTMENTS, ROLES, PERMISSIONS, STAFFS, USERS } from './data/data';

async function seedDepartments() {
  await prisma.departments.createMany({
    data: DEPARTMENTS,
  });
  console.log('departments created:');
}

async function seedRoles() {
  await prisma.$transaction(
    ROLES.map((role) =>
      prisma.roles.create({
        data: {
          ...role,
          permissions: {
            connect: [
              ...role.permissions.map((permission) => ({
                permissionId: permission,
              })),
            ],
          },
        },
      }),
    ),
  );

  console.log('roles created:');
}

async function seedPermissions() {
  await prisma.permissions.createMany({
    data: PERMISSIONS,
  });
  console.log('permissions created:');
}

async function seedStaff() {
  await prisma.staff.createMany({
    data: STAFFS,
  });
  console.log('staff created:');
}

async function seedUsers() {
  await prisma.$transaction(
    USERS.map((user) =>
      prisma.users.create({
        data: {
          ...user,
          role: {
            connect: [
              ...user.role.map((role) => ({
                roleId: role,
              })),
            ],
          },
        },
      }),
    ),
  );
  console.log('users created:');
}

async function main() {
  await seedDepartments();
  await seedPermissions();
  await seedRoles();
  await seedStaff();
  await seedUsers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
