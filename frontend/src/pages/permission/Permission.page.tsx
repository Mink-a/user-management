import { Group, Stack, Text } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { DataTable } from '@/components/data-table/DataTable';
import { useGetPermissionsQuery } from './query';
import {
  DeleteModalButton,
  UpdateModalButton,
  CreateModalButton,
} from './components/Permission.form';
import { TableFilterInput } from '@/components/inputs/TableFilterInput';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { Error301Page } from '@/components/common/pages/Error301Page';
import { PAGE, SCOPES } from '@/config/permissions';

const columns: MRT_ColumnDef<IPermission>[] = [
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

export function PermissionPage() {
  const { data, isPending } = useGetPermissionsQuery();

  return (
    <PermissionsGate page={PAGE.permissions} scopes={[SCOPES.canView]} RenderError={Error301Page}>
      <Stack p="md">
        <Group align="center" justify="space-between">
          <Text fw={600} fz={18} c="greyscale.7">
            Permission List
          </Text>
          <Group gap="md">
            <CreateModalButton />
            <TableFilterInput />
          </Group>
        </Group>
        <DataTable
          data={data?.data ?? []}
          columns={columns}
          total={data?.meta?._total ?? 0}
          isLoading={isPending}
          renderRowActions={(row) => {
            if (row.original && row.original.permissionId) {
              return (
                <Group wrap="nowrap">
                  <UpdateModalButton prevValues={row.original} />
                  <DeleteModalButton id={row.original.permissionId} />
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
