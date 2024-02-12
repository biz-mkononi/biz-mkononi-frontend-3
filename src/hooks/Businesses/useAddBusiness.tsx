import {useMutation, UseMutationResult, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import { reqInstance2 } from '../common/axiosInstance';

interface CreateBusinessParams {
  name: string;
  businessEmail: string;
  productType: string;
  locationDetails: string;
  location:string;
  businessPhone:string;
  description:string;
  longitude:number;
  latitude:number;
  image: File | null;
}

const createBusiness = async (data: CreateBusinessParams) => {
  const response = await reqInstance2.post('/businesses', data);

  return response;
};

const useAddBusiness = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  CreateBusinessParams
> => {
  const navigate = useNavigate();
const queryClient = useQueryClient();
  return useMutation(createBusiness, {
    onSuccess: () => {
     queryClient
        .invalidateQueries(['businesses'])
        .then(() => navigate('/'))
        // eslint-disable-next-line
        .catch((error: any) => {
          // eslint-disable-next-line
          throw new Error(error.message);
        }); // Adjust the key as needed
    },
  });
};

export default useAddBusiness;
