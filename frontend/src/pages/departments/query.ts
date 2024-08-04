import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useParamsHelper } from '@/hooks/useParamsHelper';
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
} from '@/services/department.service';
import { departments } from '@/config/query-keys';
import { DepartmentType } from '@/schema/department.schema';

export const useGetDepartmentsQuery = () => {
  const { getParams } = useParamsHelper();
  const params = getParams();

  return useQuery({
    queryKey: departments.list(params),
    queryFn: () => getDepartments(params),
  });
};

export const useCreateDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DepartmentType) => createDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departments.lists() });
      notifications.show({
        title: 'Department Created',
        message: 'Department has been created successfully.',
        color: 'green',
      });
    },
    onError: () => {
      // TODO: handle error
      notifications.show({
        title: 'Department Create Error',
        message: 'Something went wrong while creating department.',
        color: 'red',
      });
    },
  });
};

export const useUpdateDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DepartmentType) => updateDepartment(data as IDepartment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departments.lists() });
      notifications.show({
        title: 'Department Updated',
        message: 'Department has been updated successfully.',
        color: 'green',
      });
    },
    onError: () => {
      // TODO: handle error
      notifications.show({
        title: 'Department Update Error',
        message: 'Something went wrong while updating department.',
        color: 'red',
      });
    },
  });
};

export const useDeleteDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: departments.lists() });
      notifications.show({
        title: 'Department Deleted',
        message: 'Department has been deleted successfully.',
        color: 'green',
      });
    },
    onError: () => {
      // TODO: handle error
      notifications.show({
        title: 'Department Delete Error',
        message: 'Something went wrong while deleting department.',
        color: 'red',
      });
    },
  });
};
