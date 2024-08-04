export const DEPARTMENTS = [
  {
    name: 'Accounting',
    label: 'Accounting department',
    flag: true,
  },
  {
    name: 'Marketing',
    label: 'Marketing department',
    flag: true,
  },
  {
    name: 'Sales',
    label: 'Sales department',
    flag: true,
  },
];

export const PERMISSIONS = [
  {
    name: 'View',
    label: 'View Permission',
    flag: true,
  },
  {
    name: 'Create',
    label: 'Create Permission',
    flag: true,
  },
  {
    name: 'Edit',
    label: 'Edit Permission',
    flag: true,
  },
  {
    name: 'Delete',
    label: 'Delete Permission',
    flag: true,
  },
];

export const ROLES = [
  {
    name: 'Super Admin',
    label: 'Administrator role',
    flag: true,
    permissions: [1, 2, 3, 4],
  },
  {
    name: 'Manager',
    label: 'Manager role',
    flag: true,
    permissions: [1, 2, 3],
  },
  {
    name: 'User',
    label: 'User role',
    flag: true,
    permissions: [1],
  },
];

export const STAFFS = Array(50)
  .fill(null)
  .map((_, i) => ({
    staffId: i + 1,
    code: `staff_${i + 1}`,
    name: i === 0 ? 'Super Admin' : i === 1 ? 'Manager' : `User${i + 1}`,
    email:
      i === 0
        ? 'super.admin@example.com'
        : i === 1
          ? 'manager@example.com'
          : `user${i + 1}@example.com`,
    mobile: '+9304234567890',
    joinedDate: new Date().toISOString(),
    depId: (i % 3) + 1,
    position: i === 0 ? 'Super Admin' : i === 1 ? 'Manager' : 'User',
    age: 30,
    gender: 'Male',
    status: 'Active', // 'Active', 'Inactive'
    createdBy: 1,
    updatedBy: 1,
  }));

export const USERS = Array(50)
  .fill(null)
  .map((_, i) => ({
    userId: i + 1,
    staffId: i + 1,
    name: i === 0 ? 'Super Admin' : i === 1 ? 'Manager' : `User${i + 1}`,
    email:
      i === 0
        ? 'super.admin@example.com'
        : i === 1
          ? 'manager@example.com'
          : `user${i + 1}@example.com`,
    hashedPassword: 'password',
    createdBy: 1,
    updatedBy: 1,
    flag: true,
    role: [i === 0 ? 1 : i === 1 ? 2 : 3],
  }));
