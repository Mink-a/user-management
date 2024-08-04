import { axiosInstance } from '@/utils/axios';

export const getPermissions = async (params?: Record<string, unknown>) => {
  const response = await axiosInstance.get<ApiListResponse<IPermission>>('/permissions', {
    params,
  });
  return response.data;
};

export const createPermission = async (values: IPermission) => {
  const response = await axiosInstance.post('/permissions', {
    ...values,
  });
  return response.data;
};

export const updatePermission = async (values: IPermission) => {
  const { permissionId, ...permission } = values;
  const response = await axiosInstance.patch(`/permissions/${permissionId}`, {
    ...permission,
  });
  return response.data;
};

export const deletePermission = async (id: number) => {
  const response = await axiosInstance.delete(`/permissions/${id}`);
  return response.data;
};
