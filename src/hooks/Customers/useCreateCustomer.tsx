import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { reqInstance2 } from '../common/axiosInstance';

interface CreateCustomerParams {
  name: string;
  gender: string;
  yearOfBirth: string;
  phone: string;
  email: string;
  description: string;
  image?: File | null;
  businessId: string;
}

const createCustomers = async (data: CreateCustomerParams) => {
  const response = await reqInstance2.post(
    `businesses/${data.businessId}/customers`,
    data,
  );

  return response;
};

const useAddCustomers = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  CreateCustomerParams
> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(createCustomers, {
    onSuccess: () => {
      queryClient
        .invalidateQueries([
          'customers,newcustomers,totalcustomers,agestats,genderstats',
        ])
        .then(() => navigate('/customers/list'))
        // eslint-disable-next-line
        .catch((error: any) => {
          // eslint-disable-next-line
          throw new Error(error.message);
        }); // Adjust the key as needed
    },
  });
};

export default useAddCustomers;
