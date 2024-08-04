import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useParamsHelper } from '@/hooks/useParamsHelper';
import { createRole, deleteRole, getRoles, updateRole } from '@/services/role.service';
import { roles } from '@/config/query-keys';
import { RoleType } from '@/schema/role.schema';

export const useGetRolesQuery = () => {
  const { getParams } = useParamsHelper();
  const params = getParams();

  return useQuery({
    queryKey: roles.list(params),
    queryFn: () => getRoles(params),
  });
};

export const useCreateRoleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RoleType) => createRole(data as IRole),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: roles.lists(),
      });
      notifications.show({
        title: 'Role Created',
        message: 'Role has been created successfully.',
        color: 'green',
      });
    },
    onError: () => {
      // TODO: handle error
      notifications.show({
        title: 'Role Create Error',
        message: 'Something went wrong while creating role.',
        color: 'red',
      });
    },
  });
};

export const useUpdateRoleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RoleType) => updateRole(data as IRole),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: roles.lists(),
      });
      notifications.show({
        title: 'Role Updated',
        message: 'Role has been updated successfully.',
        color: 'green',
      });
    },
    onError: () => {
      // TODO: handle error
      notifications.show({
        title: 'Role Update Error',
        message: 'Something went wrong while updating role.',
        color: 'red',
      });
    },
  });
};

export const useDeleteRoleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: roles.lists(),
      });
      notifications.show({
        title: 'Role Deleted',
        message: 'Role has been deleted successfully.',
        color: 'green',
      });
    },
    onError: () => {
      // TODO: handle error
      notifications.show({
        title: 'Role Delete Error',
        message: 'Something went wrong while deleting role.',
        color: 'red',
      });
    },
  });
};
