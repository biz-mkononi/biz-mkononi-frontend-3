import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { reqInstance3 } from '../common/axiosInstance';
interface AddSupplierParams {
  name: string;
  phone: string;
  email: string;
  description: string;
  businessId: string;
}

const createSupplier = async (data: AddSupplierParams) => {
  const response = await reqInstance3.post(
    `businesses/${data.businessId}/suppliers`,
    data,
  );

  return response;
};

const useAddSupplier = (): UseMutationResult<
  // eslint-disable-next-line
  any,
  Error,
  AddSupplierParams
> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(createSupplier, {
    onSuccess: () => {
      queryClient
        .invalidateQueries(['suppliers', 'totalsupplies', 'totalprofits'])
        .then(() => navigate('/suppliers/list'))
        // eslint-disable-next-line
        .catch((error: any) => {
          // eslint-disable-next-line
          throw new Error(error.message);
        }); // Adjust the key as needed
    },
  });
};

export default useAddSupplier;
