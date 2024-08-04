import { Group, Stack, Text } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useGetDepartmentsQuery } from './query';
import { DataTable } from '@/components/data-table/DataTable';
import {
  DeleteModalButton,
  UpdateModalButton,
  CreateModalButton,
} from './components/Department.form';
import { TableFilterInput } from '@/components/inputs/TableFilterInput';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { Error301Page } from '@/components/common/pages/Error301Page';

const columns: MRT_ColumnDef<IDepartment>[] = [
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

export function DepartmentPage() {
  const { data, isPending } = useGetDepartmentsQuery();

  return (
    <PermissionsGate page={PAGE.departments} scopes={[SCOPES.canView]} RenderError={Error301Page}>
      <Stack p="md">
        <Group align="center" justify="space-between">
          <Text fw={600} fz={18} c="greyscale.7">
            Departments List
          </Text>
          <Group gap="md">
            <CreateModalButton />
            <TableFilterInput />
          </Group>
        </Group>
        <DataTable
          isLoading={isPending}
          columns={columns}
          data={data?.data ?? []}
          total={data?.meta._total ?? 0}
          renderRowActions={(row) => {
            if (row.original && row.original.depId) {
              return (
                <Group wrap="nowrap">
                  <UpdateModalButton prevValues={row.original} />
                  <DeleteModalButton id={row.original.depId} />
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
