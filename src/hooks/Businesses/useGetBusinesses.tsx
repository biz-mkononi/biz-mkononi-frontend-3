// useApiData.ts

import {AxiosResponse} from 'axios';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import { reqInstance2 } from '../common/axiosInstance';


type Agency = {
  name: string;
  uid: string;
};
interface ApiResponse {
  // Define the structure of your API response
  // Example: { data: YourDataType }
  agencies: Agency[];
}

const fetchData = async (): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> =
      await reqInstance2.get('/agency/');
    return response.data;
    // eslint-disable-next-line
  } catch (error: any) {
    // eslint-disable-next-line
    throw new Error(error.message);
  }
};

const useGetAgencys = (): UseQueryResult<ApiResponse, Error> => {
  return useQuery(['businesses'],fetchData);
};

export default useGetAgencys;
