/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { reqInstance2 } from '../common/axiosInstance';
import { AxiosResponse } from 'axios';
import { BusinessResponse } from '../../utils/types/BusinessTypes';

const fetchData = async (): Promise<BusinessResponse[]> => {
  try {
    const response: AxiosResponse<BusinessResponse[]> =
      await reqInstance2.get('/businesses');
    return response.data.rows;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || error?.message || 'An error occurred',
    );
  }
};

const useGetBusinesses = (): UseQueryResult<BusinessResponse[], Error> => {
  return useQuery(['businesses'], fetchData);
};

export default useGetBusinesses;
