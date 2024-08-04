import { Button, Divider, Group, Stack, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { Error301Page } from '@/components/common/pages/Error301Page';
import { useGetProfileQuery } from './query';
import { Details, DetailsItem } from './components/Details';

export function ProfilePage() {
  const navigate = useNavigate();
  const { data } = useGetProfileQuery();
  const { department, users, ...staffInfo } = data?.data ?? {};
  const { role, ...usersInfo } = users ?? {};
  const roleInfo = {} as Record<string, any>;
  const permissionInfo = {} as Record<string, any>;
  role?.forEach((r) => {
    const roleId = `Role_${r.roleId}`;
    if (!roleInfo[roleId]) {
      roleInfo[roleId] = {
        name: r.name,
        label: r.label,
        flag: r.flag,
      };
    }

    r.permissions?.forEach((p) => {
      const permissionId = `Permission_${p.permissionId}`;
      if (!permissionInfo[permissionId]) {
        permissionInfo[permissionId] = {
          name: p.name,
          label: p.label,
          flag: p.flag,
        };
      }
    });
  });

  return (
    <PermissionsGate page={PAGE.profile} scopes={[SCOPES.canView]} RenderError={Error301Page}>
      <Stack p="md">
        <Group align="center" justify="space-between">
          <Text fw={600} fz={18} c="greyscale.7">
            User Profile
          </Text>
          <Button variant="outline" color="primary" onClick={() => navigate('/d/staffs')}>
            Back
          </Button>
        </Group>
        <Details>
          {Object.entries(staffInfo ?? {}).map(([key, value]) => (
            <DetailsItem key={key} label={key.toUpperCase()} value={value} />
          ))}
        </Details>
        <Divider my="md" />
        <Text fw={600} fz={18} c="grey.7">
          Department
        </Text>
        <Details>
          {Object.entries(department ?? {}).map(([key, value]) => (
            <DetailsItem key={key} label={key.toUpperCase()} value={value} />
          ))}
        </Details>
        {/* <Divider my="md" />
        <Text fw={600} fz={18} c="grey.7">
          Users
        </Text>
        <Details>
          {Object.entries(usersInfo ?? {}).map(([key, value]) => (
            <DetailsItem key={key} label={key.toUpperCase()} value={value} />
          ))}
        </Details> */}
        <Divider my="md" />
        <Text fw={600} fz={18} c="grey.7">
          Roles
        </Text>
        <Details>
          {Object.entries(roleInfo ?? {}).map(([key, value]) => (
            <DetailsItem key={key} label={key.toUpperCase()} value={value} />
          ))}
        </Details>
        <Divider my="md" />
        <Text fw={600} fz={18} c="grey.7">
          Permissions
        </Text>
        <Details>
          {Object.entries(permissionInfo ?? {}).map(([key, value]) => (
            <DetailsItem key={key} label={key.toUpperCase()} value={value} />
          ))}
        </Details>
        <Divider my="md" />
      </Stack>
    </PermissionsGate>
  );
}
