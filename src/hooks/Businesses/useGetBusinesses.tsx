/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { reqInstance2 } from '../common/axiosInstance';
import { AxiosResponse } from 'axios';
import { BusinessResponse } from '../../utils/types/BusinessTypes';
type BusinessApiResponse = {
  rows: BusinessResponse[];
};
const fetchData = async (): Promise<BusinessApiResponse> => {
  try {
    const response: AxiosResponse<BusinessApiResponse> =
      await reqInstance2.get('/businesses');
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || error?.message || 'An error occurred',
    );
  }
};

const useGetBusinesses = (): UseQueryResult<BusinessApiResponse, Error> => {
  return useQuery(['businesses'], fetchData);
};

export default useGetBusinesses;
