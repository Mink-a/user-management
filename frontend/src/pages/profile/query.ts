import { useQuery } from '@tanstack/react-query';
import { useParamsHelper } from '@/hooks/useParamsHelper';
import { getProfile } from '@/services/profile.service';

export const useGetProfileQuery = () => {
  const { getParams } = useParamsHelper();
  const params = getParams();

  return useQuery({
    queryKey: ['profile', params],
    queryFn: () => getProfile(params),
  });
};
