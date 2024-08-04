import { axiosInstance } from '@/utils/axios';

export const getRoles = async (params?: Record<string, unknown>) => {
  const response = await axiosInstance.get('/roles', {
    params,
  });
  return response.data;
};

export const createRole = async (values: IRole) => {
  const response = await axiosInstance.post('/roles', {
    ...values,
  });
  return response.data;
};

export const updateRole = async (values: IRole) => {
  const { roleId, ...role } = values;
  const response = await axiosInstance.patch(`/roles/${roleId}`, {
    ...role,
  });
  return response.data;
};

export const deleteRole = async (id: number) => {
  const response = await axiosInstance.delete(`/roles/${id}`);
  return response.data;
};
