import { IconBuilding, IconHome, IconUser, IconUserCheck, IconUsers } from '@tabler/icons-react';
import { SCOPES } from './permissions';

export const MENUS = [
  {
    label: 'Dashboard',
    icon: IconHome,
    to: '/d',
    scopes: [SCOPES.canView],
    page: 'dashboard',
  },
  {
    label: 'Profile',
    icon: IconUser,
    to: '/d/profile',
    scopes: [SCOPES.canView],
    page: 'profile',
  },
  {
    label: 'Staffs',
    icon: IconUsers,
    to: '/d/staffs',
    scopes: [SCOPES.canView],
    page: 'staffs',
  },
  {
    label: 'Departments',
    icon: IconBuilding,
    to: '/d/departments',
    scopes: [SCOPES.canView],
    page: 'departments',
  },
  {
    label: 'Roles',
    icon: IconUserCheck,
    to: '/d/roles',
    scopes: [SCOPES.canView],
    page: 'roles',
  },
  {
    label: 'Permissions',
    icon: IconUserCheck,
    to: '/d/permissions',
    scopes: [SCOPES.canView],
    page: 'permissions',
  },
];
