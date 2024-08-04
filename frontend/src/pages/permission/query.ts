import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useParamsHelper } from '@/hooks/useParamsHelper';
import { permissions } from '@/config/query-keys';
import {
  createPermission,
  deletePermission,
  getPermissions,
  updatePermission,
} from '@/services/permission.service';
import { PermissionType } from '@/schema/permission.schema';

export const useGetPermissionsQuery = () => {
  const { getParams } = useParamsHelper();
  const params = getParams();

  return useQuery({
    queryKey: permissions.list(params),
    queryFn: () => getPermissions(params),
  });
};

export const useCreatePermissionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PermissionType) => createPermission(data as IPermission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: permissions.lists() });
      notifications.show({
        title: 'Permission Created',
        message: 'Permission has been created successfully.',
        color: 'green',
      });
    },
    onError: () => {
      // TODO: handle error
      notifications.show({
        title: 'Permission Create Error',
        message: 'Something went wrong while creating permission.',
        color: 'red',
      });
    },
  });
};

export const useUpdatePermissionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PermissionType) => updatePermission(data as IPermission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: permissions.lists() });
      notifications.show({
        title: 'Permission Updated',
        message: 'Permission has been updated successfully.',
        color: 'green',
      });
    },
    onError: () => {
      // TODO: handle error
      notifications.show({
        title: 'Permission Update Error',
        message: 'Something went wrong while updating permission.',
        color: 'red',
      });
    },
  });
};

export const useDeletePermissionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePermission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: permissions.lists() });
      notifications.show({
        title: 'Permission Deleted',
        message: 'Permission has been deleted successfully.',
        color: 'green',
      });
    },
    onError: () => {
      // TODO: handle error
      notifications.show({
        title: 'Permission Delete Error',
        message: 'Something went wrong while deleting permission.',
        color: 'red',
      });
    },
  });
};
