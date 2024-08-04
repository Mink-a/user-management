import { useLoginStore } from '@/store/login.store';

export const useCan = () => {
  const rolePermissionMap = {} as Record<string, Record<string, string[]>>;
  const roles = useLoginStore((state) => state.userInfo?.user.role);

  roles?.forEach((role) => {
    const roleName = role.name;
    const rolePermissions = role.permissions.map((perm) => perm.name);

    rolePermissionMap[roleName] = {
      dashboard: rolePermissions,
      profile: rolePermissions,
      staffs: rolePermissions,
      departments: rolePermissions,
      roles: rolePermissions,
      permissions: rolePermissions,
    };
  });

  return rolePermissionMap;
};
