import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { reqInstance2 } from '../common/axiosInstance';

interface CreateBusinessParams {
  name: string;
  businessEmail: string;
  productType: string;
  locationDetails: string;
  location: string;
  businessPhone: string;
  description: string;
  longitude: number;
  latitude: number;
  image?: File | null;
  id: string;
}

const updateBusiness = async (data: CreateBusinessParams) => {
  const response = await reqInstance2.put(`/businesses/${data.id}`, data);

  return response;
};

const useUpdateBusiness = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  CreateBusinessParams
> => {
  const queryClient = useQueryClient();
  return useMutation(updateBusiness, {
    onSuccess: () => {
      queryClient
        .invalidateQueries(['businesses', 'business'])
        // eslint-disable-next-line
        .catch((error: any) => {
          // eslint-disable-next-line
          throw new Error(error.message);
        }); // Adjust the key as needed
    },
  });
};

export default useUpdateBusiness;
