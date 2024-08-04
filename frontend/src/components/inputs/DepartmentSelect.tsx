import { Loader, Select, SelectProps } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '@/services/department.service';

const useDepartmentSelectQuery = () =>
  useQuery({
    queryKey: ['departments'],
    queryFn: () => getDepartments(),
  });

export function DepartmentSelect({ ...props }: SelectProps) {
  const { data, isPending } = useDepartmentSelectQuery();
  const options = data?.data.map((d) => ({
    value: d.depId?.toString() ?? '',
    label: d.name,
  }));
  return (
    <Select
      {...props}
      value={props.value?.toString()}
      placeholder="Select department"
      data={options ?? []}
      label="Department"
      searchable
      clearable
      rightSection={isPending && <Loader size="xs" />}
      checkIconPosition="right"
    />
  );
}
