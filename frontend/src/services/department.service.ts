import { axiosInstance } from '@/utils/axios';

export const getDepartments = async (params?: Record<string, unknown>) => {
  const response = await axiosInstance.get<ApiListResponse<IDepartment>>('/departments', {
    params,
  });
  return response.data;
};

export const createDepartment = async (values: any) => {
  const response = await axiosInstance.post('/departments', {
    ...values,
  });
  return response.data;
};

export const updateDepartment = async (values: IDepartment) => {
  const { depId, ...department } = values;
  const response = await axiosInstance.patch(`/departments/${depId}`, {
    ...department,
  });
  return response.data;
};

export const deleteDepartment = async (id: number) => {
  const response = await axiosInstance.delete(`/departments/${id}`);
  return response.data;
};
