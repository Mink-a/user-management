import { Loader, MultiSelect, MultiSelectProps } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getPermissions } from '@/services/permission.service';

const usePermissionsSelectQuery = () =>
  useQuery({
    queryKey: ['permissions'],
    queryFn: () => getPermissions(),
  });

export function PermissionsSelect({ ...props }: MultiSelectProps) {
  const { data, isPending } = usePermissionsSelectQuery();
  const options = data?.data.map((d) => ({
    value: d.permissionId?.toString() ?? '',
    label: d.name,
  }));
  return (
    <MultiSelect
      {...props}
      value={props.value?.map((v) => v.toString()) ?? []}
      placeholder="Select permissions"
      data={options ?? []}
      label="Permissions"
      searchable
      clearable
      rightSection={isPending && <Loader size="xs" />}
      checkIconPosition="right"
    />
  );
}
