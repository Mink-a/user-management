import { Group, Stack, Text } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { DataTable } from '@/components/data-table/DataTable';
import { useGetRolesQuery } from './query';
import { DeleteModalButton, UpdateModalButton, CreateModalButton } from './components/Role.form';
import { TableFilterInput } from '@/components/inputs/TableFilterInput';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { Error301Page } from '@/components/common/pages/Error301Page';

const columns: MRT_ColumnDef<IRole>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'label',
    id: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'flag',
    id: 'flag',
    header: 'Flag',
    Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
  },
];

export function RolePage() {
  const { data, isPending } = useGetRolesQuery();

  return (
    <PermissionsGate page={PAGE.roles} scopes={[SCOPES.canView]} RenderError={Error301Page}>
      <Stack p="md">
        <Group align="center" justify="space-between">
          <Text fw={600} fz={18} c="greyscale.7">
            Role List
          </Text>
          <Group gap="md">
            <CreateModalButton />
            <TableFilterInput />
          </Group>
        </Group>
        <DataTable
          data={data?.data ?? []}
          columns={columns}
          total={data?.meta?._total}
          isLoading={isPending}
          renderRowActions={(row) => {
            if (row.original && row.original.roleId) {
              return (
                <Group wrap="nowrap">
                  <UpdateModalButton
                    prevValues={{
                      ...row.original,
                      permissions: row.original.permissions.map(
                        (permission) => (permission as Permission).permissionId
                      ),
                    }}
                  />
                  <DeleteModalButton id={row.original.roleId} />
                </Group>
              );
            }
            return null;
          }}
        />
      </Stack>
    </PermissionsGate>
  );
}
