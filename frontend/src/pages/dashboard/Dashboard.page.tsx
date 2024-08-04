import { Card, Loader, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { Error301Page } from '@/components/common/pages/Error301Page';
import { useGetDepartmentsQuery } from '../departments/query';
import { useGetRolesQuery } from '../role/query';
import { useGetStaffsQuery } from '../staff/query';

export function DashboardPage() {
  const { data: departments, isPending: isDepartmentsPending } = useGetDepartmentsQuery();
  const { data: roles, isPending: isRolesPending } = useGetRolesQuery();
  const { data: staffs, isPending: isStaffsPending } = useGetStaffsQuery();
  return (
    <PermissionsGate page={PAGE.dashboard} scopes={[SCOPES.canView]} RenderError={Error301Page}>
      <Stack p="md">
        <Title order={2}>Dashboard</Title>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
        >
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            bg="blue.3"
            style={{ minWidth: '200px' }}
          >
            <Text fz="h1" fw={900}>
              {isDepartmentsPending ? <Loader size="sm" /> : departments?.meta._total}
            </Text>
            <Text size="xl" fw={600}>
              Departments
            </Text>
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            bg="gray.3"
            style={{ minWidth: '200px' }}
          >
            <Text fz="h1" fw={900}>
              {isRolesPending ? <Loader size="sm" /> : roles?.meta._total}
            </Text>
            <Text size="xl" fw={600}>
              Roles
            </Text>
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            bg="lime.3"
            style={{ minWidth: '200px' }}
          >
            <Text fz="h1" fw={900}>
              {isStaffsPending ? <Loader size="sm" /> : staffs?.meta._total}
            </Text>
            <Text size="xl" fw={600}>
              Staffs
            </Text>
          </Card>
        </SimpleGrid>
      </Stack>
    </PermissionsGate>
  );
}
