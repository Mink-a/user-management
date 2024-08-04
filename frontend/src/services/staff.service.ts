import { axiosInstance } from '@/utils/axios';

export const getStaffs = async (params?: Record<string, unknown>) => {
  const response = await axiosInstance.get('/staff', {
    params,
  });
  return response.data;
};

export const getStaff = async (id: number) => {
  const response = await axiosInstance.get<ApiDetailsResponse<IProfile>>(`/staff/${id}`);
  return response.data;
};

export const createStaff = async (values: IStaff) => {
  const response = await axiosInstance.post('/staff', {
    ...values,
  });
  return response.data;
};

export const updateStaff = async (values: IStaff) => {
  const { staffId, ...staff } = values;
  const response = await axiosInstance.patch(`/staff/${staffId}`, {
    ...staff,
  });
  return response.data;
};

export const deleteStaff = async (id: number) => {
  const response = await axiosInstance.delete(`/staff/${id}`);
  return response.data;
};
