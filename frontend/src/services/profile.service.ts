import { axiosInstance } from '@/utils/axios';

export const getProfile = async (params?: Record<string, unknown>) => {
  const response = await axiosInstance.get<ApiDetailsResponse<IProfile>>('/staff/profile', {
    params,
  });
  return response.data;
};
