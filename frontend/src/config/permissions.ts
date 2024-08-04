// permissions.js
export const ROLES = {
  admin: 'Super Admin',
  manager: 'Manager',
  user: 'User',
};

export const SCOPES = {
  canView: 'View',
  canCreate: 'Create',
  canEdit: 'Edit',
  canDelete: 'Delete',
};

export const PAGE = {
  dashboard: 'dashboard',
  profile: 'profile',
  staffs: 'staffs',
  departments: 'departments',
  roles: 'roles',
  permissions: 'permissions',
};

export const PERMISSIONS = {
  [ROLES.user]: {
    [PAGE.dashboard]: [SCOPES.canView],
    [PAGE.profile]: [SCOPES.canView],
  },
  [ROLES.admin]: {
    [PAGE.dashboard]: [SCOPES.canView, SCOPES.canCreate, SCOPES.canEdit, SCOPES.canDelete],
    [PAGE.profile]: [SCOPES.canView, SCOPES.canCreate, SCOPES.canEdit, SCOPES.canDelete],
    [PAGE.staffs]: [SCOPES.canView, SCOPES.canCreate, SCOPES.canEdit, SCOPES.canDelete],
    [PAGE.departments]: [SCOPES.canView, SCOPES.canCreate, SCOPES.canEdit, SCOPES.canDelete],
    [PAGE.roles]: [SCOPES.canView, SCOPES.canCreate, SCOPES.canEdit, SCOPES.canDelete],
    [PAGE.permissions]: [SCOPES.canView, SCOPES.canCreate, SCOPES.canEdit, SCOPES.canDelete],
  },
  [ROLES.manager]: {
    [PAGE.dashboard]: [SCOPES.canView, SCOPES.canCreate, SCOPES.canEdit],
    [PAGE.profile]: [SCOPES.canView, SCOPES.canCreate, SCOPES.canEdit],
    [PAGE.staffs]: [SCOPES.canView, SCOPES.canCreate, SCOPES.canEdit],
    [PAGE.departments]: [SCOPES.canView],
    [PAGE.roles]: [SCOPES.canView],
    [PAGE.permissions]: [SCOPES.canView],
  },
};
