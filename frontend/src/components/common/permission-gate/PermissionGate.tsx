import { cloneElement, ReactElement } from 'react';
import { useLoginStore } from '@/store/login.store';
import { useCan } from '@/hooks/useCan';

interface PageProps {
  children: ReactElement;
  scopes?: string[];
  page?: string;
  errorProps?: any;
  RenderError?: () => JSX.Element;
}

export function PermissionsGate({
  children,
  scopes = [],
  page = 'dashboard',
  errorProps = null,
  RenderError = () => <></>,
}: PageProps) {
  const userInfo = useLoginStore((state) => state.userInfo);
  const rolePerms = useCan();
  const role = userInfo?.user.role[0].name || 'User';
  const rolePermissions = rolePerms[role] && rolePerms[role][page] ? rolePerms[role][page] : [];
  const permissionGranted = scopes.every((permission) => rolePermissions.includes(permission));

  if (!permissionGranted && !errorProps) return <RenderError />;

  if (!permissionGranted && errorProps) return cloneElement(children, { ...errorProps });

  return <>{children}</>;
}
