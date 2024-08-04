import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useParamsHelper } from '@/hooks/useParamsHelper';
import {
  createStaff,
  deleteStaff,
  getStaff,
  getStaffs,
  updateStaff,
} from '@/services/staff.service';
import { StaffType } from '@/schema/staff.schema';
import { staff } from '@/config/query-keys';

export const useGetStaffsQuery = () => {
  const { getParams } = useParamsHelper();
  const params = getParams();

  return useQuery({
    queryKey: staff.list(params),
    queryFn: () => getStaffs(params),
  });
};

export const useGetStaffQuery = (id: number) =>
  useQuery({
    queryKey: staff.details(),
    queryFn: () => getStaff(id),
  });

export const useCreateStaffMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: StaffType) => createStaff(data as IStaff),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: staff.lists(),
      });
      notifications.show({
        title: 'Staff Created',
        message: 'Staff has been created successfully.',
        color: 'green',
      });
    },
    onError: () => {
      // TODO: handle error
      notifications.show({
        title: 'Staff Create Error',
        message: 'Something went wrong while creating staff.',
        color: 'red',
      });
    },
  });
};

export const useUpdateStaffMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: StaffType) => updateStaff(data as IStaff),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: staff.lists(),
      });
      notifications.show({
        title: 'Staff Updated',
        message: 'Staff has been updated successfully.',
        color: 'green',
      });
    },
    onError: () => {
      // TODO: handle error
      notifications.show({
        title: 'Staff Update Error',
        message: 'Something went wrong while updating staff.',
        color: 'red',
      });
    },
  });
};

export const useDeleteStaffMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteStaff(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: staff.lists(),
      });
      notifications.show({
        title: 'Staff Deleted',
        message: 'Staff has been deleted successfully.',
        color: 'green',
      });
    },
    onError: () => {
      // TODO: handle error
      notifications.show({
        title: 'Staff Delete Error',
        message: 'Something went wrong while deleting staff.',
        color: 'red',
      });
    },
  });
};
