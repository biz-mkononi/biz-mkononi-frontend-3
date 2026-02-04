/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { reqInstance2 } from '../common/axiosInstance';
import { AxiosResponse } from 'axios';
import { BusinessResponse } from '../../utils/types/BusinessTypes';

const fetchData = async (id: string): Promise<BusinessResponse> => {
  try {
    const response: AxiosResponse<BusinessResponse> = await reqInstance2.get(
      `/businesses/${id}`,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || error?.message || 'An error occurred',
    );
  }
};

const useGetSingleBusiness = (
  id: string,
): UseQueryResult<BusinessResponse, Error> => {
  return useQuery(['business', id], () => fetchData(id));
};

export default useGetSingleBusiness;
