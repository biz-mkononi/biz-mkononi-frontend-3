import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { reqInstance2 } from '../common/axiosInstance';
import useAuthToken from './useAuthToken';

interface TrialStatus {
  status: string;
  userId: string;
}

const fetchStatus = async (): Promise<TrialStatus> => {
  const response = await reqInstance2.get('/auth/trial-status');
  return response.data;
};

const useSubscriptionStatus = (): UseQueryResult<TrialStatus, Error> => {
  const { token } = useAuthToken();
  return useQuery({
    queryKey: ['trialStatus'],
    queryFn: fetchStatus,
    staleTime: 1000 * 60,
    enabled: token !== null && token !== undefined, // cache for 1 min (adjust as needed)
  });
};

export default useSubscriptionStatus;
