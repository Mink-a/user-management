import { Group, Stack, Text } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { DataTable } from '@/components/data-table/DataTable';
import { useGetStaffsQuery } from './query';
import {
  CreateModalButton,
  DeleteModalButton,
  UpdateModalButton,
  ViewDetailsLink,
} from './components/Staff.form';
import { TableFilterInput } from '@/components/inputs/TableFilterInput';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { Error301Page } from '@/components/common/pages/Error301Page';

const columns: MRT_ColumnDef<IStaff>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    id: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'mobile',
    id: 'mobile',
    header: 'Mobile',
  },
  {
    accessorKey: 'department.name',
    id: 'department.name',
    header: 'Department',
  },
  {
    accessorKey: 'position',
    id: 'position',
    header: 'Position',
  },
  {
    accessorKey: 'age',
    id: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'gender',
    id: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Status',
  },
];

export function StaffPage() {
  const { data, isPending } = useGetStaffsQuery();

  return (
    <PermissionsGate page={PAGE.staffs} scopes={[SCOPES.canView]} RenderError={Error301Page}>
      <Stack p="md">
        <Group align="center" justify="space-between">
          <Text fw={600} fz={18} c="greyscale.7">
            Staff List
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
            if (row.original && row.original.staffId) {
              return (
                <Group wrap="nowrap">
                  <UpdateModalButton prevValues={row.original} />
                  <DeleteModalButton id={row.original.staffId} />
                  <ViewDetailsLink id={row.original.staffId} />
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
